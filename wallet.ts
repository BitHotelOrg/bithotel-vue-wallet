import { reactive, ref, toRaw } from "vue";
import { ethers, Signer } from "ethers";
import Web3Modal from "web3modal";
import { getChainData } from "./chain/tools";
import { providerOptions } from "./chain/walletConnectConfig";
import { useConnectedStore } from "./store";
import type {
  JsonRpcProvider,
  Web3Provider,
} from "@ethersproject/providers";
import { getBalance } from "./chain";

const defaultChainId = +import.meta.env.VITE_APP_CHAINID;

export const chainId = ref<number>(defaultChainId);
const rpc = import.meta.env.VITE_APP_RPC_URL;
// @ts-ignore
export let provider: Web3Provider = reactive(ethers.getDefaultProvider(rpc));
export let signer: Signer = reactive({} as Signer);

export function useProvider(): ethers.providers.BaseProvider {
  return toRaw(provider);
}
export function useSigner(): ethers.Signer {
  return toRaw(signer);
}

export function useSignerOrProvider():
  | ethers.providers.BaseProvider
  | ethers.Signer {
  if (signer._isSigner) {
    return toRaw(signer);
  }
  return toRaw(provider);
}

export const initializing = ref<Promise<boolean>>();

export function useInitializing(): Promise<boolean> {
  return initializing.value as Promise<boolean>;
}

const web3Modal = new Web3Modal({
  theme: "dark",
  network: getChainData(chainId.value).network,
  cacheProvider: true,
  providerOptions,
});

export async function resetApp() {
  const store = useConnectedStore();
  store.setConnected(false);
  store.setAddress("");
  store.setBalance(0);
  web3Modal.clearCachedProvider();
}

export function subscribeProvider(provider: JsonRpcProvider) {
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

export async function onConnect(chainIds: Array<number>) {
  const store = useConnectedStore();
  // eslint-disable-next-line no-async-promise-executor
  initializing.value = new Promise(async (resolve) => {
    const modalProvider = await web3Modal.connect();
    const _provider = new ethers.providers.Web3Provider(modalProvider);
    const _signer = _provider.getSigner();
    const _network = await _provider.getNetwork();
    provider = reactive(_provider);
    signer = reactive(_signer);
    chainId.value = _network.chainId;
    if (chainIds.length == 1 && chainIds[0] != chainId.value) {
      await switchChain(chainIds[0]);
    }
    store.setAddress(await _signer.getAddress());
    store.setConnected(true);
    subscribeProvider(_provider);
    resolve(true);
  });
  store.setBalance(await getBalance());
}

async function switchChain(_chainId: number): Promise<void> {
  const chainData = getChainData(_chainId);
  if (!chainData) {
    throw new Error(`Chain ${_chainId} not found`);
  }
  try {
    await window.ethereum.request({
      method: "wallet_addEthereumChain",
      params: [
        {
          chainId: chainData.native_currency.hex,
          chainName: chainData.name,
          rpcUrls: [chainData.rpc],
          blockExplorerUrls: [chainData.explorer],
          nativeCurrency: {
            name: chainData.native_currency.name,
            symbol: chainData.native_currency.symbol,
            decimals: 18,
          },
        },
      ],
    });
    chainId.value = _chainId;
  } catch (e) {
    console.error(e);
  }
  try {
    await window.ethereum.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: chainData.native_currency.hex }],
    });
  } catch (e) {
    console.error(e);
  }
}
