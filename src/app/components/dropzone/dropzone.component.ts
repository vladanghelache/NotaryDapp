import {Component, ElementRef, HostListener, OnInit} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";
import {Event} from "@angular/router";

@Component({
  selector: 'app-dropzone',
  templateUrl: './dropzone.component.html',
  styleUrls: ['./dropzone.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: DropzoneComponent,
      multi: true
    }
  ]
})
export class DropzoneComponent implements OnInit, ControlValueAccessor {

  private file: File | null = null;
  private fileName: string = "";
  private onChange: any;

  constructor(private host: ElementRef<HTMLInputElement>) { }

  writeValue(obj: any): void {
    this.host.nativeElement.value = '';
    this.file = null;
    this.fileName = "";
    }
    registerOnChange(fn: any): void {
      this.onChange = fn;
    }
    registerOnTouched(fn: any): void {

    }

  ngOnInit(): void {
  }

  @HostListener('change', ['$event.target.files'])
  uploadFile(evt: File[]){

    this.file = evt[0];
    this.onChange(this.file);
  }

  @HostListener('change', ['$event.target.files'])
  uploadFile2(evt: FileList) {

    this.file=evt[0];
    this.onChange(this.file);
  }

}
