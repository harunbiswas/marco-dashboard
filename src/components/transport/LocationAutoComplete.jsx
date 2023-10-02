import { useEffect, useState } from "react";
import Autocomplete from "react-autocomplete-input";
import "react-autocomplete-input/dist/bundle.css";

const LocationAutoComplete = () => {
  const [options, setOptions] = useState([]);
  const [value, setValue] = useState("");

  useEffect(() => {
    // Fetch data from the Google Maps service
    // Replace 'YOUR_API_KEY' with your actual Google Maps API key
    fetch(
      `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${value}&key=AIzaSyA4ZZ5jJ98FlDnIUnimv-OmA18tWiPqYuk`
    )
      .then((response) => response.json())
      .then((data) => {
        // Extract the options from the data received
        const extractedOptions = data.predictions.map(
          (prediction) => prediction.description
        );
        setOptions(extractedOptions);
      })
      .catch((error) => {
        console.error("Error fetching data from Google Maps service:", error);
      });
  }, [value]);

  const handleSelect = (selectedValue) => {
    setValue(selectedValue);
  };

  return (
    <Autocomplete options={options} onSelect={handleSelect} value={value} />
  );
};

export default LocationAutoComplete;

// LocationAutoComplete
