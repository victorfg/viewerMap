import TileWMS from 'ol/source/TileWMS';

function municipis() {
	return [
        new TileWMS({
            url: 'https://geoserveis.icgc.cat/servei/catalunya/divisions-administratives/wms',
            params: {
                'LAYERS': 'divisions_administratives_municipis_250000'
            }
        }),
        new TileWMS({
            url: 'https://geoserveis.icgc.cat/servei/catalunya/divisions-administratives/wms',
            params: {
                'LAYERS': 'divisions_administratives_municipis_100000'
            }
        }),
        new TileWMS({
            url: 'https://geoserveis.icgc.cat/servei/catalunya/divisions-administratives/wms',
            params: {
                'LAYERS': 'divisions_administratives_municipis_50000'
            }
        }),
        new TileWMS({
            url: 'https://geoserveis.icgc.cat/servei/catalunya/divisions-administratives/wms',
            params: {
                'LAYERS': 'divisions_administratives_municipis_5000'
            }
        }),
    ]
}

export default municipis;