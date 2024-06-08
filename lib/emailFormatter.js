module.exports.emailFormatter = (name) => {
  return `Se ah creado el anuncio correctamente. Ruta de la imagen:

        Imagen original "./public/images/${name}"
        Thumbnail: "./public/images/thumbnail/${name}"
        
        Gracias por confiar en nosotros.
        Saludos cordiales.
        Equipo de Node Pop
    `;
};
