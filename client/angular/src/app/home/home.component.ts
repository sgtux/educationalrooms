import { Component, OnInit } from '@angular/core'
import { routerTransition } from '../router.transition'
import { Globals } from '../globals';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  animations: [routerTransition],
  host: { '[@routerTransition]': '' }
})

export class HomeComponent implements OnInit {

  title = 'Quiz Room'
  allTitle = 'Quiz Room'
  index = 1

  constructor(private router: Router) {
    if (Globals.userLogged()) {
      router.navigate(['resume'])
    } else {
      setTimeout(() => {
        this.animateText()
      }, 1000)
    }
  }

  animateText() {
    if (this.title.length < this.allTitle.length) {
      this.title = this.allTitle.substring(0, this.index)
      this.index++
      setTimeout(() => {
        this.animateText()
      }, 50)
    } else {
      setTimeout(() => {
        this.title = ''
        this.index = 1
        this.animateText()
      }, 5000)
    }
  }

  ngOnInit() {
  }

}
