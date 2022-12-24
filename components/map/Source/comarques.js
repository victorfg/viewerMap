import TileWMS from 'ol/source/TileWMS';

function comarques() {
    return [
        new TileWMS({
            url: 'https://geoserveis.icgc.cat/servei/catalunya/divisions-administratives/wms',
            params: {
                'LAYERS': 'divisions_administratives_comarques_1000000'
            }
        }),
        new TileWMS({
            url: 'https://geoserveis.icgc.cat/servei/catalunya/divisions-administratives/wms',
            params: {
                'LAYERS': 'divisions_administratives_comarques_500000'
            }
        }),
        new TileWMS({
            url: 'https://geoserveis.icgc.cat/servei/catalunya/divisions-administratives/wms',
            params: {
                'LAYERS': 'divisions_administratives_comarques_250000'
            }
        }),
        new TileWMS({
            url: 'https://geoserveis.icgc.cat/servei/catalunya/divisions-administratives/wms',
            params: {
                'LAYERS': 'divisions_administratives_comarques_100000'
            }
        }),
        new TileWMS({
            url: 'https://geoserveis.icgc.cat/servei/catalunya/divisions-administratives/wms',
            params: {
                'LAYERS': 'divisions_administratives_comarques_50000'
            }
        }),
        new TileWMS({
            url: 'https://geoserveis.icgc.cat/servei/catalunya/divisions-administratives/wms',
            params: {
                'LAYERS': 'divisions_administratives_comarques_5000'
            }
        })
    ]
}

export default comarques;