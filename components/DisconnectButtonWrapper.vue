<script setup lang="ts">
import { computed, onMounted } from "vue";
import { useConnectedStore } from "../store";
import { onConnect, resetApp } from "../wallet";

const store = useConnectedStore();
const isConnected = computed(() => store.isConnected);
onMounted(async () => {
  if (isConnected.value) {
    await onConnect();
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
