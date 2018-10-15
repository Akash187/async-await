const axios = require('axios');

const getExchangeRate = async (from, to) => {
  try {
    const res = await axios.get('http://data.fixer.io/api/latest?access_key=6014f6a31aba18b15db0082b87f00945&format=1');
    const euro = 1 / res.data.rates[from];
    const rate = euro * res.data.rates[to];

    if (isNaN(rate)) {
      throw new Error();
    }
    return rate;
  } catch (e) {
    throw new Error(`Unable to get exchange rate for ${from} and ${to}.`);
  }
};

const getCountries = async (currencyCode) => {
  try {
    const response = await axios.get(`https://restcountries.eu/rest/v2/currency/${currencyCode}`);
    return response.data.map((country) => country.name);
  } catch (e) {
    throw new Error(`Unable to get countries that use ${currencyCode}.`);
  }
};

const convertCurrency = async (from, to, amount) => {
  const exchangeRate = await getExchangeRate(from, to);
  const convertedAmount = (amount * exchangeRate).toFixed(2);
  const countries = await getCountries(to);
  return `${amount} ${from} is worth ${convertedAmount} ${to}. You can spend these in the following countries: ${countries}.`;
};

getExchangeRate('USD', 'EUR').then((rate) => {
  console.log(rate);
}).catch((e) => {
  console.log(e);
});

getCountries('CAT').then((countries) => {
  console.log(countries);
}).catch((e) => {
  console.log(e);
});

convertCurrency('USD', 'EUR', 20).then(
  (result) => {
    console.log(result)
  }).catch((e) => {
  console.log(e);
})
