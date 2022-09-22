/**
 * TODO: 10. Asynchronous Programming (RxJS)
 * TODO: 13. Angular (NX) Architecture
*/
import { Component, OnInit } from '@angular/core';
import { Account } from '../../../../../shared/services/src/lib/account';
import { AccountService } from '../../../../../shared/services/src/lib/account.service'
import { Observable, of } from 'rxjs';
import {Router} from "@angular/router";
import {FormBuilder, Validators} from "@angular/forms";
import {take} from "rxjs/operators";


@Component({
  selector: 'sum-account-summary',
  templateUrl: './account-summary.component.html',
  styleUrls: ['./account-summary.component.scss'],
})
export class AccountSummaryComponent implements OnInit {
  accounts$: Observable<Account[]> = of([]);
  currencyTypes: Array<string> = ["CAD", "USD"]
  currencyFilter: any = this.formBuilder.group({
    currencyName: ['', [Validators.required]]
  })
  constructor(private accountService: AccountService, private router: Router, private formBuilder: FormBuilder) {}
  accounts: Account[] = [];
  filteredAccounts: Account[] = [];

  ngOnInit(): void {
    this.accountService.getAccounts().pipe(take(1)).subscribe((accounts) => {
      this.accounts = accounts;
      this.filteredAccounts = accounts;
    });
  }

  filterAccounts(currency: string) {
    console.log("value changed");
    this.filteredAccounts = this.accounts.filter(acc => acc.currency.toUpperCase() === currency);
    return this.filteredAccounts;
  }

  getAccountID(accountId: string){
    this.router.navigate(["account", accountId]);
  }

  changeCurrencyType(event: any) {
    this.currencyFilter.get('currencyName').setValue(event.target.value, {
      onlySelf: true
    })
    this.filterAccounts(this.currencyFilter.value.currencyName);
  }
}
