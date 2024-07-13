import { useState,useEffect } from 'react'

export default function CurrencyCard(props){

    const [countries,setCountries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

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

    return(
        <div className="currency-container">
            <img src=""/>
            <p>{props.currencyCode}</p>
            <p>{props.currencySymbol}</p>
            <p>{props.totalAmount}</p>
        </div>
    )
}