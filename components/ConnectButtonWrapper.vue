<script setup lang="ts">
import { inject } from "vue";
import { useConnectedStore } from "../store";
import type { WalletOptions } from "../types";
import { onConnect } from "../wallet";

const store = useConnectedStore();

const props = defineProps(["supportedChains"]);

store.setSupportedChains(props.supportedChains);
const chainIds = inject<WalletOptions>("WalletOptions")?.chainIds;

async function handleOnConnect() {
  if (chainIds) {
    try {
      await onConnect(chainIds);
    } catch (e) {
      console.log("Error on handleOnConnect:", e);
    }
  } else {
    await onConnect([+import.meta.env.VITE_APP_CHAINID]);
  }
}
</script>
<template>
  <div v-show="!store.isConnected" @click="handleOnConnect">
    <slot> Connect Wallet </slot>
  </div>
</template>
<style lang="scss" scoped></style>
