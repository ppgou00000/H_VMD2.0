Vmd.define('hwchart.extension.openlayers.OpenLayersModel', {
  requires: []

}, function () {

  function v2Equal(a, b) {
    return a && b && a[0] === b[0] && a[1] === b[1];
  }

  var _default = hwcharts.extendComponentModel({
    type: 'openlayers',
    getOpenLayers: function () {
      // __openlayers is injected when creating OpenLayersCoordSys
      return this.__openlayers;
    },
    setCenterAndZoom: function (center, zoom) {
      this.option.center = center;
      this.option.zoom = zoom;
    },
    centerOrZoomChanged: function (center, zoom) {
      var option = this.option;
      return !(v2Equal(center, option.center) && zoom === option.zoom);
    },
    defaultOption: {
      center: [104.114129, 37.550339],
      zoom: 5,
      mapStyle: {},
      mapStyleV2: {},
      correction: [0, 0], //数据矫正
      projection: 'EPSG:3857',
      roam: false
    }
  });

  hwchart.extension.openlayers.OpenLayersModel = _default;
});