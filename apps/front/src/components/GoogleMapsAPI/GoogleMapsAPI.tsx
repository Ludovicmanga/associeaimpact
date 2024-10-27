import React, { useState, useEffect, useRef } from "react";
import {
  APIProvider,
  AdvancedMarker,
  Map,
  useMap,
  useMapsLibrary,
  useAdvancedMarkerRef,
} from "@vis.gl/react-google-maps";
import styles from "./GoogleMapsApi.module.css";
import { TextField } from "@mui/material";

export default function GoogleMapsAPI(props: {
  selectedPlace: google.maps.places.PlaceResult | null;
}) {
  const [selectedPlace, setSelectedPlace] =
    useState<google.maps.places.PlaceResult | null>(null);
  const [markerRef, marker] = useAdvancedMarkerRef();

  return (
    <APIProvider
      apiKey={process.env.REACT_APP_API_KEY!}
      solutionChannel="GMP_devsite_samples_v3_rgmautocomplete"
    >
      <Map
        mapId={"bf51a910020fa25a"}
        defaultZoom={3}
        defaultCenter={{ lat: 22.54992, lng: 0 }}
        gestureHandling={"greedy"}
        disableDefaultUI={true}
      >
        <AdvancedMarker ref={markerRef} position={null} />
      </Map>
      <MapHandler place={props.selectedPlace} marker={marker} />
      <PlaceAutocomplete onPlaceSelect={setSelectedPlace} />
    </APIProvider>
  );
}

interface MapHandlerProps {
  place: google.maps.places.PlaceResult | null;
  marker: google.maps.marker.AdvancedMarkerElement | null;
}

export const MapHandler = ({ place, marker }: MapHandlerProps) => {
  const map = useMap();

  useEffect(() => {
    if (!map || !place || !marker) return;

    if (place.geometry?.viewport) {
      map.fitBounds(place.geometry?.viewport);
    }
    marker.position = place.geometry?.location;
  }, [map, place, marker]);

  return null;
};

interface PlaceAutocompleteProps {
  onPlaceSelect: (place: google.maps.places.PlaceResult | null) => void;
  placeInputErrorHelperText?: string;
  placeInputError?: boolean;
}

export const PlaceAutocomplete = (props: PlaceAutocompleteProps) => {
  const [placeAutocomplete, setPlaceAutocomplete] =
    useState<google.maps.places.Autocomplete | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const places = useMapsLibrary("places");

  useEffect(() => {
    if (!places || !inputRef.current) return;

    const options = {
      fields: ["geometry", "name", "formatted_address"],
    };

    setPlaceAutocomplete(new places.Autocomplete(inputRef.current, options));
  }, [places]);

  useEffect(() => {
    if (!placeAutocomplete) return;

    placeAutocomplete.addListener("place_changed", () => {
      props.onPlaceSelect(placeAutocomplete.getPlace());
    });
  }, [props.onPlaceSelect, placeAutocomplete]);

  return (
    <div>
      <TextField
        placeholder="Ex: Paris"
        inputRef={(ref) => {
          inputRef.current = ref;
        }}
        className={styles.searchInput}
        error={props.placeInputError}
        helperText={props ? props.placeInputErrorHelperText : ""}
      />
    </div>
  );
};
