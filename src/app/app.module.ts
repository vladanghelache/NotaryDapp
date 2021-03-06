import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MaterialModule} from "./material/material.module";
import { DropzoneComponent } from './components/dropzone/dropzone.component';
import { SignDocumentComponent } from './components/sign-document/sign-document.component';
import { VerifyDocumentComponent } from './components/verify-document/verify-document.component';
import { UploadDirective } from './directives/upload.directive';
import {ReactiveFormsModule} from "@angular/forms";
import { DocumentCardComponent } from './components/document-card/document-card.component';
import {DetailsCardComponent} from "./components/details-card/details-card.component";
import { HistoryComponent } from './history/history.component';


// @ts-ignore
@NgModule({
    declarations: [
        AppComponent,
        DropzoneComponent,
        SignDocumentComponent,
        VerifyDocumentComponent,
        UploadDirective,
        DocumentCardComponent,
        DetailsCardComponent,
        HistoryComponent
    ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
