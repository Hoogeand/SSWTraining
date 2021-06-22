import { APP_BASE_HREF } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CompanyEditComponent } from './company/company-edit/company-edit.component';
import { CompanyListComponent } from './company/company-list/company-list.component';
import { CompanyService } from './company/company-service';
import { CompanyTableComponent } from './company/company-table/company-table.component';


describe('COMPONENT: AppComponent', () => {
  let component: AppComponent;
  let companySvc: CompanyService;

  beforeEach(() => {
    companySvc = {
      getCompanies: () => of(
        [{
          name: 'Fake company',
          email: 'fake@email.com',
          phone: 1234
        }]
      )
    } as CompanyService;

    component = new AppComponent(companySvc);
  })
  it('should 1+1 = 2 - PASS', () => {
    let value = 1 + 1;
    expect(value).toEqual(2);
  })

  it('company count +1', () => {
    component.ngOnInit();
    component.companyCount$.subscribe(
      c => { expect(c).toEqual(1) }
    )
  })



  // it('company count = 2', () => {
  //   spyOn(companySvc, 'getCompanies').and.returnValue(
  //     of(
  //       [{
  //         name: 'Fake company',
  //         email: 'fake@email.com',
  //         phone: 1234
  //       }]
  //     )
  //   )
  // })

  // it('should 1+1 = 2 - FAIL', () => {
  //   let value = 1 + 1;
  //   expect(value).toEqual(22);
  // })

  // if ('Title to be "Angular super  ')

})

describe('COMPONENT: AppComponent from Angular', () => {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;
  let companySvc: CompanyService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        CompanyListComponent,
        CompanyTableComponent,
        CompanyEditComponent

      ],
      imports: [
        AppRoutingModule,
        HttpClientModule,
        ReactiveFormsModule,
      ],
      providers: [{ provide: APP_BASE_HREF, useValue: '/' }]
    })
  })

  it('Company count =1 ', () => {
    spyOn(companySvc, 'getCompanies').and.returnValue(of([
      {
        id: 1,
        name: 'Fake company',
        email: 'fake@email.com',
        phone: 1234
      }
    ]));
    fixture.detectChanges();

    component.companyCount$.subscribe((c) => {
      expect(c).toEqual(22);
    })
  })

  it('Company count HTML should update', () => {
    spyOn(companySvc, 'getCompanies').and.returnValue(of([
      {
        id: 1,
        name: 'Fake company',
        email: 'fake@email.com',
        phone: 1234
      }
    ]));
    fixture.detectChanges();

    let el = fixture.debugElement.query(By.css('#company-count')).nativeElement;
    expect(el.textContent).toEqual('1');

  })
})




// describe('AppComponent', () => {
//   beforeEach(async () => {
//     await TestBed.configureTestingModule({
//       imports: [
//         RouterTestingModule
//       ],
//       declarations: [
//         AppComponent
//       ],
//     }).compileComponents();
//   });

//   it('should create the app', () => {
//     const fixture = TestBed.createComponent(AppComponent);
//     const app = fixture.componentInstance;
//     expect(app).toBeTruthy();
//   });

//   it(`should have as title 'firebootcamp-crm'`, () => {
//     const fixture = TestBed.createComponent(AppComponent);
//     const app = fixture.componentInstance;
//     expect(app.title).toEqual('firebootcamp-crm');
//   });

//   it('should render title', () => {
//     const fixture = TestBed.createComponent(AppComponent);
//     fixture.detectChanges();
//     const compiled = fixture.nativeElement;
//     expect(compiled.querySelector('.content span').textContent).toContain('firebootcamp-crm app is running!');
//   });
// });
