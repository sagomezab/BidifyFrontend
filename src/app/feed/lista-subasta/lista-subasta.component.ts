import { Component, OnInit } from '@angular/core';
import { Subasta } from '../../models/subasta';
import { SubastaService } from '../../service/subasta.service';
import { TokenService } from '../../service/token.service';

@Component({
  selector: 'app-lista-subasta',
  templateUrl: './lista-subasta.component.html',
  styleUrls: ['./lista-subasta.component.css']
})
export class ListaSubastaComponent implements OnInit{
  subastas: Subasta[] = [];
  roles: string[];
  isAdmin = false;
  isLogged = false;
  constructor(
    private subastaService: SubastaService,
    private tokenService: TokenService) { }

  ngOnInit() {
    if (this.tokenService.getToken()) {
      this.isLogged = true;
    } else {
      this.isLogged = false;
    }
    this.cargarSubastas();
    this.roles = this.tokenService.getAuthorities();
    this.roles.forEach(rol => {
      if (rol === 'ROLE_ADMIN') {
        this.isAdmin = true;
      }
    });
  }
  getSubastadorNombre(subasta: Subasta): string {
    return subasta.subastador.nombreUsuario;
  }
  cargarSubastas(): void {
    this.subastaService.getAllSubastas().subscribe(
      data => {
        this.subastas = data;
      },
      err => {
        console.log(err);
      }
    );
  }
}
