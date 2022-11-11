<script lang="ts" setup>
import { useConnectedStore } from "../store";
const store = useConnectedStore();

function numberWithDots(x: number) {
  if (x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }
  return 0;
}
</script>

<template>
  <div class="balance">
    <img src="../assets/tokenIcon.png" style="top: 0" height="24" alt="Contact" />
    <span> {{ Math.floor(store.balance) }} KICKS</span>
  </div>
</template>

<style lang="scss" scoped>
@import "./wallet";

.balance {
  z-index: 55;
  color: var(--color-text-primary);
  cursor: pointer;
  float: left;
  margin-top: 20px;
  margin-left: 10px;

  span {
    width: 85px;
    /* can be 100% ellipsis will happen when contents exceed it */
    display: inline-block;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    text-align: left;
    line-height: 24px;
    margin-left: 10px;
  }

  span::hover {
    white-space: normal;
  }
}
</style>
