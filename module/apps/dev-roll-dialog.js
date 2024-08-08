/* global Dialog, FormData, game, renderTemplate */

import { CoC7ChatMessage } from './coc7-chat-message.js'
import { CoC7Check } from '../check.js'
import { CoC7Dice } from '../dice.js'



export class COC7RollDialog {
  static async create (options = {}) {
    if (options.difficulty) {
      options.difficultyLevel = {}
      if (CoC7Check.difficultyLevel.unknown === options.difficulty) {
        options.difficultyLevel.unknown = true
      }
      if (CoC7Check.difficultyLevel.regular === options.difficulty) {
        options.difficultyLevel.regular = true
      }
      if (CoC7Check.difficultyLevel.hard === options.difficulty) {
        options.difficultyLevel.hard = true
      }
      if (CoC7Check.difficultyLevel.extreme === options.difficulty) {
        options.difficultyLevel.extreme = true
      }
    }
    //if( undefined == options.askValue) options.askValue = true;
    if (options.difficulty) {
      options.difficultyLevel = {}
      if (CoC7Dice.fumble99 === options.dice99) {
        game.CoC7.dev.dice.alwaysCrit = true
      }
      if (CoC7Dice.extreme === options.diceex) {
        options.extreme = true
      }
      if (CoC7Dice.crit01 === options.dice01) {
        options.crit01 = true
      }
    }
    if (
      typeof options.cardType !== 'undefined' &&
      (!options.forcedCardType ?? true)
    ) {
      data.cardTypes = CoC7ChatMessage.cardTypes(options)
    }
    const html = await renderTemplate(
      'systems/CoC7/templates/apps/bonus-dev.html',
      data
    )
    return new Promise(resolve => {
      let formData = null
      const dlg = new Dialog({
        title: options.displayName
          ? game.i18n.format('CoC7.BonusSelectionWindowNamed', {
            name: options.displayName
          })
          : game.i18n.localize('CoC7.BonusSelectionWindow'),
        content: html,
        buttons: {
          roll: {
            label: game.i18n.localize('CoC7.RollDice'),
            callback: html => {
              formData = new FormData(html[0].querySelector('#bonus-roll-form'))
              return resolve(formData)
            }
          }
        },
        default: 'roll',
        close: () => {}
      })
      dlg.render(true)
    })
  }
}
