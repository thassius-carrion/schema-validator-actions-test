import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SchemaValidatorComponent } from './modules/schema-validator/schema-validator.component';

const routes: Routes = [
  { path: '', component: SchemaValidatorComponent, title:"Open Delivery - API Schema Validator" },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
