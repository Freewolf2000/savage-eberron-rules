Hooks.on("ready", async () => {
  if(game.modules.get("compendium-folders") == undefined){
    ui.notifications.error("Please download & enable COMPENDIUM FOLDERS module for swpf-core-rules to function properly!")
  } else if(game.modules.get("compendium-folders").active == false){
    ui.notifications.error("Please enable COMPENDIUM FOLDERS modules in this world for swpf-core-rules to work properly!")
  }

  //Force Building Pack Indexes so Entity Links don't break
  for(let pack of game.packs.contents){
    if(pack.collection.includes("savage-eberron-rules"))
    pack.getIndex();
  }

  //Add sidebar clipping mask to page
  $(document.body).append(await renderTemplate("modules/savage-eberron-rules/assets/layout/sidebar-mask.html"));

  console.debug("SWEB Core | Initalizing....")
})

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

Hooks.on("renderJournalSheet", (sheet, html, data) => {
  const journalClass = "sweb-periodicals";
  const wrapperClass = "sweb-wrapper sweb-periodicals-wrapper";

  const dlEntry = html.find(`.${journalClass}`);
  if (dlEntry.length) html.addClass(wrapperClass);

  const select  = html.find("select[name=folder]");
  const sel     = select[0];
  const chapter = sel.options[sel.selectedIndex].innerHTML;

  select.replaceWith(`<h2 class="chapter-label">${chapter}</h2>`);
});
