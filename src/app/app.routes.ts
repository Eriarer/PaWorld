import { Routes } from '@angular/router';
import { InicioComponent } from './components/inicio/inicio.component';
import { MascotaComponent } from './components/mascota/mascota.component';
import { AgendaComponent } from './components/agenda/agenda.component';
import { CitafuturaComponent } from './components/citafutura/citafutura.component';
import { CitapreviaComponent } from './components/citaprevia/citaprevia.component';

export const routes: Routes = [
    {path: 'home', component: InicioComponent},
    {path: 'citafutura', component: CitafuturaComponent},
    {path: 'citaprevia', component: CitapreviaComponent},
    {path: 'mascota', component: MascotaComponent},
    {path: 'agenda', component: AgendaComponent},
    {path: '**', pathMatch: 'full', redirectTo: 'home'}
];
