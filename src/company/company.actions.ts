export class CompanyAction {
  public static readonly type = '[Company] Add item';
  constructor(public payload: string) { }
}