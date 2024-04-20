import { Component, Input } from '@angular/core';
import { MascotasService } from '../../services/data/mascotas.service';
import { Mascota } from '../../interfaces/mascota';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { formatDate } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-mascota',
  standalone: true,
  imports: [MatButtonModule, MatCardModule],
  templateUrl: './mascota.component.html',
  styleUrl: './mascota.component.css',
})
export class MascotaComponent {
  mascotas: Mascota[];
  @Input() infoDesdeNavbar: any = null;

  constructor(
    public mascotasService: MascotasService,
    private route: ActivatedRoute
  ) {
    this.mascotas = this.mascotasService.getMascotas();
    console.log(this.mascotas);
  }

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.infoDesdeNavbar = params['infoDesdeNavbar'];
    });
  }

  formatoFecha(fecha: Date) {
    return formatDate(fecha, 'dd/MM/yyyy', 'en-US');
  }
}
