import { Component, OnInit } from '@angular/core'
import { AccountService } from '../../services/account.service'
import { Globals } from '../../globals'
import { Router } from '@angular/router'
import { routerTransition } from '../../router.transition'
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { LoginModel } from '../../models/account.models'

@Component({
  selector: 'app-singin',
  templateUrl: './singin.component.html',
  styleUrls: ['./singin.component.css'],
  animations: [routerTransition],
  host: { '[@routerTransition]': '' }
})

export class SinginComponent implements OnInit, TokenChangedListener {

  error = ''
  user: LoginModel = new LoginModel()

  constructor(private service: AccountService, private router: Router) {
    Globals.addTokenListener(this)
    if (Globals.currentToken())
      router.navigate(['/'])
  }

  ngOnInit() {
  }

  loginUser() {
    this.service.login(this.user).subscribe(response => {
      this.error = ''
      const result: AccountResponse = <AccountResponse>response
      Globals.changeToken(result.token)
      this.router.navigate(['/my-questions'])
    }, error => {
      this.error = error.error.message
    })
  }

  tokenChanged(newToken) { }

  cleanError() {
    this.error = ''
  }
}