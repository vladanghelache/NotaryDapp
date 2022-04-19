import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import * as shajs from "sha.js";
import {AuthenticityService} from "../../services/authenticity.service";
import {DetailsModel} from "../../model/details.model";

@Component({
  selector: 'app-verify-document',
  templateUrl: './verify-document.component.html',
  styleUrls: ['./verify-document.component.css']
})
export class VerifyDocumentComponent implements OnInit {

  form = this.formBuilder.group({
    document: ['', [Validators.required]]
  })
   docFound: boolean = false;
   showMessage: boolean  = false ;

  constructor(private formBuilder: FormBuilder, private authenticityService: AuthenticityService) {
  }

  file!: File | null;
  fileContent: String = "";
  details:DetailsModel = new DetailsModel();

  ngOnInit(): void {
    this.onChanges();
  }


  onSubmit() {
    console.log(this.form.value);
    if (this.form.valid) {
      let formData = this.form.value;
      let fileReader = new FileReader();
      let that = this;
      fileReader.onload = (e) => {

        let hex = "";
        if (fileReader.result) {
          hex = shajs('sha256').update(fileReader.result.toString()).digest('hex').toString()
          console.log(hex);
          let aux =
          this.authenticityService
            .verifyDocument(hex)
            .then((value:any) => {
              console.log(value);

              this.details.account = value[0];
              this.details.hash = value[1];
              this.details.type = value[4];
              console.log(value[2]*1000);
              this.details.date = new Date(value[2] * 1000);
              this.details.size = value[3];

              if (this.details.account != "0x0000000000000000000000000000000000000000" &&
                  this.details.hash != "" && this.details.size != 0 && this.details.type != ""){
                this.docFound = true;
                this.showMessage = false;
              }
              else{
                this.docFound = false;
                this.showMessage = true;
              }


            })
            .catch(function (error) {
            console.log(error);
          });
        }

      }
      if (this.file)
        fileReader.readAsText(this.file);


      console.log(formData)
    }
  }


  onChanges(): void {
    this.form.valueChanges.subscribe(val => {
      this.file = val.document;
      console.log(this.file);
    });
  }


  getFileErrorMessage() {
    return "No document selected";

  }


  deleteDocument() {
    this.file = null;
    this.form.reset();
  }
}
