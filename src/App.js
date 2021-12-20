import logo from './logo.svg';
import './App.css';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
import React, {
    useEffect,
    useState
} from 'react';
import 'leaflet/dist/leaflet.css';
import Leaflet from 'leaflet'

Leaflet.Icon.Default.imagePath =
'../node_modules/leaflet'

delete Leaflet.Icon.Default.prototype._getIconUrl;

Leaflet.Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png')
});


function App() {

  const [position, setPosition] = useState([-7.396387320495131, 109.69467393070407])
  const [firstLoad, setFirstLoad] = useState(true)

  useEffect(() => {
    if(firstLoad){
      getData() 
      setFirstLoad(false)
    } else {
      const intervalId = setInterval(() => {  //assign interval to a variable to clear it.
        getData() 
      }, 6000)

      return () => clearInterval(intervalId); //This is important
    }
  }, [firstLoad])

  const getData = () => {
    fetch("http://api.open-notify.org/iss-now.json")
        .then(response => response.json())
        .then(data => {
            const iss_position = data.iss_position
            setPosition([iss_position.latitude, iss_position.longitude])
            
        })
        .catch(error => {
          console.log(error)
        })
  }

  function SetViewOnClick({ coords }) {
    const map = useMap();
    map.setView(coords, map.getZoom());

    return null;
  }
  
  return (
    <MapContainer center={position} zoom={3} scrollWheelZoom={false} style={{ height: '100vh', width: '100wh' }}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <SetViewOnClick coords={position} />
      <Marker position={position}>
        <Popup>
          International Space Station <br/> { position[0] }, { position[1] }
        </Popup>
      </Marker>
    </MapContainer>
  );
}

export default App;
