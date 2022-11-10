import { initializing, chainId } from "../wallet";
import { utils } from "ethers";
import { getTokenByAddress, getTokenContract } from "./contracts";
import { useConnectedStore } from "../store";
import { Erc20Abi } from "types";

export * from "./walletConnectConfig";
export * from "./tools";
export * from "./contracts";

export async function getBalance(tokenAddress?: string): Promise<number> {
  await initializing.value;
  try {
    const store = useConnectedStore();
    let contract: Erc20Abi;
    if (tokenAddress) {
      contract = getTokenByAddress(tokenAddress);
    } else {
      contract = getTokenContract(chainId.value);
    }
    const balance = await contract.balanceOf(store.address);
    return +utils.formatEther(balance);
  } catch (e) {
    return 0;
  }
}
