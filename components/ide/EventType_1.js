xds["vmd.ux.EventType_1"] = Ext.extend(xds.Component, {
    cid: "vmd.ux.EventType_1",
    category: "vmd复合组件",
    text: "EventType_1",//中文
    naming: "EventType_1",
    //dtype 设计时组件
    dtype: "vmd.ux.EventType_1",
    //xtype 运行时组件
    xtype: "vmd.ux.EventType_1",
    xcls: "vmd.ux.EventType_1",
    //为了拖拽能自动生成递增id
    defaultName: "EventType_1",
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
     
      
    ],
    initConfig: function (b, a) {
        //初始化默认属性设置
        
    }
    
});
    xds.Registry.register(xds["vmd.ux.EventType_1"]);
    xds.Registry.addUserType(xds["vmd.ux.EventType_1"]);

    var Data_vmd_ux_EventType_1={"BaseType":"Control","Type":"vmd_ux_EventType_1","Property":{},"Method":{},"Event":{}}
	ControlsDataManage._add(Data_vmd_ux_EventType_1)