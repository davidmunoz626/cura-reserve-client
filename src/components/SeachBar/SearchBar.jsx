import usePlacesAutocomplete, { getGeocode, getLatLng } from "use-places-autocomplete";
import useOnclickOutside from "react-cool-onclickoutside";
import './SearchBar.css'
import propertiesService from "../../services/Properties.service";
import { useNavigate } from 'react-router-dom'
import { Next } from "react-bootstrap/esm/PageItem";


const PlacesAutocomplete = ({ setLocation, setPropertiesLocation, setplaceName }) => {
  const { ready, value,
    suggestions: { status, data }, setValue, clearSuggestions, } = usePlacesAutocomplete({
      requestOptions: {},
      debounce: 300,
    });
  const ref = useOnclickOutside(() => {

    clearSuggestions();
  });

  const handleInput = (e) => {
    // Update the keyword of the input element
    setValue(e.target.value);
  };

  const navigate = useNavigate()
  const handleSelect =
    ({ description, structured_formatting }) =>
      () => {
        // When user selects a place, we can replace the keyword without request data from API
        // by setting the second parameter to "false"

        setplaceName && setplaceName(structured_formatting.main_text)
        setValue(description, false);
        clearSuggestions();

        // Get latitude and longitude via utility functions
        getGeocode({ address: description })
          .then((results) => {
            const { lat, lng } = getLatLng(results[0]);
            const location = { lat, lng }
            setLocation(location)

            propertiesService
              .getLocationProperties(location)
              .then(({ data }) => {
                setPropertiesLocation(data)
              })
              .catch(err => console.log(err))
          });
      };

  const renderSuggestions = () =>
    data.map((suggestion) => {
      const {
        place_id,
        structured_formatting: { main_text, secondary_text },
      } = suggestion;

      return (
        <li className="SeachBarLi" key={place_id} onClick={handleSelect(suggestion)}>
          <strong>{main_text}</strong> <small>{secondary_text}</small>
        </li>
      );
    });


  return (
    <div ref={ref} className='SeachBarDiv'>
      <input
        className="SeachBar"
        value={value}
        onChange={handleInput}
        disabled={!ready}
        placeholder="Empieza tu búsqueda"
      />
      {/* We can use the "status" to decide whether we should display the dropdown or not */}
      {status === "OK" && <ul className="SeachBarUl">{renderSuggestions()}</ul>}
    </div>
  );
};

export default PlacesAutocomplete

