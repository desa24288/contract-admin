import { Component, OnInit } from '@angular/core';
import { Profile } from 'src/app/models/usuario/profile';
import * as jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public profile: Profile = new Profile();

  constructor() { }

  ngOnInit() {
    // this.loadprofile();
  }

  loadprofile() {
    const uiportaladmin = JSON.parse(localStorage.getItem('uiportaladmin'));
    if (uiportaladmin.token !== null) {
      const decodedoken = this.getDecodedAccessToken(uiportaladmin.token);
      this.profile = new Profile();
      this.profile = decodedoken;
    }
  }

  getDecodedAccessToken(token: string): any {
    try {
      return jwt_decode(token);
    } catch (err) {
      return console.log(err);
    }
  }
}
