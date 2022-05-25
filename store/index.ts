import { defineStore } from "pinia";
import type { ChainInfo } from "../types";
type State = {
  connected: boolean;
  balance: number;
  address: string;
  supportedChains: ChainInfo;
};
export const useConnectedStore = defineStore({
  id: "connected",
  state: () => ({
    connected: false,
    balance: 0,
    address: "",
    supportedChains: {},
  }),
  getters: {
    isConnected: (state: State) => state.connected,
    getBalance: (state: State) => state.balance,
    getAddress: (state: State) => state.address,
    getSupportedChains: (state: State) => state.supportedChains,
  },
  actions: {
    setConnected: function (bool: boolean) {
      this.connected = bool;
    },
    setBalance: function (amount: number) {
      this.balance = amount;
    },
    setAddress: function (wallet: string) {
      this.address = wallet;
    },
    setSupportedChains: function (chains: ChainInfo) {
      this.supportedChains = chains;
    },
  },
  persist: {
    enabled: true,
  },
});
