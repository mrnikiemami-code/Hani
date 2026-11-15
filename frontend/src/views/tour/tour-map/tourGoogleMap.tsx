"use client";
import React, { useState } from "react";
import {
  GoogleMap,
  Marker,
  InfoWindow,
  useLoadScript,
} from "@react-google-maps/api";
import ImageWithBasePath from "../../../components/image-with-base-path";
import Link from "next/link";

const containerStyle = {
  width: "100%",
  height: "600px",
};

const center = {
  lat: 53.470692,
  lng: -2.220328,
};

// Define the type for location data
interface Location {
  id: number;
  lat: number;
  lng: number;
  grid_name: string;
  grid_address: string;
  grid_day: string;
  grid_rate: string;
  image: string;
  grid_star: string;
}

const locations: Location[] = [
  {
    id: 1,
    lat: 53.470692,
    lng: -2.220328,
    grid_name: "Crystal Lake",
    grid_address: "Deansgate, Manchester",
    grid_day: "5 Day, 4 Night",
    grid_rate: "$300",
    image: "assets/img/tours/tours-09.jpg",
    grid_star: "4.9",
  },
  {
    id: 2,
    lat: 53.469189,
    lng: -2.199262,
    grid_name: "Mystic Falls",
    grid_address: "Princes Street, Edinburgh",
    grid_day: "3 Day, 2 Night",
    grid_rate: "$600",
    image: "assets/img/tours/tours-08.jpg",
    grid_star: "4.5",
  },
  {
    id: 3,
    lat: 53.468665,
    lng: -2.189269,
    grid_name: "Rainbow Mountain Valley",
    grid_address: " Ciutat Vella, Barcelona",
    grid_day: "4 Day, 3 Night",
    grid_rate: "$500",
    image: "assets/img/tours/tours-07.jpg",
    grid_star: "5.0",
  },
];

const TourGoogleMap: React.FC = () => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyD6adZVdzTvBpE2yBRK8cDfsss8QXChK0I", // Replace with your API key
  });

  const [selectedMarker, setSelectedMarker] = useState<Location | null>(locations[0]);



  if (!isLoaded) return <div>Loading Map...</div>;

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={14}
      options={{
        scrollwheel: false,
        mapTypeId: "roadmap",
      }}
    >
      {locations.map((location) => (
        <Marker
          key={location.id}
          position={{ lat: location.lat, lng: location.lng }}
          onClick={() => setSelectedMarker(location)}
        />
      ))}

      {selectedMarker && (
        <InfoWindow
          position={{ lat: selectedMarker.lat, lng: selectedMarker.lng }}
          onCloseClick={() => setSelectedMarker(null)}
        >
          <div>
            <div className="card">
              <div className="card-img">
                <Link href="#" className="property-img">
                  <ImageWithBasePath
                    className="img-fluid w-100"
                    alt="img"
                    src={selectedMarker.image}
                  />
                </Link>
              </div>
              <div className="card-body">
                <h5 className="title mb-2">
                  <Link href="#" tabIndex={-1}>
                    {selectedMarker.grid_name}
                  </Link>
                </h5>
                <p className="mb-3">
                  <i className="isax isax-location"></i>{" "}
                  {selectedMarker.grid_address}
                </p>
                <div className="d-flex align-items-center justify-content-between">
                  <div className="d-flex align-items-center">
                    <h4 className="text-primary border-end pe-2 me-2">
                      {selectedMarker.grid_rate}
                    </h4>
                    <p>{selectedMarker.grid_day}</p>
                  </div>
                  <span className="badge badge-warning text-dark">
                    {selectedMarker.grid_star}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </InfoWindow>
      )}
    </GoogleMap>
  );
};

export default TourGoogleMap;
