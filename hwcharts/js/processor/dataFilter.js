﻿Vmd.define('hwchart.processor.dataFilter', {
    requires: []
}, function () {

    function _default(seriesType) {
        return {
            seriesType: seriesType,
            reset: function (seriesModel, ecModel) {
                var legendModels = ecModel.findComponents({
                    mainType: 'legend'
                });

                if (!legendModels || !legendModels.length) {
                    return;
                }

                var data = seriesModel.getData();
                data.filterSelf(function (idx) {
                    var name = data.getName(idx); // If in any legend component the status is not selected.

                    for (var i = 0; i < legendModels.length; i++) {
                        if (!legendModels[i].isSelected(name)) {
                            return false;
                        }
                    }

                    return true;
                });
            }
        };
    }

    hwchart.processor.dataFilter = _default;
})