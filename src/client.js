const layersToSvg = require('./svg');
const fromJson = require('./json');
const widthForm = document.getElementById('width-px');
const heightForm = document.getElementById('height-px');
const scaleXForm = document.getElementById('scale-x');
const scaleYForm = document.getElementById('scale-y');
const dataForm = document.getElementById('data');
const svgContainer = document.getElementById('svg-container');

const initialData=`[{"node":{"id":23,"children":[{"node":{"id":24,"children":[],"coordinates2d":[[0,0],[50,0],[50,50],[0,50],[0,0]],"fill":[0,0,255,255],"text":null,"asset":null,"effects":null,"input":null,"listeners":{},"playerIds":[],"subType":3},"id":24},{"node":{"id":25,"children":[],"coordinates2d":[[50,0],[100,0],[100,50],[50,50],[50,0]],"fill":[0,255,0,255],"text":null,"asset":null,"effects":null,"input":null,"listeners":{},"playerIds":[],"subType":3},"id":25},{"node":{"id":26,"children":[{"node":{"id":28,"children":[],"color":null,"handleClick":null,"coordinates2d":null,"border":null,"fill":null,"text":{"x":75,"y":75,"align":"center","color":[255,255,255,255],"text":"ayy lmao"},"asset":null,"effects":null,"input":null,"listeners":{},"playerIds":[],"subType":2},"id":28}],"coordinates2d":[[50,50],[100,50],[100,100],[50,100],[50,50]],"fill":[0,0,0,255],"text":null,"asset":null,"effects":null,"input":null,"listeners":{},"playerIds":[],"subType":3},"id":26},{"node":{"id":27,"children":[],"coordinates2d":[[0,50],[50,50],[50,100],[0,100],[0,50]],"fill":[128,0,128,255],"text":null,"asset":null,"effects":null,"input":null,"listeners":{},"playerIds":[],"subType":3},"id":27}],"coordinates2d":[[0,0],[100,0],[100,100],[0,100],[0,0]],"fill":[255,0,0,255],"text":null,"asset":null,"effects":null,"input":null,"listeners":{},"playerIds":[],"subType":3},"id":23}]`;

const initialWidth = 600;
const initialHeight = 600;

const initialScaleX = 1;
const initialScaleY = 1;

let width = initialWidth;
let height = initialHeight;
let scaleX = initialScaleX;
let scaleY = initialScaleY;
let data = initialData;

widthForm.value = width;
heightForm.value = height;
scaleXForm.value = scaleX;
scaleYForm.value = scaleY;
dataForm.value = data;

const updateSvg = () => {
    const container = {x: (width * scaleX), y: (height * scaleY)};
    const jsonData = JSON.parse(data);
    const squishedLayers = fromJson(jsonData);
    const svgData = layersToSvg(squishedLayers, container);
    svgContainer.innerHTML = svgData;
};

updateSvg();

widthForm.oninput = (e) => {
    width = e.target.value;
    updateSvg();
};

heightForm.oninput = (e) => {
    height = e.target.value;
    updateSvg();
};

scaleXForm.oninput = (e) => {
    scaleX = e.target.value;
    updateSvg();
};

scaleYForm.oninput = (e) => {
    scaleY = e.target.value;
    updateSvg();
};

dataForm.oninput = (e) => {
    data = e.target.value;
    updateSvg();
};

