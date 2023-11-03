import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Subasta } from '../models/subasta';
import { TokenService } from '../service/token.service';
import { SubastaService } from '../service/subasta.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Message } from '../models/message';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
@Component({
  selector: 'app-sala-subasta',
  templateUrl: './sala-subasta.component.html',
  styleUrls: ['./sala-subasta.component.css']
})
export class SalaSubastaComponent implements OnInit{
  subasta: Subasta;
  roles: string[];
  isAdmin = false;
  id = this.activatedRoute.snapshot.params['id'];
  ofertas: Message[];
  nuevaOferta: string = "";
  oferta: Message;
  fechaHoy: Date;
  constructor(
    private subastaService: SubastaService,
    private tokenService: TokenService,
    private router: Router,
    private toastr: ToastrService,
    private activatedRoute: ActivatedRoute,
    private changeDetectorRef: ChangeDetectorRef 
  ) {
   
     
  }

  ngOnInit() {
    this.roles = this.tokenService.getAuthorities();
    this.roles.forEach(rol => {
      if (rol === 'ROLE_ADMIN') {
        this.isAdmin = true;
      }
    })
    
    this.subastaService.getSubastaById(this.id).subscribe(
      data => {
        this.subasta = data;
      },
      err => {
        this.toastr.error(err.error.mensaje, 'Fail', {
          timeOut: 3000,  positionClass: 'toast-top-center',
        });
        this.volver();
      })
    this.subastaService.getMessageList(this.id).subscribe(
      data => {
        this.ofertas = data;
      }
    )
    
  }
  volver(): void {
    this.router.navigate(['/']);
  }
 
  
  getNombreUsuarioActual(): string | null {
    const nombreUsuario = this.tokenService.getUserName();
    return nombreUsuario !== null ? nombreUsuario : null;
  }
  enviarOferta() {
    const senderEmail = this.tokenService.getUserName();
    const replymessage = this.nuevaOferta;
    this.fechaHoy = new Date();
    if (senderEmail && replymessage) {
      this.oferta = new Message(senderEmail, this.fechaHoy, replymessage, this.subasta);
      this.ofertas.push(this.oferta);
    }
  
    this.subastaService.addMessageToSubasta(this.id, this.oferta).subscribe(
      data => {
        this.toastr.success('Oferta recibida', 'OK', {
          timeOut: 3000, positionClass: 'toast-top-center'
        });
      },
      err => {
        this.toastr.error(err.error.mensaje, 'Tu oferta no ha sido recibida', {
          timeOut: 3000, positionClass: 'toast-top-center',
        });
      }
    );
  
    this.nuevaOferta = '';
  }
  getEstado(): boolean{
    return this.subasta.estado;
  }
  recibirPuja(){
    this.actualizarSubasta();
    console.log(this.id);
  }
  toggleSubasta() {
    if (this.subasta.estado) {
      this.subastaService.finalizarSubasta(this.id).subscribe(
        data => {
          this.subasta = data;
        },
        error => {
          console.error('Error al finalizar la subasta:', error);
        }
      );
    } else {
      console.log('La subasta ya está finalizada.');
    }
  }
  
  actualizarSubasta(){
    this.subastaService.actualizarSubasta(this.id, this.subasta);
  }
  esSubastador(): boolean{
    const nombreUsuario = this.tokenService.getUserName(); // Obtener el nombre de usuario
  if (nombreUsuario !== null && nombreUsuario === this.subasta.subastador.nombreUsuario) {
    return true;
  } else {
    return false;
  }
  }

}
