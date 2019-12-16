console.log("Starting...");

var dict;

function getLocalPaste() {
    let fullURL = browser.runtime.getURL("paste.json");
    fetch(fullURL)
        .then(paste => {
            paste.text()
            .then(content => {
                let dict = JSON.parse(content.toString());
                let regexps = [];
                dict.forEach(elem => {
                    regexps.push([new RegExp(elem.pattern, elem.flags), elem.substitution]);
                })
                nativeTreeWalker(regexps);
            })

        })
        .catch(err => console.log("Error: " + err));
}
function nativeTreeWalker(regexps) {
    var walker = document.createTreeWalker(
        document.body,
        NodeFilter.SHOW_TEXT,
        null,
        false
    );

    let node;

    while (node = walker.nextNode()) {
        regexpReplacer(node, regexps)
    }
    console.log("Done.");
}

var regexpReplacer = function (node, regexps) {
    regexps.forEach(elem => {
        node.textContent = node.textContent.replace(elem[0], elem[1]);
    })

}

getLocalPaste();
