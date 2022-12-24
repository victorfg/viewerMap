import {register} from 'ol/proj/proj4';
import proj4 from 'proj4';
import {get as getProjection} from 'ol/proj';
import { cataloniaCoord } from './Constants';

const setProjection_EPSG_25831 = () => {
    proj4.defs("EPSG:25831","+proj=utm +zone=31 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs");
    register(proj4);
    return null;
}

const setExtension = () => {
    const projection = getProjection('EPSG:25831');
    projection.setExtent(cataloniaCoord);
    return projection;  
}

export {
    setProjection_EPSG_25831,
    setExtension
};