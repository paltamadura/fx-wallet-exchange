import { Currency, CurrencyMetadata } from '../constants/constants';

const mockUserId = 101;

const mockWalletData = {
  [mockUserId]: [
    {
      currencyCode: Currency.USD,
      currencyName: CurrencyMetadata[Currency.USD].name,
      amount: 87.12
    },
    {
      currencyCode: Currency.GBP,
      currencyName: CurrencyMetadata[Currency.GBP].name,
      amount: 33.9
    },
    {
      currencyCode: Currency.EUR,
      currencyName: CurrencyMetadata[Currency.EUR].name,
      amount: 9.61
    }
  ]
};

// Based on data from https://openexchangerates.org
// TODO - Extract this into a function which transforms the data from the API call
const availableCurrencies = [Currency.USD, Currency.GBP, Currency.EUR];

const mockRates = {
  [Currency.USD + Currency.EUR]: 0.877693,
  [Currency.USD + Currency.GBP]: 0.754209,
  [Currency.EUR + Currency.GBP]: 1.163726,
  [Currency.EUR + Currency.USD]: 1.13935,
  [Currency.GBP + Currency.USD]: 1.325892,
  [Currency.GBP + Currency.EUR]: 0.859308
};

export { mockWalletData, mockUserId, mockRates, availableCurrencies };