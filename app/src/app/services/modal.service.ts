import { Injectable } from '@angular/core';
import { EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  constructor() { }

  $modal = new EventEmitter<any>()
  $modalCliente = new EventEmitter<any>()
}
