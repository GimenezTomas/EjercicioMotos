import { Component, OnInit } from '@angular/core';
import { ModalService } from './services/modal.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  modal: boolean = false;

  constructor(private modalService: ModalService){}

  ngOnInit(){
    this.modalService.$modal.subscribe((valor) => (this.modal = valor))
  }

  openModal(){
    this.modal = true
  }


  title = 'app';
}
