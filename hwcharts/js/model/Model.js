﻿
Vmd.define('hwchart.model.Model', {
    requires: [
        'hwchart.util.model',
        'hwchart.util.clazz',
        'hwchart.model.mixin.lineStyle',
        'hwchart.model.mixin.areaStyle',
        'hwchart.model.mixin.textStyle',
        'hwchart.model.mixin.itemStyle',
    ]
    //mixins: ['hwchart.model.mixin.lineStyle',
    //        'hwchart.model.mixin.areaStyle',
    //         'hwchart.model.mixin.textStyle',
    //         'hwchart.model.mixin.itemStyle',
    //],
    

}, function (Models) {

    



    var zrUtil = zrender.util;

    var env = zrender.env;

    var _model = hwchart.util.model;

    var makeInner = _model.makeInner;

    var _clazz = hwchart.util.clazz;

    var enableClassExtend = _clazz.enableClassExtend;
    var enableClassCheck = _clazz.enableClassCheck;

    var lineStyleMixin = hwchart.model.mixin.lineStyle;

    var areaStyleMixin = hwchart.model.mixin.areaStyle;

    var textStyleMixin = hwchart.model.mixin.textStyle;

    var itemStyleMixin = hwchart.model.mixin.itemStyle;

  

    /**
     * @module hwcharts/model/Model
     */
    var mixin = zrUtil.mixin;
    var inner = makeInner();
    /**
     * @alias module:hwcharts/model/Model
     * @constructor
     * @param {Object} [option]
     * @param {module:hwcharts/model/Model} [parentModel]
     * @param {module:hwcharts/model/Global} [ecModel]
     */

    function Model(option, parentModel, ecModel) {
        /**
         * @type {module:hwcharts/model/Model}
         * @readOnly
         */
        this.parentModel = parentModel;
        /**
         * @type {module:hwcharts/model/Global}
         * @readOnly
         */

        this.ecModel = ecModel;
        /**
         * @type {Object}
         * @protected
         */

        this.option = option; // Simple optimization
        // if (this.init) {
        //     if (arguments.length <= 4) {
        //         this.init(option, parentModel, ecModel, extraOpt);
        //     }
        //     else {
        //         this.init.apply(this, arguments);
        //     }
        // }
    }

    Model.prototype = {
        constructor: Model,

        /**
         * Model 的初始化函数
         * @param {Object} option
         */
        init: null,

        /**
         * 从新的 Option merge
         */
        mergeOption: function (option) {
            zrUtil.merge(this.option, option, true);
        },

        /**
         * @param {string|Array.<string>} path
         * @param {boolean} [ignoreParent=false]
         * @return {*}
         */
        get: function (path, ignoreParent) {
            if (path == null) {
                return this.option;
            }

            return doGet(this.option, this.parsePath(path), !ignoreParent && getParent(this, path));
        },

        /**
         * @param {string} key
         * @param {boolean} [ignoreParent=false]
         * @return {*}
         */
        getShallow: function (key, ignoreParent) {
            var option = this.option;
            var val = option == null ? option : option[key];
            var parentModel = !ignoreParent && getParent(this, key);

            if (val == null && parentModel) {
                val = parentModel.getShallow(key);
            }

            return val;
        },

        /**
         * @param {string|Array.<string>} [path]
         * @param {module:hwcharts/model/Model} [parentModel]
         * @return {module:hwcharts/model/Model}
         */
        getModel: function (path, parentModel) {
            var obj = path == null ? this.option : doGet(this.option, path = this.parsePath(path));
            var thisParentModel;
            parentModel = parentModel || (thisParentModel = getParent(this, path)) && thisParentModel.getModel(path);
            return new Model(obj, parentModel, this.ecModel);
        },

        /**
         * If model has option
         */
        isEmpty: function () {
            return this.option == null;
        },
        restoreData: function () { },
        // Pending
        clone: function () {
            var Ctor = this.constructor;
            return new Ctor(zrUtil.clone(this.option));
        },
        setReadOnly: function (properties) {// clazzUtil.setReadOnly(this, properties);
        },
        // If path is null/undefined, return null/undefined.
        parsePath: function (path) {
            if (typeof path === 'string') {
                path = path.split('.');
            }

            return path;
        },

        /**
         * @param {Function} getParentMethod
         *        param {Array.<string>|string} path
         *        return {module:hwcharts/model/Model}
         */
        customizeGetParent: function (getParentMethod) {
            inner(this).getParent = getParentMethod;
        },
        isAnimationEnabled: function () {
            if (!env.node) {
                if (this.option.animation != null) {
                    return !!this.option.animation;
                } else if (this.parentModel) {
                    return this.parentModel.isAnimationEnabled();
                }
            }
        }
    };

    function doGet(obj, pathArr, parentModel) {
        for (var i = 0; i < pathArr.length; i++) {
            // Ignore empty
            if (!pathArr[i]) {
                continue;
            } // obj could be number/string/... (like 0)


            obj = obj && typeof obj === 'object' ? obj[pathArr[i]] : null;

            if (obj == null) {
                break;
            }
        }

        if (obj == null && parentModel) {
            obj = parentModel.get(pathArr);
        }

        return obj;
    } // `path` can be null/undefined


    function getParent(model, path) {
        var getParentMethod = inner(model).getParent;
        return getParentMethod ? getParentMethod.call(model, path) : model.parentModel;
    } // Enable Model.extend.


    enableClassExtend(Model);
    enableClassCheck(Model);
    mixin(Model, lineStyleMixin);
    mixin(Model, areaStyleMixin);
    mixin(Model, textStyleMixin);
    mixin(Model, itemStyleMixin);
   

    hwchart.model.Model = Model;

})