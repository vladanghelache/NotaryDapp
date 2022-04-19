import { Component, OnInit } from '@angular/core';
import {DetailsModel} from "../model/details.model";

import {AuthenticityService} from "../services/authenticity.service";

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {
  signatures: DetailsModel[] = [];

  constructor(private authenticityService:AuthenticityService) {this.getSignatures() }

  ngOnInit(): void {

  }

  getSignatures() {

      let that = this;

    this.authenticityService
      .getSignatures()
      .then((value:any) => {
        console.log(value);
        for (const elem of value) {
          let signature = new DetailsModel();
          signature.account = elem[0];
          signature.hash = elem[1];
          signature.type = elem[4];
          signature.date = new Date(elem[2] * 1000);
          signature.size = elem[3][0];

          that.signatures.push(signature);
        }


      })
      .catch(function (error) {
        console.log(error);
      });
  }

}
