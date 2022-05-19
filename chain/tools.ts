import { supportedChains } from "../constants";
import type { Chain } from "../types";
export function getChainData(chainId: number): Chain {
  const chainData = supportedChains[chainId];
  if (!chainData) {
    throw new Error("ChainId missing or not supported");
  }

  return chainData;
}
