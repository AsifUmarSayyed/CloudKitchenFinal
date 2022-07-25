import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(private Router: Router) {}
  title = 'cloudKitchen';
  router: any;
  ngOnInit(): void {
    this.router = this.Router;
    //console.log(this.router.url);
  }
}
