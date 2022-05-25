<script setup lang="ts">
import { useConnectedStore } from "../store";
import { onConnect } from "../wallet";

const store = useConnectedStore();

const props = defineProps(["supportedChains"]);

store.setSupportedChains(props.supportedChains);

async function handleOnConnect() {
  try {
    await onConnect();
  } catch (e) {
    console.log("Error on handleOnConnect:", e);
  }
}
</script>
<template>
  <div v-show="!store.isConnected" @click="handleOnConnect">
    <slot> Connect Wallet </slot>
  </div>
</template>
<style lang="scss" scoped></style>
