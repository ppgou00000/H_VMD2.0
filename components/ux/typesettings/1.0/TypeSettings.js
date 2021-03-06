Ext.define('vmd.ux.typeSettings.Controller', {
    xtype: 'vmd.ux.typeSettings.Controller',
    constructor: function(options) {}
})
Ext.define("vmd.ux.TypeSettings", {
    extend: "vmd.base.Ux",
    requires: vmd.getCmpDeps(["vmd.ux.InputTextProperty$1.0$InputTextProperty", "vmd.ux.InputComboProperty$1.0$InputComboProperty", "vmd.ux.InputNumberProperty$1.0$InputNumberProperty", "vmd.ux.InputComboTreeProperty$1.0$InputComboTreeProperty", "vmd.ux.InputRadioButtonProperty$1.0$InputRadioButtonProperty", "vmd.ux.InputDateProperty$1.0$InputDateProperty", "vmd.ux.InputCheckBoxProperty$1.0$InputCheckBoxProperty", "vmd.ux.InputRichTextProperty$1.0$InputRichTextProperty", "vmd.ux.InputComboGridProperty$1.0$InputComboGridProperty"]),
    version: "1.0",
    xtype: "vmd.ux.TypeSettings",
    title: "Panel",
    header: false,
    border: false,
    panelWidth: 240,
    width: 450,
    height: 640,
    layout: "fit",
    beforerender: "TypeSettings_beforerender",
    afterrender: "TypeSettings_afterrender",
    listeners: {
        beforerender: function() {
            try {
                this.TypeSettings_beforerender(this)
            } catch (ex) {
                vmd.Error.log('003-1', {
                    p1: 'vmd.ux.TypeSettings'
                }, ex, 50);
            }
        },
        vmdafterrender: function() {
            try {
                this.TypeSettings_afterrender(this)
            } catch (ex) {
                vmd.Error.log('003-2', {
                    p1: 'vmd.ux.TypeSettings'
                }, ex, 50);
            }
        }
    },
    uxCss: ".bindtype .x-tab-panel .x-tab-panel-header,.bindtype .x-tab-panel .x-tab-panel-bwrap,.bindtype .x-tab-panel .x-tab-panel-bwrap .x-tab-panel-body {    border-left-width: 0;}",
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
            page.noone = true;
            this.on('afterrender', function() {
                this.cascade(function(item) {
                    item.on('change', function(a, b, c) {
                        changeAttribute(a, b)
                    })
                    item.on("check", function(a, b, c) {
                        changeAttribute(a, b)
                    })
                    item.on("select", function(a, b, c) {
                        changeAttribute(a, b)
                    })
                })
            })
            var info = parent.settingWin && parent.settingWin.params;
            var inst = info && info.inst;
            var type = info && info.type;
            var selNum = 0;
            page.controller = inst;
            var store = new Ext.data.JsonStore({
                proxy: new Ext.data.MemoryProxy(),
                fields: ['cellType', 'describe']
            });
            var data = [{
                cellType: 'text',
                describe: '文本'
            }, {
                cellType: 'number',
                describe: '数字'
            }, {
                cellType: 'combo',
                describe: '下拉框'
            }, {
                cellType: 'comboTree',
                describe: '下拉树'
            }, {
                cellType: 'comboGrid',
                describe: '下拉网格'
            }, {
                cellType: 'radioButton',
                describe: '单选按钮'
            }, {
                cellType: 'checkbox',
                describe: '复选框'
            }, {
                cellType: 'richText',
                describe: '富文本'
            }, {
                cellType: 'date',
                describe: '日期'
            }];
            store.loadData(data);
            var store1 = new Ext.data.JsonStore({
                proxy: new Ext.data.MemoryProxy(),
                fields: ['mixName']
            });

            function changeAttribute(a, b) {
                if (a.initialConfig.xtype == 'radiostoregroup') {
                    inst.activeComp[a.initialConfig.id] = b.inputValue;
                } else if (a.initialConfig.id == 'valueDisplay') {
                    inst.activeComp[a.rootScope.initialConfig.id] = b
                } else {
                    inst.activeComp[a.initialConfig.id] = b
                }
            }

            function editType_afterrender(sender) {
                sender.store = store;
                sender.displayField = 'describe';
                sender.valueField = 'cellType'
            }

            function closeAllComp() {
                textPanel.hide()
                numberPanel.hide()
                comboPanel.hide()
                comboTreePanel.hide()
                comboGridPanel.hide()
                radioButtonPanel.hide()
                checkBoxPanel.hide()
                richTextPanel.hide()
                datePanel.hide()
            }

            function editType_selectChanged(sender, combo, record, index) {
                var property = inst.settings.fields;
                if (inst.activeComp.type != record.data.cellType) {
                    closeAllComp();
                    txtAlign.setValue("1")
                    switch (record.json.cellType) {
                        case 'text':
                            textPanel.show()
                            property[inst.activeNo].fieldsConfig = new vmd.ux.inputTextProperty.Controller(hwInputTextProperty)
                            break;
                        case 'number':
                            numberPanel.show()
                            txtAlign.setValue("2")
                            property[inst.activeNo].fieldsConfig = new vmd.ux.inputNumberProperty.Controller(hwInputNumberProperty)
                            break;
                        case 'combo':
                            comboPanel.show()
                            property[inst.activeNo].fieldsConfig = new vmd.ux.inputComboProperty.Controller(hwInputComboProperty)
                            break;
                        case 'comboTree':
                            comboTreePanel.show()
                            property[inst.activeNo].fieldsConfig = new vmd.ux.inputComboTreeProperty.Controller(hwInputComboTreeProperty)
                            break;
                        case 'comboGrid':
                            comboGridPanel.show()
                            property[inst.activeNo].fieldsConfig = new vmd.ux.inputComboGridProperty.Controller(hwInputComboGridProperty)
                            break;
                        case 'radioButton':
                            radioButtonPanel.show()
                            property[inst.activeNo].fieldsConfig = new vmd.ux.inputRadioButtonProperty.Controller(hwInputRadioButtonProperty)
                            break;
                        case 'checkbox':
                            checkBoxPanel.show()
                            property[inst.activeNo].fieldsConfig = new vmd.ux.inputCheckBoxProperty.Controller(hwInputCheckBoxProperty)
                            break;
                        case 'richText':
                            richTextPanel.show()
                            property[inst.activeNo].fieldsConfig = new vmd.ux.inputRichTextProperty.Controller(hwInputRichTextProperty)
                            break;
                        case 'date':
                            datePanel.show()
                            txtAlign.setValue("3")
                            property[inst.activeNo].fieldsConfig = new vmd.ux.inputDateProperty.Controller(hwInputDateProperty)
                            break;
                    }
                    inst.activeComp = property[inst.activeNo].fieldsConfig;
                    //设置如果本字段是主键字段，隐藏控制空值的设置
                    if (property[inst.activeNo].dictionary.primary) {
                        primaryHide(record.json.cellType, true)
                    } else {
                        primaryHide(record.json.cellType, false)
                    }
                    comps.doLayout();
                    inst.activeComp.setValue(inst.activeComp.serialize())
                }
            }
            page.moved = false

            function MyGrid_cellclick(sender, rowIndex, columnIndex, e) {
                closeAllComp()
                var group = MyGrid.getSelectionModel().selections.items;
                var property = inst.settings.fields;
                for (var i = 0; i < property.length; i++) {
                    if (property[i].dictionary.name == (group && group[0] && group[0].json && group[0].json.name) ||
                        ((property[i].dictionary.name == MyGrid.getView().getRow(selNum).innerText.split('(')[1].split(')')[0]) && page.noone)
                    ) {
                        page.noone = false
                        //显示对应属性设置面板
                        switch (property[i].fieldsConfig.type) {
                            case 'text':
                                textPanel.show();
                                break;
                            case 'number':
                                numberPanel.show()
                                break;
                            case 'checkbox':
                                checkBoxPanel.show()
                                break;
                            case 'combo':
                                comboPanel.show()
                                break;
                            case 'comboTree':
                                comboTreePanel.show()
                                break;
                            case 'radioButton':
                                radioButtonPanel.show()
                                break;
                            case 'richText':
                                richTextPanel.show()
                                break;
                            case 'comboGrid':
                                comboGridPanel.show()
                                break;
                            case 'date':
                                datePanel.show()
                                break;
                        }
                        //设置本页面当前激活对象
                        inst.activeComp = property[i].fieldsConfig;
                        //设置如果本字段是主键字段，隐藏控制空值的设置
                        if (property[i].dictionary.primary) {
                            primaryHide(property[i].fieldsConfig.type, true)
                        } else {
                            primaryHide(property[i].fieldsConfig.type, false)
                        }
                        inst.activeNo = i;
                        //本页面编辑类型设置上,不能赋值，直接修改dom元素
                        page.editType.setValue(property[i].fieldsConfig.type);
                        //数据字典中取得字段宽度设置上
                        page.dicLength.setValue(property[i].dictionary.length);
                        page.colHide.setValue(property[i].fieldsConfig.colHide)
                        page.colWidth.setValue(property[i].fieldsConfig.colWidth)
                        if (property[i].fieldsConfig.txtAlign)
                            page.txtAlign.setValue(property[i].fieldsConfig.txtAlign)
                        else {
                            if (property[i].fieldsConfig.type == "number")
                                page.txtAlign.setValue("2")
                            else if (property[i].fieldsConfig.type == "date")
                                page.txtAlign.setValue("3")
                            else
                                page.txtAlign.setValue("1")
                        }
                        if (property[i].fieldsConfig.dicFirst === false)
                            page.dicFirst.setValue(false)
                        else
                            page.dicFirst.setValue(true)
                        //设置激活对象值
                        inst.activeComp.setValue(inst.activeComp.serialize());
                    }
                }
                comps.doLayout()
            }

            function TypeSettings_beforerender(sender) {
                if (!inst) return
                var selected = [];
                for (var i = 0; i < inst.settings.fields.length; i++) {
                    selected.push(inst.settings.fields[i].dictionary)
                }
                store1.loadData(selected);
                for (var i = 0; i < selected.length; i++) {
                    if (selected[i].name == info.selNum) {
                        selNum = i;
                    }
                }
                for (var i = 0; i < inst.settings.fields.length; i++) {
                    //空的设置文本，保存的生成对象，对象的更换scope
                    var cmp = inst.settings.fields[i].fieldsConfig;
                    if (typeof cmp == 'undefined') {
                        //空值
                        var componet
                        if (selected[i].type == 'DATE') {
                            componet = new vmd.ux.inputDateProperty.Controller(hwInputDateProperty);
                        } else if (selected[i].type == 'CHAR' || selected[i].type == 'VARCHAR2') {
                            componet = new vmd.ux.inputTextProperty.Controller(hwInputTextProperty);
                        } else if (selected[i].type == 'NUMBER') {
                            componet = new vmd.ux.inputNumberProperty.Controller(hwInputNumberProperty);
                        }
                        inst.settings.fields[i].fieldsConfig = componet;
                    } else {
                        if (cmp.hasOwnProperty('scope')) {
                            //更换scope
                            switch (cmp.type) {
                                case 'text':
                                    cmp.scope = hwInputTextProperty;
                                    break;
                                case 'combo':
                                    cmp.scope = hwInputComboProperty;
                                    break;
                                case 'number':
                                    cmp.scope = hwInputNumberProperty;
                                    break;
                                case 'checkbox':
                                    cmp.scope = hwInputCheckBoxProperty;
                                    break;
                                case 'comboTree':
                                    cmp.scope = hwInputComboTreeProperty;
                                    break;
                                case 'radioButton':
                                    cmp.scope = hwInputRadioButtonProperty;
                                    break;
                                case 'date':
                                    cmp.scope = hwInputDateProperty;
                                    break;
                                case 'richText':
                                    cmp.scope = hwInputRichTextProperty;
                                    break;
                                case 'comboGrid':
                                    cmp.scope = hwInputComboGridProperty;
                                    break;
                            }
                        } else {
                            //保存的生成对象
                            var componet;
                            switch (inst.settings.fields[i].fieldsConfig.type) {
                                case 'text':
                                    componet = new vmd.ux.inputTextProperty.Controller(hwInputTextProperty);
                                    break;
                                case 'number':
                                    componet = new vmd.ux.inputNumberProperty.Controller(hwInputNumberProperty);
                                    break;
                                case 'combo':
                                    componet = new vmd.ux.inputComboProperty.Controller(hwInputComboProperty);
                                    break;
                                case 'comboTree':
                                    componet = new vmd.ux.inputComboTreeProperty.Controller(hwInputComboTreeProperty);
                                    break;
                                case 'comboGrid':
                                    componet = new vmd.ux.inputComboGridProperty.Controller(hwInputComboGridProperty);
                                    break;
                                case 'radioButton':
                                    componet = new vmd.ux.inputRadioButtonProperty.Controller(hwInputRadioButtonProperty);
                                    break;
                                case 'checkbox':
                                    componet = new vmd.ux.inputCheckBoxProperty.Controller(hwInputCheckBoxProperty);
                                    break;
                                case 'richText':
                                    componet = new vmd.ux.inputRichTextProperty.Controller(hwInputRichTextProperty);
                                    break;
                                case 'date':
                                    componet = new vmd.ux.inputDateProperty.Controller(hwInputDateProperty);
                                    break;
                            }
                            componet.setValue(inst.settings.fields[i].fieldsConfig);
                            inst.settings.fields[i].fieldsConfig = componet;
                        }
                    }
                }
            }

            function MyGrid_beforerender(sender) {
                MyGrid.store = store1;
            }

            function TypeSettings_afterrender(sender) {
                MyGrid.on('cellclick', function(sender, rowindex, cellindex) {
                    var gv = MyGrid.getView();
                    var row = gv.getRow(selNum);
                    Ext.get(row).removeClass('x-grid3-row-selected')
                    currow = gv.getRow(rowindex);
                    Ext.get(currow).addClass('x-grid3-row-selected')
                })
                Ext.defer(function() {
                    var gv = MyGrid.getView();
                    var row = gv.getRow(selNum);
                    MyGrid.selModel.selectRow(selNum, true)
                    //row.click()
                    Ext.get(row).addClass('x-grid3-row-selected')
                    MyGrid_cellclick()
                }, 50)
                //对各个复合组件增加消息通讯监听
                this.cascade(function(item) {
                    if (item.xtype && item.xtype.indexOf('vmd.ux') == 0) {
                        item.on('updateValue', function(cmp, field, value) {
                            var activeCompController = page.controller.activeComp;
                            activeCompController[field] = value;
                        })
                    }
                })
            }

            function getNow() {
                var sc = page.controller.settings.fields[page.controller.activeNo].fieldsConfig.scope;
                var obj = {
                    'sc': sc
                }
                var t = page.controller.settings.fields[page.controller.activeNo].fieldsConfig
                t.scope = []
                var temp = JSON.parse(JSON.stringify(page.controller.settings.fields[page.controller.activeNo]))
                t.scope = obj.sc;
                return temp
            }

            function primaryHide(type, flag) {
                switch (type) {
                    case 'text':
                        if (flag) {
                            hwInputTextProperty.text_common_allowEmpty.hide()
                            hwInputTextProperty.text_common_emptyAlertDiv.hide()
                        } else {
                            hwInputTextProperty.text_common_allowEmpty.show()
                            hwInputTextProperty.text_common_emptyAlertDiv.show()
                        }
                        break;
                    case 'number':
                        if (flag) {
                            hwInputNumberProperty.number_allowEmpty.hide();
                            hwInputNumberProperty.number_emptyAlertDiv.hide()
                        } else {
                            hwInputNumberProperty.number_allowEmpty.show();
                            hwInputNumberProperty.number_emptyAlertDiv.show()
                        }
                        break;
                    case 'combo':
                        if (flag) {
                            hwInputComboProperty.setAllowEmpty(false)
                            hwInputComboProperty.allowEmpty.hide()
                            hwInputComboProperty.emptyAlertDiv.hide()
                        } else {
                            hwInputComboProperty.allowEmpty.show()
                            hwInputComboProperty.emptyAlertDiv.hide()
                        }
                        break;
                    case 'comboTree':
                        if (flag) {
                            hwInputComboTreeProperty.allowEmpty.hide()
                            hwInputComboTreeProperty.div24.hide()
                        } else {
                            hwInputComboTreeProperty.allowEmpty.show()
                            hwInputComboTreeProperty.div24.show()
                        }
                        break;
                    case 'comboGrid':
                        if (flag) {
                            hwInputComboGridProperty.allowEmpty.hide()
                            hwInputComboGridProperty.emptyDiv.hide()
                        } else {
                            hwInputComboGridProperty.allowEmpty.show()
                            hwInputComboGridProperty.emptyDiv.show()
                        }
                        break;
                    case 'checkbox':
                        if (flag) {
                            hwInputCheckBoxProperty.allowEmpty.hide()
                            hwInputCheckBoxProperty.emptyAlertDiv.hide()
                        } else {
                            hwInputCheckBoxProperty.allowEmpty.show()
                            hwInputCheckBoxProperty.emptyAlertDiv.show()
                        }
                        break;
                    case 'richText':
                        if (flag) {
                            hwInputRichTextProperty.allowEmpty.hide()
                            hwInputRichTextProperty.div.hide()
                        } else {
                            hwInputRichTextProperty.allowEmpty.show()
                            hwInputRichTextProperty.div.show()
                        }
                        break;
                    case 'date':
                        if (flag) {
                            hwInputDateProperty.allowEmpty.hide()
                            hwInputDateProperty.emptyDiv.hide()
                        } else {
                            hwInputDateProperty.allowEmpty.show()
                            hwInputDateProperty.emptyDiv.show()
                        }
                        break;
                }
            }

            function editType_beforerender(sender) {}

            function dicFirst_check(sender, checked) {}
        } catch (ex) {
            vmd.Error.log('003-3', {
                p1: 'vmd.ux.TypeSettings',
                p2: ex.message
            }, ex, 100);
        }
        this.TypeSettings_afterrender = TypeSettings_afterrender;
        this.TypeSettings_beforerender = TypeSettings_beforerender;
        this.items = [{
            xtype: "panel",
            id: "panel",
            title: "Panel",
            header: false,
            border: false,
            height: 100,
            x: 110,
            y: 110,
            layout: "border",
            items: [{
                    xtype: "panel",
                    id: "panel1",
                    title: "Panel",
                    header: false,
                    border: false,
                    height: 100,
                    region: "center",
                    layout: "border",
                    items: [{
                            xtype: "panel",
                            id: "comps",
                            title: "Panel",
                            header: false,
                            border: false,
                            height: 555,
                            region: "center",
                            layout: "anchor",
                            cls: "bindtype",
                            items: [{
                                    xtype: "panel",
                                    id: "textPanel",
                                    title: "Panel",
                                    header: false,
                                    border: false,
                                    height: 100,
                                    layout: "fit",
                                    hidden: true,
                                    anchor: "100% 100%",
                                    items: [{
                                        xtype: "vmd.ux.InputTextProperty",
                                        id: "hwInputTextProperty",
                                        layout: "border"
                                    }]
                                },
                                {
                                    xtype: "panel",
                                    id: "comboPanel",
                                    title: "Panel",
                                    header: false,
                                    border: false,
                                    height: 100,
                                    anchor: "100% 100%",
                                    layout: "fit",
                                    hidden: true,
                                    items: [{
                                        xtype: "vmd.ux.InputComboProperty",
                                        id: "hwInputComboProperty",
                                        layout: "fit",
                                        hidden: false,
                                        anchor: "100% 100%"
                                    }]
                                },
                                {
                                    xtype: "panel",
                                    id: "numberPanel",
                                    title: "Panel",
                                    header: false,
                                    border: false,
                                    height: 100,
                                    anchor: "100% 100%",
                                    layout: "fit",
                                    hidden: true,
                                    items: [{
                                        xtype: "vmd.ux.InputNumberProperty",
                                        id: "hwInputNumberProperty",
                                        layout: "fit",
                                        hidden: false
                                    }]
                                },
                                {
                                    xtype: "panel",
                                    id: "checkboxPanel",
                                    title: "Panel",
                                    header: false,
                                    border: false,
                                    height: 100,
                                    layout: "fit",
                                    anchor: "100% 100%",
                                    hidden: true
                                },
                                {
                                    xtype: "panel",
                                    id: "comboTreePanel",
                                    title: "Panel",
                                    header: false,
                                    border: false,
                                    height: 100,
                                    layout: "fit",
                                    anchor: "100% 100%",
                                    hidden: true,
                                    items: [{
                                        xtype: "vmd.ux.InputComboTreeProperty",
                                        id: "hwInputComboTreeProperty",
                                        layout: "fit",
                                        hidden: false
                                    }]
                                },
                                {
                                    xtype: "panel",
                                    id: "radioButtonPanel",
                                    title: "Panel",
                                    header: false,
                                    border: false,
                                    height: 100,
                                    layout: "fit",
                                    anchor: "100% 100%",
                                    hidden: true,
                                    items: [{
                                        xtype: "vmd.ux.InputRadioButtonProperty",
                                        id: "hwInputRadioButtonProperty",
                                        layout: "fit",
                                        hidden: false
                                    }]
                                },
                                {
                                    xtype: "panel",
                                    id: "datePanel",
                                    title: "Panel",
                                    header: false,
                                    border: false,
                                    height: 100,
                                    layout: "fit",
                                    anchor: "100% 100%",
                                    hidden: true,
                                    items: [{
                                        xtype: "vmd.ux.InputDateProperty",
                                        id: "hwInputDateProperty",
                                        layout: "fit",
                                        hidden: false
                                    }]
                                },
                                {
                                    xtype: "panel",
                                    id: "checkBoxPanel",
                                    title: "Panel",
                                    header: false,
                                    border: false,
                                    height: 100,
                                    layout: "fit",
                                    anchor: "100% 100%",
                                    hidden: true,
                                    items: [{
                                        xtype: "vmd.ux.InputCheckBoxProperty",
                                        id: "hwInputCheckBoxProperty",
                                        layout: "fit",
                                        hidden: false
                                    }]
                                },
                                {
                                    xtype: "panel",
                                    id: "richTextPanel",
                                    title: "Panel",
                                    header: false,
                                    border: false,
                                    height: 100,
                                    layout: "fit",
                                    anchor: "100% 100%",
                                    hidden: true,
                                    items: [{
                                        xtype: "vmd.ux.InputRichTextProperty",
                                        id: "hwInputRichTextProperty",
                                        layout: "fit",
                                        hidden: false
                                    }]
                                },
                                {
                                    xtype: "panel",
                                    id: "comboGridPanel",
                                    title: "Panel",
                                    header: false,
                                    border: false,
                                    height: 100,
                                    layout: "fit",
                                    anchor: "100% 100%",
                                    hidden: true,
                                    items: [{
                                        xtype: "vmd.ux.InputComboGridProperty",
                                        id: "hwInputComboGridProperty",
                                        layout: "fit",
                                        hidden: false
                                    }]
                                }
                            ]
                        },
                        {
                            xtype: "panel",
                            id: "panel4",
                            title: "属性设置",
                            header: true,
                            border: false,
                            height: 181,
                            region: "north",
                            layout: "anchor",
                            padding: "0 0 0 5",
                            items: [{
                                    xtype: "vmd.div",
                                    id: "div",
                                    autoEl: "div",
                                    border: false,
                                    backgroundRepeat: "no-repeat",
                                    backgroundPosition: "top left",
                                    width: 400,
                                    height: 50,
                                    anchor: "100% 20%",
                                    layout: "border",
                                    items: [{
                                            xtype: "vmd.div",
                                            id: "div2",
                                            autoEl: "div",
                                            border: false,
                                            backgroundRepeat: "no-repeat",
                                            backgroundPosition: "top left",
                                            width: 87,
                                            height: 50,
                                            region: "center",
                                            layout: "anchor",
                                            items: [{
                                                xtype: "vmd.comlist",
                                                id: "editType",
                                                width: 350,
                                                height: 270,
                                                anchor: "-10",
                                                afterrender: "editType_afterrender",
                                                selectChanged: "editType_selectChanged",
                                                beforerender: "editType_beforerender",
                                                listeners: {
                                                    vmdafterrender: editType_afterrender,
                                                    selectChanged: editType_selectChanged,
                                                    beforerender: editType_beforerender
                                                }
                                            }]
                                        },
                                        {
                                            xtype: "vmd.div",
                                            id: "div3",
                                            layoutConfig: {
                                                align: "center",
                                                pack: "center"
                                            },
                                            autoEl: "div",
                                            border: false,
                                            backgroundRepeat: "no-repeat",
                                            backgroundPosition: "top left",
                                            width: 62,
                                            height: 31,
                                            region: "west",
                                            layout: "vbox",
                                            items: [{
                                                xtype: "label",
                                                id: "label",
                                                text: "编辑类型："
                                            }]
                                        }
                                    ]
                                },
                                {
                                    xtype: "vmd.div",
                                    id: "div1",
                                    autoEl: "div",
                                    border: false,
                                    backgroundRepeat: "no-repeat",
                                    backgroundPosition: "top left",
                                    width: 400,
                                    height: 50,
                                    anchor: "100% 20%",
                                    layout: "border",
                                    items: [{
                                            xtype: "vmd.div",
                                            id: "div4",
                                            autoEl: "div",
                                            border: false,
                                            backgroundRepeat: "no-repeat",
                                            backgroundPosition: "top left",
                                            width: 400,
                                            height: 50,
                                            region: "center",
                                            layout: "anchor",
                                            items: [{
                                                xtype: "textfield",
                                                id: "dicLength",
                                                allowBlank: true,
                                                enableKeyEvents: true,
                                                anchor: "-10",
                                                style: "border-bottom: none",
                                                readOnly: true
                                            }]
                                        },
                                        {
                                            xtype: "vmd.div",
                                            id: "div5",
                                            layoutConfig: {
                                                align: "center",
                                                pack: "center"
                                            },
                                            autoEl: "div",
                                            border: false,
                                            backgroundRepeat: "no-repeat",
                                            backgroundPosition: "top left",
                                            width: 63,
                                            height: 50,
                                            region: "west",
                                            layout: "vbox",
                                            items: [{
                                                xtype: "label",
                                                id: "label1",
                                                text: "显示长度："
                                            }]
                                        }
                                    ]
                                },
                                {
                                    xtype: "vmd.div",
                                    id: "div9",
                                    autoEl: "div",
                                    border: false,
                                    backgroundRepeat: "no-repeat",
                                    backgroundPosition: "top left",
                                    width: 400,
                                    height: 30,
                                    anchor: "100% 20%",
                                    items: [{
                                        xtype: "checkbox",
                                        id: "colHide",
                                        fieldLabel: "Checkbox",
                                        boxLabel: "列隐藏"
                                    }]
                                },
                                {
                                    xtype: "vmd.div",
                                    id: "div6",
                                    autoEl: "div",
                                    border: false,
                                    backgroundRepeat: "no-repeat",
                                    backgroundPosition: "top left",
                                    width: 400,
                                    height: 50,
                                    anchor: "100% 20%",
                                    layout: "border",
                                    items: [{
                                            xtype: "vmd.div",
                                            id: "div7",
                                            autoEl: "div",
                                            border: false,
                                            backgroundRepeat: "no-repeat",
                                            backgroundPosition: "top left",
                                            width: 400,
                                            height: 50,
                                            region: "center",
                                            layout: "anchor",
                                            items: [{
                                                xtype: "textfield",
                                                id: "colWidth",
                                                allowBlank: true,
                                                enableKeyEvents: true,
                                                anchor: "-10"
                                            }]
                                        },
                                        {
                                            xtype: "vmd.div",
                                            id: "div8",
                                            layoutConfig: {
                                                align: "left",
                                                pack: "center"
                                            },
                                            autoEl: "div",
                                            border: false,
                                            backgroundRepeat: "no-repeat",
                                            backgroundPosition: "top left",
                                            width: 40,
                                            height: 22,
                                            region: "west",
                                            layout: "vbox",
                                            items: [{
                                                xtype: "label",
                                                id: "label2",
                                                text: "列宽：",
                                                width: 37
                                            }]
                                        }
                                    ]
                                },
                                {
                                    xtype: "vmd.div",
                                    id: "hwDiv",
                                    autoEl: "div",
                                    border: false,
                                    backgroundRepeat: "no-repeat",
                                    backgroundPosition: "top left",
                                    width: 400,
                                    height: 50,
                                    anchor: "100% 19%",
                                    layout: "border",
                                    items: [{
                                            xtype: "vmd.div",
                                            id: "hwDiv1",
                                            layoutConfig: {
                                                align: "middle"
                                            },
                                            autoEl: "div",
                                            border: false,
                                            backgroundRepeat: "no-repeat",
                                            backgroundPosition: "top left",
                                            width: 40,
                                            height: 22,
                                            region: "west",
                                            layout: "hbox",
                                            items: [{
                                                xtype: "label",
                                                id: "hwLabel",
                                                text: "位置："
                                            }]
                                        },
                                        {
                                            xtype: "vmd.div",
                                            id: "hwDiv2",
                                            layoutConfig: {
                                                align: "middle"
                                            },
                                            autoEl: "div",
                                            border: false,
                                            backgroundRepeat: "no-repeat",
                                            backgroundPosition: "top left",
                                            width: 400,
                                            height: 50,
                                            region: "center",
                                            layout: "hbox",
                                            items: [{
                                                    xtype: "radiostoregroup",
                                                    id: "txtAlign",
                                                    width: 153,
                                                    height: 40,
                                                    labelField: "label",
                                                    valueField: "value",
                                                    checkedField: "checked",
                                                    boxFieldName: "myRadio",
                                                    items: [{
                                                            xtype: "radio",
                                                            id: "hwRadio",
                                                            boxLabel: "居左",
                                                            inputValue: "1",
                                                            checked: true
                                                        },
                                                        {
                                                            xtype: "radio",
                                                            id: "hwRadio1",
                                                            boxLabel: "居中",
                                                            inputValue: "3"
                                                        },
                                                        {
                                                            xtype: "radio",
                                                            id: "hwRadio2",
                                                            boxLabel: "居右",
                                                            width: 52,
                                                            inputValue: "2"
                                                        }
                                                    ]
                                                },
                                                {
                                                    xtype: "checkbox",
                                                    id: "dicFirst",
                                                    fieldLabel: "Checkbox",
                                                    boxLabel: "数据字典优先",
                                                    inputValue: "1",
                                                    check: "dicFirst_check",
                                                    checked: true,
                                                    listeners: {
                                                        check: dicFirst_check
                                                    }
                                                }
                                            ]
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                },
                {
                    xtype: "panel",
                    id: "panel2",
                    title: "Panel",
                    header: false,
                    border: false,
                    height: 100,
                    region: "west",
                    width: 150,
                    layout: "fit",
                    style: "border-right: 1px solid #ddd",
                    items: [{
                        xtype: "grid",
                        id: "MyGrid",
                        title: "已选字段",
                        loadMask: true,
                        hideHeaders: true,
                        disableHeaderClick: true,
                        enableHdMenu: false,
                        cellclick: "MyGrid_cellclick",
                        beforerender: "MyGrid_beforerender",
                        border: false,
                        region: "center",
                        listeners: {
                            cellclick: MyGrid_cellclick,
                            beforerender: MyGrid_beforerender
                        },
                        columns: [{
                            xtype: "gridcolumn",
                            header: "已选字段",
                            sortable: true,
                            resizable: true,
                            dataIndex: "mixName",
                            width: 140,
                            align: "left",
                            fixed: false,
                            menuDisabled: true
                        }]
                    }]
                }
            ]
        }]
        this.callParent();
        vmd.core.compositeCmpInit(this.items, this);
        var me = this;
        eval(me.defineVars);
        resetCmpScope();
        this.getNow = function() {
            return getNow()
        }
        Ext.util.CSS.removeStyleSheet("vmd.ux.TypeSettings");
        this.uxCss && Ext.util.CSS.createStyleSheet(vmd.replaceResVars(this.uxCss), "vmd.ux.TypeSettings");
    }
})