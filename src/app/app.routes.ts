import { Routes } from '@angular/router';
import { InicioComponent } from './components/inicio/inicio.component';
import { CitaComponent } from './components/cita/cita.component';
import { MascotaComponent } from './components/mascota/mascota.component';
import { AgendaComponent } from './components/agenda/agenda.component';

export const routes: Routes = [
    {path: 'home', component: InicioComponent},
    {path: 'cita', component: CitaComponent},
    {path: 'mascota', component: MascotaComponent},
    {path: 'agenda', component: AgendaComponent},
    {path: '**', pathMatch: 'full', redirectTo: 'home'}
];
