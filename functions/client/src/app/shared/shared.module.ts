import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ValidatorService } from "./validators/validator.service";

@NgModule({
  imports: [
    CommonModule
  ],
  providers: [ ValidatorService ]
})
export class SharedModule { }
