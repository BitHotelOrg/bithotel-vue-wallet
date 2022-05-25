<script setup lang="ts">
import { useConnectedStore } from "../store";
import { resetApp } from "../wallet";

const store = useConnectedStore();

const props = defineProps(["supportedChains"]);

store.setSupportedChains(props.supportedChains);
</script>
<template>
  <div @click="resetApp" v-show="store.isConnected">
    <slot> Disconnect </slot>
  </div>
</template>
<style scoped lang="scss"></style>
