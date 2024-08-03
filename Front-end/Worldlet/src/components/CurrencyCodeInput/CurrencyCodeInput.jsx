import { useState, useEffect } from 'react';
import './CurrencyCodeInput.css';
import Autosuggest from 'react-autosuggest';

export default function CurrencyCodeInput({ onCurrencySelect }) {
  const [currencies, setCurrencies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [value, setValue] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    fetch('https://restcountries.com/v3.1/all?fields=name,flags,currencies')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setCurrencies(data);
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

    return inputLength === 0
      ? []
      : currencies.filter(country =>
          Object.keys(country.currencies).some(currencyCode =>
            currencyCode.toLowerCase().startsWith(inputValue)
          )
        );
  };

  const getSuggestionValue = suggestion => {
    const currencyCode = Object.keys(suggestion.currencies)[0];
    const currency = suggestion.currencies[currencyCode];
    return `${currencyCode}`;
  };

  const onChange = (event, { newValue }) => {
    setValue(newValue);
  };

  const renderSuggestion = suggestion => {
    const currencyCode = Object.keys(suggestion.currencies)[0];
    const currency = suggestion.currencies[currencyCode];
    return (
      <div className="suggestion-content">
        <img src={suggestion.flags.png} alt="flag" className="suggestion-flag" />
        <span className="suggestion-name">{`${currencyCode} - ${currency.name} (${currency.symbol})`}</span>
      </div>
    );
  };

  const onSuggestionsFetchRequested = ({ value }) => {
    setSuggestions(getSuggestions(value));
  };

  const onSuggestionsClearRequested = () => {
    setSuggestions([]);
  };

  const onSuggestionSelected = (event, { suggestion }) => {
    const currencyCode = Object.keys(suggestion.currencies)[0];
    onCurrencySelect(currencyCode);
  };

  const inputProps = {
    placeholder: 'Enter the currency code',
    value,
    onChange,
  };

  return (
    <div className="currency-input">
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