﻿Vmd.define('hwchart.component.brush.BrushView', {
    requires: [
        'hwchart.component.helper.BrushController'
    ]

}, function () {
    var zrUtil = zrender.util;
    var BrushController = hwchart.component.helper.BrushController;
    

    var _default = hwcharts.extendComponentView({
        type: 'brush',
        init: function (ecModel, api) {
            /**
             * @readOnly
             * @type {module:hwcharts/model/Global}
             */
            this.ecModel = ecModel;
            /**
             * @readOnly
             * @type {module:hwcharts/ExtensionAPI}
             */

            this.api = api;
            /**
             * @readOnly
             * @type {module:hwcharts/component/brush/BrushModel}
             */

            this.model;
            /**
             * @private
             * @type {module:hwcharts/component/helper/BrushController}
             */

            (this._brushController = new BrushController(api.getZr())).on('brush', zrUtil.bind(this._onBrush, this)).mount();

            //hwextend
            this._brushController.api = this.api;

        },

        /**
         * @override
         */
        render: function (brushModel) {
            this.model = brushModel;
            return updateController.apply(this, arguments);
        },

        /**
         * @override
         */
        updateTransform: updateController,

        /**
         * @override
         */
        updateView: updateController,
        // /**
        //  * @override
        //  */
        // updateLayout: updateController,
        // /**
        //  * @override
        //  */
        // updateVisual: updateController,

        /**
         * @override
         */
        dispose: function () {
            this._brushController.dispose();
        },

        /**
         * @private
         */
        _onBrush: function (areas, opt) {
            var modelId = this.model.id;
            this.model.brushTargetManager.setOutputRanges(areas, this.ecModel); // Action is not dispatched on drag end, because the drag end
            // emits the same params with the last drag move event, and
            // may have some delay when using touch pad, which makes
            // animation not smooth (when using debounce).

            (!opt.isEnd || opt.removeOnClick) && this.api.dispatchAction({
                type: 'brush',
                brushId: modelId,
                areas: zrUtil.clone(areas),
                $from: modelId
            });
            opt.isEnd && this.api.dispatchAction({
                type: 'brushEnd',
                brushId: modelId,
                areas: zrUtil.clone(areas),
                $from: modelId
            });
        }
    });

    function updateController(brushModel, ecModel, api, payload) {
        // Do not update controller when drawing.
        // Do not update controller when drawing.
        (!payload || payload.$from !== brushModel.id) &&
        this._brushController.setPanels(brushModel.brushTargetManager.makePanelOpts(api))
            .enableBrush(brushModel.brushOption)
            .updateCovers(brushModel.areas.slice());
       // (!payload || payload.$from !== brushModel.id) && this._brushController.setPanels(brushModel.brushTargetManager.makePanelOpts(api)).enableBrush(brushModel.brushOption).updateCovers(brushModel.areas.slice());
    }


    hwchart.component.brush.BrushView = _default;
   
})