var textNodes = [];

function nativeTreeWalker() {
    var walker = document.createTreeWalker(
        document.body, 
        NodeFilter.SHOW_TEXT, 
        null, 
        false
    );

    var node;

    while(node = walker.nextNode()) {
        node.textContent = node.textContent.replace(/MDN/g, "REPLACED");
        textNodes.push(node.nodeValue);
    }
}

nativeTreeWalker();

alert("There are " + textNodes.length + " text nodes");