<script setup lang="ts">
import ClickBtn from './comps/ClickBtn.vue'
import TurnTable from './comps/TurnTable.vue'

const tabs = reactive([
  { name: 'btn', component: markRaw(ClickBtn) },
  { name: 'rotate', component: markRaw(TurnTable) },
])

const active = ref('rotate')
</script>

<template>
  <van-tabs v-model:active="active">
    <van-tab v-for="item in tabs" :key="item.name" :title="item.name" :name="item.name">
      <component :is="item.component" />
    </van-tab>
  </van-tabs>
</template>

<style scoped>
.container {
  background-image:
    linear-gradient(to right, #e5e7eb 1px, transparent 1px), linear-gradient(to bottom, #e5e7eb 1px, transparent 1px),
    linear-gradient(to right, #e5e7eb 2px, transparent 2px), linear-gradient(to bottom, #e5e7eb 2px, transparent 2px);
  background-size:
    24px 24px,
    24px 24px,
    120px 120px,
    120px 120px;
  opacity: 0.5;
}
</style>

<route lang="json5">
{
  name: "Galacean",
}
</route>
