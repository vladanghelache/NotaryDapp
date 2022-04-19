import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {SignDocumentComponent} from "./components/sign-document/sign-document.component";
import {VerifyDocumentComponent} from "./components/verify-document/verify-document.component";
import {HistoryComponent} from "./history/history.component";

const routes: Routes = [
  {path: '', component: SignDocumentComponent},
  {path: 'sign_document', component: SignDocumentComponent},
  {path: 'verify_document', component: VerifyDocumentComponent},
  {path: 'history', component: HistoryComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
