import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Company } from '../company';
import { CompanyService } from '../company-service';

@Component({
  selector: 'fbc-company-edit',
  templateUrl: './company-edit.component.html',
  styleUrls: ['./company-edit.component.scss']
})
export class CompanyEditComponent implements OnInit {

  companyID?: number;
  isNewCompany!: boolean;

  companyForm = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    phone: [''],
    email: [''],
  });

  // form1 = new FormGroup({
  //   name: new FormControl('', [Validators.required, Validators.minLength(3)]),
  //   email: new FormControl(),
  //   phone: new FormControl();
  // });

  constructor(
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private companyService: CompanyService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.companyID = this.activatedRoute.snapshot.params.id;
    this.isNewCompany = !this.companyID;

    if (!this.isNewCompany) {
      this.getCompany();
    }
  }

  getCompany(): void {
    this.companyService.getCompany(this.companyID!)
      .subscribe(c => this.companyForm.patchValue(c));
  }

  get f() {
    return this.companyForm.controls;
  }

  saveCompany(): void {
    // const valie = this.companyForm.value
    // const { value, valid } = this.companyForm;
    const { value, valid } = this.companyForm;

    if (!valid) return;
    if (this.isNewCompany) {
      this.companyService
        .addCompany(value)
        .subscribe(() => this.router.navigate(['company/list']));
    } else {
      // const coompany = {
      //   id: this.companyID,
      //   name: value.name,
      //   email: value.email,
      //   phone: value.phone
      // } as Company;

      const coompany = {
        id: this.companyID,
        ...value
      } as Company;


      this.companyService.updateCompany(coompany)
        .subscribe(() => this.router.navigate(['company/list']));
    }
  }
}
