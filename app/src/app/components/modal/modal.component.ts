import { Component, Input, OnInit } from '@angular/core';
import { HttpService } from 'src/app/services/http.service';
import { ModalService } from 'src/app/services/modal.service';
import { faMotorcycle } from '@fortawesome/free-solid-svg-icons';
import { faCaretRight } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})

export class ModalComponent implements OnInit {
  @Input() intervalo: string =""

  flechaIcono = faCaretRight
  motoIcono = faMotorcycle
  cliente: any
  estado: string = ""
  id: number = 0
  modalCliente: boolean = false;
  motos: any = []

  constructor(private modalService: ModalService, private httpService: HttpService) { }

  ngOnInit(): void {
    this.modalService.$modalCliente.subscribe((valor) => (this.modalCliente = valor))
    this.getMotos()
  }

  closeModal(){
    this.modalService.$modal.emit(false)
  }

  openModalCliente(id: number, estado: string, cliente: any){
    this.modalCliente = true
    this.id = id
    this.estado = estado
    this.cliente = cliente
  }

  getMotos(){
    this.httpService.get('http://localhost:3000/motos?intervalo='+this.intervalo)
    .subscribe(respuesta => {
      this.motos = respuesta
      console.log(this.motos)
    })
  }
}
