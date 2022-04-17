import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import * as shajs from 'sha.js';
import {AuthenticityService} from "../../services/authenticity.service";

@Component({
  selector: 'app-sign-document',
  templateUrl: './sign-document.component.html',
  styleUrls: ['./sign-document.component.css'],
  providers: [AuthenticityService]
})
export class SignDocumentComponent implements OnInit {
  form = this.formBuilder.group({
    document: ['',[Validators.required]]
  })

  file!: File | null ;
  fileContent: String ="";
  signed = false;
  constructor(private formBuilder: FormBuilder,
              private authenticityService: AuthenticityService) { }

  ngOnInit(): void {
    this.onChanges();
  }

  onSubmit(){
    console.log(this.form.value);
    if (this.form.valid){
      let formData = this.form.value;
      let fileReader = new FileReader();
      let that = this;
      fileReader.onload = (e) => {

        let hex = "";
        if (fileReader.result)
        {
          hex = shajs('sha256').update(fileReader.result.toString()).digest('hex').toString()
          console.log(hex);
          this.authenticityService
            .certifyFile(this.file?.size ? this.file?.size : 0, hex, this.file?.type ? this.file?.type : "")
            .then(function() {
              console.log("Document with hash: " + hex + " has been signed");
              that.deleteDocument();
              that.signed = true;

            }).catch(function(error) {
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
      this.signed = false;
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
