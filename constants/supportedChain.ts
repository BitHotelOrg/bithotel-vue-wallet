// TODO set type key number and value as Chain
export const supportedChains: {
  [key: number]: {
    name: string;
    tokenContract: string;
    rpc: string;
    explorer: string;
    network: "mainnet" | "testnet";
    chain_id: number;
    network_id: number;
    native_currency: {
      symbol: string;
      name: string;
      hex: string;
      decimals: string;
      contractAddress: string;
    };
  };
} = {
  4: {
    name: "Rinkeby",
    tokenContract: "",
    rpc: "https://rinkeby.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161",
    explorer: "https://rinkeby.etherscan.io/",
    network: "testnet",
    native_currency: {
      symbol: "RIN",
      name: "RIN",
      hex: "0x4",
      decimals: "18",
      contractAddress: "",
    },
    chain_id: 4,
    network_id: 4,
  },
  56: {
    name: "Binance Smart Chain",
    tokenContract: "0x57Bc18F6177cDafFb34aCE048745bc913a1B1b54",
    rpc: "https://bsc-dataseed.binance.org/",
    explorer: "https://bscscan.com/",
    network: "mainnet",
    native_currency: {
      symbol: "BNB",
      name: "BNB",
      decimals: "18",
      hex: "0x38",
      contractAddress: "",
    },
    chain_id: 56,
    network_id: 56,
  },
  97: {
    name: "Binance Smart Chain Testnet",
    tokenContract: "0x3c268E859abE250016646BE0de15e7aa88ED7666",
    rpc: "https://data-seed-prebsc-1-s3.binance.org:8545",
    explorer: "https://testnet.bscscan.com/",
    network: "testnet",
    native_currency: {
      symbol: "BNB",
      name: "BNB",
      hex: "0x61",
      decimals: "18",
      contractAddress: "",
    },
    chain_id: 97,
    network_id: 97,
  },
  321: {
    name: "KuCoin Mainnet",
    tokenContract: "0x90bf5e3622e1597cde0193dab61b7171be0fa63f",
    rpc: "https://rpc-mainnet.kcc.network",
    explorer: "https://explorer.kcc.io/",
    network: "mainnet",
    native_currency: {
      symbol: "KCS",
      name: "KCS",
      hex: "0x141",
      decimals: "18",
      contractAddress: "",
    },
    chain_id: 321,
    network_id: 321,
  },
  322: {
    name: "KuCoin testnet",
    tokenContract: "0x8892b6415b9B04d1cdf82227A60161622194E3Fa",
    rpc: "https://rpc-testnet.kcc.network",
    explorer: "https://scan-testnet.kcc.network/",
    network: "testnet",
    native_currency: {
      symbol: "KCS",
      name: "KCS",
      hex: "0x142",
      decimals: "18",
      contractAddress: "",
    },
    chain_id: 322,
    network_id: 322,
  },
};
