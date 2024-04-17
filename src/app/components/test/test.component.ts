import { Component } from '@angular/core';
import { MascotasService } from '../../services/data/mascotas.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-test',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './test.component.html',
  styleUrl: './test.component.css'
})
export class TestComponent {
  mascotas: any;
  constructor(public mascotasService: MascotasService) {
    console.log(mascotasService.getMascotas());
  }

  obtenerMascota(id: number) {
    this.mascotas = JSON.stringify(this.mascotasService.getMascotaById(id));
  }
}
