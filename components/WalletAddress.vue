<script setup lang="ts">
import { shortenAddress, fallbackCopyTextToClipboard } from "../helpers";
import { useConnectedStore } from "../store";
import { getBalance } from "../chain";
import { watch } from "vue";
const store = useConnectedStore();

watch(
  () => store.address,
  async (address, prevAddress) => {
    console.log({ address, prevAddress });
    if (store.isConnected) {
      store.setBalance(await getBalance());
    }
  }
);
</script>
<template>
  <div
    class="wallet-address"
    @click="fallbackCopyTextToClipboard(store.address)"
  >
    <img
      src="../assets/wallet-icon.svg"
      style="top: 0; margin-right: 5px"
      alt="Contact"
    />
    <span>{{ shortenAddress(store.address) }}</span>
  </div>
</template>

<style lang="scss" scoped>
@import "./wallet";

.wallet-address {
  z-index: 55;
  color: var(--color-text-primary);
  cursor: pointer;
  float: left;
  margin-right: 15px;
  margin-top: 20px;

  span {
    margin-left: 5px;
    display: inline-block;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    line-height: 24px;
  }
  span::hover {
    white-space: normal;
  }

  img {
    width: 20px;
    margin-top: 3px;
    float: left;
  }
}
</style>
