<script setup lang="ts">
import { Player } from '@galacean/effects'
import { initPlayerStateMachineEvents } from '../init-state-machine-events'
import jsonUrl from '~/galacean-btn/btnA.json?url'

const container = ref<HTMLDivElement>(null)
const player = ref<Player>()

onMounted(async () => {
  // player.value = new Player({
  //   container: container.value,
  //   // container: document.getElementById('J-Container'),
  //   interactive: true,
  // })
  //
  // // initPlayerStateMachineEvents 为通用方法，可以直接引入：https://mdn.alipayobjects.com/shimmer/afts/file/t82RToQ0kJQAAAAAQEAAAAgAeoLnAQBr
  // initPlayerStateMachineEvents(player.value)
  // await player.value.loadScene('https://mdn.alipayobjects.com/mars/afts/file/A*TSsLQorwrs8AAAAAQZAAAAgAelB4AQ')
  // await player.value.loadScene(sceneJson)

  nextTick(async () => {
    player.value = new Player({
      container: container.value,
      // container: document.getElementById('J-Container'),
      interactive: true,
    })

    // initPlayerStateMachineEvents 为通用方法，可以直接引入：https://mdn.alipayobjects.com/shimmer/afts/file/t82RToQ0kJQAAAAAQEAAAAgAeoLnAQBr
    initPlayerStateMachineEvents(player.value)
    await player.value.loadScene(jsonUrl)
  })
})

onBeforeUnmount(() => {
  player.value.dispose()
})
</script>

<template>
  <div id="J-Container" ref="container" />
</template>

<style scoped>
#J-Container {
  width: 100%;
  height: 400px;
}
</style>
