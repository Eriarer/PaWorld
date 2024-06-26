import { Component } from '@angular/core';
import { Cita } from '../../interfaces/cita';

@Component({
  selector: 'app-citafutura',
  standalone: true,
  imports: [],
  templateUrl: './citafutura.component.html',
  styleUrl: './citafutura.component.css'
})
export class CitafuturaComponent {
  citas: Cita[] = [];

  constructor() {
    this.cargacitasPrevias(); 
  }

  cargacitasPrevias(): void {
    const fechaActual = new Date();
    const citasLocalStorage = JSON.parse(localStorage.getItem('citas') || '[]');
    //cambiar la fecha actual a un formato más legible
    const formatoFechaActual = `${fechaActual.getDate()}/${fechaActual.getMonth() + 1}/${fechaActual.getFullYear()}`;
    // obtener la hora del sistema
    this.citas = citasLocalStorage.filter((cita: Cita) => {
      // comparar si la hora y minutos de la cita es mayor o igual a la hora actual
      const fecha = new Date(cita.fecha);
      //cambiar la fecha de la cita a un formato más legible
      cita.formatoFecha = `${fecha.getDate()}/${fecha.getMonth() + 1}/${fecha.getFullYear()}`;
      //cambiar la raza de la mascota a la primera mayuscula
      cita.mascota.tipo = cita.mascota.tipo.charAt(0).toUpperCase() + cita.mascota.tipo.slice(1);


      const horaCita = cita.hora.hours;
      const citaFecha = new Date(cita.fecha);
      const minutosCita = cita.hora.minutes;
      if((fechaActual.getHours() == horaCita && fechaActual.getMinutes() < minutosCita && cita.formatoFecha == formatoFechaActual) || (fechaActual.getHours() < horaCita && cita.formatoFecha == formatoFechaActual) || ((citaFecha.getMonth() > fechaActual.getMonth() && citaFecha.getFullYear() == fechaActual.getFullYear()) || citaFecha.getFullYear() > fechaActual.getFullYear() ||(citaFecha.getDate() > fechaActual.getDate() && citaFecha.getMonth() == fechaActual.getMonth() && citaFecha.getFullYear() == fechaActual.getFullYear()))){
        return true;
      }else{
        return false;
      }
    });
  }
}
