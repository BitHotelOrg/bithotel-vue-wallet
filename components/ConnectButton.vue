<script setup lang="ts">
import ConnectButtonWrapper from "./ConnectButtonWrapper.vue";

const props = defineProps(["supportedChains"]);
</script>
<template>
  <ConnectButtonWrapper :supportedChains="props.supportedChains">
    <div class="font connect-wallet">
      <slot> Connect Wallet </slot>
    </div>
  </ConnectButtonWrapper>
</template>
<style lang="scss" scoped>
@import "./wallet";
@import url("https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;500;600;700;800&display=swap");

.font {
  color: var(--color-text);
  font-size: 14px;
  font-weight: 700;
  font-family: "Open Sans", sans-serif;
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
  border-radius: 5px;
  z-index: 555;
}
</style>
