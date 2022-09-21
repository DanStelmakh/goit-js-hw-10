//    /Fetch Country
function fetchCountry(countryName) {
  const url = `https://restcountries.com/v3.1/name/${countryName}`;
  const filterOptions = '?fields=name,capital,population,flags,languages';
  return fetch(url + filterOptions).then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  });
}
export default { fetchCountry };
