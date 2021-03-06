/**
 *
 */
Ext.define('momo.view.panel.LegendTreeController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.panel.legendtree',

    /**
     *
     */
    setLegendStore: function() {
        var me = this;
        var view = me.getView();
        var map;

        if (!momo.view.component.Map ||
                !momo.view.component.Map.guess() ||
                !momo.view.component.Map.guess().getMap()) {
            Ext.Logger.warn('Couldn\'t find the map object. It\'s very ' +
                    'unlikely the LegendTree will work properly.');
            return false;
        }

        map = momo.view.component.Map.guess().getMap();

        var legendStore = Ext.create('GeoExt.data.store.LayersTree', {
            layerGroup: map.getLayerGroup()
        });

        // add legendStore filter for "displayInLayerSwitcher" key
        legendStore.addFilter(function(rec) {
            var layer = rec.getOlLayer();
            var util = BasiGX.util.Layer;
            var showKey = util.KEY_DISPLAY_IN_LAYERSWITCHER;
            if (layer.get(showKey) === false) {
                return false;
            }
            return true;
        });

        view.store = legendStore;
    }
});
