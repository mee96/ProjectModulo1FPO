export interface IChuleton {
  id?: string;
  tipo: string;
  origen: string;
  peso: number; // en kg
  maduracion: number; // en semanas
  cantidad: number;
  precio: number; // precio por kg
   imagen: string;
}

// export interface IRestaurante {
//   nombre: string;
//   direccion: string;
//   coordenadas?: { lat: number; lng: number };
// }