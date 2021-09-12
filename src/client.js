const layersToSvg = require('./svg');
const widthForm = document.getElementById('width-px');
const heightForm = document.getElementById('height-px');
const scaleXForm = document.getElementById('scale-x');
const scaleYForm = document.getElementById('scale-y');
const dataForm = document.getElementById('data');
const svgContainer = document.getElementById('svg-container');

const initialData = [
  [
      3, 39, 2,  43,  3, 23, 44,   2, 53,   6,
    255,  0, 0, 255, 55,  3,  3,  52, 22,   0,
      0,  0, 0, 100,  0,  0,  0, 100,  0, 100,
      0,  0, 0, 100,  0,  0,  0,   0,  0
  ],
  [
    3, 39,   2,  43,  3, 24, 44,  2, 53,  6,
    0,  0, 255, 255, 55,  3,  3, 52, 22,  0,
    0,  0,   0,  50,  0,  0,  0, 50,  0, 50,
    0,  0,   0,  50,  0,  0,  0,  0,  0
  ],
  [
    3,  39, 2,  43,  3, 25, 44,   2, 53,  6,
    0, 255, 0, 255, 55,  3,  3,  52, 22, 50,
    0,   0, 0, 100,  0,  0,  0, 100,  0, 50,
    0,  50, 0,  50,  0, 50,  0,   0,  0
  ],
  [
    3, 39, 2,  43,  3, 26, 44,   2, 53,   6,
    0,  0, 0, 255, 55,  3,  3,  52, 22,  50,
    0, 50, 0, 100,  0, 50,  0, 100,  0, 100,
    0, 50, 0, 100,  0, 50,  0,  50,  0
  ],
  [
      3,  38,   3, 43,   3,  28,  44,   2,  47,
     27,  75,   0, 75,   0,   1,  41, 255, 255,
    255, 255,   6, 99, 101, 110, 116, 101, 114,
     97, 121, 121, 32, 108, 109,  97, 111,  55,
      3,   2
  ],
  [
      3, 39,   2,  43,  3, 27, 44,  2, 53,   6,
    128,  0, 128, 255, 55,  3,  3, 52, 22,   0,
      0, 50,   0,  50,  0, 50,  0, 50,  0, 100,
      0,  0,   0, 100,  0,  0,  0, 50,  0
  ]
];

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
dataForm.value = JSON.stringify(data);

const updateSvg = () => {
    const container = {x: (width * scaleX), y: (height * scaleY)};
    const svgData = layersToSvg(data, container);
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
    data = JSON.parse(e.target.value);
    updateSvg();
};

