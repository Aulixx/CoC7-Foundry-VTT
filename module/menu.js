/* global canvas, foundry, game, PlaceablesLayer */
import { CoC7Chat } from './chat.js'
import { CoC7Utilities } from './utilities.js'
import { CoC7ActorImporterDialog } from './apps/actor-importer-dialog.js'
import { CoC7ContentLinkDialog } from './apps/coc7-content-link-dialog.js'
import { CoC7InvestigatorWizard } from './apps/investigator-wizard.js'
import { COC7Dev } from './apps/dev.js'

class CoC7MenuLayer extends PlaceablesLayer {
  constructor () {
    super()
    this.objects = {}
  }

  static get layerOptions () {
    return foundry.utils.mergeObject(super.layerOptions, {
      name: 'coc7menu',
      zIndex: 60
    })
  }

  static get documentName () {
    return 'Token'
  }

  get placeables () {
    return []
  }
}

export class CoC7Menu {
  static getButtons (controls) {
    canvas.coc7gmtools = new CoC7MenuLayer()
    const isKeeper = game.user.isGM
    const showHiddenDevMenu = game.settings.get('CoC7', 'hiddendevmenu')
    controls.push({
      name: 'coc7menu',
      title: 'CoC7.GmTools',
      layer: 'coc7gmtools',
      icon: 'game-icon game-icon-tentacle-strike',
      visible: isKeeper,
      tools: [
        {
          toggle: true,
          icon: 'fas fa-certificate',
          class: 'xp_toggle',
          name: 'xptoggle',
          active: game.settings.get('CoC7', 'xpEnabled'),
          title: 'CoC7.toggleXP',
          onClick: async toggle => await CoC7Utilities.toggleXPGain(toggle)
        },
        {
          toggle: true,
          icon: 'fas fa-angle-double-up',
          name: 'devphase',
          active: game.settings.get('CoC7', 'developmentEnabled'),
          title: 'CoC7.DevPhase',
          onClick: async toggle => await CoC7Utilities.toggleDevPhase(toggle)
        },
        {
          toggle: true,
          icon: 'fas fa-user-edit',
          name: 'charcreate',
          active: game.settings.get('CoC7', 'charCreationEnabled'),
          title: 'CoC7.CharCreationMode',
          onClick: async toggle =>
            await CoC7Utilities.toggleCharCreation(toggle)
        },
        {
          button: true,
          icon: 'fas fa-user-plus',
          name: 'actor-import',
          title: 'CoC7.ActorImporter',
          onClick: async () => await CoC7ActorImporterDialog.create()
        },
        {
          button: true,
          icon: 'fas fa-user-check',
          name: 'investigator-wizard',
          title: 'CoC7.InvestigatorWizard.Title',
          onClick: async () => await CoC7InvestigatorWizard.create()
        },
        //{
        //  button: true,
         // icon: 'fas fa-dice',
         // name: 'Kosci',
        //  title: 'Kości',
        //  onClick: async () => await COC7Dev.create()
       // },

      ]
    })
    if (showHiddenDevMenu) {
      canvas.coc7DevTools = new CoC7MenuLayer()
      controls.push({
        name: 'coc7DevMenu',
        title:
          "Dev tools",
        layer: 'coc7DevTools',
        icon: 'game-icon game-icon-police-badge',
        visible: isKeeper,
        tools: [
          {
            toggle: true,
            icon: 'game-icon game-icon-dice-fire',
            name: 'alwaysCrit',
            active: game.CoC7.dev.dice.alwaysCrit,
            title: 'Krytyczny Sukces',
            onClick: toggle => {
            
              game.CoC7.dev.dice.alwaysCrit = toggle
            }
          },
  
          {
            toggle: true,
            icon: 'game-icon game-icon-fire-extinguisher',
            name: 'alwaysFumble',
            active: game.CoC7.dev.dice.alwaysFumble,
            title: 'Krytyczna Porażka',
            onClick: toggle => {
              game.CoC7.dev.dice.alwaysFumble = toggle
              
            }
          },

        ]
      })
    }
  }

  static renderControls (app, html, data) {
    const isKeeper = game.user.isGM
    const keeperMenu = html.find('.game-icon-tentacle-strike').parent()
    keeperMenu.addClass('coc7-menu')
    if (isKeeper) 

   // keeperMenu.after(
    //  '<li class="scene-control coc7-menu coc7-dice-roll" title="' +
     //   game.i18n.localize('CoC7.RollDice') +
//'"><i class="game-icon game-icon-d20"></i></li>'
    //)
    html
      .find('.coc7-menu.coc7-dice-roll')
      .click(event => CoC7Utilities.rollDice(event))
    html
      .find('.coc7-menu.coc7-create-link')
      .click(event => CoC7ContentLinkDialog.create(event))
     // html
     // .find('.coc7-menu.coc7-dice-roll')
      //.click(event => COC7RollDialog.rollDice(event))
  }
}
