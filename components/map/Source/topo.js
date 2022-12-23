import TileWMS from 'ol/source/TileWMS';

function topo() {
	return new TileWMS({
        url: 'https://geoserveis.icgc.cat/icc_mapesbase/wms/service?',
        params: {
            'LAYERS': 'mtc5m'
        }
    })
}

export default topo;