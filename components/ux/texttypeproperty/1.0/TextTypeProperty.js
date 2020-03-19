Ext.define('vmd.ux.textTypeProperty.Controller', {
    xtype: 'vmd.ux.textTypeProperty.Controller',
    constructor: function(options) {}
})
Ext.define("vmd.ux.TextTypeProperty", {
    extend: "Ext.Panel",
    requires: vmd.getCmpDeps(["vmd.ux.TextType$1.0$TextType", "vmd.ux.ValueChange_click_Event$1.0$ValueChange_click_Event"]),
    version: "1.0",
    xtype: "vmd.ux.TextTypeProperty",
    title: "Panel",
    header: false,
    border: false,
    width: 290,
    height: 672,
    layout: "fit",
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
                page.info = info;
                page.cell = cell;
                d = info;
                switch (MyTabs.activeTab.title) {
                    case "属性":
                        TextType.setInfo(page.info.cell_TextInfo[0], page.cell)
                        break;
                    case "事件":
                        ValueChange_click_Event.setInfo(info.cell_TextInfo[0], 'wb')
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
                            TextType.setInfo(info.cell_TextInfo, cell)
                            break;
                        case "事件":
                            ValueChange_click_Event.setInfo(info.cell_TextInfo, 'wb')
                            break;
                    }
                }
            }

            function TextType_textDecimalChanged(sender, value, describe) {
                page.fireEvent("lengthChange", sender, value)
            }

            function ValueChange_click_Event_beforerender(sender) {}
        } catch (ex) {
            vmd.Error.log('003-3', {
                p1: 'vmd.ux.TextTypeProperty',
                p2: ex.message
            }, ex, 100);
        }
        this.items = [{
            xtype: "tabpanel",
            id: "MyTabs",
            activeTab: 0,
            height: 150,
            width: 500,
            x: 20,
            y: 20,
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
                    items: [{
                        xtype: "vmd.ux.TextType",
                        id: "TextType",
                        layout: "absolute",
                        lengthChange: "TextType_lengthChange",
                        textDecimalChanged: "TextType_textDecimalChanged",
                        listeners: {
                            textDecimalChanged: TextType_textDecimalChanged
                        }
                    }]
                },
                {
                    xtype: "panel",
                    id: "panel1",
                    title: "事件",
                    header: true,
                    border: true,
                    height: 100,
                    layout: "fit",
                    items: [{
                        xtype: "vmd.ux.ValueChange_click_Event",
                        id: "ValueChange_click_Event",
                        layout: "absolute",
                        beforerender: "ValueChange_click_Event_beforerender",
                        listeners: {
                            beforerender: ValueChange_click_Event_beforerender
                        }
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
            //直接填写方法内容
            setInfo(info, cell);
        }
        Ext.util.CSS.removeStyleSheet("vmd.ux.TextTypeProperty");
        this.uxCss && Ext.util.CSS.createStyleSheet(vmd.replaceResVars(this.uxCss), "vmd.ux.TextTypeProperty");
    }
})