import { Component, OnInit } from '@angular/core';
import { HttpService } from './services/http.service';
import { ModalService } from './services/modal.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  intervalo:string = ""
  intervalos:any = []
  modal: boolean = false;
  modalCliente: boolean = false;

  constructor(private httpService: HttpService, private modalService: ModalService){}

  ngOnInit(){
    this.modalService.$modal.subscribe((valor) => (this.modal = valor))
    this.getIntervalos()
    console.log(this.intervalos)
  }

  openModal(intervalo: string){
    this.intervalo = intervalo
    this.modal = true
  }

  getIntervalos(){
    this.httpService.get('http://localhost:3000/intervalos')
    .subscribe( respuesta => {
      this.intervalos = respuesta
    })
  }

  title = 'app';
}
