import { supportedChains } from "../constants";
import type { Chain } from "../types";
export function getChainData(chainId: number): Chain {
  const chainData = supportedChains[chainId];
  if (!chainData) {
    throw new Error("ChainId missing or not supported");
  }

  const API_KEY = import.meta.env.VITE_INFURA_KEY;

  if (
    chainData.rpc.includes("infura.io") &&
    chainData.rpc.includes("%API_KEY%") &&
    API_KEY
  ) {
    const rpcUrl = chainData.rpc.replace("%API_KEY%", API_KEY);
    return {
      ...chainData,
      rpc: rpcUrl,
    };
  }

  return chainData;
}
