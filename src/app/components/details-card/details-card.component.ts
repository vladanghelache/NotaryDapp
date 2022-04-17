import {Component, Input, OnInit} from '@angular/core';
import {DetailsModel} from "../../model/details.model";

@Component({
  selector: 'app-details-card',
  templateUrl: './details-card.component.html',
  styleUrls: ['./details-card.component.css']
})
export class DetailsCardComponent implements OnInit {
  @Input() details!:DetailsModel;
  constructor() { }

  ngOnInit(): void {
  }

}
