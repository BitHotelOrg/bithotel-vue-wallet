<script setup lang="ts">
import { chainId, onConnect } from "../wallet";
import { supportedChains } from "../constants";
import type { Chain } from "../types";

const network_environment =
  import.meta.env.VITE_ENV == "dev" ? "testnet" : "mainnet";
const chains = Object.values(supportedChains).filter(
  (chain: Chain) => chain.network == network_environment
);
const multichain = chains.length > 1;

const imgUrl = (symbol) =>
  new URL(`../assets/chains/${symbol}.png`, import.meta.url).href;

async function changeChain(_chainId: number) {
  const hex = _chainId.toString(16);
  const name = supportedChains[_chainId].name;
  const rpc = supportedChains[_chainId].rpc;
  const blockExplorer = supportedChains[_chainId].explorer;
  const curreny = supportedChains[_chainId].native_currency.symbol;

  await window.ethereum
    .request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: "0x" + hex }],
    })
    .catch(async () => {
      try {
        await window.ethereum.request({
          method: "wallet_addEthereumChain",
          params: [
            {
              chainId: "0x" + hex,
              chainName: name,
              rpcUrls: [rpc],
              blockExplorerUrls: [blockExplorer],
              nativeCurrency: {
                name: curreny,
                symbol: curreny,
                decimals: 18,
              },
            },
          ],
        });
      } catch (addError) {
        console.log(addError);
      }
    });
  await onConnect();
}
</script>

<template>
  <div class="chain-holder" v-if="multichain">
    <div
      v-for="(chain, index) in chains"
      :key="index"
      class="rel chain"
      @click="changeChain(chain.chain_id)"
    >
      <img
        :src="imgUrl(chain.native_currency.symbol)"
        class="abs chainLogo"
        :class="{ inActive: chainId != chain.chain_id }"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "./wallet";
.chain-holder {
  height: 60px;
  width: 30px;
  float: left;

  .inActive {
    opacity: 0.5;
    cursor: pointer;
  }
}
.chain {
  height: 30px;
  width: 30px;
  float: left;

  .chainLogo {
    width: 20px;
    top: 5px;
    left: 10px;
  }
}
</style>
