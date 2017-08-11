import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ValidatorService } from "../../../shared/validators/validator.service";

@Component({
  selector: 'apply-form-complete-profile',
  templateUrl: './form-complete-profile.component.html'
})
export class FormCompleteProfileComponent implements OnInit {

  public profileForm: FormGroup;

  constructor(private builder: FormBuilder,) { 
    this.profileForm = this.builder.group({
      legalName: ['', [Validators.required]],
      preferredName: ['', [Validators.required]],
      phoneNumber: ['', [Validators.required, ValidatorService.phoneNumberValidator]],
      birthday: ['', [Validators.required, ValidatorService.dateValidator]]
    })
  }

  ngOnInit() {
  }

}
