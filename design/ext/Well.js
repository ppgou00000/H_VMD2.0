﻿/******************************************************************
 ** 文件名:Well.js 专业图形组件--井位图设计时配置
 ** Copyright (c) 2020 汉威公司技术研究院
 ** 创建人:马飞
 ** 日 期:2020/02/27
 ** 版 本:1.0
 *
 *
 ** 修改人:
 ** 修改日 期:2020/02/27
 ** 描 述:
 ** 版 本:1.1
 ******************************************************************/
 
 Ext.define('ide.ext.Well',{
	// requires:['vmd.d.webchart.Well']
 },function(){
 xds.vmdWebChart.Well = Ext.extend(xds.Component, {
	cid: "vmdWebChartWell",
	category: "专业图形组件",
	defaultName: "&lt;hwWellChart&gt;",
	text: "well(井位图)",
	dtype: "vmd.d.webchart.Well",
	//这里的xtype主要是为了代码显示的类型，本身无任何作用
	xtype: "vmd.webchart.well",
	xcls: "vmd.webchart.Well",
	iconCls: "icon-datainput",
	//控制是否可以拖拽
	isResizable: function(a, b) {
		//a为上下左右的位置方向
		return true;
	},
	naming: "hwWellChart",
	isContainer: false,
	isPropPanel: true, //是否是属性面板
	requireJs: ['lib/zrender/zrender.min.js','hwcharts/js/core/base-ext.js','hwcharts/js/hwcharts.js'],
	requireCss: ['hwcharts/css/hwcharts.css'],
	// isValidParent: function(a) {
	// 	return !a || a.cid == "panel" || a.cid=="container";
	//   },
	//是否显示右下角的组件说明
	//filmCls: "el-film-nolabel",
	//默认属性设置
	defaultConfig: {
		// width:800,
		// height:600
	},
	configs: [ {
		name: "path",
		group: "外观",
		ctype: "string"
	}, {
		name: "propPanelId",
		group: "外观",
		ctype: "string"
	}, {
		name: "disabled",
		group: "外观",
		ctype: "boolean"
	}, {
		name: "hidden",
		group: "外观",
		ctype: "boolean"
	}, {
		name: "id",
		group: "设计",
		ctype: "string"
	}, {
		name: "style",
		group: "外观",
		ctype: "string"
	}, {
		name: "width",
		group: "外观",
		ctype: "number"
	}, {
		name: "height",
		group: "外观",
		ctype: "number"
	}, {
		name: "inputConfig",
		group: "外观",
		ctype: "string",
		hide: true
	}],
	initConfig: function(b, a) {
		//初始化默认属性设置
	},
	onFilmDblClick: function(b) {
		//双击值编辑功能  
		
	},
	onFilmClick: function(b) {
		var me=this;
		if (xds.eastlayout && xds.eastlayout.activeSettings) {
			// propPanel属性面板对象
			xds.eastlayout.activeSettings('GraphProperty', '320', '井位图', function(propPanel) {
				// 井位图组件(获取运行时组件)
				me.wellComponent = me.getExtComponent();
				//调用属性面板的方法进行初始化
				propPanel.init(me.wellComponent.chart);
				me.isActiveSet = true;
				me.config.propPanelId = propPanel.id;
			});
		}
	},
	//实现删除接口
	onRemove:function(){
		debugger
		vmd.d.webchart.Well.Mgr.removeKey(this.id)
	},
	//实现更新接口
	onUpdate:function(options){
		
		if(options.attr=='id'){
			
			vmd.d.webchart.Well.Mgr.removeKey(options.oldValue);
		}
		
	}
});
xds.Registry.register(xds.vmdWebChart.Well)
	
 })

