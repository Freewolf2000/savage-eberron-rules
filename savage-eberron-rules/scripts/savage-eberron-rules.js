Hooks.on("ready", async () => {
  if (game.modules.get("compendium-folders") == undefined) {
    ui.notifications.error("Please download & enable COMPENDIUM FOLDERS module for SWADE-Core-Rules to function properly!")
  } else if (game.modules.get("compendium-folders").active == false) {
    ui.notifications.error("Please enable COMPENDIUM FOLDERS modules in this world for SWADE-Core-Rules to work properly!")
  }

  //Force Building Pack Indexes so Entity Links don't break
  for (let pack of game.packs.entries) {
    if (pack.collection.includes("savage-eberron-rules"))
      pack.getIndex();
  }

  // Register Tooltip Setting
  game.settings.register('savage-eberron-rules', 'show-welcome-screen', {
    name: "Show Welcome Screen on Start",
    label: "Show Welcome Screen on Start",
    type: Boolean,
    default: true,
    config: true,
  })
  // Show tooltip if Setting is True
  if (game.settings.get("savage-eberron-rules", "show-welcome-screen")) {
    new Dialog({
      name: "Savage Worlds for the Eberron Campaign Setting",
      content: await renderTemplate('modules/savage-eberron-rules/templates/welcomescreen.hbs'),
      buttons: {
        ok: {
          label: "Ok",
          callback: async (html) => {
            if (html.find("#hide-tooltip")[0].checked) {
              game.settings.set("savage-eberron-rules", "show-welcome-screen", false)
            }
          }
        },
      }
    }, {
      id: "tooltip"
    }).render(true)
  }

  game.settings.register("savage-eberron-rules", "entity-linking-css", {
    name: "Enable SWADE Entity Linking CSS",
    label: "Enable SWADE Entity Linking CSS (Requires refresh to take effect)",
    type: Boolean,
    default: true,
    config: true
  })

  if (game.settings.get('savage-eberron-rules', 'entity-linking-css')) {
    let rule = `
    .swade-core a.entity-link,
    .swade-core a.inline-roll {
      background: transparent;
      border: none;
      padding: 0;
      color: var(--red);
      text-decoration: underline;
    }`
    let sheet = window.document.styleSheets[0]
    sheet.insertRule(rule, sheet.cssRules.length);
  }

  if (game.user.isGM) {
      // Add GM Secret section type
      const customFormats = CONFIG.TinyMCE.style_formats.find(x => x.title === "Custom");
      customFormats.items.push(
          {
              title: "Read Aloud",
              block: 'section',
              classes: 'read-aloud',
              wrapper: true
          }
      );
  }

  // Wrap TextEditor.create to add the appropriate class to the created editor
//  const oldCreate = TextEditor.create;
//  TextEditor.create = async function (options={}, content="") {
//      const editor = await oldCreate.apply(this, arguments);
//
//      // If the user is a GM, add the "game-master" class to the tinyMCE iframe body.
//      if (game.user.isGM) {
//          editor.dom.addClass("tinymce", "game-master");
//      }
//
//      return editor;
//  }
});

Hooks.on("renderSwadeCharacterSheet", (sheet, html, entity) => {
  _replaceCurrency(sheet, html, entity);
}
});
