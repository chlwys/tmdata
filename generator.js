fs = require('fs');

const SIZE = 8; // equiv to uint8

const max_hat = 0;
const max_body = 2;
const max_equipment = 2;
const max_eye = 9;
const max_flower = 3;
const max_mouth = 7;

const max_all = [ 
  max_body,
  max_equipment,
  max_eye,
  max_flower,
  max_mouth,
  max_hat
]; 

let numElements;

const baseURI = "https://raw.githubusercontent.com/chlwys/test3/main/public/";

function packArray(elements) {
  let result = 0;
  for(let i = 0; i < elements.length; i++) {
    result = ((result << SIZE) >>> 0) | elements[numElements - i - 1];
  }

  return result;
}

function createSvg(elements) {
  let result = '<svg xmlns="http://www.w3.org/2000/svg">';

  for(let i = 0; i < elements.length; i++) {
    result = result + '<image href="' + baseURI + i + elements[i] + '.png"/>';
  }

  result = result + '</svg>';
  
  return result;
}

function mainLoop(elements, position) {
  for(let i = 0; i <= max_all[position]; i++) {
    elements[position] = i;
    if(position == numElements - 1) {

      const packed = packArray(elements);
      const name  = './svgFiles/' + packed.toString() + '.svg';

      const svg = createSvg(elements);

      fs.writeFile(name, svg, function(err) {
        if (err) {
          console.log(err);
        }
      });
    } else {
      mainLoop(elements, position + 1);
    }
  }
}

function main() {
  numElements = max_all.length;
  let elements = new Array(numElements);
  mainLoop(elements, 0);
}


main();

