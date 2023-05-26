const ACCESS_KEY = '';
const BASE_CURRENCY = 'USD';
const QUOTE_CURRENCY = 'EUR';

async function fetchCurrencyRates() {
    const url =
        `http://apilayer.net/api/live?access_key=${ACCESS_KEY}&currencies=${QUOTE_CURRENCY},RUB&source=${BASE_CURRENCY}&format=1`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.success) {
            return data.quotes;
        } else {
            throw new Error(data.error.info);
        }
    } catch (error) {
        throw new Error('Ошибка при получении данных: ' + error
            .message);
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
    console.log(currencies);
    const currencyList = document.getElementById('currency-list');
    currencyList.innerHTML = '';

    const usdListItem = document.createElement('li');
    usdListItem.classList.add('currency-item');

    const usdCode = document.createElement('span');
    usdCode.classList.add('currency-code');
    usdCode.textContent = 'USD:';

    const usdRate = document.createElement('span');
    usdRate.classList.add('currency-rate');
    usdRate.textContent = currencies[`${BASE_CURRENCY}RUB`];

    usdListItem.appendChild(usdCode);
    usdListItem.appendChild(usdRate);

    currencyList.appendChild(usdListItem);

    const eurToRub = currencies['EURRUB'];

    const eurListItem = document.createElement('li');
    eurListItem.classList.add('currency-item');

    const eurCode = document.createElement('span');
    eurCode.classList.add('currency-code');
    eurCode.textContent = 'EUR:';

    const eurRate = document.createElement('span');
    eurRate.classList.add('currency-rate');
    eurRate.textContent = eurToRub;

    eurListItem.appendChild(eurCode);
    eurListItem.appendChild(eurRate);

    currencyList.appendChild(eurListItem);
}