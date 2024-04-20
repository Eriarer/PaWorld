import { Component, Input } from '@angular/core';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MascotasService } from '../../services/data/mascotas.service';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {provideNativeDateAdapter} from '@angular/material/core';
import {MatIconModule} from '@angular/material/icon';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatButtonModule} from '@angular/material/button';
import { Mascota } from '../../interfaces/mascota';
import { Cita } from '../../interfaces/cita';
import { Adoptante } from '../../interfaces/adoptante';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import { merge } from 'rxjs';

@Component({
  selector: 'app-agenda',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [MatSlideToggleModule, MatFormFieldModule, MatInputModule, MatDatepickerModule, MatButtonModule, MatTooltipModule, MatIconModule, FormsModule, ReactiveFormsModule,  MatIconModule],
  templateUrl: './agenda.component.html',
  styleUrl: './agenda.component.css'
})
export class AgendaComponent {
  //datos del usuario
  nombre: string ='';
  telefono=0;
  //datos de la mascota
  @Input() mascota!: Mascota;
  edad!:number;
  color!:string;
  raza!:string;
  tiempoRefugio!:number;
  descripcion!:string;
  imagen!:string;

  //datos para el calendario
  minDate!: Date;
  maxDate!: Date;

  //Para almacennar datos de la cita
  dataAdoptante!: Adoptante;
  dataCita!: Cita;
  nombreAdop = new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z ]*')]);
  errorMessage = '';
  telAdop = new FormControl('', [Validators.required, Validators.pattern('[0-9]{10}'), Validators.minLength(10),Validators.maxLength(10)]);
  errorMessage2 = '';

  constructor(public mascotasService: MascotasService) { 
    this.mascota = mascotasService.getMascotaById(1);
    console.log(JSON.stringify(this.mascota));

    let fechaActual=new Date();
    //La fecha mínima es la fecha actual +1
    this.minDate=new Date(fechaActual.getFullYear(),fechaActual.getMonth(),fechaActual.getDate()+1);
    //La fecha máxima es la fecha actual +1 mes
    this.maxDate=new Date(fechaActual.getFullYear(),fechaActual.getMonth()+1,fechaActual.getDate());

    //Manejo de errores en el formulario
    merge(this.nombreAdop.statusChanges, this.nombreAdop.valueChanges)
    .pipe(takeUntilDestroyed())
    .subscribe(() => this.updateErrorMessage());

    merge(this.telAdop.statusChanges, this.telAdop.valueChanges)
    .pipe(takeUntilDestroyed())
    .subscribe(() => this.updateErrorMessage2());

    

  }

  ngOnInit(): void {
    this.edad=this.mascota.edad;
    this.color=this.mascota.color;
    this.raza=this.mascota.raza;
    this.tiempoRefugio=this.GettiempoRefugio();
    this.descripcion=this.mascota.descripcion;
    this.imagen=this.mascota.imagen;
    console.log(this.imagen);

    
  }

  //función para calcular el tiempo en el refugio del animal
  GettiempoRefugio():number{
    let fechaActual=new Date();
    let fechaIngreso=new Date(this.mascota.fechaIngreso);
    let tiempoRefugio=fechaActual.getTime()-fechaIngreso.getTime();
    console.log("fecha actual: "+fechaActual);
    console.log("fecha de ingreso ingreso: "+fechaIngreso);
    console.log("Tiempo en refugio: "+tiempoRefugio/(1000*60*60*24)+" días");
    return Math.floor(tiempoRefugio/(1000*60*60*24));
  }

  //Función para ir a la siguiente mascota
  SiguienteMascota(){
    if(this.mascota.id==this.mascotasService.getMascotas().length){
      this.mascota = this.mascotasService.getMascotaById(1);
      
    }
    else{
      this.mascota = this.mascotasService.getMascotaById(this.mascota.id+1);
    }
    this.edad=this.mascota.edad;
    this.color=this.mascota.color;
    this.raza=this.mascota.raza;
    this.tiempoRefugio=this.GettiempoRefugio();
    this.descripcion=this.mascota.descripcion;
    this.imagen=this.mascota.imagen;
  }

  //Función para ir a la mascota anterior
  AnteriorMascota(){
    if(this.mascota.id==1){
      this.mascota = this.mascotasService.getMascotaById(this.mascotasService.getMascotas().length);
    }
    else{
      this.mascota = this.mascotasService.getMascotaById(this.mascota.id-1);
    }
    this.edad=this.mascota.edad;
    this.color=this.mascota.color;
    this.raza=this.mascota.raza;
    this.tiempoRefugio=this.GettiempoRefugio();
    this.descripcion=this.mascota.descripcion;
    this.imagen=this.mascota.imagen;
  }

  //Funciones para el manejo de errores
  updateErrorMessage() {
    if (this.nombreAdop.hasError('required')) {
      this.errorMessage = 'Debes ingresar un valor';
    } else if (this.nombreAdop.hasError('pattern')) {
      this.errorMessage = 'Nombre invalido';
    } else {
      this.errorMessage = '';
    }
  }
  updateErrorMessage2(){
    if (this.telAdop.hasError('required')) {
      this.errorMessage2 = 'Debes ingresar un valor';
    } else if (this.telAdop.hasError('pattern')) {
      this.errorMessage2 = 'Teléfono invalido';
    } else {
      this.errorMessage2 = '';
    }
  }

  //Función para guardar datos de la cita en el localstorage
  
}
