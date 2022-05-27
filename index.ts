import ConnectWallet from "./components/ConnectWallet.vue";
import ConnectButton from "./components/ConnectButton.vue";
import ConnectButtonWrapper from "./components/ConnectButtonWrapper.vue";
import DisconnectButton from "./components/DisconnectButton.vue";
import DisconnectButtonWrapper from "./components/DisconnectButtonWrapper.vue";
import type { App } from "vue";
import {
  initializing,
  signer,
  provider,
  onConnect,
  useSigner,
  useProvider,
} from "./wallet";
import type { WalletOptions } from "./types";
import { getChainData, getBalance, getTokenContract } from "./chain";
import { useConnectedStore } from "./store";

const walletPlugin = {
  getChainData,
  getTokenContract,
  getBalance,
  onConnect,
  useConnectedStore,
  initializing,
  signer,
  provider,
  useSigner,
  useProvider,
  install(app: App, options: WalletOptions): WalletOptions {
    const version = Number(app.version.split(".")[0]);
    if (version < 3) {
      console.warn("This plugin requires Vue 3");
    }
    // TODO set default chain / infura key then get the rpc url and network from supportedchains object
    // TODO also set supportedchains
    // const store = useConnectedStore(); FIXME: dit ipv props
    // store.setSupportedChains(options.chains);

    app.component("ConnectWallet", ConnectWallet);
    app.component("ConnectButton", ConnectButton);
    app.component("ConnectButtonWrapper", ConnectButtonWrapper);
    app.component("DisconnectButton", DisconnectButton);
    app.component("DisconnectButtonWrapper", DisconnectButtonWrapper);

    app.provide("walletOptions", options);
    app.provide("WalletStore", useConnectedStore);

    return options;
  },
};
export default walletPlugin;
