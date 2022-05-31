<script setup lang="ts">
import { computed, inject } from "vue";
import { useConnectedStore } from "../store";
import { WalletOptions } from "../types";
import { onConnect } from "../wallet";

const store = useConnectedStore();

const isConnected = computed(() => store.isConnected);

const props = defineProps(["supportedChains"]);

store.setSupportedChains(props.supportedChains);
const chainIds = inject<WalletOptions>("WalletOptions").chainIds;

async function handleOnConnect() {
  try {
    await onConnect(chainIds);
  } catch (e) {
    console.log("Error on handleOnConnect:", e);
  }
}
</script>
<template>
  <div v-show="!isConnected" @click="handleOnConnect">
    <slot> Connect Wallet </slot>
  </div>
</template>
<style lang="scss" scoped></style>
