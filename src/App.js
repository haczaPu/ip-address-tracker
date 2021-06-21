import "./style/style.css";
import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import arrrow from "./images/icon-arrow.svg";
import icon from "./images/icon-location.svg";
import L from "leaflet";

//const base = { locations: { lat: 0, lng: 0 } };

function App() {
  const [result, setResult] = useState(null);
  const [searchAddress, setSearchAddress] = useState("");
  //const [isLoading, setIsLoading] = useState(true);

  const API_KEY = "at_wxjbcGsz1eJ8eG1UD3gAYPq7sJKJ9";

  //Fetch initial IP adress
  useEffect(() => {
    fetch(`https://geo.ipify.org/api/v1?apiKey=${API_KEY}`)
      .then(response => response.json())
      .then(data => {
        setResult(data);
        console.log(data);
        //setIsLoading(false);
      });
  }, []);

  //Search input
  const handleSearchInput = e => {
    setSearchAddress(e.target.value);
    console.log(e.target.value);
  };
  //Search
  const handleSearchIp = e => {
    e.preventDefault();
    //setIp(searchAddress);
    fetch(`https://geo.ipify.org/api/v1?apiKey=${API_KEY}&ipAddress=${searchAddress}`)
      .then(response => response.json())
      .then(data => {
        setResult(data);
        console.log(data);
      });

    setSearchAddress("");
  };

  //Create marker
  const markerIcon = new L.icon({
    iconUrl: [icon],
    iconSize: [40, 50],
    iconAnchor: [20, 50],
  });

  //Blocker
  if (!result) return null;

  return (
    <div className="App">
      <header>
        <h1>IP Address Tracker</h1>
        <div className="search">
          <input
            type="text"
            value={searchAddress}
            placeholder="Search for any IP address or domain"
            onChange={handleSearchInput}
          ></input>
          <button onClick={handleSearchIp}>
            <img src={arrrow} alt="" />
          </button>
        </div>

        <div className="adress-container">
          <div className="title">
            <h2>IP ADDRESS</h2>
            <div>{result.ip}</div>
          </div>
          <div className="title">
            <h2>LOCATION</h2>
            <div>
              {result.location.region},{result.location.city}
            </div>
          </div>
          <div className="title">
            <h2>TIMEZONE</h2>
            <div>UTC {result.location.timezone}</div>
          </div>
          <div className="title">
            <h2>ISP</h2>
            <div>{result.isp}</div>
          </div>
        </div>
      </header>
      <MapContainer center={[result.location.lat, result.location.lng]} zoom={13} scrollWheelZoom={true}>
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[result.location.lat, result.location.lng]} icon={markerIcon}></Marker>
      </MapContainer>
    </div>
  );
}

export default App;
