<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import { useConnectedStore } from "../store";
import { onConnect } from "../wallet";

const store = useConnectedStore();

async function handleOnConnect() {
  try {
    await onConnect();
  } catch (e) {
    console.log("Error on handleOnConnect:", e);
  }
}
</script>
<template>
  <button
    v-show="!store.isConnected"
    class="font connect-wallet"
    @click="handleOnConnect"
  >
    Connect wallet
  </button>
</template>
<style lang="scss" scoped>
@import "./wallet";
.font {
  color: var(--color-text);
  font-size: 16px;
  text-transform: uppercase;
  font-weight: 400;
}

.connect-wallet {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 198px;
  height: 50px;
  cursor: pointer;

  background: var(--color-cta-primary);
  border: 0;
  border-radius: 10px;
  z-index: 555;
}
</style>
