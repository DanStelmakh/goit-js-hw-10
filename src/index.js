import './css/styles.css';
import Notiflix from 'notiflix';
import API from './fetchCountries';
// import debounce from 'lodash.debounce';
const debounce = require('lodash.debounce');

const DEBOUNCE_DELAY = 300;

// / Элементы html
const listEl = document.querySelector('.country-list');
const inputEl = document.querySelector('#search-box');
const countryInfoEl = document.querySelector('.country-info');

inputEl.addEventListener('input', debounce(fetchCountries, DEBOUNCE_DELAY));

function fetchCountries(name) {
  console.log(name);
  //   const input = name.currentTarget;
  const inputValue = name.target.value.trim();
  console.log(inputValue);

  API.fetchCountry(inputValue).then(renderCountryCard).catch(onFetchError);
}

//   /Render page
function renderCountryCard(countries) {
  listEl.innerHTML = '';
  countryInfoEl.innerHTML = '';

  if (countries.length > 10) {
    Notiflix.Notify.warning(
      'Too many matches found. Please enter a more specific name.'
    );
  }

  if (countries.length >= 2 && countries.length <= 10) {
    const list = countries
      .map(
        ({ flags, name }) => `
     <li class="country__item">
     <img src="${flags.svg}" alt="${name.official}" width = "50" height ="20" />
     <p class="country__title">${name.official}</p>
   </li>`
      )
      .join('');
    listEl.innerHTML = list;
  }
  if (countries.length === 1) {
    const markUp = countries
      .map(
        ({ flags, name, capital, population, languages }) => `
     <div class="block">
        <img class="flag" src="${flags.svg}" alt="${
          name.official
        }" width="100" />
        <h2 class="country-name">${name.official}</h2>
     </div>
     <ul class="country-card">
         <li class="country-card__descr">Capital: ${capital}</li>
        <li class="country-card__descr">Population: ${population}</li>
        <li class="country-card__descr">Languages: ${Object.values(
          languages
        )}</li>
     </ul> `
      )
      .join('');
    countryInfoEl.innerHTML = markUp;
  }
}
// !Разобраться с ошибкой
//   /Error
function onFetchError(nameCountry) {
  const url = `https://restcountries.com/v3.1/name/${nameCountry}`;
  return fetch(url).then(response => {
    if (!response.ok) {
      Notiflix.Notify.failure('Oops, there is no country with that name');
    }
  });
}
// onFetchError(213);
