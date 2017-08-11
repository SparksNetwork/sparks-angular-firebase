import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

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
      phone: ['', [Validators.required]],
      birthday: ['', [Validators.required]]
    })
  }

  ngOnInit() {
  }

}
