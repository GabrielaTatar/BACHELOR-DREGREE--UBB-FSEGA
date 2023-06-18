import { Component } from '@angular/core';

@Component({
  selector: 'app-modificare-consult',
  templateUrl: './modificare-consult.component.html',
  styleUrls: ['./modificare-consult.component.css']
})
export class ModificareConsultComponent {
  modalVisible = false;

  openModal() {
    this.modalVisible = true;
  }

  closeModal() {
    this.modalVisible = false;
  }
}

