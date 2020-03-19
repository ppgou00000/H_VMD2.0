/******************************************************************
 ** 文件名: vmd.js
 ** Copyright (c) 2017-2019 汉威公司技术研究院
 ** 创建人:马飞
 ** 日 期:2019-10-10
 ** 修改人:
 ** 日 期:
 ** 描 述:vmd框架相关错误码列表
 ** 版 本:1.0
 ******************************************************************/
Ext.define('vmd.Error.error.vmd', {
    singleton: true,
    list: [{
            code: '003-1',
            msg: '复合组件{p1}初始化出错',
            help: '请检查复合组件配置或操作逻辑是否正确'

        },
        {
            code: '003-2',
            msg: '复合组件{p1}渲染出错',
            help: '请检查复合组件配置或操作逻辑是否正确'
        },
		{
            code: '003-3',
            msg: '复合组件{p1}代码注入出错,{p2}',
            help: '请检查复合组件业务逻辑（变量、函数等）命名是否正确!'
        }
    ]
})