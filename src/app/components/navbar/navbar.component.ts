import { Component, inject } from '@angular/core';
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
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';

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
    RouterModule
  ]
})
export class NavbarComponent {
  private breakpointObserver = inject(BreakpointObserver);
  inicio:string = 'Inicio';
  pets:string = 'Macotas';
  citasprevias:string = 'Citas Previas';
  citasfuturas:string = 'Citas Futuras';
  agenda:string = 'Agendar Cita';
  
  inicioActive: boolean = true;
  petsActive: boolean = false;
  citasActive: boolean = false;
  agendaActive: boolean = false;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private router: Router) { }

  ngOnInit() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        const currentRoute = event.urlAfterRedirects.split('/')[1];
        this.updateActive(currentRoute);
      }
    });
  }

  updateActive(route: string) {
    this.inicioActive = this.petsActive = this.citasActive = this.agendaActive = false;
    switch(route){
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
}
