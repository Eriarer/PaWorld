import { Injectable } from '@angular/core';
import { Cita } from '../../interfaces/cita';
import { Time } from '@angular/common';
import { Adoptante } from '../../interfaces/adoptante';
import { Mascota } from '../../interfaces/mascota';
import { MascotasService } from '../data/mascotas.service';

@Injectable({
  providedIn: 'root'
})
export class CitasService {
  mascotas!: Mascota[];

  citas: Cita[]=[
    {
      id: 1,
      fecha: new Date('2024-5-3'),
      formatoFecha: '',
      hora: {hours: 10  , minutes: 55},
      adoptante:{
        nombre: 'Juan',
        telefono: '1234567890',
      },
      mascota: this.mascotaService.getMascotaById(1),
    },
    {
      id: 2,
      fecha: new Date('2021-10-10'),
      formatoFecha: '',
      hora: {hours: 11, minutes: 30},
      adoptante:{
        nombre: 'Maria',
        telefono: '0987654321',
      },
      mascota: this.mascotaService.getMascotaById(2),
    },
    {
      id: 3,
      fecha: new Date('2021-10-10'),
      formatoFecha: '',
      hora: {hours: 12, minutes: 30},
      adoptante:{
        nombre: 'Pedro',
        telefono: '6789012345',
      },
      mascota: this.mascotaService.getMascotaById(3),
    },
    {
      id: 4,
      fecha: new Date('2021-10-10'),
      formatoFecha: '',
      hora: {hours: 13, minutes: 30},
      adoptante:{
        nombre: 'Ana',
        telefono: '4567890123',
      },
      mascota: this.mascotaService.getMascotaById(4),
    },
    {
      id: 5,
      fecha: new Date('2021-10-10'),
      formatoFecha: '',
      hora: {hours: 14, minutes: 30},
      adoptante:{
        nombre: 'Luis',
        telefono: '2345678901',
      },
      mascota: this.mascotaService.getMascotaById(5),
    }
  ];

  constructor(private mascotaService: MascotasService) { 
    const citasLocalStorage = JSON.parse(localStorage.getItem('citas') || '[]');

    if (citasLocalStorage.length === 0) {
      // Si no hay citas en el localStorage, almacenar las citas predefinidas
      localStorage.setItem('citas', JSON.stringify(this.citas));
    } else {
      // Si hay citas en el localStorage, cargarlas en el arreglo de citas
      this.citas = citasLocalStorage;
    }
    console.log("Constructor de citas"+this.citas);
  }

  getCitas(): Cita[]{
    return this.citas;
  }

  getCitaById(index: number){
    return this.citas[index];
  }

  citasAnterioresFechaHora(fecha: Date, hora:Time): Cita[]{
    return this.citas.filter(cita => cita.fecha < fecha || (cita.fecha === fecha && cita.hora <= hora));
  }

  citasPosterioresFechaHora(fecha: Date, hora:Time): Cita[]{
    return this.citas.filter(cita => cita.fecha > fecha || (cita.fecha === fecha && cita.hora > hora));
  }

  newCita(): Cita{
    return{
      id:this.citas.length+1,
      fecha: new Date(),
      formatoFecha: '',
      hora: {hours: 0, minutes: 0},
      adoptante:{
        nombre: '',
        telefono: '',
      },
      mascota:{
        id: 0,
        edad: 0,
        color: '',
        tipo: '',
        raza: '',
        fechaIngreso: new Date(),
        descripcion: '',
        imagen: '',
        sexo: '',
      } 
    }
  }

  // id: number;
  // fecha: Date;
  // hora: Time;
  // adoptante: Adoptante;
  // mascota: Mascota;
  //   nuevoCliente():Cliente{
  //   return {
  //     id:this.clientes.length,
  //     nombre:'',
  //     cif:'',
  //     direccion:'',
  //     grupo:0};
  // }
  addCita(cita: Cita){
    //Verificar que cita no esté vacía
    if(cita.adoptante.nombre=='' || cita.adoptante.telefono=='' || cita.mascota.id==0){
      return;
    }
    this.citas.push(cita);
    localStorage.setItem('citas', JSON.stringify(this.citas));
  }

  // agregarCliente(cliente:Cliente){
  //   this.clientes.push(cliente);
  //   localStorage.setItem('data',JSON.stringify(this.clientes)); // Guarda en localstorage
  // }

}
