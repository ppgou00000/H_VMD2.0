﻿Vmd.define('hwchart.chart.line.LinesView', {
    requires: [
        'hwchart.chart.helper.LineDraw',
        'hwchart.chart.helper.EffectLine',
        'hwchart.chart.helper.Line',
        'hwchart.chart.helper.Polyline',
        'hwchart.chart.helper.EffectPolyline',
        'hwchart.chart.helper.LargeLineDraw',
        'hwchart.chart.helper.createClipPathFromCoordSys',
        'hwchart.chart.line.linesLayout'
    ]
}, function () {

  

    var LineDraw = hwchart.chart.helper.LineDraw;

    var EffectLine = hwchart.chart.helper.EffectLine;

    var Line = hwchart.chart.helper.Line;

    var Polyline = hwchart.chart.helper.Polyline;

    var EffectPolyline = hwchart.chart.helper.EffectPolyline;

    var LargeLineDraw = hwchart.chart.helper.LargeLineDraw;

    var linesLayout = hwchart.chart.line.linesLayout;

    var _createClipPathFromCoordSys = hwchart.chart.helper.createClipPathFromCoordSys;

    var createClipPath = _createClipPathFromCoordSys.createClipPath;

    var _default = hwcharts.extendChartView({
        type: 'lines',
        init: function () { },
        render: function (seriesModel, ecModel, api) {
            var data = seriesModel.getData();

            var lineDraw = this._updateLineDraw(data, seriesModel);

            var zlevel = seriesModel.get('zlevel');
            var trailLength = seriesModel.get('effect.trailLength');
            var zr = api.getZr(); // Avoid the drag cause ghost shadow
            // FIXME Better way ?
            // SVG doesn't support

            var isSvg = zr.painter.getType() === 'svg';

            if (!isSvg) {
                zr.painter.getLayer(zlevel).clear(true);
            } // Config layer with motion blur


            if (this._lastZlevel != null && !isSvg) {
                zr.configLayer(this._lastZlevel, {
                    motionBlur: false
                });
            }

            if (this._showEffect(seriesModel) && trailLength) {
                if (!isSvg) {
                    zr.configLayer(zlevel, {
                        motionBlur: true,
                        lastFrameAlpha: Math.max(Math.min(trailLength / 10 + 0.9, 1), 0)
                    });
                }
            }

            lineDraw.updateData(data);
            var clipPath = seriesModel.get('clip', true) && createClipPath(seriesModel.coordinateSystem, false, seriesModel);

            if (clipPath) {
                this.group.setClipPath(clipPath);
            } else {
                this.group.removeClipPath();
            }

            this._lastZlevel = zlevel;
            this._finished = true;
        },
        incrementalPrepareRender: function (seriesModel, ecModel, api) {
            var data = seriesModel.getData();

            var lineDraw = this._updateLineDraw(data, seriesModel);

            lineDraw.incrementalPrepareUpdate(data);

            this._clearLayer(api);

            this._finished = false;
        },
        incrementalRender: function (taskParams, seriesModel, ecModel) {
            this._lineDraw.incrementalUpdate(taskParams, seriesModel.getData());

            this._finished = taskParams.end === seriesModel.getData().count();
        },
        updateTransform: function (seriesModel, ecModel, api) {
            var data = seriesModel.getData();
            var pipelineContext = seriesModel.pipelineContext;

            if (!this._finished || pipelineContext.large || pipelineContext.progressiveRender) {
                // TODO Don't have to do update in large mode. Only do it when there are millions of data.
                return {
                    update: true
                };
            } else {
                // TODO Use same logic with ScatterView.
                // Manually update layout
                var res = linesLayout.reset(seriesModel);

                if (res.progress) {
                    res.progress({
                        start: 0,
                        end: data.count()
                    }, data);
                }

                this._lineDraw.updateLayout();

                this._clearLayer(api);
            }
        },
        _updateLineDraw: function (data, seriesModel) {
            var lineDraw = this._lineDraw;

            var hasEffect = this._showEffect(seriesModel);

            var isPolyline = !!seriesModel.get('polyline');
            var pipelineContext = seriesModel.pipelineContext;
            var isLargeDraw = pipelineContext.large;

            if (!lineDraw || hasEffect !== this._hasEffet || isPolyline !== this._isPolyline || isLargeDraw !== this._isLargeDraw) {
                if (lineDraw) {
                    lineDraw.remove();
                }

                lineDraw = this._lineDraw = isLargeDraw ? new LargeLineDraw() : new LineDraw(isPolyline ? hasEffect ? EffectPolyline : Polyline : hasEffect ? EffectLine : Line);
                this._hasEffet = hasEffect;
                this._isPolyline = isPolyline;
                this._isLargeDraw = isLargeDraw;
                this.group.removeAll();
            }

            this.group.add(lineDraw.group);
            return lineDraw;
        },
        _showEffect: function (seriesModel) {
            return !!seriesModel.get('effect.show');
        },
        _clearLayer: function (api) {
            // Not use motion when dragging or zooming
            var zr = api.getZr();
            var isSvg = zr.painter.getType() === 'svg';

            if (!isSvg && this._lastZlevel != null) {
                zr.painter.getLayer(this._lastZlevel).clear(true);
            }
        },
        remove: function (ecModel, api) {
            this._lineDraw && this._lineDraw.remove();
            this._lineDraw = null; // Clear motion when lineDraw is removed

            this._clearLayer(api);
        },
        dispose: function () { }
    });

    hwchart.chart.line.LinesView = _default;
})