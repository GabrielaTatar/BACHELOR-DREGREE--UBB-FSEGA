import { Component, OnInit } from '@angular/core';
import { UtilizatoriService } from '../_services/utilizatori.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private utilizatoriService: UtilizatoriService) { }

  ngOnInit(): void {
  }
}
