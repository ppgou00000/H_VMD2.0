xds["vmd.ux.YearSelect1"] = Ext.extend(xds.Component, {
    cid: "vmd.ux.YearSelect1",
    category: "vmd复合组件",
    text: "YearSelect1",//中文
    naming:"yearselect1",
    //dtype 设计时组件
    dtype: "vmd.ux.YearSelect1",
    //xtype 运行时组件
    xtype: "vmd.ux.YearSelect1",
    xcls: "vmd.ux.YearSelect1",
    //为了拖拽能自动生成递增id
    defaultName:"yearselect1",
    iconCls: "icon-cmp",
    isContainer: false,
   
    //默认属性设置
    defaultConfig: {"layout":"absolute"},
    isResizable: function (a, b) {

        return true;
    },
    //标准属性设置
    configs: [
         {
             name: "hidden",
             group: "外观",
             ctype: "boolean"
         },

      {
          name: "cls",
          group: "外观",
          ctype: "string"
      }, {
          name: "disabled",
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
      }
     , {
         name: "height",
         group: "外观",
         ctype: "number"
     }
     ,{"name":"colorchange","group":"事件","ctype":"string","editor":"ace","params":"selColor"},{"name":"YearChanged","group":"事件","ctype":"string","editor":"ace","params":"sender,yearval"}
      
    ],
    initConfig: function (b, a) {
        //初始化默认属性设置
        
    }
    
});
    xds.Registry.register(xds["vmd.ux.YearSelect1"]);
    xds.Registry.addUserType(xds["vmd.ux.YearSelect1"]);

    var Data_vmd_ux_YearSelect1={"BaseType":"Control","Type":"vmd_ux_YearSelect1","Property":{},"Method":{"setYearValue":{"Description":"setYearValue","Prototype":"setYearValue(value)","Args":{"_Return_":"void","Args":"value"},"Example":""},"getYearValue":{"Description":"getYearValue","Prototype":"getYearValue()","Args":{"_Return_":"void","Args":""},"Example":""}},"Event":{"colorchange":{"Description":"","Prototype":"","Args":{"_Return_":""},"Example":""},"YearChanged":{"Prototype":"","Args":{"_Return_":""},"Example":""}}}
	ControlsDataManage._add(Data_vmd_ux_YearSelect1)