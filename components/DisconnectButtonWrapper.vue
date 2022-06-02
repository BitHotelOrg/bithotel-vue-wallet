<script setup lang="ts">
import { inject, onMounted } from "vue";
import { useConnectedStore } from "../store";
import { WalletOptions } from "../types";
import { onConnect, resetApp } from "../wallet";

const store = useConnectedStore();

const chainIds = inject<WalletOptions>("WalletOptions").chainIds;

onMounted(async () => {
  if (store.isConnected) {
    await onConnect(chainIds);
  }
});
const props = defineProps(["supportedChains"]);

store.setSupportedChains(props.supportedChains);
</script>
<template>
  <div @click="resetApp" v-show="store.isConnected">
    <slot> Disconnect </slot>
  </div>
</template>
<style scoped lang="scss"></style>
