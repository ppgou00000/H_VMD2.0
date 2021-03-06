Ext.define('vmd.ux.radioButtonProperty.Controller', {
    xtype: 'vmd.ux.radioButtonProperty.Controller',
    constructor: function(options) {}
})
Ext.define("vmd.ux.RadioButtonProperty", {
    extend: "Ext.Panel",
    requires: vmd.getCmpDeps(["vmd.ux.RadioButtonType$1.0$RadioButtonType", "vmd.ux.Data_xlk$1.0$Data_xlk", "vmd.ux.ValueChange_click_Event$1.0$ValueChange_click_Event"]),
    version: "1.0",
    xtype: "vmd.ux.RadioButtonProperty",
    title: "Panel",
    header: false,
    border: false,
    width: 290,
    height: 672,
    layout: "fit",
    afterrender: "RadioButtonProperty_afterrender",
    beforerender: "RadioButtonProperty_beforerender",
    listeners: {
        vmdafterrender: function() {
            try {
                this.RadioButtonProperty_afterrender(this)
            } catch (ex) {
                vmd.Error.log('003-2', {
                    p1: 'vmd.ux.RadioButtonProperty'
                }, ex, 50);
            }
        },
        beforerender: function() {
            try {
                this.RadioButtonProperty_beforerender(this)
            } catch (ex) {
                vmd.Error.log('003-1', {
                    p1: 'vmd.ux.RadioButtonProperty'
                }, ex, 50);
            }
        }
    },
    uxrequirejs: "[\"lib/ace/ace.js?ver=vmd2.0.5.191031\",\"lib/ace/mode-base.js?ver=vmd2.0.5.191031\",\"lib/ace/theme-xcode.js?ver=vmd2.0.5.191031\",\"lib/ace/ext-language_tools.js?ver=vmd2.0.5.191031\"]",
    initComponent: function() {
        function resetCmpScope() {
            var cmpList = me._reloadCmpList;
            Ext.each(cmpList, function(name) {
                var cmpObj = eval(name);
                cmpObj && (cmpObj._beforeRender = function(_cmp) {
                    var id = vmd.core.getCmpId(_cmp);
                    id && eval(id + "= _cmp")
                })
            })
        }
        try {
            var page = this;

            function setInfo(info, cell) {
                page.cell = cell;
                page.info = info;
                var curTab = MyTabs.activeTab;
                switch (curTab.title) {
                    case "属性":
                        RadioButtonType.setInfo(info.cell_RadioButtonInfo[0], cell)
                        break;
                    case "数据":
                        hwData_xlk.setInfo(page.info.cell_RadioButtonInfo[0], 'dxan')
                        break;
                    case "事件":
                        ValueChange_click_Event.setInfo(page.info.cell_RadioButtonInfo[0], 'dxan')
                        break;
                }
            }

            function MyTabs_tabchange(sender, tab) {
                var t = sheetHot.dealInvert()[0]
                var info = sheetHot.getCellMeta(t.sr, t.sc).cellAttributeInfo;
                var cell = page.cell;
                var curTab = tab;
                if (info) {
                    switch (curTab.title) {
                        case "属性":
                            RadioButtonType.setInfo(info.cell_RadioButtonInfo, cell)
                            break;
                        case "数据":
                            hwData_xlk.setInfo(info.cell_RadioButtonInfo, 'dxan')
                            break;
                        case "事件":
                            ValueChange_click_Event.setInfo(info.cell_RadioButtonInfo, 'dxan')
                            break;
                    }
                }
            }

            function RadioButtonType_rbDecimalChanged(sender, value, describe) {
                page.fireEvent("RBPchange", sender, value)
            }

            function RadioButtonProperty_afterrender(sender) {}

            function panel_afterrender(sender) {}

            function hwData_xlk_data_typeSetting_changed(value) {
                page.fireEvent('putData', 'dxan_typeSetting', value)
            }

            function hwData_xlk_data_dataSet_changed(value) {
                page.fireEvent('putData', 'dxan_dataSet', value)
            }

            function hwData_xlk_data_saveFiled_changed(value) {
                page.fireEvent('putData', 'dxan_saveFiled', value)
            }

            function hwData_xlk_data_myDisplayFiled_changed(value) {
                page.fireEvent('putData', 'dxan_myDisplayFiled', value)
            }

            function hwData_xlk_data_filterCondition_changed(value) {
                page.fireEvent('putData', 'dxan_filterCondition', value)
            }

            function RadioButtonProperty_beforerender(sender) {}
        } catch (ex) {
            vmd.Error.log('003-3', {
                p1: 'vmd.ux.RadioButtonProperty',
                p2: ex.message
            }, ex, 100);
        }
        this.RadioButtonProperty_afterrender = RadioButtonProperty_afterrender;
        this.RadioButtonProperty_beforerender = RadioButtonProperty_beforerender;
        this.items = [{
            xtype: "tabpanel",
            id: "MyTabs",
            activeTab: 0,
            height: 150,
            width: 500,
            tabchange: "MyTabs_tabchange",
            listeners: {
                tabchange: MyTabs_tabchange
            },
            items: [{
                    xtype: "panel",
                    id: "panel",
                    title: "属性",
                    header: true,
                    border: true,
                    height: 100,
                    layout: "fit",
                    afterrender: "panel_afterrender",
                    listeners: {
                        vmdafterrender: panel_afterrender
                    },
                    items: [{
                        xtype: "vmd.ux.RadioButtonType",
                        id: "RadioButtonType",
                        layout: "absolute",
                        rbDecimalChanged: "RadioButtonType_rbDecimalChanged",
                        listeners: {
                            rbDecimalChanged: RadioButtonType_rbDecimalChanged
                        }
                    }]
                },
                {
                    xtype: "panel",
                    id: "panel1",
                    title: "数据",
                    header: true,
                    border: true,
                    height: 100,
                    layout: "fit",
                    items: [{
                        xtype: "vmd.ux.Data_xlk",
                        id: "hwData_xlk",
                        layout: "absolute",
                        data_typeSetting_changed: "hwData_xlk_data_typeSetting_changed",
                        data_dataSet_changed: "hwData_xlk_data_dataSet_changed",
                        data_saveFiled_changed: "hwData_xlk_data_saveFiled_changed",
                        data_myDisplayFiled_changed: "hwData_xlk_data_myDisplayFiled_changed",
                        data_filterCondition_changed: "hwData_xlk_data_filterCondition_changed",
                        listeners: {
                            data_typeSetting_changed: hwData_xlk_data_typeSetting_changed,
                            data_dataSet_changed: hwData_xlk_data_dataSet_changed,
                            data_saveFiled_changed: hwData_xlk_data_saveFiled_changed,
                            data_myDisplayFiled_changed: hwData_xlk_data_myDisplayFiled_changed,
                            data_filterCondition_changed: hwData_xlk_data_filterCondition_changed
                        }
                    }]
                },
                {
                    xtype: "panel",
                    id: "panel2",
                    title: "事件",
                    header: true,
                    border: true,
                    height: 100,
                    layout: "fit",
                    items: [{
                        xtype: "vmd.ux.ValueChange_click_Event",
                        id: "ValueChange_click_Event",
                        layout: "absolute"
                    }]
                }
            ]
        }]
        this.callParent();
        vmd.core.compositeCmpInit(this.items, this);
        var me = this;
        eval(me.defineVars);
        resetCmpScope();
        this.setInfo = function(info, cell) {
            setInfo(info, cell);
        }
        Ext.util.CSS.removeStyleSheet("vmd.ux.RadioButtonProperty");
        this.uxCss && Ext.util.CSS.createStyleSheet(vmd.replaceResVars(this.uxCss), "vmd.ux.RadioButtonProperty");
    }
})