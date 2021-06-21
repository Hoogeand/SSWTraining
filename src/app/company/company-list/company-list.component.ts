import { Component, OnInit } from '@angular/core';
import { Company } from '../company'
import { CompanyService } from '../company-service';

@Component({
  selector: 'fbc-company-list',
  templateUrl: './company-list.component.html',
  styleUrls: ['./company-list.component.scss']
})
export class CompanyListComponent implements OnInit {
  companies: Company[] = [];
  // companyService: CompanyService;

  constructor(private companyService: CompanyService) {
    // this.companyService = companyService;
  }



  ngOnInit(): void {
    this.getCompanies();
  }

  getCompanies() {

    this.companies = this.companyService.getCompanies();
  }

}
