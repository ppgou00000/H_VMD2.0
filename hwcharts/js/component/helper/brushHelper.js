﻿Vmd.define('hwchart.component.helper.brushHelper', {
    requires: [
        'hwchart.util.graphic',
        'hwchart.component.helper.cursorHelper'
    ]

}, function () {

    var zrUtil = zrender.util;
    var BoundingRect = zrender.BoundingRect;

    var _cursorHelper = hwchart.component.helper.cursorHelper;

    var onIrrelevantElement = _cursorHelper.onIrrelevantElement;

    var graphicUtil = hwchart.util.graphic;

    var each = zrender.util.each;

    var COMPONENT_NAMES = ['geo', 'xAxis', 'yAxis'];
    var PANEL_ID_SPLIT = '--';
    var COORD_CONVERTS = ['dataToPoint', 'pointToData'];

    function makeRectPanelClipPath(rect) {
        rect = normalizeRect(rect);
        return function (localPoints, transform) {
            return graphicUtil.clipPointsByRect(localPoints, rect);
        };
    }

    function makeLinearBrushOtherExtent(rect, specifiedXYIndex) {
        rect = normalizeRect(rect);
        return function (xyIndex) {
            var idx = specifiedXYIndex != null ? specifiedXYIndex : xyIndex;
            var brushWidth = idx ? rect.width : rect.height;
            var base = idx ? rect.x : rect.y;
            return [base, base + (brushWidth || 0)];
        };
    }

    function makeRectIsTargetByCursor(rect, api, targetModel) {
        rect = normalizeRect(rect);
        return function (e, localCursorPoint, transform) {
            return rect.contain(localCursorPoint[0], localCursorPoint[1]) && !onIrrelevantElement(e, api, targetModel);
        };
    } // Consider width/height is negative.
    
    /**
     * @param {Object} option {xAxisIndex, yAxisIndex, geoIndex}
     * @param {module:hwcharts/model/Global} ecModel
     * @return {Array.<Obejct>} coordInfoList
     */
    function makeCoordInfoList (option, ecModel) {
        var coordInfoList = [];

        each(COMPONENT_NAMES, function (componentName) {
            var componentIndices = option[componentName + 'Index'];
            if (componentIndices == null || componentIndices === 'none') {
                return;
            }
            if (componentIndices !== 'all' && !zrUtil.isArray(componentIndices)) {
                componentIndices = [componentIndices];
            }

            ecModel.eachComponent({ mainType: componentName }, function (componentModel, index) {
                if (componentIndices !== 'all' && zrUtil.indexOf(componentIndices, index) < 0) {
                    return;
                }

                var grid;
                var coordSys;

                (componentName === 'xAxis' || componentName === 'yAxis')
                    ? (grid = componentModel.axis.grid)
                    : (coordSys = componentModel.coordinateSystem); // geo

                var coordInfo;

                // Check duplicate and find cartesian when tranval to yAxis.
                for (var i = 0, len = coordInfoList.length; i < len; i++) {
                    var cInfo = coordInfoList[i];
                    if (__DEV__) {
                        zrUtil.assert(
                            cInfo[componentName + 'Index'] != index,
                            'Coord should not be defined duplicately: ' + componentName + index
                        );
                    }
                    // CoordSys is always required for `rect brush` or `polygon brush`.
                    // If both xAxisIndex and yAxisIndex specified, fetch cartesian by them.
                    if (componentName === 'yAxis' && !cInfo.yAxis && cInfo.xAxis) {
                        var aCoordSys = grid.getCartesian(cInfo.xAxisIndex, index);
                        if (aCoordSys) { // The yAxis and xAxis are in the same cartesian.
                            coordSys = aCoordSys;
                            coordInfo = cInfo;
                            break;
                        }
                    }
                }

                !coordInfo && coordInfoList.push(coordInfo = {});

                coordInfo[componentName] = componentModel;
                coordInfo[componentName + 'Index'] = index;
                // If both xAxisIndex and yAxisIndex specified, panelId only use yAxisIndex,
                // which is enough to index panel.
                coordInfo.panelId = componentName + PANEL_ID_SPLIT + index;
                coordInfo.coordSys = coordSys
                    // If only xAxisIndex or only yAxisIndex specified, find its first cartesian.
                    || grid.getCartesian(coordInfo.xAxisIndex, coordInfo.yAxisIndex);

                coordInfo.coordSys
                    ? (coordInfoList[componentName + 'Has'] = true)
                    : coordInfoList.pop(); // If a coordInfo exists originally, existance of coordSys is ensured.
            });
        });

        return coordInfoList;
    };

    function makePanelOpts(coordInfoList) {
        var panelOpts = [];

        each(coordInfoList, function (coordInfo) {
            var coordSys = coordInfo.coordSys;
            var rect;

            if (coordInfo.geoIndex >= 0) {
                rect = coordSys.getBoundingRect().clone();
                // geo roam and zoom transform
                rect.applyTransform(graphicUtil.getTransform(coordSys));
            }
            else { // xAxis or yAxis
                // grid is not Transformable.
                rect = coordSys.grid.getRect().clone();
            }

            panelOpts.push({ panelId: coordInfo.panelId, rect: rect });
        });

        return panelOpts;
    };

    function normalizeRect(rect) {
        return BoundingRect.create(rect);
    }


    function parseOutputRanges(areas, coordInfoList, ecModel, rangesCoordInfo) {
        each(areas, function (area, index) {
            var panelId = area.panelId;

            if (panelId) {
                panelId = panelId.split(PANEL_ID_SPLIT);

                area[panelId[0] + 'Index'] = +panelId[1];

                var coordInfo = findCoordInfo(area, coordInfoList);
                area.coordRange = coordConvert[area.brushType](
                    1, coordInfo, area.range
                );
                rangesCoordInfo && (rangesCoordInfo[index] = coordInfo);
            }
        });
    };

    function parseInputRanges(brushModel, ecModel) {
        each(brushModel.areas, function (area) {
            var coordInfo = findCoordInfo(area, brushModel.coordInfoList);

            if (__DEV__) {
                zrUtil.assert(
                    !coordInfo || coordInfo === true || area.coordRange,
                    'coordRange must be specified when coord index specified.'
                );
                zrUtil.assert(
                    !coordInfo || coordInfo !== true || area.range,
                    'range must be specified.'
                );
            }

            area.range = area.range || [];

            // convert coordRange to global range and set panelId.
            if (coordInfo && coordInfo !== true) {
                area.range = coordConvert[area.brushType](
                    0, coordInfo, area.coordRange
                );
                area.panelId = coordInfo.panelId;
            }
        });
    };

    /**
    * If return Object, a coord found.
    * If reutrn true, global found.
    * Otherwise nothing found.
    *
    * @param {Object} area {<componentName>Index}
    * @param {Array} coordInfoList
    * @return {Obejct|boolean}
    */
    function findCoordInfo(area, coordInfoList) {
        var isGlobal = true;
        for (var j = 0; j < COMPONENT_NAMES.length; j++) {
            var indexAttr = COMPONENT_NAMES[j] + 'Index';
            if (area[indexAttr] >= 0) {
                isGlobal = false;
                for (var i = 0; i < coordInfoList.length; i++) {
                    if (coordInfoList[i][indexAttr] === area[indexAttr]) {
                        return coordInfoList[i];
                    }
                }
            }
        }
        return isGlobal;
    }
    function axisConvert(axisName, to, coordInfo, coordRange) {
        var axis = coordInfo.coordSys.getAxis(axisName);

        if (__DEV__) {
            zrUtil.assert(axis, 'line brush is only available in cartesian (grid).');
        }

        return formatMinMax(zrUtil.map([0, 1], function (i) {
            return to
                ? axis.coordToData(axis.toLocalCoord(coordRange[i]))
                : axis.toGlobalCoord(axis.dataToCoord(coordRange[i]));
        }));
    }

    function formatMinMax(minMax) {
        minMax[0] > minMax[1] && minMax.reverse();
        return minMax;
    }
    var coordConvert = {

        lineX: zrUtil.curry(axisConvert, 'x'),

        lineY: zrUtil.curry(axisConvert, 'y'),

        rect: function (to, coordInfo, coordRange) {
            var coordSys = coordInfo.coordSys;
            var xminymin = coordSys[COORD_CONVERTS[to]]([coordRange[0][0], coordRange[1][0]]);
            var xmaxymax = coordSys[COORD_CONVERTS[to]]([coordRange[0][1], coordRange[1][1]]);
            return [
                formatMinMax([xminymin[0], xmaxymax[0]]),
                formatMinMax([xminymin[1], xmaxymax[1]])
            ];
        },

        polygon: function (to, coordInfo, coordRange) {
            var coordSys = coordInfo.coordSys;
            return zrUtil.map(coordRange, coordSys[COORD_CONVERTS[to]], coordSys);
        }
    };

    var exports = {};
    exports.makeRectPanelClipPath = makeRectPanelClipPath;
    exports.makeLinearBrushOtherExtent = makeLinearBrushOtherExtent;
    exports.makeRectIsTargetByCursor = makeRectIsTargetByCursor;
    //hwextend
    exports.makeCoordInfoList = makeCoordInfoList;
    exports.makePanelOpts = makePanelOpts;
    exports.parseOutputRanges = parseOutputRanges;
    exports.parseInputRanges = parseInputRanges;
    
    hwchart.component.helper.brushHelper= exports;
})