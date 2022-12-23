import TileWMS from 'ol/source/TileWMS';

function topo() {
	return new TileWMS({
        url: 'https://geoserveis.icgc.cat/servei/catalunya/topografia-territorial/wms',
        params: {
            'LAYERS': 'topografia-territorial'
        }
    })
}

export default topo;