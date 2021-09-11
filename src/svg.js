const { subtypes, unsquish } = require('squishjs');


const svgText = (gameNode, container) => {
    const fill = gameNode.node.text.color;
    const align = gameNode.node.text.align;
    
    let svgAlign;
    if (align === 'left') {
        svgAlign = 'end';
    }
    if (align === 'center') {
        svgAlign = 'middle';
    }
    if (align === 'right') {
        svgAlign = 'start';
    }

    const fillString = `rgba(${fill[0]}, ${fill[1]}, ${fill[2]}, ${fill[3]})`

    return `<text text-anchor="${svgAlign}" x="${scaleX(gameNode.node.text.x, container.x)}" y="${scaleX(gameNode.node.text.y, container.y)}" fill="${fillString}">${gameNode.node.text.text}</text>`;
}

const svgPolygon = (gameNode, container) => {
    const coordPairs = gameNode.node.coordinates2d;
    const fill = gameNode.node.fill;

    const fillString = `rgba(${fill[0]}, ${fill[1]}, ${fill[2]}, ${fill[3]})`

    const scaledCoords = coordPairs.map(coordPair => {
        return [scaleX(coordPair[0], container.x), scaleY(coordPair[1], container.y)];
    });

    return `<polygon points="${scaledCoords.join(' ')}"
              fill="${fillString}" stroke="black" />`;
};

const scaleX = (x, containerWidth) => {
    const widthPercentage = x / 100;
    return widthPercentage * containerWidth;
};

const scaleY = (y, containerHeight) => {
    const heightPercentage = y / 100;
    return heightPercentage * containerHeight;
};

const svgHelper = (gameNode, container) => {

    if (gameNode.node.subType === subtypes.SHAPE_2D_POLYGON) {
        console.log('sdfdsfdsf');
        return svgPolygon(gameNode, container);
    } else if (gameNode.node.subType === subtypes.SHAPE_2D_LINE) {
        // svgString += svgPolygon(gameNode);
    } else if (gameNode.node.subType === subtypes.SHAPE_2D_CIRCLE) {
        // svgString += svgPolygon(gameNode);
    } else if (gameNode.node.subType === subtypes.ASSET) {
        // svgString += svgPolygon(gameNode);
    } else if (gameNode.node.subType === subtypes.TEXT) {
        return svgText(gameNode, container);
    }
};

const layersToSvg = (squishedLayers) => {
    const pageWidth = 600;
    const pageHeight = 600;
    let svgString = `<svg height="${pageHeight}" width="${pageWidth}" xmlns="http://www.w3.org/2000/svg" xmlns:xlink= "http://www.w3.org/1999/xlink">`;
            // <circle cx="50" cy="50" r="40" stroke="black" stroke-width="3" fill="red" />
        // </svg>`;
    const container = { x: pageWidth, y: pageHeight };
    squishedLayers.forEach(squishedNode => {
        const node = unsquish(squishedNode);
        svgString += svgHelper(node, container);
    });

    svgString += `</svg>`
    return svgString;
};

module.exports = layersToSvg;
