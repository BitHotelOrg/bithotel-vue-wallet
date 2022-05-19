import ConnectWallet from "./components/ConnectWallet.vue";
import ConnectButton from "./components/ConnectButton.vue";
import type { App } from "vue";
import { initializing, signer, provider } from "./wallet";
import type { WalletOptions } from "./types";
import { getChainData, getBalance, getTokenContract } from "./chain";
import { useConnectedStore } from "./store";

const walletPlugin = {
  getChainData,
  getTokenContract,
  getBalance,
  initializing,
  signer: signer,
  provider: provider,
  install(app: App, options: WalletOptions) {
    const version = Number(app.version.split(".")[0]);
    if (version < 3) {
      console.warn("This plugin requires Vue 3");
    }

    app.component("ConnectWallet", ConnectWallet);
    app.component("ConnectButton", ConnectButton);

    app.provide("walletOptions", options);
    app.provide("WalletStore", useConnectedStore);
  },
};
export default walletPlugin;
