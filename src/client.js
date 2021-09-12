const layersToSvg = require('./svg');
const fromJson = require('./json');
const widthForm = document.getElementById('width-px');
const heightForm = document.getElementById('height-px');
const scaleXForm = document.getElementById('scale-x');
const scaleYForm = document.getElementById('scale-y');
const dataForm = document.getElementById('data');
const svgContainer = document.getElementById('svg-container');

const initialData= `[{"node":{"id":31,"children":[{"node":{"id":32,"children":[],"coordinates2d":[[0,0],[50,0],[50,50],[0,50],[0,0]],"fill":[0,0,255,255],"text":null,"asset":null,"effects":null,"input":null,"listeners":{},"playerIds":[],"subType":3},"id":32},{"node":{"id":33,"children":[],"coordinates2d":[[50,0],[100,0],[100,50],[50,50],[50,0]],"fill":[0,255,0,255],"text":null,"asset":null,"effects":null,"input":null,"listeners":{},"playerIds":[],"subType":3},"id":33},{"node":{"id":34,"children":[],"coordinates2d":[[50,50],[100,50],[100,100],[50,100],[50,50]],"fill":[0,0,0,255],"text":null,"asset":null,"effects":null,"input":null,"listeners":{},"playerIds":[],"subType":3},"id":34},{"node":{"id":35,"children":[],"coordinates2d":[[0,50],[50,50],[50,100],[0,100],[0,50]],"fill":[128,0,128,255],"text":null,"asset":null,"effects":null,"input":null,"listeners":{},"playerIds":[],"subType":3},"id":35},{"node":{"id":37,"children":[],"color":null,"handleClick":null,"coordinates2d":null,"border":null,"fill":null,"text":{"x":25,"y":25,"align":"center","color":[255,255,255,255],"text":"ayy lmao"},"asset":null,"effects":null,"input":null,"listeners":{},"playerIds":[],"subType":2},"id":37},{"node":{"id":38,"children":[{"node":{"id":39,"children":[],"color":[255,165,0,255],"coordinates2d":[[60,20],[80,20]],"text":null,"asset":null,"effects":null,"input":null,"listeners":{},"playerIds":[],"subType":5},"id":39}],"coordinates2d":[75,25,10],"fill":[255,255,255,255],"text":null,"asset":null,"effects":null,"input":null,"listeners":{},"playerIds":[],"subType":4},"id":38},{"node":{"id":40,"children":[],"coordinates2d":[75,75,10],"fill":[255,192,203,255],"text":null,"asset":null,"effects":null,"input":null,"listeners":{},"playerIds":[],"subType":4},"id":40},{"node":{"id":41,"children":[],"coordinates2d":[[12.5,62.5],[37.5,62.5],[37.5,87.5],[12.5,87.5],[12.5,62.5]],"fill":[255,0,0,255],"text":null,"asset":null,"effects":null,"input":null,"listeners":{},"playerIds":[],"subType":3},"id":41}],"coordinates2d":[[0,0],[100,0],[100,100],[0,100],[0,0]],"fill":[255,0,0,255],"text":null,"asset":null,"effects":null,"input":null,"listeners":{},"playerIds":[],"subType":3},"id":31}]`; 

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
dataForm.value = JSON.stringify(JSON.parse(data), null, 2);

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

