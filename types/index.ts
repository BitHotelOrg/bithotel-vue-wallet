// export type Chain = {
//   name: string;
//   network: string;
//   chain_id: number;
//   network_id: number;
//   rpc: string;
//   native_currency: {
//     symbol: string;
//     name: string;
//     decimals: string;
//     contractAddress: string;
//     hex: string;
//     balance: string;
//   };
// };

export type Chain = {
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

export type WalletOptions = {
  theme: "light" | "dark";
  infuraKey: string;
  chainIds: Array<number>;
  networkType: "testnet" | "mainnet";
};

export type ChainInfo = {
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
};

export * from "./ethers";
