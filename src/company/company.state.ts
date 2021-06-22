import { State, Action, Selector, StateContext } from '@ngxs/store';
import { CompanyAction } from './company.actions';

export interface CompanyStateModel {
  items: string[];
}

@State<CompanyStateModel>({
  name: 'company',
  defaults: {
    items: []
  }
})
export class CompanyState {

  @Selector()
  public static getState(state: CompanyStateModel) {
    return state;
  }

  @Action(CompanyAction)
  public add(ctx: StateContext<CompanyStateModel>, { payload }: CompanyAction) {
    const stateModel = ctx.getState();
    stateModel.items = [...stateModel.items, payload];
    ctx.setState(stateModel);
  }
}
