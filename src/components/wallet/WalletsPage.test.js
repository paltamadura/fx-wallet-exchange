import React from 'react';
import WalletsPage from './WalletsPage';
import { render, waitForElement, cleanup } from 'react-testing-library';
import WalletsApi from '../../api/WalletsApi';
import { mockWalletData, mockUserId } from '../../data/mockData';
import { Provider } from 'react-redux';
import configureStore from '../../store/configureStore';
import { loadWallets } from '../../actions/walletsActions';
import { BrowserRouter } from 'react-router-dom';

jest.mock('../../api/WalletsApi');
// getWalletsByUserId({ userId }) => {wallets, exchangeHistory: exchangeHistory[userId]
// exchange({ userId, from, to, rate }) => {wallets, exchangeHistory}
// getExchangeHistory({ userId }) => exchangeHistory[userId]
WalletsApi.getWalletsByUserId.mockImplementation(({ userId }) =>
  Promise.resolve({ wallets: mockWalletData[userId] })
);

describe('WalletPage', () => {
  afterEach(cleanup);

  it('renders without crashing', () => {
    // only creat store; no need to dispatch anything for simple render test
    const store = configureStore();
    render(
      <Provider store={store}>
        <BrowserRouter>
          <WalletsPage />
        </BrowserRouter>
      </Provider>
    );
  });

  it('displays loading message', () => {
    // only create store
    // don't dispatch loadWallets and we should get the loading message
    const store = configureStore();

    const { getByText } = render(
      <Provider store={store}>
        <BrowserRouter>
          <WalletsPage />
        </BrowserRouter>
      </Provider>
    );
    expect(getByText(/loading/i)).toBeInTheDocument();
  });

  it('calls the wallet API', () => {
    const store = configureStore();
    store.dispatch(loadWallets({ userId: mockUserId }));

    render(
      <Provider store={store}>
        <BrowserRouter>
          <WalletsPage />
        </BrowserRouter>
      </Provider>
    );
    expect(WalletsApi.getWalletsByUserId).toHaveBeenCalledWith({
      userId: mockUserId
    });
  });

  it('renders a wallet for each wallet in test data', async () => {
    const store = configureStore();
    store.dispatch(loadWallets({ userId: mockUserId }));

    const { getByText } = render(
      <Provider store={store}>
        <BrowserRouter>
          <WalletsPage />
        </BrowserRouter>
      </Provider>
    );
    // wait and search for each currency in the mock wallet data
    await waitForElement(() =>
      Object.values(mockWalletData[mockUserId]).map(wallet =>
        expect(getByText(new RegExp(wallet.currencyCode))).toBeInTheDocument()
      )
    );
  });

  it('has a link to the exchange page', async () => {
    const store = configureStore();
    store.dispatch(loadWallets({ userId: mockUserId }));

    const { getByTestId } = render(
      <Provider store={store}>
        <BrowserRouter>
          <WalletsPage />
        </BrowserRouter>
      </Provider>
    );
    await waitForElement(() => getByTestId('link-to-exchange-page'));
  });

  it('displays an error if the API call fails', async () => {
    WalletsApi.getWalletsByUserId.mockImplementation(({ userId }) =>
      Promise.reject('error message for testing')
    );

    const store = configureStore();
    store.dispatch(loadWallets({ userId: mockUserId }));

    const { getByText } = render(
      <Provider store={store}>
        <BrowserRouter>
          <WalletsPage />
        </BrowserRouter>
      </Provider>
    );
    await waitForElement(() => getByText(/error/i));
  });
});
