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

/**
 * Symbol with ripple effect
 * @module echarts/chart/helper/ComposeSymbol
 */
Vmd.define('hwchart.chart.wellLogging.track.CurveView', {
    requires: [
        'hwchart.util.graphic',
        'hwchart.util.number',
        'hwchart.util.layout',
        'hwchart.util.BreakPolyline',
        'hwchart.chart.wellLogging.track.BaseView'
    ]
}, function () {

    var zrUtil = zrender.util;
    var number = hwchart.util.number;
    var graphic = hwchart.util.graphic;
    var layout = hwchart.util.layout;
    var BaseView = hwchart.chart.wellLogging.track.BaseView;
    var BreakPolyline = hwchart.util.BreakPolyline;

    var CurveView = BaseView.extend({

        type: 'wellLogging.curve',

        init: function(seriesModel, node, api){
            if (!this.__hasFetchData) {
                api.dispatchAction({
                    type: 'fetchData',
                    id: seriesModel.id,
                    name: seriesModel.name,
                    subType: seriesModel.subType,
                    seriesIndex:seriesModel.seriesIndex,
                    nodeType: 'curve',
                    params: {
                        curveName:node.name
                    }
                });
                this.__hasFetchData = true;
            }
            CurveView.superApply(this, 'init', arguments);
        },

        updateData: function(node){
            CurveView.superApply(this, 'updateData', arguments);
            var nodeModel = node.getModel();
            var data = nodeModel.getData();
            var regionCurveFilledData = data.regionCurveFilledData;
            zrUtil.each(regionCurveFilledData,function(regionCurveFilled){
                if( regionCurveFilled._invalid == true){
                    node._dirty = true;
                }
            });

        },

        renderHeader: function (node) {
            var nodeModel = node.getModel();

            var padding = nodeModel.get('itemStyle.header.padding');
            padding = zrUtil.isArray(padding) ? padding : [padding, padding, padding, padding];
            var labelDistance = nodeModel.get('itemStyle.header.labelDistance');

            var lineStyleModel = nodeModel.getModel('itemStyle.lineStyle');
            var lineStyle = lineStyleModel.getLineStyle();
            var headerStyle = nodeModel.get('itemStyle.header') || {};

            var nodeLayout = node.getLayout();
            var headerLayout = nodeLayout.header;

            var color = zrUtil.retrieve3(headerStyle.color, lineStyle.stroke, 'black');

            var requestCompleted = nodeModel.get('requestCompleted');
            var ParentNodeModel = node.parentNode.getModel();
            var ParentborderWidth = (ParentNodeModel.get('itemStyle.header.borderWidth')||0);
            var x = number.niceForLine(0, ParentborderWidth);
            var y = number.niceForLine(0, ParentborderWidth);
            var width = headerLayout.width - ParentborderWidth+ headerStyle.borderWidth;
            var height = headerLayout.height;
            var bg = new graphic.Rect({
                draggable: true,
                shape: {
                    x: x,
                    y: y,
                    width: 0,
                    height: height
                },
                style:{
                    fill: requestCompleted ? headerStyle.backgroundColor : '#eee',
                    stroke: headerStyle.borderWidth == 0 ? 'none' : headerStyle.borderColor,
                    lineWidth: headerStyle.borderWidth
                }
            })

            bg.animate('shape', true)
                .when(1000, {
                    width: width
                })
                .done(function(){})
                .start()

            var titleLabel = new graphic.Text({
                style: zrUtil.defaults({
                    text: nodeModel.get('aliasName') || node.name,
                    textFill: color || 'black'
                }, headerStyle.textStyle)
            })

            var yPos = number.niceForLine(headerLayout.height - padding[2], lineStyle.lineWidth);
            var line = new graphic.Line({
                z: 1,
                shape: {
                    x1: padding[3],
                    y1: yPos,
                    x2: headerLayout.width - padding[1],
                    y2: yPos
                }
            })
            line.useStyle(zrUtil.defaults(
                {
                    strokeNoScale: true,
                    fill: 'none'
                },
                lineStyle
            ));

            var minLabel = new graphic.Text({
                    style: zrUtil.defaults({
                        text: nodeModel.get('leftScale'),
                        textFill: color,
                        textAlign: 'left'
                    }, headerStyle.textStyle)
                });
            var maxLabel = new graphic.Text({
                    style: zrUtil.defaults({
                        text: nodeModel.get('rightScale'),
                        textFill: color,
                        textAlign: 'left'
                    }, headerStyle.textStyle)
                });

            var minLabelBoundRect = minLabel.getBoundingRect();
            var maxLabelBoundRect = maxLabel.getBoundingRect();
            var maxLabelHeight = Math.max(minLabelBoundRect.height, maxLabelBoundRect.height);
            var labelYpos = headerLayout.height - padding[2] - maxLabelHeight - labelDistance - lineStyle.lineWidth;
            minLabel.attr('position', [padding[3], labelYpos]);
            maxLabel.attr('position', [headerLayout.width - maxLabelBoundRect.width - padding[1], labelYpos]);

            layout.positionElement(titleLabel, layout.getLayoutInfo(
                zrUtil.defaults({
                    textVerticalAlign: 'bottom'
                },headerStyle.textStyle)), {
                x: 0,
                y: 0,
                width: headerLayout.width,
                height: headerLayout.height - padding[2] - maxLabelHeight
            }, headerStyle.textStyle.margin);
            // titleLabel.attr('position', [(headerLayout.width - titleBoundRect.width) / 2, headerLayout.height - 30]);

            this.headerGroup.add(bg);
            this.headerGroup.add(line);
            this.headerGroup.add(minLabel);
            this.headerGroup.add(maxLabel);
            this.headerGroup.add(titleLabel);
            if(requestCompleted){
                var regionCurveFilled = nodeModel.get('regionCurveFilled');
                var filledSize = regionCurveFilled.length;
                var fillHeadSize = 0;
                for(var i = 0;i < filledSize;i++) {
                    if(regionCurveFilled[i].showHead!=undefined&&regionCurveFilled[i].showHead==true){
                        fillHeadSize++;
                    }else if(regionCurveFilled[i].showLine!=undefined&&regionCurveFilled[i].showLine==true){
                        fillHeadSize++;
                    }
                }
                var index = 0;
                if(fillHeadSize>0){
                    width = width/fillHeadSize;
                }
                var lineY = headerLayout.height - padding[2]+lineStyle.lineWidth/2;
                for(var i = 0;i < filledSize;i++) {
                    if(regionCurveFilled[i].showHead!=undefined&&regionCurveFilled[i].showHead==true){
                        var fillStyle = regionCurveFilled[i].fillStyle;
                        var fillName = regionCurveFilled[i].name;
                        var fillHead = new graphic.Rect({
                            z:2,
                            shape: {
                                x: x+width*index,
                                y: y,
                                width: width,
                                height: height
                            }
                        });
                        if(fillStyle.constructor==String){
                            fillHead.useStyle({
                                text:fillName?fillName:"",
                                truncate:{
                                    outerWidth:width,
                                    ellipsis:'...'
                                },
                                fill: fillStyle,
                                stroke: 'none'
                            });
                        }else{
                            var myImage = new Image();
                            var fillName = fillStyle.fillName||"空心";
                            myImage.src = '../images/lith/'+fillName+".bmp";
                            fillHead.useStyle(
                                {
                                    stroke:"none",
                                    fill:  {
                                        image: myImage,
                                        repeat: 'repeat' // 是否平铺, 可以是 'repeat-x', 'repeat-y', 'no-repeat'
                                    }
                                }
                            );
                        }
                        fillHead.on("click", function(){
                            alert(fillName)
                        })
                        this.headerGroup.add(fillHead);
                        index++;
                    }else if(regionCurveFilled[i].showLine!=undefined&&regionCurveFilled[i].showLine==true){
                        var fillStyle = regionCurveFilled[i].fillStyle;
                        var fillName = regionCurveFilled[i].name;
                        var fillHead = new graphic.Rect({
                            z:2,
                            shape: {
                                x: x+width*index,
                                y: lineY,
                                width: width,
                                height: padding[2]
                            }
                        })
                        if(fillStyle.constructor==String){
                            fillHead.useStyle({
                                text:fillName?fillName:"",
                                truncate:{
                                    outerWidth:width,
                                    ellipsis:'...'
                                },
                                fill: fillStyle,
                                stroke: 'none'
                            });
                        }else{
                            var myImage = new Image();
                            var fillName = fillStyle.fillName||"空心";
                            myImage.src = '../images/lith/'+fillName+".bmp";
                            fillHead.useStyle(
                                {
                                    stroke:"none",
                                    fill:  {
                                        image: myImage,
                                        repeat: 'repeat' // 是否平铺, 可以是 'repeat-x', 'repeat-y', 'no-repeat'
                                    }
                                }
                            );
                        }
                        fillHead.on("click", function(){
                            alert(regionCurveFilled[i].name)
                        })
                        this.headerGroup.add(fillHead);
                        index++;
                    }
                }
            }
            this.headerGroup.attr('position', [headerLayout.x, headerLayout.y]);
        },

        renderContent: function (node) {

            var nodeModel = node.getModel();

            var data = nodeModel.getData();
            var lineData = zrUtil.filter(data.lineData, function(item){
                return !isNaN(item[0]) && !isNaN(item[1]);
            });
            if(lineData.length>0){
                var nodeLayout = node.getLayout();
                var bodyLayout = nodeLayout.body;
                var width = bodyLayout.width;
                var height = bodyLayout.height;
                var secondScale = nodeModel.get('secondScale');
                var reg = /^\d+(?=\.{0,1}\d+$|$)/
                //console.log(secondScale+" "+reg.test(secondScale))
                if(reg.test(secondScale)){
                    this.contentGroup.setClipPath(new graphic.Rect({
                        shape: {
                            x: 0,
                            y: 0,
                            width: width,
                            height: height
                        }
                    }));
                }else{
                    var xmin = data.xmin;
                    var xmax = data.xmax;
                    var xwidth = xmax -xmin;
                    this.contentGroup.setClipPath(new graphic.Rect({
                        shape: {
                            x: xmin,
                            y: 0,
                            width: xwidth,
                            height: height
                        }
                    }));
                }
                var mirror = nodeModel.get('mirror');
                if(mirror){
                    var mirrorData = data.mirrorData;
                    mirrorData[mirrorData.length-1][2] = 0;
                    lineData = lineData.concat(mirrorData.reverse());
                }
                var lineStyleModel = nodeModel.getModel('itemStyle.lineStyle');
                var lineStyle = lineStyleModel.getLineStyle();
                var line = new BreakPolyline({
                    z: 2,
                    shape: {
                        points: lineData
                    }
                });

                line.useStyle(zrUtil.defaults(
                    {
                        strokeNoScale: true,
                        fill: 'none'
                    },
                    lineStyle
                ));
                this.contentGroup.add(line);
                //曲线填充
                var regionCurveFilledData = data.regionCurveFilledData;
                zrUtil.each(regionCurveFilledData,function(regionCurveFilled){
                    var fillData = regionCurveFilled.data||[];
                    if(fillData.length>0){
                        if(regionCurveFilled.fillTo){
                            var samechildrenModel = regionCurveFilled.fillTo.getModel();
                            var data = samechildrenModel.getData();
                            if(data){
                                data = data.lineData;
                                fillData = fillData.concat(data.reverse());
                                regionCurveFilled._invalid = false;

                            }
                        }
                        if(!regionCurveFilled._invalid){
                            var line = new BreakPolyline({
                                z: 1,
                                shape: {
                                    points: fillData
                                }
                            });
                            var fillStyle = regionCurveFilled.fillStyle;
                            line.useStyle(zrUtil.defaults(
                                {
                                    stroke:"none"
                                },
                                fillStyle
                            ));
                            this.contentGroup.add(line);
                        }
                    }
                },this);
            }
        }
    });

    hwchart.chart.wellLogging.track.CurveView = CurveView;

})