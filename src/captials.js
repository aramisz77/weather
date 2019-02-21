import countries from './assets/countries.json';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';

/**
 * 
 * @param {String} searchTerm 
 * @param {String[]} excludedCapitals 
 * @return {Observable<String[]>} array of capitals that match searchTerm
 * @summary search in a local database, but mimic api behavior by returning an observable with 300ms delay
 */
export function searchCapital(searchTerm, excludedCapitals) {
    const source = (searchTerm.length < 1) ? [] : countries.map(country => country.capital)
        .sort()
        .filter(capital => capital)
        .filter(capital => !excludedCapitals.find(value => value === capital))
        .filter(capital => capital.toLowerCase().indexOf(searchTerm.toLowerCase()) === 0)
        .slice(0, 8);

        return of(source).pipe(
            delay(300)
        );
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