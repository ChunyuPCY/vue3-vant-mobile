/* eslint-disable ts/ban-ts-comment */
/*
 * init-state-machine-events.ts
 * Initialize item pointer events in state machine for player.
 * Usage:
 * ```
 *   const player = new Player({interactive: true});
 *   initPlayerStateMachineEvents(player);
 *   player.loadScene('xxx');
 * ```
 */

import { Animator } from '@galacean/effects'
import type { Player } from '@galacean/effects'

enum ParameterType {
  Trigger = '0',
  Number = '1',
  Boolean = '2',
}

enum ListenerEvent {
  CLICK = 'click',
  POINTERDOWN = 'pointerdown',
  POINTERUP = 'pointerup',
  POINTERMOVE = 'pointermove',
}

interface SPECListener {
  type: ListenerEvent
  itemId: string
  parameters: {
    name: string
    type: ParameterType
    value?: boolean | number
  }[]
}

type EventHandler = (e: any) => void

let downHandler: EventHandler = () => { }
let upHandler: EventHandler = () => { }
let clickHandler: EventHandler = () => { }
let moveHandler: EventHandler = () => { }

function getPlayerAnimator(player?: Player): Animator[] {
  const compositions = player?.getCompositions()
  const animators: Animator[] = []

  compositions?.forEach((composition) => {
    const animator = composition.getComponent(Animator)
    if (animator) {
      animators.push(animator)
    }
    composition.items.forEach((item) => {
      const animator = item.getComponent(Animator)
      if (animator) {
        animators.push(animator)
      }
    })
  })

  return animators
}

export function initPlayerStateMachineEvents(player: Player) {
  let animators: Animator[] | null = null
  // @ts-expect-error
  const { event } = player

  event.addEventListener('touchstart', (downHandler = (e) => {
    handlePlayerEvent(e, ListenerEvent.POINTERDOWN, player)
  }))
  event.addEventListener('touchend', (upHandler = (e) => {
    handlePlayerEvent(e, ListenerEvent.POINTERUP, player)
    animators = null
  }))
  event.addEventListener('click', (clickHandler = (e) => {
    handlePlayerEvent(e, ListenerEvent.CLICK, player)
  }))
  event.addEventListener('touchmove', (moveHandler = (e) => {
    if (!animators) {
      animators = getPlayerAnimator(player)
    }
    handlePlayerEvent(e, ListenerEvent.POINTERMOVE, player, animators)
  }))
}

// call player.dispose() or this function
export function disposePlayerStateMachineEvents(player: Player) {
  // @ts-expect-error
  const { event } = player
  event.removeEventListener('touchstart', downHandler)
  event.removeEventListener('touchend', upHandler)
  event.removeEventListener('click', clickHandler)
  event.removeEventListener('touchmove', moveHandler)
}

/**
 *
 * @param e
 * @param eventType
 * @param player
 * @param animators
 */
function handlePlayerEvent(
  e: any,
  eventType: ListenerEvent,
  player: Player,
  animators?: Animator[],
) {
  animators ??= getPlayerAnimator(player)

  if (!animators.length) {
    return
  }

  player.getCompositions().forEach((composition) => {
    const hitBoxList = composition.hitTest(e.x, e.y)

    hitBoxList.forEach((hitBox) => {
      animators?.forEach((animator) => {
        // @ts-expect-error
        const listeners: SPECListener[] = animator.graphAsset.defination.listeners ?? []

        listeners.forEach((listener) => {
          if (listener.itemId === hitBox.id) {
            if (listener.type === eventType) {
              setAnimatorParameter(animator, listener.parameters)
            }
          }
        })
      })
    })
  })
}

/**
 *
 * @param animator
 * @param parameters
 */
function setAnimatorParameter(
  animator: Animator,
  parameters: SPECListener['parameters'],
) {
  // @ts-expect-error
  const parameterLookupMap = animator.graphAsset.parameterLookupMap

  parameters.forEach((parameter) => {
    if (parameterLookupMap.get(parameter.name) === undefined) {
      return
    }
    if (parameter.type === ParameterType.Boolean) {
      animator.setBool(parameter.name, parameter.value as boolean)
    }
    else if (parameter.type === ParameterType.Number) {
      animator.setFloat(parameter.name, parameter.value as number)
    }
    else if (parameter.type === ParameterType.Trigger) {
      animator.setTrigger(parameter.name)
    }
  })
}
