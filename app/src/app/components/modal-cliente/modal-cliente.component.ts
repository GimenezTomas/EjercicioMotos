import { HttpParams } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { HttpService } from 'src/app/services/http.service';
import { ModalService } from 'src/app/services/modal.service';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { faCircleExclamation } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-modal-cliente',
  templateUrl: './modal-cliente.component.html',
  styleUrls: ['./modal-cliente.component.css']
})
export class ModalClienteComponent implements OnInit {
  @Input() id: number = 0
  @Input() intervalo: string = ""
  @Input() estado: string = ""
  @Input() cliente: any

  closeIcon = faCircleXmark
  exclamationIcon = faCircleExclamation
  invalid: boolean = false

  constructor(private httpService:HttpService,private modalService: ModalService) { }

  ngOnInit(): void {}

  closeModal(){
    this.modalService.$modalCliente.emit(false)
  }

  gestionarReserva(){
    this.invalid = false
    this.httpService.post('http://localhost:3000/gestionReserva', new HttpParams({
      fromObject: {cliente: this.cliente,
      estado: this.estado,
      id: this.id,
      intervalo: this.intervalo
    }})).subscribe(resp => console.log(resp))
    this.closeModal()
  }

  validacion(cliente: string){
    if(this.estado == "no disponible" && this.cliente == cliente){
      this.estado = "disponible"
      this.cliente = null
      this.gestionarReserva()
    }else if(this.estado == "disponible"){
      console.log('enyre')
      this.cliente = cliente
      this.estado = "no disponible"
      this.gestionarReserva()
    }else{
      this.invalid = true
    }
  }
}
