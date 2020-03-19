xds["vmd.ux.InputComboTreeProperty"] = Ext.extend(xds.Component, {
    cid: "vmd.ux.InputComboTreeProperty",
    category: "vmd复合组件",
    text: "InputComboTreeProperty",//中文
    naming: "hwInputComboTreeProperty",
    //dtype 设计时组件
    dtype: "vmd.ux.InputComboTreeProperty",
    //xtype 运行时组件
    xtype: "vmd.ux.InputComboTreeProperty",
    xcls: "vmd.ux.InputComboTreeProperty",
    //为了拖拽能自动生成递增id
    defaultName: "hwInputComboTreeProperty",
    iconCls: "icon-cmp",
    isContainer: false,
     //扩展组件依赖资源加载
    requireCss: [],
    requireJs: [],
	requireCmpType:'',
    //默认属性设置
    defaultConfig: {"layout":"fit"},
    isResizable: function (a, b) {

        return true;
    },
	//属性面板
    
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
    xds.Registry.register(xds["vmd.ux.InputComboTreeProperty"]);
    xds.Registry.addUserType(xds["vmd.ux.InputComboTreeProperty"]);

    var Data_vmd_ux_InputComboTreeProperty={"BaseType":"Control","Type":"vmd_ux_InputComboTreeProperty","Property":{},"Method":{"setInfo":{"Description":"setInfo","Prototype":"setInfo(info)","Args":{"_Return_":"void","Args":"info"},"Example":""},"getInfo":{"Description":"getInfo","Prototype":"getInfo()","Args":{"_Return_":"void","Args":""},"Example":""}},"Event":{}}
	ControlsDataManage._add(Data_vmd_ux_InputComboTreeProperty)