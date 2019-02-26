import React from 'react';
import PropTypes from 'prop-types';
import Wallet, { walletPropTypes } from './Wallet';
import Swipeable from '../common/Swipeable';
import WalletsNav from './WalletsNav';
import { paths } from '../../utils/constants';
import { Refresh } from '@material-ui/icons';
import IconLink from '../common/IconLink';

const WalletsBrowser = ({
  selectedWalletIndex,
  wallets,
  handleChangeSelectedWalletSwipeable,
  handleChangeSelectedWalletButton
}) => {
  return (
    <div>
      <Swipeable
        index={selectedWalletIndex}
        handleChangeIndex={handleChangeSelectedWalletSwipeable}
      >
        {wallets.map(wallet => (
          <Wallet
            key={wallet.currencyCode}
            currencyCode={wallet.currencyCode}
            currencyName={wallet.currencyName}
            amount={wallet.amount}
          />
        ))}
      </Swipeable>
      <WalletsNav
        selectedWalletIndex={selectedWalletIndex}
        wallets={wallets}
        handleChangeSelectedWalletButton={handleChangeSelectedWalletButton}
      />
      <IconLink
        to={paths.exchange}
        Icon={Refresh}
        label="Exchange"
        testid="link-to-exchange-page"
      />
    </div>
  );
};

WalletsBrowser.propTypes = {
  selectedWalletIndex: PropTypes.number.isRequired,
  wallets: PropTypes.arrayOf(
    PropTypes.shape({
      ...walletPropTypes
    })
  ).isRequired,
  handleChangeSelectedWalletSwipeable: PropTypes.func.isRequired,
  handleChangeSelectedWalletButton: PropTypes.func.isRequired
};

export default WalletsBrowser;
