import { signer } from "../wallet";
import { toRaw } from "vue";

import type { Erc20Abi } from "../types";
import { Erc20Abi__factory } from "../types";

export function getTokenContract(address: string): Erc20Abi {
  return Erc20Abi__factory.connect(address, toRaw(signer));
}
