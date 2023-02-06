import './css/styles.css';

const DEBOUNCE_DELAY = 300;

const refs = {
    input: document.querySelector('#search-box'),
    contryList: document.querySelector('.country list'),
    countryInfo: document.querySelector('.country-info'),
}

const name = 'peru';

refs.input.addEventListener('input', debounce(searchCountries, DEBOUNCE_DELAY));

function fetchCountries(name) {
    return fetch(`https://restcountries.com/v3.1/name/${name}?fields=name,capital,population,flags,languages`)
.then(response => {
    console.log('country', response.json());
    return response.json();
})};


console.log(fetchCountries(name));

function searchCountries(e) {
    const inputData = refs.input.ariaValueMax.trim();
    fetchCountries(inputData).then(renderCountryList);
}

fetchCountries(name).then(renderCountryList)

function renderCountryList(responceAPI) {
    console.log(responceAPI);
    if (responceAPI.length === 1) {
        refs.countryInfo.innerHTML = renderCountryInfo(responceAPI[0]);
} else {
    const renderListCountry = responceAPI.map(country => renderCountriesList(country)).join('');
    refs.contryList.insertAdjacentHTML('beforeend', renderListCountry);
}
};

function renderCountriesList({flags, name}) {
    return `<li class="country-listInfo>
    <img class="country-flag" src="${flags.svg}"/>
    <h2 class="country-list-name">${name.official}</h2>
    </li>
    `;
}

function renderCountryInfo({name, flags, capital, population, languages}) {
    return `<li class="country-main-info">
    <div class="wrapper-county-info">
    <img class = "country-flag-info" scr='${flags.svg}'/>
    <h2 class="country-list-name">${name.official}</h2>
    </div>
    <div class="country-secondary-info">
    <p><b>capital:</b> ${capital} </p>
    <p><b>population:</b>${population}</p>
    <p><b>languages:</b> ${Object.values(languages)}</p>
    </div>
    </li>
    `;
}
