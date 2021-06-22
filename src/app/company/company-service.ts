import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Company } from './company';
import { catchError } from 'rxjs/operators';
import { tap, finalize } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {
  API_BASE = 'https://firebootcamp-crm-api.azurewebsites.net/api';
  constructor(private httpClient: HttpClient) { }

  public getCompanies(): Observable<Company[]> {
    // return [
    //   { name: 'Company 1', email: 'Email 1', phone: 1111 },
    //   { name: 'Company 2', email: 'Email 2', phone: 2222 },
    //   { name: 'Company 3', email: 'Email 3', phone: 3333 }
    // ]

    // return this.httpClient.get<Company[]>(`${this.API_BASE}/company`);

    return this.httpClient.get<Company[]>(`${this.API_BASE}/company`)
      // .pipe(catchError(this.errorHandler));
      .pipe(
        tap(x => console.log(x)),
        catchError(error => this.errorHandler<Company[]>(error)),
        finalize(() => console.log('Finalize'))
      );
  }

  private errorHandler<T>(error: Error): Observable<T> {
    console.log('Service error', error);
    return new Observable<T>();
  }

  public delteCompany(companyiD: number): Observable<Company> {
    return this.httpClient.delete<Company>(`${this.API_BASE}/company/${companyiD}`)
      .pipe(catchError(error => this.errorHandler<Company>(error)));
  }

  public getCompany(companyId: number): Observable<Company> {
    return this.httpClient.get<Company>(`${this.API_BASE}/company/${companyId}`);
  }

  public addCompany(company: Company): Observable<Company> {
    return this.httpClient.post<Company>(`${this.API_BASE}/company`, company,
      {
        headers: new HttpHeaders().set('content-type', 'application/json')
      }
    ).pipe(catchError(error => this.errorHandler<Company>(error)));

  }
}
