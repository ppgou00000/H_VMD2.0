xds["vmd.ux.UploadComponentData"] = Ext.extend(xds.Component, {
    cid: "vmd.ux.UploadComponentData",
    category: "vmd复合组件",
    text: "UploadComponentData",//中文
    naming: "UploadComponentData",
    //dtype 设计时组件
    dtype: "vmd.ux.UploadComponentData",
    //xtype 运行时组件
    xtype: "vmd.ux.UploadComponentData",
    xcls: "vmd.ux.UploadComponentData",
    //为了拖拽能自动生成递增id
    defaultName: "UploadComponentData",
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
    xds.Registry.register(xds["vmd.ux.UploadComponentData"]);
    xds.Registry.addUserType(xds["vmd.ux.UploadComponentData"]);

    var Data_vmd_ux_UploadComponentData={"BaseType":"Control","Type":"vmd_ux_UploadComponentData","Property":{},"Method":{"getInfo":{"Description":"getInfo","Prototype":"getInfo(att)","Args":{"_Return_":"void","Args":"att"},"Example":""},"setInfo":{"Description":"setInfo","Prototype":"setInfo(info,cell)","Args":{"_Return_":"void","Args":"info,cell"},"Example":""}},"Event":{}}
	ControlsDataManage._add(Data_vmd_ux_UploadComponentData)