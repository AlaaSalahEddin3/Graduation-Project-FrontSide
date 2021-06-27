import { Component, NgZone } from '@angular/core';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'SouqGraduationProject';
  showHead: boolean = false;

  ngOnInit() {
  }

  constructor(private router: Router) {
  // on route change to '/login', set the variable showHead to false
    router.events.forEach((event) => {
      if (event instanceof NavigationStart) {
        if ((event['url'] == '/Login')||(event['url'] =='/Register')||(event['url']=='/BillingAddress'))
         {
          this.showHead = false;
         } 
         else {
          // console.log("NU")
          this.showHead = true;
        }
      }
    });
  }
}
