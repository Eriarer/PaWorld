import { Adoptante } from "./adoptante";
import { Mascota } from "./mascota";

export interface Cita {
    fechaHora: Date;
    adoptante: Adoptante;
    mascota: Mascota;
}
