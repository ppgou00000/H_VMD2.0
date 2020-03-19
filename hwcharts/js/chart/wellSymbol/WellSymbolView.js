/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing,
* software distributed under the License is distributed on an
* "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
* KIND, either express or implied.  See the License for the
* specific language governing permissions and limitations
* under the License.
*/
Vmd.define('hwchart.chart.wellSymbol.WellSymbolView', {
    requires: [
        'hwchart.chart.helper.LargeSymbolDraw',
        'hwchart.chart.helper.WellSymbolDraw',
        'hwchart.chart.helper.WellManager',
        'hwchart.layout.points'
    ]

}, function () {
    var WellSymbolDraw = hwchart.chart.helper.WellSymbolDraw;
    var LargeSymbolDraw = hwchart.chart.helper.LargeSymbolDraw;
    var pointsLayout = hwchart.layout.points;
    var WellManager = hwchart.chart.helper.WellManager;

    var WellSymbolView=  hwcharts.extendChartView({

        type: 'wellSymbol',

        render: function (seriesModel, ecModel, api, payload) {
            if (!this.__hasFetchData) {
                api.dispatchAction({
                    type: 'fetchData',
                    id: seriesModel.id,
                    mainType: seriesModel.mainType,
                    name: seriesModel.name,
                    nameText: seriesModel.option.nameText,
                    seriesIndex:seriesModel.seriesIndex,
                    subType: seriesModel.subType
                });
                this.__hasFetchData = true;
            }

            var data = seriesModel.getData();

            var symbolDraw = this._updateSymbolDraw(data, seriesModel, ecModel, api);

            symbolDraw.updateData(data, {
                // TODO
                // If this parameter should be a shape or a bounding volume
                // shape will be more general.
                // But bounding volume like bounding rect will be much faster in the contain calculation
                clipShape: this._getClipShape(seriesModel)
            });

            this._finished = true;
        },

        incrementalPrepareRender: function (seriesModel, ecModel, api) {
            var data = seriesModel.getData();

            var symbolDraw = this._updateSymbolDraw(data, seriesModel, ecModel, api);

            symbolDraw.incrementalPrepareUpdate(data);
            this._finished = false;
        },
        incrementalRender: function (taskParams, seriesModel, ecModel) {
            this._symbolDraw.incrementalUpdate(taskParams, seriesModel.getData(), {
                clipShape: this._getClipShape(seriesModel)
            });

            this._finished = taskParams.end === seriesModel.getData().count();
        },

        updateTransform: function (seriesModel, ecModel, api) {
            var data = seriesModel.getData(); // Must mark group dirty and make sure the incremental layer will be cleared
            // PENDING

            this.group.dirty();

            this._finished = false;

            if (!this._finished || data.count() > 1e4 || !this._symbolDraw.isPersistent()) {
                return {
                    update: true
                };
            } else {
                var res = pointsLayout().reset(seriesModel);

                if (res.progress) {
                    res.progress({
                        start: 0,
                        end: data.count()
                    }, data);
                }

                this._symbolDraw.updateLayout(data);
            }
        },

        _getClipShape: function (seriesModel) {
            var coordSys = seriesModel.coordinateSystem;
            var clipArea = coordSys && coordSys.getArea && coordSys.getArea();
            return seriesModel.get('clip', true) ? clipArea : null;
        },

        _updateSymbolDraw: function (data, seriesModel, ecModel, api) {
            var symbolDraw = this._symbolDraw;
            var pipelineContext = seriesModel.pipelineContext;
            var isLargeDraw = pipelineContext.large;

            if (!symbolDraw || isLargeDraw !== this._isLargeDraw) {
                symbolDraw && symbolDraw.remove();
                symbolDraw = this._symbolDraw = isLargeDraw ? new LargeSymbolDraw() : new WellSymbolDraw(ecModel, api);
                this._isLargeDraw = isLargeDraw;
                this.group.removeAll();
            }

            this.group.add(symbolDraw.getGroup());
            return symbolDraw;
        },

        remove: function (ecModel, api) {
            this._symbolDraw && this._symbolDraw.remove(api);
            this._symbolDraw = null;
        },

        dispose: function () {
            WellManager.dispose()
        }
    });

    hwchart.chart.wellSymbol.WellSymbolView = WellSymbolView;
});