// page.js
"use client";
import React, { useState, useEffect ,useRef} from 'react';

import Link from "next/link";

import "mapbox-gl/dist/mapbox-gl.css";
import Map, { Marker, Popup, NavigationControl, GeolocateControl } from "react-map-gl";

import "mapbox-gl/dist/mapbox-gl.css";

import LocalClass from "../LocalComponents/mapComponents/page.module.css";

export default function Home(props) {
	const mapboxToken = "pk.eyJ1IjoibWFtbmlkeiIsImEiOiJjanZsNnhhZ24wdDE1NDlwYmRvczJzNDk2In0.Bl06Qp0TgR-KfisAsKbciQ"
    const [selectedMarker, setSelectedMarker] = useState(null);
	const mapRef = useRef(null);
    const [location,setLocation ] = useState([{lng:123.841,lat:8.1822}])
    const [initialLocation,setInitialLocation ] = useState(undefined)


	const zoomToSelectedLoc = (e, airport, index) => {
		// stop event bubble-up which triggers unnecessary events
		e.stopPropagation();
		setSelectedMarker({ airport, index });
		mapRef.current.flyTo({ center: [airport.lon, airport.lat], zoom: 10 });
	};

	useEffect(() => {
		setInitialLocation(props.initialLocation)

	
		try {	
			console.log(props.initialLocation)
			console.log('i was rerendered',props.initialLocation, props.initialLocation)
		} catch (error) {
				console.log('error setInitialLocation',error)
		}
	}, [])
    const addItem =(item)=>{
		console.log(item)
        // setLocation([...location, { lng: item.lng, lat: item.lat }]);
        setLocation([{ lng: item.lng, lat: item.lat }])
        props.coordinates({ lng: item.lng, lat: item.lat })
    }
	const displayContent =()=>{
		try {
		return	(
        
				<main className={props.mainStyle}>
		<Map
		mapboxAccessToken={mapboxToken}
		mapStyle="mapbox://styles/mapbox/streets-v12"
		style={LocalClass.mapStyle}
		initialViewState={{ latitude: initialLocation.lat, longitude: initialLocation.lng, zoom: 12 }}
		maxZoom={20}
		minZoom={3}
		onClick={(e)=> addItem(e.lngLat)}
					>
						<GeolocateControl position="top-left" />
						<NavigationControl position="top-left" />
						{location.map((airport, index) => {
							return (
								<Marker key={index} longitude={airport.lng} latitude={airport.lat}/>
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
								<h3 className={classes.popupTitle}>{selectedMarker.airport.name}</h3>
								<div className={classes.popupInfo}>
									<label className={classes.popupLabel}>Code: </label>
									<span>{selectedMarker.airport.code}</span>
									<br />
									<label className={classes.popupLabel}>Country: </label>
									<span>{selectedMarker.airport.country}</span>
									<br />
									<label className={classes.popupLabel}>Website: </label>
									<Link
										href={selectedMarker.airport.url === "" ? "#" : selectedMarker.airport.url}
										target={selectedMarker.airport.url === "" ? null : "_blank"}
										className={classes.popupWebUrl}
									>
										{selectedMarker.airport.url === "" ? "Nil" : selectedMarker.airport.url}
									</Link>
								</div>
							</Popup>
						) : null}
					</Map>
				</main>
			);
		} catch (error) {
			
		}
	}
	return initialLocation != undefined ? displayContent(): <><p>WHER</p></>
}

							{/* <button
								type="button"
								className="cursor-pointer"
								onClick={(e) => zoomToSelectedLoc(e, airport, index)}
							>
							TEST
							</button>
						</Marker> */}