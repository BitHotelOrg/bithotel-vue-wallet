import WalletConnectProvider from "@walletconnect/web3-provider";

const chainId = +import.meta.env.VITE_CHAINID;

const providerOptions = {
  // ttps://docs.walletconnect.org/
  walletconnect: {
    package: WalletConnectProvider,
    options: {
      infuraId: import.meta.env.VITE_INFURA_KEY,
      rpc: {
        [chainId]: import.meta.env.VITE_RPC_URL,
      },
      chainId,
      network: "binance",
    },
  },
};

export { providerOptions };
