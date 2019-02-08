import countries from './assets/countries.json';

/**
 * 
 * @param {String} searchTerm 
 * @param {String[]} excludedCapitals 
 * @return {String[]} array of capitals that match searchTerm
 */
export function searchCapital(searchTerm, excludedCapitals) {
    if (searchTerm.length < 1) {
        return [];
    } else {
        return countries.map(country => country.capital)
            .sort()
            .filter(capital => capital)
            .filter(capital => !excludedCapitals.find(value => value === capital))
            .filter(capital => capital.toLowerCase().indexOf(searchTerm.toLowerCase()) === 0)
            .slice(0, 8);
    }
}

/**
 * 
 * @param {String} capital 
 * @return {String} Timezone name of capital
 */
export function getCapitalTimezone(capital) {
    const country = countries.find(country => country.capital === capital);    
    return country ? country.timezones.find(timezone => timezone.indexOf(capital) > -1) || country.timezones[0] : Intl.DateTimeFormat().resolvedOptions().timeZone;
}

/**
 * 
 * @param {String} countrycode Two-letter (alpha-2) conutry code
 * @return {String} Capital of the country
 */
export function getCapitalByCountry(countrycode) {
    const country = countries.find(country => country.country_code === countrycode);
    return country ? country.capital : undefined;
}