import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Company } from '../company'
import { CompanyService } from '../company-service';

@Component({
  selector: 'fbc-company-list',
  templateUrl: './company-list.component.html',
  styleUrls: ['./company-list.component.scss']
})
export class CompanyListComponent implements OnInit {
  companies$: Observable<Company[]> | undefined;
  // companyService: CompanyService;
  comanpyCount$!: Observable<number>


  constructor(private companyService: CompanyService) {
    // this.companyService = companyService;
  }

  ngOnInit(): void {
    this.getCompanies();
  }

  getCompanies() {
    // this.companies = this.companyService.getCompanies();
    // this.companyService.getCompanies().pipe(tap(x => console.log('TAP - Component', x)))
    //   .subscribe(companies => {
    //     console.log('next called')
    //     this.companies = companies;
    //   },
    //     error => {
    //       console.log('error called', error)
    //     },
    //     () => {
    //       console.log('complete called');
    //     });
    this.companies$ = this.companyService.getCompanies();
  }

  deleteCompany(companyiD: number) {
    this.companyService.delteCompany(companyiD)
      .subscribe(() => this.getCompanies());
  }

}
