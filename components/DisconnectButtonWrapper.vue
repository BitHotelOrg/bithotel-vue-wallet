<script setup lang="ts">
import { inject, onMounted } from "vue";
import { useConnectedStore } from "../store";
import type { WalletOptions } from "../types";
import { onConnect, resetApp } from "../wallet";

const store = useConnectedStore();

const chainIds = inject<WalletOptions>("WalletOptions")?.chainIds;

onMounted(async () => {
  if (store.connected && chainIds) {
    await onConnect(chainIds);
  }
});
const props = defineProps(["supportedChains"]);

  store.setSupportedChains(props.supportedChains);
</script>
<template>
  <div @click="resetApp" v-show="store.connected">
    <slot> Disconnect </slot>
  </div>
</template>
<style scoped lang="scss"></style>
