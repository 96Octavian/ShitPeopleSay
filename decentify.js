console.log("Starting...");

var textNodes = [];

var dict = {
    "/MDN/g": "REPLACED"
}

function nativeTreeWalker() {
    var walker = document.createTreeWalker(
        document.body,
        NodeFilter.SHOW_TEXT,
        null,
        false
    );

    var node;

    while (node = walker.nextNode()) {
        regexpReplacer(node)
        //node.textContent = node.textContent.replace(/MDN/g, "REPLACED");
        textNodes.push(node.nodeValue);
    }
}

var regexpReplacer = function (node) {
    //node.textContent = node.textContent.replace(/MDN/g, "REPLACED");
    for (let key of Object.keys(dict)) {
        node.textContent = node.textContent.replace(key, dict[key]);;
    }
}

nativeTreeWalker();

console.log("There are " + textNodes.length + " nodes");