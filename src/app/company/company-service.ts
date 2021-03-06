import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Company } from './company';
import { catchError } from 'rxjs/operators';
import { tap, finalize } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {
  //API_BASE = 'https://firebootcamp-crm-api.azurewebsites.net/api'; move to environments
  API_BASE = environment.API_BASE;


  constructor(private httpClient: HttpClient) {
    this.loadCompanies();
  }
  companies$: BehaviorSubject<Company[]> = new BehaviorSubject<Company[]>([]);

  public getCompanies(): Observable<Company[]> {
    // return [
    //   { name: 'Company 1', email: 'Email 1', phone: 1111 },
    //   { name: 'Company 2', email: 'Email 2', phone: 2222 },
    //   { name: 'Company 3', email: 'Email 3', phone: 3333 }
    // ]

    // return this.httpClient.get<Company[]>(`${this.API_BASE}/company`);


    // return this.httpClient.get<Company[]>(`${this.API_BASE}/company`)
    //   // .pipe(catchError(this.errorHandler));
    //   .pipe(
    //     tap(x => console.log(x)),
    //     catchError(error => this.errorHandler<Company[]>(error)),
    //     finalize(() => console.log('Finalize'))
    //   );

    return this.companies$;
  }

  private errorHandler<T>(error: Error): Observable<T> {
    console.log('Service error', error);
    return new Observable<T>();
  }

  public delteCompany(companyiD: number): void {
    this.httpClient.delete<Company>(`${this.API_BASE}/company/${companyiD}`)
      .pipe(catchError(error => this.errorHandler<Company>(error)))
      .subscribe(() => this.loadCompanies());
  }

  public getCompany(companyId: number): Observable<Company> {
    return this.httpClient.get<Company>(`${this.API_BASE}/company/${companyId}`);
  }

  public addCompany(company: Company): void {
    this.httpClient.post<Company>(`${this.API_BASE}/company`, company,
      {
        headers: new HttpHeaders().set('content-type', 'application/json')
      }
    ).pipe(catchError(error => this.errorHandler<Company>(error)))
      .subscribe(() => this.loadCompanies());

  }

  private loadCompanies(): void {
    this.httpClient.get<Company[]>(`${this.API_BASE}/company`)
      .pipe(
        tap(x => console.log(x)),
        catchError(error => this.errorHandler<Company[]>(error)),
        finalize(() => console.log('Finalize'))
      ).subscribe(companies => this.companies$.next(companies));
  }

  updateCompany(company: Company): void {
    this.httpClient.put<Company>(`${this.API_BASE}/company/${company.id}`, company,
      {
        headers: new HttpHeaders().set('content-type', 'application/json')
      }
    ).pipe(catchError(error => this.errorHandler<Company>(error)))
      .subscribe(() => this.loadCompanies());
  }

}
