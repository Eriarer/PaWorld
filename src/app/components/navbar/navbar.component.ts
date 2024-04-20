import {
  Component,
  EventEmitter,
  inject,
  Output,
  ViewChild,
} from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { AsyncPipe, CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import 'sweetalert2/src/sweetalert2.scss';
import Swal from 'sweetalert2';
import { MascotasService } from '../../services/data/mascotas.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    AsyncPipe,
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    RouterModule,
    CommonModule,
    FormsModule,
  ],
})
export class NavbarComponent {
  private breakpointObserver = inject(BreakpointObserver);
  inicio: string = 'Inicio';
  pets: string = 'Macotas';
  citas: string = 'Citas';
  agenda: string = 'Agendar Cita';

  inicioActive: boolean = true;
  petsActive: boolean = false;
  citasActive: boolean = false;
  agendaActive: boolean = false;

  search: string = '';
  filtros: string[] = ['perro', 'gato'];
  @Output() infoParaMascotas = new EventEmitter<any>();

  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );

  constructor(
    private router: Router,
    public mascotasService: MascotasService
  ) {}

  ngOnInit() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        const currentRoute = event.urlAfterRedirects.split('/')[1];
        this.updateActive(currentRoute);
      }
    });
  }

  updateActive(route: string) {
    this.inicioActive =
      this.petsActive =
      this.citasActive =
      this.agendaActive =
        false;
    switch (route) {
      case 'home':
        this.inicioActive = true;
        break;
      case 'cita':
        this.citasActive = true;
        break;
      case 'mascota':
        this.petsActive = true;
        break;
      case 'agenda':
        this.agendaActive = true;
        break;
    }
  }

  searchPet() {
    if (this.search.length <= 0) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'No puedes buscar con la barra vacia',
      });
      this.search = '';
      return;
    }
    if (!this.filtros.includes(this.search.toLocaleLowerCase())) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Filtro no existente',
      });
      this.search = '';
      return;
    }
    this.enviarInfoAMascotas();
    this.search = '';
  }

  enviarInfoAMascotas() {
    this.infoParaMascotas.emit(this.search);
  }
}
