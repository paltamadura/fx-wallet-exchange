import { mockRatesDataMap, availableCurrencies } from '../data/mockData';

// Default delay to simulate API call
const DELAY = 1000;

const FxRatesApi = {
  async getRates() {
    return new Promise(resolve => {
      // create a copy of the map here in order to trigger a re-render
      // even in a PureComponent
      setTimeout(() => {
        resolve({ ratesMap: new Map(mockRatesDataMap), availableCurrencies });
      }, DELAY);
    });
  }
};

export default FxRatesApi;
