<script setup lang="ts">
import { Animator, Player } from '@galacean/effects'
import type { Composition } from '@galacean/effects'
import jsonUrl from '~/turn-table/轮盘.json?url'
import { consola } from 'consola'
import type { Numeric } from 'vant/es/utils'

const awardListConfig = {
  Text1: '免单免单免单免单免单免单',
  Text2: '30元券包',
  Text3: '买一赠一券',
  Text4: '到店5元消费券',
  Text5: '免单',
  Text6: '4.8折券',
  image1: 'https://mdn.alipayobjects.com/huamei_g7mrsq/afts/img/A*sJCkT7OSvpsAAAAAAAAAAAAADuCHAQ/original',
  image2: 'https://mdn.alipayobjects.com/huamei_g7mrsq/afts/img/A*pWKeS7_wSykAAAAAAAAAAAAADuCHAQ/original',
  image3: 'https://mdn.alipayobjects.com/huamei_g7mrsq/afts/img/A*VZJ8Q7g3u7kAAAAAAAAAAAAADuCHAQ/original',
  image4: 'https://mdn.alipayobjects.com/huamei_g7mrsq/afts/img/A*lFoAT4Z-I4AAAAAAAAAAAAAADuCHAQ/original',
  image5: 'https://mdn.alipayobjects.com/huamei_g7mrsq/afts/img/A*1vZbQJYL_EwAAAAAAAAAAAAADuCHAQ/original',
  image6: 'https://mdn.alipayobjects.com/huamei_g7mrsq/afts/img/A*W0qOT4NOTSsAAAAAAAAAAAAADuCHAQ/original',
}

interface AwardOption {
  text: string
  value: number
}

const awardCount = ref(6) // 转盘奖品个数
const awardOptions = computed<AwardOption[]>(() =>
  Array.from({ length: awardCount.value }, (_, i) => ({
    text: `奖品${i + 1}`,
    value: i + 1,
  })),
)

const containerRef = ref<HTMLDivElement>(null)
const playerRef = ref<Player>()
const compositionRef = ref<Composition>()
const winPrize = ref(1)
const winPrizeText = ref(awardOptions.value[0].text)

// 响应点击开始按钮
async function handleClickStartBtn() {
  // 获取中奖信息
  consola.info('中奖index', winPrize.value)
  // 设置状态机参数（与设计约定好状态机参数名称）
  const animator: Animator = compositionRef.value.getComponent(Animator)
  animator.setFloat('winPrize', winPrize.value)
  animator.setTrigger('rotate')
}

onMounted(() => {
  nextTick(async () => {
    const player = new Player({
      container: containerRef.value,
      notifyTouch: true,
      interactive: true,
      pixelRatio: window.devicePixelRatio,
    })

    playerRef.value = player

    compositionRef.value = await player.loadScene(jsonUrl, {
      variables: awardListConfig,
    })

    player.on('click', (evt) => {
      consola.info('click on: ', evt?.name)
      // 点击开始按钮
      if (evt.name === 'lotteryBtn') {
        handleClickStartBtn()
      }
    })
  })
})

onBeforeUnmount(() => {
  if (playerRef.value) {
    playerRef.value.dispose()
    playerRef.value = undefined
  }
})

const showPicker = ref(false)
const pickerValue = ref<Numeric[]>([])
function onConfirm({ selectedValues, selectedOptions }) {
  showPicker.value = false
  pickerValue.value = selectedValues
  winPrize.value = selectedOptions[0].value
  winPrizeText.value = selectedOptions[0].text
}
</script>

<template>
  <div ref="containerRef" className="demo-container" />
  <van-row gutter="16" class="items-center">
    <van-col span="20">
      <van-field v-model="winPrizeText" is-link readonly label="抽中奖品" placeholder="选择城市" @click="showPicker = true" />
    </van-col>
    <van-col span="4">
      <van-button class="w-full" size="small" type="primary" @click="handleClickStartBtn">
        开始抽奖
      </van-button>
    </van-col>
  </van-row>

  <van-popup v-model:show="showPicker" destroy-on-close round position="bottom">
    <van-picker :model-value="pickerValue" :columns="awardOptions" @cancel="showPicker = false" @confirm="onConfirm" />
  </van-popup>
</template>

<style scoped>
.demo-container {
  width: 100%;
  height: 500px;
}

button {
  margin-right: 10px;
}
</style>
