import { useState } from "react";
import Header from "../components/Header";
import Main from "../components/Main";
import TextInput from "../components/TextInput";

import { allCountries } from '../data/countries';
import Countries from "../components/Countries";
import Country from "../components/Country";

export default function ReactCountriesPage() {
  const [countryFilter, setCountryFilter] = useState('');
  const [visitedCountries, setVisitedCountries] = useState([]);

  function handleCountryFilterChange(newCountryFilter) {
    setCountryFilter(newCountryFilter);
  }

  const countryFilterLowerCase = countryFilter.trim().toLowerCase();

  const filteredCountries = countryFilterLowerCase.length >= 3 ?
  allCountries.filter(({nameLowerCase}) => nameLowerCase.includes(countryFilterLowerCase)) : allCountries


  function toggleVisitedCountry(countryId) {
    let newVisitedCountries = [...visitedCountries];
    const isCountryVisited = newVisitedCountries.indexOf(countryId) !== -1;
    if (isCountryVisited) {
      newVisitedCountries.splice(newVisitedCountries.indexOf(countryId), 1);
    } else {
      newVisitedCountries.push(countryId);
    }
    setVisitedCountries(newVisitedCountries);
  }
  
  return (
    <div>
      <Header>react-countries by @jovemcarlosti</Header>
      <Main>
        <TextInput
          id="inputCountryFilter"
          labelDescription="Informe o nome do país (pelo menos 3 caracteres)"
          inputValue={countryFilter}
          onInputChange={handleCountryFilterChange}
          autoFocus/>

        <Countries>
          <h2 className="text-center font-semibold">
              {filteredCountries.length + (filteredCountries.length === 1 ? ' país' : ' países')}
          </h2>
          <h3 className="text-center font-semibold text-sm">
              {visitedCountries.length + (visitedCountries.length === 1 ? ' país visitado' : ' países visitados')}
          </h3>
          {
            filteredCountries.map(country => {
            const isVisited = visitedCountries.indexOf(country.id) !== -1;
            return <Country isVisited={isVisited} key={country.id} onCountryClick={toggleVisitedCountry}>{country}</Country>
              })
          }
        </Countries>
      </Main>

    </div>
  );
}
