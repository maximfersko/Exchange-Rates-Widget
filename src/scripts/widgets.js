const ACCESS_KEY = '5cd2856cc95436dba5e9c3b345a30ee7';
const BASE_CURRENCY = 'USD';
const QUOTE_CURRENCY = 'EUR';

async function fetchCurrencyRates() {
	const url = `http://apilayer.net/api/live?access_key=${ACCESS_KEY}&currencies=${QUOTE_CURRENCY},RUB&source=${BASE_CURRENCY}&format=1`;

	try {
		const response = await fetch(url);
		const data = await response.json();

		if (data.success) {
			return data.quotes;
		} else {
			throw new Error(data.error.info);
		}
	} catch (error) {
		throw new Error('Error response: ' + error.message);
	}
}

function displayCurrencyRates(currencies) {
	const currencyList = document.getElementById('currency-list');
	currencyList.innerHTML = '';

	const usdListItem = document.createElement('li');
	usdListItem.classList.add('currency-item');

	const usdCode = document.createElement('span');
	usdCode.classList.add('currency-code');
	usdCode.textContent = `${BASE_CURRENCY}: `;

	const usdRate = document.createElement('span');
	usdRate.classList.add('currency-rate');
	usdRate.textContent = currencies[`${BASE_CURRENCY}RUB`].toFixed(2);

	usdListItem.appendChild(usdCode);
	usdListItem.appendChild(usdRate);

	currencyList.appendChild(usdListItem);

	const eurToRub = currencies[`${BASE_CURRENCY}RUB`] / currencies[`${BASE_CURRENCY}${QUOTE_CURRENCY}`];

	const eurListItem = document.createElement('li');
	eurListItem.classList.add('currency-item');

	const eurCode = document.createElement('span');
	eurCode.classList.add('currency-code');
	eurCode.textContent = `${QUOTE_CURRENCY}: `;

	const eurRate = document.createElement('span');
	eurRate.classList.add('currency-rate');
	eurRate.textContent = eurToRub.toFixed(2);

	eurListItem.appendChild(eurCode);
	eurListItem.appendChild(eurRate);

	currencyList.appendChild(eurListItem);
}

function handleRefresh() {
	fetchCurrencyRates()
		.then((currencies) => {
			displayCurrencyRates(currencies);
		})
		.catch((error) => {
			console.error(error);
		});
}

document.addEventListener('DOMContentLoaded', () => {
	const refreshButton = document.getElementById('refresh-button');
	refreshButton.addEventListener('click', handleRefresh);
});

module.exports = {
	fetchCurrencyRates,
	displayCurrencyRates,
	handleRefresh
};