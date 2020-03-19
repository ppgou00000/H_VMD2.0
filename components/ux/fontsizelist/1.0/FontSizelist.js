Ext.define('vmd.ux.fontSizelist.Controller', {
    xtype: 'vmd.ux.fontSizelist.Controller',
    constructor: function(options) {}
})
Ext.define("vmd.ux.FontSizelist", {
    extend: "Ext.Panel",
    requires: vmd.getCmpDeps([]),
    version: "1.0",
    xtype: "vmd.ux.FontSizelist",
    title: "Panel",
    header: false,
    border: false,
    width: 80,
    height: 28,
    layout: "fit",
    autoHeight: true,
    style: "z-index: 99;",
    afterrender: "FontSizelist_afterrender",
    listeners: {
        vmdafterrender: function() {
            this.FontSizelist_afterrender(this)
        }
    },
    uxCss: ".info{    height: 24px;    padding:2px 8px;    line-height: 24px;}li.info-hover {    cursor: pointer;    background-color: #e6e6e6;}",
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
        var isCp = false,
            value = '',
            selectValue = '';
        var page = this
        var fontData = [{
            EnName: '12',
        }, {
            EnName: '14',
        }, {
            EnName: '16',
        }, {
            EnName: '18',
        }, {
            EnName: '20',
        }, {
            EnName: '22',
        }, {
            EnName: '24',
        }, {
            EnName: '30',
        }, {
            EnName: '32',
        }, {
            EnName: '36',
        }];

        function sizeBox_click(sender, e) {
            if (mySize.hidden) {
                var x = sizeBox.el.getRegion().left,
                    y = sizeBox.el.getRegion().top + 30;
                mySize.setPosition(x, y)
                mySize.show();
            } else {
                mySize.hide();
            }
            if ($(e.target).hasClass("icon-caret-down")) {
                stopPP(e)
            }
        }

        function hwDataView_click(sender, index, node, e) {
            var id = node.getAttribute('data-id');
            selectValue = id + "px";
            setDivValue(id);
            mySize.hide();
            page.fireEvent("fontChagen", hwDataView, selectValue)
        }

        function setDivValue(font) {
            var el = vmd.getElement('sizeBox');
            if (font.indexOf("px") == -1) {
                selectValue = font + "px";
                el.dom.innerText = font;
            } else {
                selectValue = font;
                el.dom.innerText = font.slice(0, font.indexOf("px"));
            }
        }

        function FontSizelist_afterrender(sender) {
            Ext.getBody().appendChild(mySize.el);
            Ext.getBody().on('click', function(e) {
                if (!$(e.target).attr("id") || $(e.target).attr("id").indexOf("sizeDiv") == -1) {
                    if (!mySize.hidden) {
                        mySize.hide();
                    }
                }
            })
        }
        this.FontSizelist_afterrender = FontSizelist_afterrender;
        this.items = [{
            xtype: "panel",
            id: "panel",
            title: "Panel",
            header: false,
            border: false,
            height: 28,
            layout: "fit",
            width: 80,
            x: 1,
            y: 1,
            region: "center",
            items: [{
                    xtype: "vmd.div",
                    id: "sizeBox",
                    autoEl: "div",
                    border: false,
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "top left",
                    width: 80,
                    height: 24,
                    x: 0,
                    y: 0,
                    region: "center",
                    click: "sizeBox_click",
                    style: "padding-left: 8px;    /*border: 1px solid #ddd;*/    line-height: 24px;    font-size: 13px;    color: #646464;",
                    html: "<div id=\"sizeBox\" style=\"height:100%\">12</div>",
                    layout: "border",
                    listeners: {
                        click: sizeBox_click
                    },
                    items: [{
                            xtype: "vmd.div",
                            id: "sizeDiv",
                            autoEl: "div",
                            border: true,
                            backgroundRepeat: "no-repeat",
                            backgroundPosition: "top left",
                            width: 400,
                            height: 24,
                            region: "center",
                            style: "border: 0;"
                        },
                        {
                            xtype: "vmd.button",
                            id: "sizeButton",
                            type: "(none)",
                            size: "small",
                            x: 132,
                            y: -1,
                            width: 22,
                            style: "border-radius: 0;    background-size: 100%;    background-position: right;    border: 0;    float: right;    /*background: #fff url(\"/img/public/dhxcombo_arrow_down.gif\") 12px center;*/    /*background-repeat: no-repeat;*/    z-index: 99;    color: rgb(158,161,164);",
                            icon: "icon-caret-down",
                            height: 24,
                            region: "east",
                            click: "sizeButton_click"
                        }
                    ]
                },
                {
                    xtype: "vmd.div",
                    id: "mySize",
                    autoEl: "div",
                    border: false,
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "top left",
                    width: 80,
                    x: 0,
                    y: 0,
                    hidden: true,
                    layout: "absolute",
                    autoHeight: true,
                    autoWidth: false,
                    region: "west",
                    style: "width: 100%;    min-height: 300px;    background-color: #fff;    z-index: 9999;    position: absolute;",
                    items: [{
                        xtype: "vmd.dataview",
                        id: "hwDataView",
                        height: 80,
                        itemSelector: "li.info",
                        overClass: "info-hover",
                        selectedClass: "x-view-selected",
                        singleSelect: true,
                        multiSelect: true,
                        autoScroll: true,
                        tpl: "<ul class=\"d-info\" style=\"padding-top:8px;border:1px solid #ddd\">    <tpl for=\".\">        <li class=\"info\" data-id=\"{EnName}\" style=\"font-size:13px;color:#646464\">{EnName}</li>    </tpl></ul>",
                        data: "var data = [ {    EnName: '12',}, {    EnName: '14',}, {    EnName: '16',}, {    EnName: '18',}, {    EnName: '20',}, {    EnName: '24',}, {    EnName: '30',}, {    EnName: '32',}, {    EnName: '36',}];return data;",
                        click: "hwDataView_click",
                        style: "width: 100%;    background-color: #ffffff;    opacity: 1;",
                        autoHeight: true,
                        listeners: {
                            click: hwDataView_click
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
        this.setOriFont = function(font) {
            //直接填写方法内容
            setDivValue(font)
        }
        this.getFont = function() {
            //直接填写方法内容
            return selectValue
        }
        Ext.util.CSS.removeStyleSheet("vmd.ux.FontSizelist");
        this.uxCss && Ext.util.CSS.createStyleSheet(vmd.replaceResVars(this.uxCss), "vmd.ux.FontSizelist");
    }
})