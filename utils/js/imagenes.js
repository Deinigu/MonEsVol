const imagenes = require('../../utils/json/imagenes.json');
const imagenessolos = require('../../utils/json/imagenesSolos.json');

function getImageSolo(){
    const img_index = Math.floor(Math.random() * imagenessolos.length);
    const img = imagenessolos[img_index];

    return img;
}

function getImageCoop(){
    const img_index = Math.floor(Math.random() * imagenes.length);
    const img = imagenes[img_index];

    return img;
}

module.exports = {getImageCoop, getImageSolo}