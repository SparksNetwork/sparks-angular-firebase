import { Component, OnInit, Input } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
// import { ValidatorService } from '../../../shared/validators/validator.service'

@Component({
  selector: 'apply-form-test',
  template: `
<form [formGroup]='form'>
<input type="text" id="name" class="form-control" placeholder="What's Your Name?" formControlName="name">
</form>
<pre>
valid: {{form.valid}}
name.value: {{form.get('name').value}}
name.valid: {{form.get('name').valid}}
</pre>
`
})
export class FormTestComponent implements OnInit {

  public form: FormGroup;

  @Input() editAllMode: boolean;

  constructor(private builder: FormBuilder,) {
    this.form = this.builder.group({
      name: ['', [Validators.required]],
      // preferredName: ['', [Validators.required]],
      // phoneNumber: ['', [Validators.required, ValidatorService.phoneNumberValidator]],
      // birthday: ['', [Validators.required, ValidatorService.dateValidator]]
    })
  }

  ngOnInit() {
  }

}
