<script setup lang="ts">
import { showConfirmDialog } from 'vant'
import router from '@/router'
import { useUserStore } from '@/stores'
import { version } from '~root/package.json'

const { t } = useI18n()
const userStore = useUserStore()
const userInfo = computed(() => userStore.userInfo)

function Logout() {
  showConfirmDialog({
    title: t('settings.confirmTitle'),
  })
    .then(() => {
      userStore.logout()
      router.push({ name: 'Home' })
    })
    .catch(() => { })
}
</script>

<template>
  <div class="text-center">
    <VanCellGroup :inset="true">
      <van-cell v-if="userInfo.uid" :title="$t('settings.logout')" clickable class="van-text-color" @click="Logout" />
    </VanCellGroup>

    <div class="text-gray mt-2">
      {{ $t("settings.currentVersion") }}: v{{ version }}
    </div>
    <div class="text-24px text-red-500 leading-40px flex">
      <div class="i-pure-icons:exit h-6 w-6" />
      <div class="i-pure-icons:help text-purple h-40px w-4" />
      <div class="bg-red h-40px">
        hell
      </div>
      hello svg
    </div>
    <div class="i-carbon:3d-cursor-alt text-3xl text-blue h-40px">
      hello
    </div>
    <div class="i-multi-icons:archive" />
    <div class="i-carbon:4k-filled" />
  </div>
</template>

<style scoped>
.van-text-color {
  --van-cell-text-color: var(--van-red);
}
</style>

<route lang="json5">
{
  name: 'Settings'
}
</route>
