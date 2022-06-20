import WalletConnectProvider from "@walletconnect/web3-provider";

const chainId = 97; //+import.meta.env.VITE_CHAINID;

const providerOptions = {
  // ttps://docs.walletconnect.org/
  walletconnect: {
    package: WalletConnectProvider,
    options: {
      infuraId: "9aa3d95b3bc440fa88ea12eaa4456161", //import.meta.env.VITE_INFURA_KEY,
      rpc: {
        [chainId]: "https://data-seed-prebsc-1-s3.binance.org:8545", //import.meta.env.VITE_RPC_URL,
      },
      chainId,
      network: "binance",
    },
  },
};

function formatProviderOptions({ infuraKey, chainId, rpcUrl, network }) {
  return {
    walletconnect: {
      package: WalletConnectProvider,
      infuraId: infuraKey,
      rpc: { [chainId]: rpcUrl },
      chainId,
      network,
    },
  };
}

export { formatProviderOptions, providerOptions };
