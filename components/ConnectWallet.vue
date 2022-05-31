<script setup lang="ts">
import WalletAddress from "./WalletAddress.vue";
import WalletBalance from "./WalletBalance.vue";
import ChainIcon from "./ChainIcon.vue";
import ConnectButton from "./ConnectButton.vue";
import { emitter } from "../helpers";

import { resetApp, onConnect } from "../wallet";
import { useConnectedStore } from "../store";
import { ref, onMounted, inject } from "vue";
import { WalletOptions } from "../types";

const showModal = ref(false);
const store = useConnectedStore();

const props = defineProps(["supportedChains"]);
const chainIds = inject<WalletOptions>("WalletOptions").chainIds;

onMounted(async () => {
  if (store.isConnected) {
    await onConnect(chainIds);
  }
  emitter.on("connectWallet", () => {
    showModal.value = true;
  });
});
</script>
<template>
  <div>
    <ConnectButton class="abs pos" :supportedChains="props.supportedChains" />
    <div v-show="store.isConnected" class="web3-info">
      <button class="disconnect" @click="resetApp">
        <img src="../assets/disconnect.svg" />
      </button>
      <div class="wallet-info">
        <ChainIcon />
        <div class="vertical-line"></div>
        <WalletBalance />
        <div class="vertical-line"></div>
        <WalletAddress />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "./wallet";

.mobile-connect .connect-wallet {
  display: block;
}

.pos {
  right: 50px;
  top: 22px;
}

.web3-info {
  width: 385px;
  height: 60px;
  position: absolute;
  z-index: 500;
  right: 30px;
  top: 30px;
  background: var(--style-background);
  border-radius: 5px;
  border: var(--style-border);

  .vertical-line {
    height: 60px;
    width: 1px;
    float: left;
    margin-left: 10px;
    margin-right: 15px;
    background: var(--vertical-lines);
  }

  .disconnect {
    width: 40px;
    height: 40px;
    border-radius: 5px;
    color: var(--color-text);
    border: 1px solid var(--vertical-lines);
    background: var(--color-exit-background);
    float: right;
    margin-top: 10px;
    margin-right: 10px;
    cursor: pointer;

    img {
      margin-left: -4px;
      margin-top: 4px;
    }
  }
}

@keyframes scale10 {
  0% {
    transform: scale(1);
  }
  100% {
    transform: scale(1.1);
  }
}
@keyframes scale10Back {
  0% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
  }
}

.connect-wallet {
  display: flex;
  justify-content: center;
  flex-direction: row;
  align-items: center;
  padding: 15px 20px 15px 25px;
  text-align: center;
  position: absolute;
  width: 198px;
  height: 40px;
  right: 50px;
  top: 22px;
  cursor: pointer;

  background: var(--color-cta-primary);
  border-radius: 5px;
  z-index: 5;
  text-align: center;
  border: 0;
  color: var(--color-text);
  font-size: 16px;
  font-weight: 400;
  cursor: poiner;
  z-index: 555;
  animation: scale10Back 400ms ease forwards;
  &:hover {
    animation: scale10 400ms ease forwards;
  }
}

@media only screen and (max-width: 1024px) {
  .connect-wallet {
    bottom: 155px;
    display: none;
  }

  .mobile-connect {
    position: absolute;
    bottom: 335px;
    left: 210px;
    right: auto !important;
  }

  .activeM .web3-info {
    display: none;
  }
}

@media only screen and (max-width: 800px) {
  .connect-wallet {
    height: 40px;
    line-height: 14px;
    width: 140px;
    font-size: 10px;
    bottom: 155px;
  }
}

@media only screen and (max-width: 375px) {
  .connect-wallet {
    height: 50px;
    font-size: 15px;
    width: 225px;
    left: -180px;
  }
}
</style>
