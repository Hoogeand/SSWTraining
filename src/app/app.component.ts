import { Component } from '@angular/core';
import { map } from 'rxjs/operators';
import { CompanyService } from './company/company-service';
import { Observable } from 'rxjs';

@Component({
  selector: 'fbc-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  companyCount$!: Observable<number>;

  title = 'firebootcamp-crm';

  constructor(private companyService: CompanyService) {

  }

  ngOnInit(): void {
    this.companyCount$ = this.companyService.getCompanies().pipe(
      map(companies => companies.length)
    )
  }
}
