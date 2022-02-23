import { Component, OnInit } from '@angular/core';
import { ModalService } from 'src/app/services/modal.service';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  constructor(private modalService: ModalService) { }

  ngOnInit(): void {
    
  }

  openModal(){
    this.modalService.$modal.emit(true)
  }

}
