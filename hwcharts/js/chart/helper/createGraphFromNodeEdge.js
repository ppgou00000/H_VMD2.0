﻿Vmd.define('hwchart.chart.helper.createGraphFromNodeEdge', {
    requires: [
        'hwchart.data.List',
        'hwchart.data.Graph',
        'hwchart.data.helper.linkList',
        'hwchart.data.helper.createDimensions',
        'hwchart.CoordinateSystem',
        'hwchart.chart.helper.createListFromArray'
    ]

}, function () {

    var zrUtil = zrender.util;

    var List = hwchart.data.List;

    var Graph = hwchart.data.Graph;

    var linkList = hwchart.data.helper.linkList;

    var createDimensions = hwchart.data.helper.createDimensions;

    var CoordinateSystem = hwchart.CoordinateSystem;

    var createListFromArray = hwchart.chart.helper.createListFromArray;

   
    function _default(nodes, edges, seriesModel, directed, beforeLink) {
        // ??? TODO
        // support dataset?
        var graph = new Graph(directed);

        for (var i = 0; i < nodes.length; i++) {
            graph.addNode(zrUtil.retrieve( // Id, name, dataIndex
            nodes[i].id, nodes[i].name, i), i);
        }

        var linkNameList = [];
        var validEdges = [];
        var linkCount = 0;

        for (var i = 0; i < edges.length; i++) {
            var link = edges[i];
            var source = link.source;
            var target = link.target; // addEdge may fail when source or target not exists

            if (graph.addEdge(source, target, linkCount)) {
                validEdges.push(link);
                linkNameList.push(zrUtil.retrieve(link.id, source + ' > ' + target));
                linkCount++;
            }
        }

        var coordSys = seriesModel.get('coordinateSystem');
        var nodeData;

        if (coordSys === 'cartesian2d' || coordSys === 'polar') {
            nodeData = createListFromArray(nodes, seriesModel);
        } else {
            var coordSysCtor = CoordinateSystem.get(coordSys);
            var coordDimensions = coordSysCtor && coordSysCtor.type !== 'view' ? coordSysCtor.dimensions || [] : []; // FIXME: Some geo do not need `value` dimenson, whereas `calendar` needs
            // `value` dimension, but graph need `value` dimension. It's better to
            // uniform this behavior.

            if (zrUtil.indexOf(coordDimensions, 'value') < 0) {
                coordDimensions.concat(['value']);
            }

            var dimensionNames = createDimensions(nodes, {
                coordDimensions: coordDimensions
            });
            nodeData = new List(dimensionNames, seriesModel);
            nodeData.initData(nodes);
        }

        var edgeData = new List(['value'], seriesModel);
        edgeData.initData(validEdges, linkNameList);
        beforeLink && beforeLink(nodeData, edgeData);
        linkList({
            mainData: nodeData,
            struct: graph,
            structAttr: 'graph',
            datas: {
                node: nodeData,
                edge: edgeData
            },
            datasAttr: {
                node: 'data',
                edge: 'edgeData'
            }
        }); // Update dataIndex of nodes and edges because invalid edge may be removed

        graph.update();
        return graph;
    }

    
    hwchart.chart.helper.createGraphFromNodeEdge = _default;
})