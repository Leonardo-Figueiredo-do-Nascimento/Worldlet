import { useState,useEffect } from 'react'
import './CountryInput.css'
import Autosuggest from 'react-autosuggest';

export default function CountryInput({onCountrySelect}) {
  const [countries,setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [value,setValue] = useState('')
  const [suggestions,setSuggestions] = useState([])
  
  useEffect(() => {
    fetch('https://restcountries.com/v3.1/all?fields=name,flags')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setCountries(data);
        setLoading(false);
      })
      .catch(error => {
        setError(error);
        setLoading(false);
      });
  }, []);
  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error: {error.message}</div>;
  }
  
  const getSuggestions = value => {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;
  
    return inputLength === 0 ? [] : countries.filter(country =>
      country.name.common.toLowerCase().slice(0, inputLength) === inputValue
    );
  };
  
  const getSuggestionValue = suggestion => suggestion.name.common;

  const onChange = (event, { newValue }) => {
    setValue(newValue);
  };

  const renderSuggestion = suggestion => (
    <div className="suggestion-content">
        <img src={suggestion.flags.png} className="suggestion-flag"/>
        <span className="suggestion-name">{suggestion.name.common}</span>
    </div>
  );

  const onSuggestionsFetchRequested = ({ value }) => {
    setSuggestions(getSuggestions(value));
  };

  const onSuggestionsClearRequested = () => {
    setSuggestions([]);
  };

  const onSuggestionSelected = (event, { suggestion }) => {
    onCountrySelect(suggestion.name.common);
  };
  
  const inputProps = {
    placeholder: 'Enter your country',
    value,
    onChange
  };

  return (
    <div className="country-input">
      <Autosuggest
        suggestions={suggestions}
        onSuggestionsFetchRequested={onSuggestionsFetchRequested}
        onSuggestionsClearRequested={onSuggestionsClearRequested}
        getSuggestionValue={getSuggestionValue}
        renderSuggestion={renderSuggestion}
        inputProps={inputProps}
        onSuggestionSelected={onSuggestionSelected}
      />
    </div>
  );
}  