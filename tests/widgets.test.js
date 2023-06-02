const {
	fetchCurrencyRates,
	displayCurrencyRates
} = require('../src/scripts/widgets');

global.fetch = jest.fn(() =>
	Promise.resolve({
		json: () => Promise.resolve({
			success: true,
			quotes: {
				USDRUB: 70.1234,
				USDEUR: 0.8765
			}
		})
	})
);

document.getElementById = jest.fn(() => ({
	innerHTML: '',
	appendChild: jest.fn()
}));
document.createElement = jest.fn(() => ({
	classList: {
		add: jest.fn()
	},
	textContent: '',
	appendChild: jest.fn()
}));
document.addEventListener = jest.fn((event, callback) => {
	callback();
});

test('fetchCurrencyRates', async () => {
	const currencies = await fetchCurrencyRates();

	expect(currencies)
		.toEqual({
			USDRUB: 70.1234,
			USDEUR: 0.8765
		});
});

test('displayCurrencyRates', () => {
	const currencies = {
		USDRUB: 70.1234,
		USDEUR: 0.8765
	};

	displayCurrencyRates(currencies);
	expect(document.getElementById)
		.toHaveBeenCalledWith('currency-list');
	expect(document.createElement)
		.toHaveBeenCalledWith('li');
	expect(document.createElement)
		.toHaveBeenCalledWith('span');
	expect(document.createElement)
		.toHaveBeenCalledWith('span');
	expect(document.createElement)
		.toHaveBeenCalledWith('li');
	expect(document.createElement)
		.toHaveBeenCalledWith('span');
	expect(document.createElement)
		.toHaveBeenCalledWith('span');
});

test('fetchCurrencyRates second suite ', async () => {
	const currencies = await fetchCurrencyRates();

	const expectedRates = {
		USDRUB: 70.5678,
		USDEUR: 0.9876,
	};

	Object.entries(expectedRates)
		.forEach(([currency, expectedRate]) => {
			expect(currencies[currency])
				.not.toBeCloseTo(expectedRate);
		});
});