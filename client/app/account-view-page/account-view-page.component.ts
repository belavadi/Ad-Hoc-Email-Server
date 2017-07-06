import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Subscription} from "rxjs/Subscription";
import {ApiService} from "../api.service";
import {Observable} from "rxjs/Observable";

@Component({
  selector: 'app-account-view-page',
  templateUrl: './account-view-page.component.html',
  styleUrls: ['./account-view-page.component.css']
})
export class AccountViewPageComponent implements OnInit, OnDestroy {


  paramsSub: Subscription;
  account: string;
  emails: Observable<any>;
  selectedEmail: any;

  constructor(private apiService: ApiService, private route: ActivatedRoute) {

  }

  ngOnInit() {
    this.paramsSub = this.route.params.subscribe(params => {
      this.account = params['account'];
      this.getAccountEmails();
    });
  }

  ngOnDestroy(): void {
    this.paramsSub.unsubscribe();
  }

  getAccountEmails(): any{
    this.emails = this.apiService.listAccountsEmails(this.account);
  }

  getEmailContents(email: any) {
    this.apiService.getEmailContent(this.account, email.timestamp).subscribe(result => this.selectedEmail = result);
  }

  selectEmail(clickedEmail) {
    this.selectedEmail = clickedEmail;
    this.apiService.getEmailContent(this.account, clickedEmail.timestamp).subscribe(result => this.selectedEmail = result);
  }

}
