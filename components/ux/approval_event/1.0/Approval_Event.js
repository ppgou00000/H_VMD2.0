Ext.define('vmd.ux.approval_Event.Controller', {
    xtype: 'vmd.ux.approval_Event.Controller',
    constructor: function(options) {}
})
Ext.define("vmd.ux.Approval_Event", {
    extend: "Ext.Panel",
    requires: vmd.getCmpDeps([]),
    version: "1.0",
    xtype: "vmd.ux.Approval_Event",
    title: "Panel",
    header: false,
    border: false,
    width: 320,
    height: 621,
    layout: "absolute",
    afterrender: "Approval_Event_afterrender",
    listeners: {
        vmdafterrender: function() {
            try {
                this.Approval_Event_afterrender(this)
            } catch (ex) {
                vmd.Error.log('003-2', {
                    p1: 'vmd.ux.Approval_Event'
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
            function eve_click_afterrender(sender) {
                // var hot = parent.sheetHot;
                sender.el.on('dblclick', function() {
                    var canWrite = false;
                    var cell = sheetHot.dealInvert()[0];
                    var mArr = sheetHot.getPlugin('MergeCells').mergedCellsCollection.mergedCells;
                    var sel = sheetHot.dealInvert()[0];
                    var count = 0;
                    if (mArr.length > 0) {
                        for (var x = 0; x < mArr.length; x++) {
                            for (var i = sel.sr; i < sel.er + 1; i++) {
                                for (var n = sel.sc; n < sel.ec + 1; n++) {
                                    if (mArr[x].row == i && mArr[x].col == n) {
                                        count++;
                                        if (count == 1) no = x;
                                    }
                                }
                            }
                        }
                        if (count == 1) {
                            if (mArr[no].row + mArr[no].rowspan - 1 == sel.er && mArr[no].col + mArr[no].colspan - 1 == sel.ec) {
                                canWrite = true;
                            }
                        }
                    }
                    if (canWrite || (cell.sr == cell.er && cell.sc == cell.ec)) {
                        var editor = new vmd.comp.Ace({
                            id: "ace_code"
                        });
                        init_def_platformControlData();
                        var aceWin = new vmd.window({
                            title: "事件编辑",
                            id: "aceWin",
                            url: vmd.virtualPath + vmd.vmdCodePath + "?" + Date.parse(new Date()),
                            offset: [100, 100],
                            modal: true,
                            maximizable: true,
                            maskStyle: 'opacity:0.7',
                            layout: 'border',
                            draggable: false,
                            listeners: {
                                move: function(me, x, y) {
                                    this.moveZone(me, x, y);
                                }
                            }
                        });
                        aceWin.closeFn = function() {
                            //修复ace tooltip还存在的问题
                            Ext.select('.Ace-Tern-tooltip').remove();
                            var val = aceWin.val;
                            if (aceWin.script == val) {
                                return;
                            }
                            Ext.Msg.confirm("提示", "脚本已改变是否保存?", function(btn) {
                                if (btn == 'no') return;
                                var click_label = sender;
                                if (val.trim()) {
                                    // var ori = xds.vmd.events;
                                    xds.vmd.events = val;
                                    // var func = xds.vmd.events.replaceAll(ori, '');
                                    var name = ('' + sheetHot.rootScope.viewerNode.id + '_' + sheetHot.numToEng(cell.sc) + (cell.sr + 1) + '_approval').toLowerCase()
                                    sender.setValue(name)
                                    sheetHot.changeAttributeInfo(cell.sr, cell.sc, 'spzj_approval', name)
                                    // addEventForDesignerCmp(vmd.report, name, func)
                                } else {
                                    click_label = undefined;
                                    delete xds.vmd.events
                                }
                            })
                        }
                        //mafei 在ide-automachjs中
                        init_def_platformControlData();
                        aceWin.on('close', aceWin.closeFn, this)
                        //当前拖拽组件
                        window.setTimeout(function() {
                            window.setTimeout(function() {
                                //代码编辑器初始化
                                if (typeof rowIndex == "number") {
                                    aceWin.aceline = rowIndex;
                                }
                            }, 150)
                            var code = xds.vmd.events;
                            var eventName = ('' + sheetHot.rootScope.viewerNode.id + '_' + sheetHot.numToEng(cell.sc) + (cell.sr + 1) + '_approval').toLowerCase();
                            // var me = 
                            var getdefaulteventname = function() {
                                return "function(sender, rId, cInd, result, params" + "){\n" + "\n} \n";
                            }
                            var m = getdefaulteventname(),
                                code = code ? code : "",
                                replaceStr = "function {0}{1}",
                                regex = new RegExp("function\\s+" + eventName + "\\s*?\\(");
                            if (eventName && code.search(regex) == -1) {
                                var e = m.trim().replace("function", ""),
                                    i = String.format(replaceStr, eventName, e);
                                code += (code ? "\n\n" : "") + i
                            }
                            aceWin.script = code;
                            aceWin.val = code;
                            aceWin.show();
                            //进度提示
                            var myMask = new Ext.LoadMask(aceWin.el, {
                                msg: "数据加载中,请稍后...",
                                msgCls: 'z-index:10000;'
                            });
                            myMask.show();
                            aceWin.loading = myMask;
                            //  aceWin.update("<iframe  id='iframe_page' src='" + vmd.virtualPath + vmd.vmdCodePath + "?" + Date.parse(new Date()) + "' width=600 height=900 frameborder=0  ></iframe>")
                            var scriptArr = code.split("\n"),
                                rowIndex = null;
                            Ext.each(scriptArr,
                                function(o, p) {
                                    if (o.search(regex) != -1) {
                                        rowIndex = p + 2;
                                        return false
                                    }
                                });
                        }, 50)
                    } else {
                        alert('请选择单个单元格设置事件')
                    }
                })
            }

            function setInfo(info) {
                eve_click.setValue(info.spzj_approval.value)
            }

            function button_click(sender, e) {
                var hot = sheetHot;
                var cell = hot.dealInvert()[0];
                if (cell.sr == cell.er && cell.sc == cell.ec) {
                    eve_click.setValue('')
                    hot.changeAttributeInfo(cell.sr, cell.sc, 'spzj_approval', '')
                } else {
                    alert('请选择单个单元格以删除事件')
                }
            }

            function Approval_Event_afterrender(sender) {}
        } catch (ex) {
            vmd.Error.log('003-3', {
                p1: 'vmd.ux.Approval_Event',
                p2: ex.message
            }, ex, 100);
        }
        this.Approval_Event_afterrender = Approval_Event_afterrender;
        this.items = [{
                xtype: "label",
                id: "label",
                text: "approvl:",
                x: 10,
                y: 15
            },
            {
                xtype: "textfield",
                id: "eve_click",
                allowBlank: true,
                enableKeyEvents: true,
                x: 70,
                y: 10,
                width: 160,
                afterrender: "eve_click_afterrender",
                listeners: {
                    vmdafterrender: eve_click_afterrender
                }
            },
            {
                xtype: "vmd.ace",
                id: "hub",
                height: 300,
                width: 380,
                language: "javascript",
                x: 320,
                y: 0,
                hidden: true
            },
            {
                xtype: "vmd.button",
                id: "button",
                type: "(none)",
                size: "small",
                x: 250,
                y: 10,
                icon: "delete",
                width: 30,
                click: "button_click",
                listeners: {
                    click: button_click
                }
            }
        ]
        this.callParent();
        vmd.core.compositeCmpInit(this.items, this);
        var me = this;
        eval(me.defineVars);
        resetCmpScope();
        this.setInfo = function(info) {
            //直接填写方法内容
            setInfo(info)
        }
        Ext.util.CSS.removeStyleSheet("vmd.ux.Approval_Event");
        this.uxCss && Ext.util.CSS.createStyleSheet(vmd.replaceResVars(this.uxCss), "vmd.ux.Approval_Event");
    }
})