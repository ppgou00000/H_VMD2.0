xds["vmd.ux.EventEditer"] = Ext.extend(xds.Component, {
    cid: "vmd.ux.EventEditer",
    category: "vmd复合组件",
    text: "EventEditer",//中文
    naming: "hwEventEditer",
    //dtype 设计时组件
    dtype: "vmd.ux.EventEditer",
    //xtype 运行时组件
    xtype: "vmd.ux.EventEditer",
    xcls: "vmd.ux.EventEditer",
    //为了拖拽能自动生成递增id
    defaultName: "hwEventEditer",
    iconCls: "icon-cmp",
    isContainer: false,
   
    //默认属性设置
    defaultConfig: {"layout":"border"},
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
    xds.Registry.register(xds["vmd.ux.EventEditer"]);
    xds.Registry.addUserType(xds["vmd.ux.EventEditer"]);

    var Data_vmd_ux_EventEditer={"BaseType":"Control","Type":"vmd_ux_EventEditer","Property":{},"Method":{"getCode":{"Description":"getCode","Prototype":"getCode()","Args":{"_Return_":"void","Args":""},"Example":""},"setCode":{"Description":"setCode","Prototype":"setCode(code)","Args":{"_Return_":"void","Args":"code"},"Example":""}},"Event":{}}
	ControlsDataManage._add(Data_vmd_ux_EventEditer)