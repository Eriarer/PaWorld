import { Component, Inject, Input } from '@angular/core';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MascotasService } from '../../services/data/mascotas.service';
import {MatDatepickerInputEvent, MatDatepickerModule} from '@angular/material/datepicker';
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
import {MatDividerModule} from '@angular/material/divider';
import {MatSelectModule} from '@angular/material/select';
import { provideMomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatDatepickerIntl } from '@angular/material/datepicker';
import 'moment/locale/fr';
import { CitasService } from '../../services/localstorage/citas.service';
import Swal from 'sweetalert2';

// Define custom date format for fr locale
export const FR_DATE_FORMATS = {
  parse: {
    dateInput: 'DD/MM/YYYY',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-agenda',
  standalone: true,
  providers: [provideNativeDateAdapter(), { provide: MAT_DATE_LOCALE, useValue: 'fr' },
  provideMomentDateAdapter(),
  { provide: MAT_DATE_FORMATS, useValue: FR_DATE_FORMATS },],
  imports: [
    MatSlideToggleModule, 
    MatFormFieldModule, 
    MatInputModule, 
    MatDatepickerModule, 
    MatButtonModule, 
    MatTooltipModule, 
    MatIconModule, 
    FormsModule, 
    ReactiveFormsModule,  
    MatIconModule,
    MatDividerModule,
    MatSelectModule,
    MatFormFieldModule, MatInputModule, MatDatepickerModule
  ],
  templateUrl: './agenda.component.html',
  styleUrl: './agenda.component.css'
})
export class AgendaComponent {
  //datos del usuario
  nombre: string ='';
  telefono=0;
  //datos de la mascota
  @Input() mascota!: Mascota;

  tiempoRefugio!:number;

  //datos para el calendario
  minDate!: Date;
  maxDate!: Date;

  //Para formatear la fecha (DD/MM/YYYY)
  private _adapter!: DateAdapter<any>;
  private _intl!: MatDatepickerIntl;
  @Inject(MAT_DATE_LOCALE) private _locale!: string;

  //Para almacennar datos de la cita
  dataAdoptante!: Adoptante;
  dataCita!: Cita;

  nombreAdop = new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z ]*')]);
  errorMessage = '';
  telAdop = new FormControl('', [Validators.required, Validators.pattern('[0-9]{10}'), Validators.minLength(10),Validators.maxLength(10)]);
  errorMessage2 = '';
  selectedDate: Date | null = null;
  selectedHour: string | undefined;

  constructor(public mascotasService: MascotasService, public citasService: CitasService) { 
    this.mascota = mascotasService.getMascotaById(1);
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
    this.tiempoRefugio=this.GettiempoRefugio();
  }

  //función para calcular el tiempo en el refugio del animal
  GettiempoRefugio():number{
    let fechaActual=new Date();
    let fechaIngreso=new Date(this.mascota.fechaIngreso);
    let tiempoRefugio=fechaActual.getTime()-fechaIngreso.getTime();
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
    this.tiempoRefugio=this.GettiempoRefugio();

  }

  //Función para ir a la mascota anterior
  AnteriorMascota(){
    if(this.mascota.id==1){
      this.mascota = this.mascotasService.getMascotaById(this.mascotasService.getMascotas().length);
    }
    else{
      this.mascota = this.mascotasService.getMascotaById(this.mascota.id-1);
    }
    this.tiempoRefugio=this.GettiempoRefugio();
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

  onDateChange(event: MatDatepickerInputEvent<Date>) {
    this.selectedDate = event.value;
  }

  //Función para guardar datos de la cita en el localstorage con el service citas
  GuardarCita() {
    if(this.nombreAdop.invalid){
      Swal.fire({
        title: "Error!",
        text: "Nombre invalido",
        icon: "error"
      });
    }
    else if(this.telAdop.invalid){
      Swal.fire({
        title: "Error!",
        text: "Teléfono invalido",
        icon: "error"
      });
    }else if(this.selectedDate==null){
      Swal.fire({
        title: "Error!",
        text: "Debes seleccionar una fecha",
        icon: "error"
      });
    }else if(this.selectedHour==null){
      Swal.fire({
        title: "Error!",
        text: "Debes seleccionar una hora",
        icon: "error"
      });
    }else{ //Todo es correcto
      this.dataCita= this.citasService.newCita();
      this.dataCita.fecha=this.selectedDate;
      this.dataCita.hora={hours: Number(this.selectedHour.split(':')[0]), minutes: Number(this.selectedHour.split(':')[1])};
      this.dataCita.adoptante.nombre=this.nombreAdop.value ?? '';
      this.dataCita.adoptante.telefono=this.telAdop.value ?? '';
      this.dataCita.mascota=this.mascota;
      this.citasService.addCita(this.dataCita);
      Swal.fire({
        title: "Cita agendada",
        text: "La cita ha sido agendada correctamente",
        icon: "success"
      });
    }

    
   
  }
  
}
