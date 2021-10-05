Hooks.on("ready", async () => {
    // Add custom stylesheet to TinyMCE Config
    // CONFIG.TinyMCE.content_css.push("/modules/gm-secrets/gm-secret-style.css");

    if (game.user.isGM) {
        // Add GM Secret section type
        const customFormats = CONFIG.TinyMCE.style_formats.find(x => x.title === "Custom");
        const customFormats1 = CONFIG.TinyMCE.style_formats.find(x => x.title === "Custom");
        const customFormats2 = CONFIG.TinyMCE.style_formats.find(x => x.title === "Custom");
        const customFormats3 = CONFIG.TinyMCE.style_formats.find(x => x.title === "Custom");
        const customFormats4 = CONFIG.TinyMCE.style_formats.find(x => x.title === "Custom");
        const customFormats5 = CONFIG.TinyMCE.style_formats.find(x => x.title === "Custom");
        const customFormats6 = CONFIG.TinyMCE.style_formats.find(x => x.title === "Custom");
        const customFormats7 = CONFIG.TinyMCE.style_formats.find(x => x.title === "Custom");
        customFormats.items.push(
            {
                title: "Savage Eberron Wrapper",
                block: 'div',
                classes: 'sweb-core',
                wrapper: true
            }
        );
        customFormats1.items.push(
            {
                title: "Read Aloud",
                block: 'p',
                classes: 'read-aloud',
                wrapper: true
            }
        );
        customFormats2.items.push(
            {
                title: "Wide Page Heading",
                block: 'h1',
                classes: 'wide',
                wrapper: true
            }
        );
        customFormats3.items.push(
            {
                title: "List Heading",
                block: 'span',
                classes: 'list-heading',
                wrapper: true
            }
        );
        customFormats4.items.push(
            {
                title: "Example Inline",
                block: 'p',
                classes: 'example',
                wrapper: true
            }
        );
        customFormats5.items.push(
            {
                title: "Aftermath Heading",
                block: 'h2',
                classes: 'aftermath',
                wrapper: true
            }
        );
        customFormats6.items.push(
            {
                title: "Example Heading",
                block: 'h2',
                classes: 'example',
                wrapper: true
            }
        );
        customFormats7.items.push(
            {
                title: "Scroll Sidebar",
                block: 'aside',
                classes: 'sidebar',
                wrapper: true
            }
        );

        // If the user is a GM, add a unique class to the body of the document so that we can selectively hide content when this class doesn't exist.
        //$("body").addClass("game-master");
    }

    // Wrap TextEditor.create to add the appropriate class to the created editor
    const oldCreate = TextEditor.create;
    TextEditor.create = async function (options={}, content="") {
        const editor = await oldCreate.apply(this, arguments);

        // If the user is a GM, add the "game-master" class to the tinyMCE iframe body.
        if (game.user.isGM) {
            editor.dom.addClass("tinymce", "game-master");
        }

        return editor;
    }

    // Wrap TextEditor.enrichHTML to remove GM secret sections if the user is not a GM
    const oldEnrichHTML = TextEditor.enrichHTML;
    TextEditor.enrichHTML = function () {
        const content = oldEnrichHTML.apply(this, arguments);

        const html = document.createElement("div");
        html.innerHTML = content;

        if (!game.user.isGM) {
            let elements = html.querySelectorAll("section.read-aloud");
            elements.forEach(e => e.parentNode.removeChild(e));
        }

        return html.innerHTML;
    }
});
