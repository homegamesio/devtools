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

const svgCircle = (gameNode, container) => {
    const centerX = gameNode.node.coordinates2d[0];
    const centerY = gameNode.node.coordinates2d[1];
    const radius = gameNode.node.coordinates2d[2];

    const stroke = gameNode.node.color;
    const fill = gameNode.node.fill;
    
    const fillString = fill ? `rgba(${fill[0]}, ${fill[1]}, ${fill[2]}, ${fill[3]})` : '';
    // gross variable name
    const strokeString = stroke ? `rgba(${stroke[0]}, ${stroke[1]}, ${stroke[2]}, ${stroke[3]})` : '';

    return `<ellipse cx="${scaleX(centerX, container.x)}" cy="${scaleY(centerY, container.y)}" rx="${scaleX(radius, container.x)}" ry="${scaleY(radius, container.y)}" fill="${fillString}" /> stroke="${strokeString}"`;
    //todo: change to ellipse (not circle) with radius x and radius y

//    return `<circle cx`;

            // <circle cx="50" cy="50" r="40" stroke="black" stroke-width="3" fill="red" />
};

const svgLine = (gameNode, container) => {
    const coordPairs = gameNode.node.coordinates2d;
    const color = gameNode.node.color;
    const colorString = `rgba(${color[0]}, ${color[1]}, ${color[2]}, ${color[3]})`;

    const scaledCoords = coordPairs.map(coordPair => {
        return [scaleX(coordPair[0], container.x), scaleY(coordPair[1], container.y)];
    });

    return `<polyline points="${scaledCoords.join(' ')}" fill="none" stroke="${colorString}"`;
};

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
        return svgPolygon(gameNode, container);
    } else if (gameNode.node.subType === subtypes.SHAPE_2D_LINE) {
        return svgLine(gameNode, container);
    } else if (gameNode.node.subType === subtypes.SHAPE_2D_CIRCLE) {
        return svgCircle(gameNode, container);
    } else if (gameNode.node.subType === subtypes.ASSET) {
        // svgString += svgPolygon(gameNode);
    } else if (gameNode.node.subType === subtypes.TEXT) {
        return svgText(gameNode, container);
    }
};

const layersToSvg = (squishedLayers, container) => {
    let svgString = `<svg height="${container.y}" width="${container.x}" xmlns="http://www.w3.org/2000/svg" xmlns:xlink= "http://www.w3.org/1999/xlink">`;
    squishedLayers.forEach(squishedLayer => {
        squishedLayer.forEach(squishedNode => {
            const node = unsquish(squishedNode);
            svgString += svgHelper(node, container);
        });
    });

    svgString += `</svg>`
    return svgString;
};

module.exports = layersToSvg;
