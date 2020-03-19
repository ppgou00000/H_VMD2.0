Vmd.define('hwchart.component.toolbox.feature.Brush', {
    requires: [
        'hwchart.component.toolbox.featureManager'
    ]
}, function () {

    var zrUtil = zrender.util;

    var featureManager = hwchart.component.toolbox.featureManager;

    var lang = hwchart.lang;

   
    var brushLang = lang.toolbox.brush;

    function Brush(model, ecModel, api) {
        this.model = model;
        this.ecModel = ecModel;
        this.api = api;
        this.chart = api.getChart();
        /**
         * @private
         * @type {string}
         */

        this._brushType;
        /**
         * @private
         * @type {string}
         */

        this._brushMode;
    }

    Brush.defaultOption = {
        show: true,
        type: ['rect', 'polygon', 'lineX', 'lineY', 'keep', 'clear'],
        icon: {
            /* eslint-disable */
            rect: 'M7.3,34.7 M0.4,10V-0.2h9.8 M89.6,10V-0.2h-9.8 M0.4,60v10.2h9.8 M89.6,60v10.2h-9.8 M12.3,22.4V10.5h13.1 M33.6,10.5h7.8 M49.1,10.5h7.8 M77.5,22.4V10.5h-13 M12.3,31.1v8.2 M77.7,31.1v8.2 M12.3,47.6v11.9h13.1 M33.6,59.5h7.6 M49.1,59.5 h7.7 M77.5,47.6v11.9h-13',
            // jshint ignore:line
            polygon: 'M55.2,34.9c1.7,0,3.1,1.4,3.1,3.1s-1.4,3.1-3.1,3.1 s-3.1-1.4-3.1-3.1S53.5,34.9,55.2,34.9z M50.4,51c1.7,0,3.1,1.4,3.1,3.1c0,1.7-1.4,3.1-3.1,3.1c-1.7,0-3.1-1.4-3.1-3.1 C47.3,52.4,48.7,51,50.4,51z M55.6,37.1l1.5-7.8 M60.1,13.5l1.6-8.7l-7.8,4 M59,19l-1,5.3 M24,16.1l6.4,4.9l6.4-3.3 M48.5,11.6 l-5.9,3.1 M19.1,12.8L9.7,5.1l1.1,7.7 M13.4,29.8l1,7.3l6.6,1.6 M11.6,18.4l1,6.1 M32.8,41.9 M26.6,40.4 M27.3,40.2l6.1,1.6 M49.9,52.1l-5.6-7.6l-4.9-1.2',
            // jshint ignore:line
            lineX: 'M15.2,30 M19.7,15.6V1.9H29 M34.8,1.9H40.4 M55.3,15.6V1.9H45.9 M19.7,44.4V58.1H29 M34.8,58.1H40.4 M55.3,44.4 V58.1H45.9 M12.5,20.3l-9.4,9.6l9.6,9.8 M3.1,29.9h16.5 M62.5,20.3l9.4,9.6L62.3,39.7 M71.9,29.9H55.4',
            // jshint ignore:line
            lineY: 'M38.8,7.7 M52.7,12h13.2v9 M65.9,26.6V32 M52.7,46.3h13.2v-9 M24.9,12H11.8v9 M11.8,26.6V32 M24.9,46.3H11.8v-9 M48.2,5.1l-9.3-9l-9.4,9.2 M38.9-3.9V12 M48.2,53.3l-9.3,9l-9.4-9.2 M38.9,62.3V46.4',
            // jshint ignore:line
            keep: 'M4,10.5V1h10.3 M20.7,1h6.1 M33,1h6.1 M55.4,10.5V1H45.2 M4,17.3v6.6 M55.6,17.3v6.6 M4,30.5V40h10.3 M20.7,40 h6.1 M33,40h6.1 M55.4,30.5V40H45.2 M21,18.9h62.9v48.6H21V18.9z',
            // jshint ignore:line
            clear: 'M22,14.7l30.9,31 M52.9,14.7L22,45.7 M4.7,16.8V4.2h13.1 M26,4.2h7.8 M41.6,4.2h7.8 M70.3,16.8V4.2H57.2 M4.7,25.9v8.6 M70.3,25.9v8.6 M4.7,43.2v12.6h13.1 M26,55.8h7.8 M41.6,55.8h7.8 M70.3,43.2v12.6H57.2' // jshint ignore:line

            /* eslint-enable */
            ,
            select: 'M765.72 515.982a25894.054 25894.054 0 0 0-22.463-17.311c-6.97-5.358-12.567-9.633-25.173-19.243-12.197-9.29-18.676-14.242-25.98-19.867a12680.92 12680.92 0 0 1-32.401-25.04 163509.952 163509.952 0 0 0-9.77-7.565 19442.243 19442.243 0 0 0-24.735-19.121 11352.07 11352.07 0 0 0-24.956-19.202l-3.574-2.745-7.142-5.486a26393.132 26393.132 0 0 1-32.359-24.874 55855.09 55855.09 0 0 1-42.98-33.153l-10.732-8.284-115.927-89.415-8.22-6.333a37130.502 37130.502 0 0 1-49.333-38.052 18790.768 18790.768 0 0 1-19.823-15.346l1.731 466.487c0.063 23.927 0.076 48.906 0.05 76.015a925.154 925.154 0 0 1 3.936-3.781c13.244-12.68 26.218-24.026 45.994-40.636a580.816 580.816 0 0 1 54.895-40.735c4.794-3.142 9.044-5.81 16.98-10.709l1.33-0.821c4.195-2.592 6.606-4.095 9.185-5.74 1.434-0.888 1.944-1.186 2.484-1.485a40.986 40.986 0 0 1 4.475-2.14c4.374-1.773 9.097-2.816 14.18-2.816 5.35 0 11.009 1.144 16.608 4.026 7.539 3.881 13.638 10.361 17.484 19.088A9585.226 9585.226 0 0 0 529.114 688c2.524 5.62 4.78 10.6 9.038 19.972a44210.884 44210.884 0 0 1 3.245 7.137 5400.695 5400.695 0 0 1 9.811 21.652 4712.292 4712.292 0 0 1 10.28 23.051c5.396 12.146 7.39 16.623 10.232 22.938a1639.59 1639.59 0 0 0 9.208 20.138 757.45 757.45 0 0 1 8.22 18.506c7.276 16.794 10.639 24 15.306 32.169 6.886 12.066 14.941 19.834 25.73 24.064 7.765 3.044 24.74 3.694 35.83 1.713 18.536-3.31 32.295-21.507 34.56-44.785 1.505-15.455-0.54-26.526-7.121-37.216-8.322-13.523-15.238-24.938-29.396-48.442l-4.431-7.35a7830.873 7830.873 0 0 0-11.09-18.34c-4.027-6.65-7.718-12.728-14.243-23.458l-1.785-2.935a36262.489 36262.489 0 0 1-9.082-14.938l-3.727-6.13a16858.305 16858.305 0 0 1-17.397-28.657c-4.29-7.083-8.28-13.722-14.94-24.834l-2.692-4.494a22732.726 22732.726 0 0 1-6.124-10.207c-2.44-4.066-4.302-7.166-6.097-10.15-6.811-11.266-7.328-23.097-3.122-33.345 4.2-10.197 12.84-18.257 25.547-21.462 26.845-6.751 51.815-11.897 76.28-15.715a632.54 632.54 0 0 1 8.618-1.286c7.275-1.036 12.938-1.762 25.87-3.362 7.92-0.976 12.483-1.55 17.397-2.2 5.508-0.732 9.659-1.092 18.872-1.75a265.53 265.53 0 0 0 13.766-1.198c3.425-0.42 6.669-0.779 10.044-1.104zM456.09 644.795c-8.982 5.545-13.002 8.069-17.416 10.962a540.768 540.768 0 0 0-51.106 37.92c-19.139 16.075-31.574 26.95-44.055 38.9a887.609 887.609 0 0 0-31.352 31.477c-1.47 1.553-2.952 3.228-5.118 5.756-12.095 14.122-35.23 5.54-35.19-13.054 0.104-47.19 0.13-87.528 0.03-125.197L270 124.074c-0.062-16.665 19.091-26.092 32.259-15.876 1.23 0.954 20.583 15.97 26.068 20.224 9.644 7.48 17.5 13.564 25.048 19.4a37113.689 37113.689 0 0 0 50.345 38.834l8.223 6.335 115.947 89.431 10.739 8.29a57037.56 57037.56 0 0 0 42.947 33.127 27792.75 27792.75 0 0 0 32.314 24.84l7.141 5.485 3.574 2.744a11384.18 11384.18 0 0 1 25.033 19.262c7.181 5.54 14.238 10.997 24.778 19.155a161559.62 161559.62 0 0 1 9.78 7.573 12729.274 12729.274 0 0 0 32.31 24.969c7.237 5.573 13.674 10.492 25.822 19.745 12.655 9.647 18.28 13.944 25.317 19.353a34074.216 34074.216 0 0 1 64.64 49.897c14.787 11.438 7.196 35.104-11.485 35.806-6.025 0.227-11.947 0.521-19.768 0.961-20.615 1.168-29.742 1.84-40.567 3.17a303.282 303.282 0 0 1-15.804 1.39c-8.337 0.596-11.936 0.91-16.366 1.497-5.072 0.672-9.73 1.258-17.75 2.246-12.68 1.569-18.183 2.275-25.135 3.265a582.08 582.08 0 0 0-8.076 1.205c-21.957 3.426-44.4 7.99-68.475 13.933a12118.386 12118.386 0 0 1 7.048 11.741c1.284 2.142 2.169 3.616 3.067 5.111l2.7 4.507a5896.998 5896.998 0 0 0 14.844 24.676 16401.68 16401.68 0 0 0 17.36 28.595l3.727 6.13 3.728 6.134 5.352 8.802 1.785 2.935a13907.17 13907.17 0 0 1 14.273 23.507 7862.354 7862.354 0 0 1 11.135 18.416l4.438 7.362c14.099 23.404 20.968 34.743 29.2 48.12 11.525 18.72 15.168 38.447 12.87 62.06-3.87 39.767-29.381 73.509-67.34 80.287-17.762 3.171-41.91 2.246-57.461-3.851-20.105-7.882-34.77-22.022-45.867-41.47-5.633-9.858-9.414-17.962-17.307-36.179a718.996 718.996 0 0 0-7.779-17.518 1690.527 1690.527 0 0 1-9.388-20.534c-2.878-6.396-4.888-10.908-10.313-23.121a4681.23 4681.23 0 0 0-10.2-22.872 5367.242 5367.242 0 0 0-9.743-21.499l-1.23-2.705-2.023-4.45a4835.697 4835.697 0 0 1-9.094-20.094 9621.432 9621.432 0 0 1-28.81-64.45 909.302 909.302 0 0 1-7.742 4.82z',
            rect: 'M280.526848 8.192h194.523136v116.71552H280.526848V8.192z m466.857984 0h-194.523136v116.71552h194.523136V8.192zM280.526848 1019.723776h194.523136v-116.71552H280.526848v116.71552zM124.90752 8.192A116.436992 116.436992 0 0 0 8.192 124.90752v77.811712h116.71552v-38.903808c0-21.397504 17.506304-38.903808 38.903808-38.903808h38.903808V8.192H124.90752z m0 272.334848H8.192v194.523136h116.71552V280.526848zM8.192 747.388928h116.71552v-194.523136H8.192v194.523136z m116.71552 116.71552v-38.903808H8.192v77.811712a116.436992 116.436992 0 0 0 116.71552 116.71552h77.811712v-116.71552h-38.903808c-21.4016-0.004096-38.907904-17.5104-38.907904-38.907904zM903.008256 163.815424v38.903808h116.71552V124.90752A116.441088 116.441088 0 0 0 903.008256 8.192h-77.811712v116.71552h38.903808c21.397504 0 38.907904 17.506304 38.907904 38.907904z m0 311.238656h116.71552V280.526848h-116.71552v194.527232zM1002.7008 920.027136l-118.66112-118.66112 135.68-54.468608-427.954176-155.619328 155.619328 427.954176 54.468608-135.68 118.66112 118.66112c22.85568 22.85568 59.817984 22.85568 82.673664 0 22.368256-22.368256 22.368256-59.326464-0.487424-82.18624z',
            polygon: 'M816.107043 935.829609a34.304876 34.304876 0 0 1-18.181934-5.145981s-21.611922-13.377952-58.317789-34.303876a34.304876 34.304876 0 1 1 32.245884-60.376781c39.107858 20.925924 61.748776 34.304876 62.434773 34.304876a34.304876 34.304876 0 0 1-18.180934 63.46377z m-186.960322-85.761689a34.304876 34.304876 0 0 1-11.319959-2.057992 964.988504 964.988504 0 0 0-127.956537-34.304876 34.304876 34.304876 0 0 1 13.377952-68.609752 955.04054 955.04054 0 0 1 137.219503 37.392865 34.304876 34.304876 0 0 1-11.320959 66.550759zM360.541694 795.867117h-3.773987a1074.420107 1074.420107 0 0 1-140.305491-22.983917 34.304876 34.304876 0 0 1 16.46594-66.551759 1004.096362 1004.096362 0 0 0 131.043525 21.269923 34.304876 34.304876 0 0 1-3.429987 68.608751z m-248.709099-91.593669a34.304876 34.304876 0 0 1-31.216887-20.239926A127.269539 127.269539 0 0 1 68.609751 639.437683c-1.714994-15.436944-5.830979-52.829809-12.005956-102.913627a34.304876 34.304876 0 0 1 30.187891-38.077862 34.304876 34.304876 0 0 1 38.077862 29.844892c5.831979 49.74182 10.291963 87.476683 12.006956 102.913627a66.550759 66.550759 0 0 0 5.48898 22.297919 34.304876 34.304876 0 0 1-17.152938 45.624835 34.304876 34.304876 0 0 1-13.378951 5.145981zM74.783729 429.836443a34.304876 34.304876 0 0 1-34.303876-29.844892L24.012913 262.773048a34.304876 34.304876 0 1 1 68.609751-7.889971l16.465941 137.219502a34.304876 34.304876 0 0 1-29.844892 38.419861z m205.828254-152.655447a34.304876 34.304876 0 0 1-22.640918-8.575969l-102.914627-90.220673a34.304876 34.304876 0 0 1 44.939837-50.427818L302.908903 218.519208a34.304876 34.304876 0 0 1-21.611922 60.032783zM40.479853 156.086434a34.304876 34.304876 0 0 1-34.304875-30.531889C0 61.404778 0 44.595838 0 37.391865a38.077862 38.077862 0 0 1 10.290963-25.727907A36.362868 36.362868 0 0 1 34.304876 0c14.407948 0 20.239927 4.459984 60.375781 37.734863a34.304876 34.304876 0 0 1-20.925924 60.71978c0 6.173978 0 13.377952 2.401991 20.924924a34.304876 34.304876 0 0 1-30.531889 38.078863z m393.816574 255.569075A34.304876 34.304876 0 0 1 411.998507 403.422538l-51.456813-44.596838a34.304876 34.304876 0 0 1 44.938837-52.142811l34.304876 28.815895 39.449857-22.297919a34.304876 34.304876 0 0 1 34.304875 59.689784l-60.376781 34.304876a34.304876 34.304876 0 0 1-18.866931 4.459984z m162.60341-87.819682a34.304876 34.304876 0 0 1-16.122941-64.492767l102.913627-55.573798a34.304876 34.304876 0 0 1 34.304876 60.375781L615.081772 319.718842a34.304876 34.304876 0 0 1-18.181935 4.116985z m205.828255-111.147598a34.304876 34.304876 0 0 1-30.187891-17.837935 34.304876 34.304876 0 0 1 13.72095-46.311832L889.176778 92.965663a34.304876 34.304876 0 0 1 46.653831 13.72195 34.304876 34.304876 0 0 1-13.72195 46.653831l-102.913627 55.2298a31.902884 31.902884 0 0 1-17.837935 4.116985z m252.139086-75.469726h-5.831979a34.304876 34.304876 0 0 1-28.129898-37.734863 34.304876 34.304876 0 0 1-44.595838-14.407948A34.304876 34.304876 0 0 1 989.686414 38.419861l60.376782-34.303876a34.304876 34.304876 0 0 1 36.362868 2.399991 34.304876 34.304876 0 0 1 14.064949 34.305876l-11.663958 68.609752a34.304876 34.304876 0 0 1-33.961877 27.785899z m-54.201803 312.858866h-5.831979a34.304876 34.304876 0 0 1-28.129898-38.42186l28.129898-158.487426a34.304876 34.304876 0 0 1 39.449857-28.129898 34.304876 34.304876 0 0 1 29.159894 39.793856l-27.100902 156.771432a34.304876 34.304876 0 0 1-35.67687 28.472896z m-40.136855 224.694186h-5.830979a34.304876 34.304876 0 0 1-27.786899-39.792856l11.662958-68.609751a34.304876 34.304876 0 1 1 68.609751 11.663958l-11.663958 68.609751a34.304876 34.304876 0 0 1-34.989873 28.129898z',
            clear: 'M883.2 960h-89.6v-55.466667h85.333333l4.266667 55.466667z m-179.2 0h-85.333333v-55.466667h85.333333v55.466667z m-170.666667 0h-85.333333v-55.466667h85.333333v55.466667z m-174.933333 0h-85.333333v-55.466667h85.333333v55.466667z m-174.933333 0h-42.666667c-21.333333 0-46.933333-8.533333-59.733333-25.6l38.4-38.4c4.266667 4.266667 12.8 8.533333 21.333333 8.533333h42.666667v55.466667z m755.2-85.333333h-25.6v-85.333334h55.466666v85.333334H938.666667z m-827.733334-42.666667H55.466667v-85.333333h55.466666v85.333333z m853.333334-128h-55.466667v-85.333333h55.466667v85.333333z m-853.333334-46.933333H55.466667v-85.333334h55.466666v85.333334z m853.333334-128h-55.466667v-85.333334h55.466667v85.333334z m-853.333334-46.933334H55.466667v-85.333333h55.466666v85.333333z m853.333334-128h-55.466667v-85.333333h55.466667v85.333333z m-853.333334-46.933333H55.466667v-85.333333h55.466666v85.333333z m853.333334-128h-55.466667v-42.666667c0-8.533333-4.266667-17.066667-8.533333-21.333333l38.4-38.4c17.066667 17.066667 25.6 38.4 25.6 59.733333v42.666667z m-853.333334-46.933333H55.466667c0-46.933333 38.4-81.066667 85.333333-81.066667v55.466667c-17.066667 0-29.866667 12.8-29.866667 25.6z m729.6-25.6h-85.333333V51.2h85.333333v55.466667z m-174.933333 0h-85.333333V51.2h85.333333v55.466667z m-174.933333 0h-85.333334V51.2h85.333334v55.466667z m-174.933334 0h-85.333333V51.2h85.333333v55.466667zM257.109333 291.925333l39.253334-39.253333 470.570666 470.741333-39.253333 39.210667z M256.981333 720.213333L727.893333 249.813333l39.168 39.253334L296.149333 759.424z',
            //delete: 'M272.04587844 864l451.68410438 0c62.27172468 0 112.96996313-50.55142781 112.96996218-112.70081156L836.699945 158.10289406000004a28.24249031 28.24249031 0 0 0-56.48498157 0l0 593.19629438a56.41157625 56.41157625 0 0 1-56.48498062 56.27700093l-451.68410437 0a56.41157625 56.41157625 0 0 1-56.50945032-56.27700093L215.53642812 158.10289406000004a28.23637406 28.23637406 0 1 0-56.47274717 0l0 593.19629438c0 62.14938376 50.71047188 112.70081156 112.99443092 112.70081156m84.64795032-169.41824156a28.13850094 28.13850094 0 0 0 28.21190531-28.21190532L384.9179675 271.02392063a28.22413969 28.22413969 0 1 0-56.44827844-1e-8l0 395.34593251a28.19967094 28.19967094 0 0 0 28.23637313 28.21190531m141.15739968 0a28.13850094 28.13850094 0 0 0 28.22413969-28.21190532L526.08760156 271.02392063a28.24249031 28.24249031 0 1 0-56.48498156-1e-8l0 395.34593251a28.21190531 28.21190531 0 0 0 28.22413969 28.21190531m141.1818675 0a28.21190531 28.21190531 0 0 0 28.23637406-28.21190533L667.24500124 271.02392063a28.23637406 28.23637406 0 0 0-56.4605128-1e-8l0 395.34593251a28.19967094 28.19967094 0 0 0 28.22413875 28.21190531m-607.05756375-592.95161157L963.7513925 101.63014686999998a28.22413969 28.22413969 0 1 0 0-56.44827843l-268.24554937 0 0-56.27700187A84.99050625 84.99050625 0 0 0 610.57650781-96L385.18711812-96a84.9660375 84.9660375 0 0 0-84.91710093 84.84369655l0 56.27700095L31.98776562 45.120697500000006a28.22413969 28.22413969 0 1 0 0 56.44827844M639.04533032 45.18186844000002l-282.33926813 0 0-56.27700188A28.44435375 28.44435375 0 0 1 385.18711812-39.52725281000005L610.57650781-39.52725281000005a28.44435375 28.44435375 0 0 1 28.4688225 28.37094937l0 56.27700094m0 0z',
        },
        // `rect`, `polygon`, `lineX`, `lineY`, `keep`, `clear`
        title: zrUtil.clone(brushLang.title)
    };
    var proto = Brush.prototype; // proto.updateLayout = function (featureModel, ecModel, api) {

    /* eslint-disable */

    proto.render =
    /* eslint-enable */
    proto.updateView = function (featureModel, ecModel, api) {
        var brushType;
        var brushMode;
        var isBrushed;
        ecModel.eachComponent({
            mainType: 'brush'
        }, function (brushModel) {
            brushType = brushModel.brushType;
            brushMode = brushModel.brushOption.brushMode || 'single';
            isBrushed |= brushModel.areas.length;
        });
        this._brushType = brushType;
        this._brushMode = brushMode;
        zrUtil.each(featureModel.get('type', true), function (type) {
            featureModel.setIconStatus(type, (type === 'keep' ? brushMode === 'multiple' : type === 'clear' ? isBrushed : type === brushType) ? 'emphasis' : 'normal');
        });
    };

    proto.getIcons = function () {
        var model = this.model;
        var availableIcons = model.get('icon', true);
        var icons = {};
        zrUtil.each(model.get('type', true), function (type) {
            if (availableIcons[type]) {
                icons[type] = availableIcons[type];
            }
        });
        return icons;
    };

    proto.onclick = function (ecModel, api, type) {
		var me = this;
        var brushType = this._brushType;
        var brushMode = this._brushMode;

        if (type === 'clear') {
            // Trigger parallel action firstly
            api.dispatchAction({
                type: 'axisAreaSelect',
                intervals: []
            });
            api.dispatchAction({
                type: 'brush',
                command: 'clear',
                // Clear all areas of all brush components.
                areas: []
            });
        } else {
            api.dispatchAction({
                type: 'takeGlobalCursor',
                key: 'brush',
                brushOption: {
                    brushType: type === 'keep' ? brushType : brushType === type ? false : type,
                    brushMode: type === 'keep' ? brushMode === 'multiple' ? 'single' : 'multiple' : brushMode
                }
            });
        }
		
		// if(type ==='rect' ||type ==='polygon' ||type ==='well' ){
		//     var serise = ecModel.getSeriesByType('wellSymbol');
		//     var allwell = [];
		//     serise.forEach(function(item){
		//         var data = item.getData()._rawData._data || item.getData()._rawData;
		//         console.log(data)
		//         data.forEach(function(value,i){
		//             var obj = {
		//                 id:value.id,
		//                 text:value.name,
		//                 seriesId:item.id,
		//                 seriesIndex: item.seriesIndex,
		//                 seriesName: item.name,
		//                 dataIndex:i
		//             }
		//             allwell.push(obj)
		//         })
		//     });
		//     if(me.chart.layersCon){
		//         console.log(me.chart.layersCon)
		//         me.chart.layersCon.remove();
		//         me.chart.layersCon = null;
		//         me.chart.chartCon.width("98%");
		//         me.chart.resize();
		//     }
		//     me.chart.trigger('showwellselect',allwell);
		// }
    };

    featureManager.register('brush', Brush);
  

    hwchart.component.toolbox.feature.Brush = Brush;
})