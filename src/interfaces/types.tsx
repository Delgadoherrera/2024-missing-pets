export interface Pet {
  idMascota: number;
  fotoMascota: string;
  nombre: string;
  tipoMascota: string;
  colorPrimario: string;
  colorSecundario: string;
  descripcion: string;
  status: number;
  pesoAproximado: string;
  geoAdress: string;
  emailMascota: string;
  // Otras propiedades si las hay...
}

export interface Message {
  body: string;
  from: string;
  emailEmisor: string; // Asegúrate de que esta propiedad está definida en tu objeto
  mensaje: string; // Asegúrate de que esta propiedad está definida en tu objeto
  idReceptor: string;
}
