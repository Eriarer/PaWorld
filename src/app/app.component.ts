import { Component } from '@angular/core';
import { NavigationExtras, Router, RouterOutlet } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { MascotaComponent } from './components/mascota/mascota.component';
import { AgendaComponent } from './components/agenda/agenda.component';
import { CitafuturaComponent } from './components/citafutura/citafutura.component';
import { CitapreviaComponent } from './components/citaprevia/citaprevia.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, InicioComponent, MascotaComponent, CitafuturaComponent, CitapreviaComponent,AgendaComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'PaWorld';
  infoDesdeNavbar: any;

  constructor(private router: Router) {}

  recibirInfoEnMascotas(info: any) {
    const navigationExtras: NavigationExtras = {
      queryParams: {
        infoDesdeNavbar: info,
      },
    };

    this.router.navigate(['/mascota'], navigationExtras);
  }
}
