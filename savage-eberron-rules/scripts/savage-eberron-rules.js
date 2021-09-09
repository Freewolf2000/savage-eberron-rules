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

  //Add sidebar clipping mask to page
  $(document.body).append(await renderTemplate("modules/savage-eberron-rules/assets/layout/sidebar-mask.html"));

  console.debug("Savage Eberron Core | Initalizing....")
});

Hooks.on("renderJournalSheet", (sheet, html, data) => {
  const journalClass = "sweb-core";
  const wrapperClass = "sweb-wrapper";

  const dlEntry = html.find(`.${journalClass}`);
  if (dlEntry.length) html.addClass(wrapperClass);

  const select  = html.find("select[name=folder]");
  const sel     = select[0];
  const chapter = sel.options[sel.selectedIndex].innerHTML;

  select.replaceWith(`<h2 class="chapter-label">${chapter}</h2>`);
});

/*
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
});
*/

Hooks.on("renderSwadeCharacterSheet", (sheet, html, entity) => {
  _replaceCurrency(sheet, html, entity);
}
});
