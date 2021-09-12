const { squish, unsquish } = require('squishjs');

const fromJson = (inJson) => {
    const squishedLayers = new Array(inJson.length);
    for (let i = 0; i < inJson.length; i++) {
        const layerRoot = inJson[i];
        const stuff = [];
        fromJsonHelper(layerRoot, stuff);
        squishedLayers[i] = stuff;
    }

    return squishedLayers;
};

const fromJsonHelper = (node, stuff) => {
    stuff.push(squish(node));

    for (let i = 0; i < node.node.children.length; i++) {
        fromJsonHelper(node.node.children[i], stuff);
    }
};

module.exports = fromJson;
