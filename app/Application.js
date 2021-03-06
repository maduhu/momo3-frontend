/**
 * The main application class. An instance of this class is created by app.js
 * when it calls Ext.application(). This is the ideal place to handle
 * application launch and initialization details.
 */
Ext.define('momo.Application', {
    extend: 'Ext.app.Application',

    requires: [
        'momo.util.ApplicationContext',
        'momo.util.URL',
        'momo.util.Module'
    ],

    name: 'momo',

    stores: [],

    config: {
        applicationContext: null
    },

    /**
     *
     */
    init: function() {
        var me = this;
        var appCtxUtil = momo.util.ApplicationContext;
        var moduleUtil = momo.util.Module;
        var urlUtil = momo.util.URL;

        // disable annoying debug messages from WAI-ARIA 1.0 recommendations.
        Ext.enableAriaButtons = false;
        Ext.enableAriaPanels = false;

        // get the current application ID
        var appId = urlUtil.getUrlQueryParameter('id');

        // load the application context and build the application on success
        appCtxUtil.loadApplicationContext(appId, function() {
            var viewportName = 'momo.view.container.Viewport';
            // create the viewport
            moduleUtil.createViewport(viewportName);
            // and set it to the application
            me.setMainView(viewportName);
        });

    },

    /**
     *
     */
    onAppUpdate: function () {
        Ext.Msg.confirm(
            'Application Update',
            'This application has an update, reload?',
            function (choice) {
                if (choice === 'yes') {
                    window.location.reload();
                }
            }
        );
    }

});
