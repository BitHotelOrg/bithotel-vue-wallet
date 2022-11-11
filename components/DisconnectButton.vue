<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import DisconnectButtonWrapper from "./DisconnectButtonWrapper.vue";
const props = defineProps(["supportedChains"]);
import WalletAddress from "./WalletAddress.vue";
</script>
<template>
  <DisconnectButtonWrapper :supportedChains="props.supportedChains">
    <div class="disconnect-wallet font">
      <WalletAddress style="margin-top:4px;" />
      <img src="../assets/disconnect.svg" />
      <!-- <slot> Disconnect </slot> -->
    </div>
  </DisconnectButtonWrapper>
</template>
<style scoped lang="scss">
@import "./wallet";
@import url("https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;500;600;700;800&display=swap");

.font {
  color: var(--color-text-primary);
  font-size: 14px;
  font-weight: 700;
  font-family: "Open Sans", sans-serif;
}

.disconnect-wallet {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 198px;
  height: 50px;
  cursor: pointer;
  background: var(--color-cta-primary);
  border: 0;
  border-radius: 5px;
  z-index: 2;
}
</style>
