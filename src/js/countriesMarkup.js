import fetchCountries from './fetchCountries';
import countriesListTpl from '../templates/countriesList.hbs';
import countrytTpl from '../templates/country.hbs';

import _debounce from 'lodash.debounce';
import { error } from '@pnotify/core';
import '@pnotify/core/dist/BrightTheme.css';

const inputRef = document.querySelector('.input-search');
const queryMarkupRef = document.querySelector('.query-result')

inputRef.addEventListener('input', _debounce(renderQueryMarkup, 500));

function renderQueryMarkup(evt) {
    const query = evt.target.value;
    clearCountriesMarkUp()

    fetchCountries(query)
        .then(data => {
            console.log(data.length)
            
         if(data.length === 1) {
               renderCountryMarkup(data)
            } else if (data.length > 1 && data.length < 10){
               renderCountriesMarkup(data)
            } else {
             error({
                 text: 'Too many matches found. Please enter a more specific query',
              })
           }    
        }).catch(error => console.log(error))
}

function renderCountryMarkup(data) {
    queryMarkupRef.innerHTML = countrytTpl(data)
}

function renderCountriesMarkup(data) {
      queryMarkupRef.innerHTML = countriesListTpl(data)
}

function clearCountriesMarkUp() {
  queryMarkupRef.innerHTML = '';
}