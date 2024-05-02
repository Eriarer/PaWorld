import { Component } from '@angular/core';
import { Cita } from '../../interfaces/cita';


@Component({
  selector: 'app-citaprevia',
  standalone: true,
  imports: [],
  templateUrl: './citaprevia.component.html',
  styleUrl: './citaprevia.component.css'
})
export class CitapreviaComponent {
  citas: Cita[] = [];

  constructor() {
    this.cargacitasPrevias();
    //cambiar las fechas a un formato más legible obteniendo el día, mes y año
    this.citas.forEach((cita: Cita) => {
      const fecha = new Date(cita.fecha);
      cita.formatoFecha = `${fecha.getDate()}/${fecha.getMonth() + 1}/${fecha.getFullYear()}`;
      //cambiar la raza de la mascota a la primera mayuscula
      cita.mascota.tipo = cita.mascota.tipo.charAt(0).toUpperCase() + cita.mascota.tipo.slice(1);
    });    
  }

  cargacitasPrevias(): void {
    const fechaActual = new Date();
    const citasLocalStorage = JSON.parse(localStorage.getItem('citas') || '[]');
    this.citas = citasLocalStorage.filter((cita: Cita) => {
      return new Date(cita.fecha) <= fechaActual;
    });
  }
}
