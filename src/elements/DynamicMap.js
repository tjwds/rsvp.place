import { MapContainer, TileLayer, Marker } from "react-leaflet";
import { Icon } from "leaflet";
import "leaflet/dist/leaflet.css";

import styles from "./Map.module.css";

const Map = ({ children, className, width, height, ...rest }) => {
  const newStyles = `${styles.map} ${className}`;

  return (
    <MapContainer className={newStyles} zoom={12} {...rest}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker
        position={rest.center}
        icon={
          new Icon({
            iconUrl: "/marker-icon.png",
            iconSize: [25, 41],
            iconAnchor: [12, 41],
          })
        }
      ></Marker>
    </MapContainer>
  );
};

export default Map;
