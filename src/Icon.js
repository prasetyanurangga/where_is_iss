import L from 'leaflet';

const iconISS = new L.Icon({
    iconUrl: require('./image/satellite.png'),
    iconRetinaUrl: require('./image/satellite.png'),
    iconAnchor: null,
    popupAnchor: null,
    shadowUrl: null,
    shadowSize: null,
    shadowAnchor: null,
    iconSize: new L.Point(60, 75),
    className: 'leaflet-div-icon'
});

export { iconISS };
