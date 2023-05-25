const ACCESS_KEY = '';
    const BASE_CURRENCY = 'USD';
    const QUOTE_CURRENCY = 'EUR';

    async function fetchCurrencyRates() {
      const url = `http://apilayer.net/api/live?access_key=${ACCESS_KEY}&currencies=${QUOTE_CURRENCY}&source=${BASE_CURRENCY}&format=1`;

      try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.success) {
          return data.quotes;
        } else {
          throw new Error(data.error.info);
        }
      } catch (error) {
        throw new Error('Ошибка при получении данных: ' + error.message);
      }
    }

    document.addEventListener('DOMContentLoaded', async function() {
      try {
        const currencies = await fetchCurrencyRates();
        displayCurrencyRates(currencies);
      } catch (error) {
        console.error(error);
      }
    });

    function displayCurrencyRates(currencies) {
      const currencyList = document.getElementById('currency-list');
      currencyList.innerHTML = '';

      for (const currency in currencies) {
        const listItem = document.createElement('li');
        listItem.classList.add('currency-item');

        const currencyCode = document.createElement('span');
        currencyCode.classList.add('currency-code');
        currencyCode.textContent = currency.replace(BASE_CURRENCY, '');

        const currencyRate = document.createElement('span');
        currencyRate.classList.add('currency-rate');
        currencyRate.textContent = currencies[currency];

        listItem.appendChild(currencyCode);
        listItem.appendChild(currencyRate);

        currencyList.appendChild(listItem);
      }
    }   