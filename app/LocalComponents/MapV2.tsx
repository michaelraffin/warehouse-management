"use client";
import React, { useState, useRef } from "react";
import Map, {
  Marker,
  Popup,
  NavigationControl,
  GeolocateControl,
} from "react-map-gl";

import Link from "next/link";
import LocalClass from "../LocalComponents/mapComponents/page.module.css";
const MapComponent = () => {
  // const mapboxToken = 'YOUR_MAPBOX_ACCESS_TOKEN'; // Replace with your Mapbox access token
  const mapboxToken =
    "pk.eyJ1IjoibWFtbmlkeiIsImEiOiJjanZsNnhhZ24wdDE1NDlwYmRvczJzNDk2In0.Bl06Qp0TgR-KfisAsKbciQ";
  const [selectedMarker, setSelectedMarker] = useState(null);
  const mapRef = useRef(null);
  const [location, setLocation] = useState([{ lng: 123.841, lat: 8.1822 }]);
  const [initialLocation, setInitialLocation] = useState([
    { lng: 123.841, lat: 8.1822 },
  ]);
  const [viewport, setViewport] = useState({
    width: "90%",
    height: "90%",
    latitude: 8.1822,
    longitude: 123.841,
    zoom: 12,
  });
  const addItem = (item) => {
    console.log(item);
    // setLocation([...location, { lng: item.lng, lat: item.lat }]);
    setLocation([{ lng: item.lng, lat: item.lat }]);
  };
  return (
    <main className={LocalClass.vendorMainStyle}>
      <Map
        mapboxAccessToken={mapboxToken}
        mapStyle="mapbox://styles/mapbox/light-v11"
        style={LocalClass.mapStyle}
        initialViewState={{
          latitude: initialLocation.lat,
          longitude: initialLocation.lng,
          zoom: 12,
        }}
        // maxZoom={120}
        // minZoom={3}
        onClick={(e) => addItem(e.lngLat)}
      >
        <GeolocateControl position="top-left" />
        <NavigationControl position="top-left" />
        {location.map((airport, index) => {
          return (
            <Marker
              key={index}
              longitude={airport.lng}
              latitude={airport.lat}
            />
          );
        })}
        {selectedMarker ? (
          <Popup
            offset={25}
            latitude={selectedMarker.airport.lat}
            longitude={selectedMarker.airport.lon}
            onClose={() => {
              setSelectedMarker(null);
            }}
            closeButton={false}
          >
            <h3 className={classes.popupTitle}>
              {selectedMarker.airport.name}
            </h3>
            <div className={classes.popupInfo}>
              <label className={classes.popupLabel}>Code: </label>
              <span>{selectedMarker.airport.code}</span>
              <br />
              <label className={classes.popupLabel}>Country: </label>
              <span>{selectedMarker.airport.country}</span>
              <br />
              <label className={classes.popupLabel}>Website: </label>
              <Link
                href={
                  selectedMarker.airport.url === ""
                    ? "#"
                    : selectedMarker.airport.url
                }
                target={selectedMarker.airport.url === "" ? null : "_blank"}
                className={classes.popupWebUrl}
              >
                {selectedMarker.airport.url === ""
                  ? "Nil"
                  : selectedMarker.airport.url}
              </Link>
            </div>
          </Popup>
        ) : null}
      </Map>
    </main>
  );
};

export default MapComponent;
