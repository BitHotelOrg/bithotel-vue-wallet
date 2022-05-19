import { defineStore } from "pinia";
type State = {
  _isConnected: boolean;
  balance: number;
  address: string;
};
export const useConnectedStore = defineStore({
  id: "connected",
  state: () => ({
    _isConnected: false,
    balance: 0,
    address: "",
  }),
  getters: {
    isConnected: (state: State) => state._isConnected,
    getBalance: (state: State) => state.balance,
    getAddress: (state: State) => state.address,
  },
  actions: {
    setConnected: function (bool: boolean) {
      console.log("connected set");

      this._isConnected = bool;
    },
    setBalance: function (amount: number) {
      console.log("balance set");
      this.balance = amount;
    },
    setAddress: function (wallet: string) {
      console.log("address set");

      this.address = wallet;
    },
  },
  persist: {
    enabled: true,
  },
});
