import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-document-card',
  templateUrl: './document-card.component.html',
  styleUrls: ['./document-card.component.css']
})
export class DocumentCardComponent implements OnInit {
  @Input() file!: File;
  constructor() { }

  ngOnInit(): void {
  }

}
