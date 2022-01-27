import React, { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  CircleMarker,
  Tooltip,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import axios from "axios";

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});

function MyMap(props) {
  const [acces, setAcces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_BASE_URL}/accessibility/address?address=${props.address}`,
        {
          headers: {
            accept: "*/*",
            "Content-Type": "application/json",
          },
        }
      )
      .then(function (response) {
        console.log(response.data.data);
        if (response.data.data.length !== 0) {
          setAcces(response.data.data);
        } else {
          setError(true);
        }
        setLoading(false);
      })
      .catch(function (err) {
        setError(true);
        setLoading(false);
      });
  }, []);
  console.log(acces);
  console.log(parseFloat(props.complex.latitude));

  return (
    <MapContainer
      center={[
        parseFloat(props.complex.latitude),
        parseFloat(props.complex.longitude),
      ]}
      zoom={13}
      scrollWheelZoom={false}
      style={{ height: "70vh", width: "70vw" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[props.complex.latitude, props.complex.longitude]}>
        <Popup>
        {props.complex.name}
        </Popup>
      </Marker>
      {!error & !loading & ((acces?.length !== 0) & (acces !== null)) &&
        acces.map((item) => (
          <CircleMarker
            center={[item.latitude, item.longitude]}
            pathOptions={{ color: "red" }}
            radius={10}
          >
            <Tooltip>Tooltip for CircleMarker</Tooltip>
          </CircleMarker>
        ))}
    </MapContainer>
  );
}

export default MyMap;
