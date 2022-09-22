import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {Account} from "../../../../../libs/shared/services/src/lib/account";
import {ActivatedRoute} from "@angular/router";
import {AccountService} from "../../../../../libs/shared/services/src/lib/account.service";
import {take} from "rxjs/operators";

@Component({
  selector: 'angular-anim-account-details',
  templateUrl: './account-details.component.html',
  styleUrls: ['./account-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccountDetailsComponent implements OnInit{
  accountDetail!: Account | null;

  constructor(private route: ActivatedRoute, private accountService: AccountService) {}

  ngOnInit(): void {
    this.accountService.getAccounts().pipe(take(1)).subscribe((accountsList:Account[]) => {
      const account = accountsList.filter(account => account.id === this.route.snapshot.params['id']);
      this.accountDetail = account[0];
    });
  }
}
