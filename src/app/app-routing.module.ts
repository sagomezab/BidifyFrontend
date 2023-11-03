import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login.component';
import { IndexComponent } from './index/index.component';
import { RegistroComponent } from './auth/registro.component';
import { ListaProductoComponent } from './feed/lista-producto/lista-producto.component';
import { ListaSubastaComponent } from './feed/lista-subasta/lista-subasta.component';
import { SalaSubastaComponent } from './sala-subasta/sala-subasta.component';
const routes: Routes = [
  { path: '', component: IndexComponent },
  { path: 'login', component: LoginComponent },
  { path: 'registro', component: RegistroComponent },
  { path: 'lista', component: ListaProductoComponent},
  { path: 'subastas', component: ListaSubastaComponent},
  {path: 'salaSubasta/:id', component: SalaSubastaComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
