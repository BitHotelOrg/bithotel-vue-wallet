import { signer } from "../wallet";
import { toRaw } from "vue";
import { supportedChains } from "../constants";

import type { Erc20Abi } from "../types";
import { Erc20Abi__factory } from "../types";

export function getTokenContract(chainId: number): Erc20Abi {
  return Erc20Abi__factory.connect(
    supportedChains[chainId].tokenContract,
    toRaw(signer)
  );
}
