import { Component, OnInit, Input } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
// import { ValidatorService } from '../../../shared/validators/validator.service'

@Component({
  selector: 'apply-page-test',
  template: `
<h1>Test Page</h1>
<apply-form-test></apply-form-test>
`
})
export class PageTestComponent implements OnInit {

  ngOnInit() {
  }

}
