import { Component } from '@angular/core';
import { MascotasService } from '../../services/data/mascotas.service';
import { Mascota } from '../../interfaces/mascota';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-mascota',
  standalone: true,
  imports: [MatButtonModule, MatCardModule, ],
  templateUrl: './mascota.component.html',
  styleUrl: './mascota.component.css'
})
export class MascotaComponent {
  mascotas: Mascota[];

  constructor (public mascotasService: MascotasService){
    this.mascotas = this.mascotasService.getMascotas();
    console.log(this.mascotas);
  }

  formatoFecha(fecha: Date){
    return formatDate(fecha, 'dd/MM/yyyy', 'en-US');
  }
}
