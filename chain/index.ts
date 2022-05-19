import { initializing, chainId } from "../wallet";
import { supportedChains } from "../constants";
import { utils } from "ethers";
import { getTokenContract } from "./contracts";
import { useConnectedStore } from "../store";

export * from "./walletConnectConfig";
export * from "./tools";
export * from "./contracts";

export async function getBalance(): Promise<number> {
  await initializing.value;
  try {
    const store = useConnectedStore();
    const tokenAddress = supportedChains[chainId.value].tokenContract;
    const contract = getTokenContract(tokenAddress);
    const balance = await contract.balanceOf(store.address);
    return +utils.formatEther(balance);
  } catch (e) {
    console.log(e);
    return 0;
  }
}
