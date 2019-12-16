console.log("Starting...");

var dict;

function getLocal() {
    let fullURL = browser.runtime.getURL("regexps.json");
    fetch(fullURL)
        .then(regexp => {
            regexp.text()
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

    let textNodes = [];

    let node;

    while (node = walker.nextNode()) {
        textNodes.push(node);
    }

    console.log("There are " + textNodes.length + " nodes");
    textNodes.forEach(function (el) {
        regexpReplace(el, regexps);
    });

    console.log("Done.");

}

function regexpReplace(textNode, regexps) {
    let origText = textNode.textContent;
    regexps.forEach(elem => {
        let newHtml = origText.replace(elem[0], '<span style="background-color:#f759e8;">' + elem[1] + '</span>');
        if (newHtml !== origText) {
            let newSpan = document.createElement('span');
            newSpan.innerHTML = newHtml;
            textNode.parentNode.replaceChild(newSpan, textNode);
        }
    })
}

getLocal();
