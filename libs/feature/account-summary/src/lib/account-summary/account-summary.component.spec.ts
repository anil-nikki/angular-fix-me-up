import {ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';
import { AccountSummaryComponent } from './account-summary.component';
import {RouterTestingModule} from "@angular/router/testing";
import {FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {Router} from "@angular/router";
import {
  AccountDetailsComponent
} from "../../../../../../apps/angular-anim/src/app/account-details/account-details.component";

// TODO: 9. Topics in this file: Angular Unit Testing w/ Jest
describe('AccountSummaryComponent', () => {
  let component: AccountSummaryComponent;
  let fixture: ComponentFixture<AccountSummaryComponent>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AccountSummaryComponent],
      imports: [RouterTestingModule.withRoutes([{ path: 'account/:id', component: AccountDetailsComponent }]), FormsModule, ReactiveFormsModule]
    }).compileComponents();
    router = TestBed.get(Router);
    fixture = TestBed.createComponent(AccountSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create a currencyFilter form using formbuilder', () => {
    expect(component.currencyFilter instanceof FormGroup).toBeTruthy();
  });

  it('should retrieve accounts', () => {
    expect.assertions(2);
    expect(component.accounts$).toBeTruthy();
    component.accounts$.subscribe(acc => {
      expect(acc.length).toBe(4);
    });
  });

  describe("#filterAccounts", () => {
    it('should return filter accounts', () => {
      // TODO: 10. this test isn't doing anything atm, how can we make it more meaningful?
      component.accounts = [
        { id: "1234", balance: 7500, currency: "cad" },
        { id: "1235", balance: 4500, currency: "cad" },
        { id: "1236", balance: 2102, currency: "usd" },
      ];
      const filteredData = [
        { id: "1234", balance: 7500, currency: "cad" },
        { id: "1235", balance: 4500, currency: "cad" },
      ];
      const currencyType: string = "CAD";
      const filtered = component.filterAccounts(currencyType);
      expect(filtered).toEqual(filteredData);

    });

    it('should call filterAccount', fakeAsync(() => {
      jest.spyOn(component, 'changeCurrencyType');
      jest.spyOn(component, 'filterAccounts');

      let select = fixture.debugElement.nativeElement.querySelector('select');
      select.dispatchEvent(new Event('change'));
      tick();
      expect(component.changeCurrencyType).toHaveBeenCalled();
      expect(component.filterAccounts).toHaveBeenCalled();

    }));

    it('should navigate to account page with account if as param', () => {
      const navigateSpy = jest.spyOn(router,'navigate');
      const accountId: string = "1234";
      component.getAccountID(accountId);
      expect(navigateSpy).toHaveBeenCalledWith(['account', accountId]);
    });


  });
});
