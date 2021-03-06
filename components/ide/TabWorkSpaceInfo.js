xds["vmd.ux.TabWorkSpaceInfo"] = Ext.extend(xds.Component, {
    cid: "vmd.ux.TabWorkSpaceInfo",
    category: "vmd复合组件",
    text: "TabWorkSpaceInfo",//中文
    naming: "hwTabWorkSpaceInfo",
    //dtype 设计时组件
    dtype: "vmd.ux.TabWorkSpaceInfo",
    //xtype 运行时组件
    xtype: "vmd.ux.TabWorkSpaceInfo",
    xcls: "vmd.ux.TabWorkSpaceInfo",
    //为了拖拽能自动生成递增id
    defaultName: "hwTabWorkSpaceInfo",
    iconCls: "icon-cmp",
    isContainer: false,
     //扩展组件依赖资源加载
    requireCss: [],
    requireJs: [],
	requireCmpType:'',
    //默认属性设置
    defaultConfig: {"layout":"absolute"},
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
     ,{"name":"storeWorkflow","group":"设计","ctype":"string","editor":"options","edConfig":{"type":"store"}},{"name":"storeDataService","group":"设计","ctype":"string","editor":"options","edConfig":{"type":"store"}},{"name":"storeMsg","group":"设计","ctype":"string","editor":"options","edConfig":{"type":"store"}}
      
    ],
    initConfig: function (b, a) {
        //初始化默认属性设置
        
    }
    
});
    xds.Registry.register(xds["vmd.ux.TabWorkSpaceInfo"]);
    xds.Registry.addUserType(xds["vmd.ux.TabWorkSpaceInfo"]);

    var Data_vmd_ux_TabWorkSpaceInfo={"BaseType":"Control","Type":"vmd_ux_TabWorkSpaceInfo","Property":{"storeWorkflow":{"Description":"工作流下拉列表绑定的数据集","Prototype":"","Args":{"_Return_":""},"Example":"工作流下拉列表绑定的数据集","Name":""},"storeDataService":{"Description":"数据服务下拉列表绑定的数据集","Prototype":"","Args":{"_Return_":""},"Example":"数据服务下拉列表绑定的数据集","Name":""},"storeMsg":{"Description":"消息中心地址","Prototype":"","Args":{"_Return_":""},"Example":"消息中心地址","Name":""}},"Method":{"iSaveData":{"Description":"保存数据的接口","Prototype":"iSaveData(lastId, refreshStore)","Args":{"_Return_":"数字","Args":"lastId, refreshStore"},"Example":"保存数据的接口"},"iSetWorkSpaceId":{"Description":"设置工区的ID","Prototype":"iSetWorkSpaceId(id)","Args":{"_Return_":"无","Args":"id"},"Example":"设置工区的ID"},"iSetDataStore":{"Description":"iSetDataStore","Prototype":"iSetDataStore(store)","Args":{"_Return_":"无","Args":"store"},"Example":""},"iGetWorkSpaceName":{"Description":"获取工区名称","Prototype":"iGetWorkSpaceName()","Args":{"_Return_":"字符串","Args":""},"Example":"获取工区名称"},"iClearAll":{"Description":"清空组件中所有数据","Prototype":"iClearAll()","Args":{"_Return_":"无","Args":""},"Example":"清空组件中所有数据"},"iNewWorkSpace":{"Description":"新建工区","Prototype":"iNewWorkSpace(id)","Args":{"_Return_":"无","Args":"id"},"Example":"新建工区"},"iQueryWorkSpaceInfo":{"Description":"传入工区ID,查询工区信息，显示到Tab页上","Prototype":"iQueryWorkSpaceInfo(id)","Args":{"_Return_":"无","Args":"id"},"Example":"传入工区ID,查询工区信息，显示到Tab页上"},"iSetIfDataLoaded":{"Description":"设置数据是否已加载","Prototype":"iSetIfDataLoaded(bVar)","Args":{"_Return_":"无","Args":"bVar"},"Example":"设置数据是否已加载"},"iChangeWorkSpace":{"Description":"改变了选择工区","Prototype":"iChangeWorkSpace(id)","Args":{"_Return_":"无","Args":"id"},"Example":"改变了选择工区"},"isSaveFlow":{"Description":"isSaveFlow","Prototype":"isSaveFlow(callback)","Args":{"_Return_":"void","Args":"callback"},"Example":""},"isSaveService":{"Description":"isSaveService","Prototype":"isSaveService(callback)","Args":{"_Return_":"void","Args":"callback"},"Example":""},"iSetWorkflowStoreRecords":{"Description":"设置工作流下拉列表的数据（非重复）","Prototype":"iSetWorkflowStoreRecords(records)","Args":{"_Return_":"无","Args":"records"},"Example":"设置工作流下拉列表的数据（非重复）"},"iSetDataServiceStoreRecords":{"Description":"设置数据服务下拉列表的数据（非重复）","Prototype":"iSetDataServiceStoreRecords(records)","Args":{"_Return_":"无","Args":"records"},"Example":"设置数据服务下拉列表的数据（非重复）"},"isSaveMSG":{"Description":"isSaveMSG","Prototype":"isSaveMSG(callback)","Args":{"_Return_":"void","Args":"callback"},"Example":""}},"Event":{}}
	ControlsDataManage._add(Data_vmd_ux_TabWorkSpaceInfo)