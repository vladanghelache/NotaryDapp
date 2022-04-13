import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
//import * as shajs from 'sha.js';

@Component({
  selector: 'app-sign-document',
  templateUrl: './sign-document.component.html',
  styleUrls: ['./sign-document.component.css']
})
export class SignDocumentComponent implements OnInit {
  form = this.formBuilder.group({
    document: ['',[Validators.required]]
  })

  file!: File | null ;
  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.onChanges();
  }

  onSubmit(){
    console.log(this.form.value);
    if (this.form.valid){
      let formData = this.form.value;
      let string = this.readDocument()
      let hex = ""
      if (string)
        //hex = shajs('sha256').update(string).digest('hex')

      console.log(hex)
      console.log(formData)
    }
  }

  readDocument() {
    let fileReader = new FileReader();
    fileReader.onload = (e) => {
      console.log(fileReader.result);
    }
    if (this.file)
      return fileReader.readAsText(this.file);
    else return null;
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
