import './css/styles.css';
import _debounce from 'lodash.debounce';
import Notiflix from 'notiflix';

const DEBOUNCE_DELAY = 600;
const COUNTRIES_API = txt =>
  `https://restcountries.com/v3.1/name/${txt}`;

const refs = {
    seachBox: document.querySelector('#search-box'),
    contryList: document.querySelector('.country list'),
    countryInfo: document.querySelector('.country-info'),
}

function fetchCountries(txt) {
    if (!txt) {
        countryList.innerHTML = '';
        return;
      }    
fetch(COUNTRIES_API(txt))
.then(response => {
    if (!response.ok) {
        countryList.innerHTML = `<h2>No country with that name</h2>`;
        Notiflix.Notify.failure('Oops, there is no country with that name');
      } else return response.json();
    })
.then(countries => {
    if (countries.length === 1) {
        refs.countryInfo.innerHTML = renderCountryInfo(countries[0]);
} else {
    const countriesArray = countries.map(country => renderCountriesList(country)).join('');
    refs.contryList.insertAdjacentHTML('beforeend', countriesArray);
}
})};

function renderCountriesList({flags, name}) {
    return `<li class="country-listInfo>
    <img class="country-flag" src="${flags.svg}"/>
    <h2 class="country-list-name">${name.official}</h2>
    </li>
    `;
}

function renderCountryInfo({name, flags, capital, population, languages}) {
    return `
    <h2>
    <img style="" width: 60px" scr=${flags.svg}/>
    ${name.official}</h2>
    
    <div class="country-secondary-info">
    <p><b>capital:</b> ${capital} </p>
    <p><b>population:</b>${population}</p>
    <p><b>languages:</b> ${Object.values(languages)}</p>
    </div>
    </li>
    `;
}
  
refs.seachBox.addEventListener('input', (e) => 
_debounce((fetchCountries(e.target.value)), DEBOUNCE_DELAY))