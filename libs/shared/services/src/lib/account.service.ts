import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { of } from 'rxjs';
import { Account } from './account';


@Injectable({
  providedIn: 'root'
})
export class AccountService {
  accountData!: Account | null;
  accounts: Account[] = [
    { id: "1234", balance: 7500, currency: "cad" },
    { id: "1235", balance: 4500, currency: "cad" },
    { id: "1236", balance: 2102, currency: "usd" },
  ];

  getAccounts(): Observable<Account[]> {
    return of(this.accounts);
  }

  fetchAccountDetail(id: string): Observable<Account> {
      this.accounts.filter(account => {
        if(account.id === id){
          this.accountData = account;
        } else {
          this.accountData = null;
        }
      });
    console.log("service-AccountData", this.accountData)
    return of(this.accountData) as any;
  }
}
