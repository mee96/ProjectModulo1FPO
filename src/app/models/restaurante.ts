export interface IRestaurante {
  id: number;
  nombre: string;
  direccion: string;
  telefono?: string;
  horario?: string;
  especialidad: string;
  imagen?: string;
  coordenadas?: { lat: number; lng: number };
}