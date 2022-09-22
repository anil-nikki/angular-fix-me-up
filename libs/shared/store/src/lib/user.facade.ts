import { Injectable } from "@angular/core";
import { select, Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { User, UserState } from "./+state/user";
import { userSelectors } from "./+state/user-selectors";
import {filter, pluck} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class UserFacade {
  constructor(private store: Store<UserState>) { }

  getUser(): Observable<User> {
    return this.store.pipe(
      select(userSelectors.user),
      filter(Boolean)
    ) as Observable<User>
  }

  getUserName(): Observable<string> {
    return this.getUser().pipe(
      pluck('name')
    )
  }
}
