import { reactive, ref } from "vue";
import { ethers } from "ethers";
import Web3Modal from "web3modal";
import { getChainData } from "./chain/tools";
import { providerOptions } from "./chain/walletConnectConfig";
import { useConnectedStore } from "./store";
import type { JsonRpcProvider } from "@ethersproject/providers";
import { getBalance } from "./chain";

let defaultChainId = 56;
if (typeof +import.meta.env.VITE_CHAINID == "number") {
  defaultChainId = +import.meta.env.VITE_CHAINID;
}

export const chainId = ref(defaultChainId);
let rpc = "";

if (typeof import.meta.env.VITE_RPC_URL == "string") {
  rpc = import.meta.env.VITE_RPC_URL;
}

export let provider = reactive(ethers.getDefaultProvider(rpc));
export let signer = reactive<ethers.Signer>(null as any);
export const initializing = ref<Promise<boolean>>();

const web3Modal = new Web3Modal({
  theme: "dark",
  network: getChainData(chainId.value).network,
  cacheProvider: true,
  providerOptions,
});

export async function resetApp() {
  const store = useConnectedStore();
  store.setConnected(false);
  web3Modal.clearCachedProvider();
}

export async function subscribeProvider(provider: JsonRpcProvider) {
  if (!provider.on) {
    return;
  }
  provider.on("close", () => resetApp());
  provider.on("accountsChanged", async () => {
    const store = useConnectedStore();
    store.setBalance(await getBalance());
  });
  provider.on("chainChanged", async (_chainId: number) => {
    chainId.value = parseInt(String(_chainId), 16);
    const store = useConnectedStore();
    store.setBalance(await getBalance());
  });
  provider.on("disconnect", () => {
    resetApp();
  });
}

export async function onConnect() {
  // eslint-disable-next-line no-async-promise-executor
  initializing.value = new Promise(async (resolve) => {
    const modalProvider = await web3Modal.connect();
    const _provider = new ethers.providers.Web3Provider(modalProvider);
    const _signer = _provider.getSigner();
    const _network = await _provider.getNetwork();

    provider = reactive(_provider);
    signer = reactive(_signer);
    const store = useConnectedStore();
    chainId.value = _network.chainId;
    store.setAddress(await _signer.getAddress());
    store.setConnected(true);
    await subscribeProvider(_provider);
    resolve(true);
  });
}
