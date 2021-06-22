import { TestBed, async } from '@angular/core/testing';
import { NgxsModule, Store } from '@ngxs/store';
import { CompanyState, CompanyStateModel } from './company.state';
import { CompanyAction } from './company.actions';

describe('Company store', () => {
  let store: Store;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [NgxsModule.forRoot([CompanyState])]
    }).compileComponents();
    store = TestBed.get(Store);
  }));

  it('should create an action and add an item', () => {
    const expected: CompanyStateModel = {
      items: ['item-1']
    };
    store.dispatch(new CompanyAction('item-1'));
    const actual = store.selectSnapshot(CompanyState.getState);
    expect(actual).toEqual(expected);
  });

});
