xds["vmd.ux.WorkflowModuleInfo"] = Ext.extend(xds.Component, {
    cid: "vmd.ux.WorkflowModuleInfo",
    category: "vmd复合组件",
    text: "WorkflowModuleInfo",//中文
    naming: "hwWorkflowModuleInfo",
    //dtype 设计时组件
    dtype: "vmd.ux.WorkflowModuleInfo",
    //xtype 运行时组件
    xtype: "vmd.ux.WorkflowModuleInfo",
    xcls: "vmd.ux.WorkflowModuleInfo",
    //为了拖拽能自动生成递增id
    defaultName: "hwWorkflowModuleInfo",
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
    xds.Registry.register(xds["vmd.ux.WorkflowModuleInfo"]);
    xds.Registry.addUserType(xds["vmd.ux.WorkflowModuleInfo"]);

    var Data_vmd_ux_WorkflowModuleInfo={"BaseType":"Control","Type":"vmd_ux_WorkflowModuleInfo","Property":{},"Method":{"refresh":{"Description":"refresh","Prototype":"refresh(tree,projectid,workspaceid)","Args":{"_Return_":"void","Args":"tree,projectid,workspaceid"},"Example":""}},"Event":{}}
	ControlsDataManage._add(Data_vmd_ux_WorkflowModuleInfo)