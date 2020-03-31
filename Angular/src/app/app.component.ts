import { Component } from '@angular/core';
import * as firebase from 'firebase'; 

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(){
    var firebaseConfig = {
      apiKey: "AIzaSyCKOt8CwmlIRCzzaxjhtzHH4uiNfMKS5U8",
      authDomain: "skillsacademy-baf0b.firebaseapp.com",
      databaseURL: "https://skillsacademy-baf0b.firebaseio.com",
      projectId: "skillsacademy-baf0b",
      storageBucket: "skillsacademy-baf0b.appspot.com",
      messagingSenderId: "840912443208",
      appId: "1:840912443208:web:cfb29a42f816460ff6457d",
      measurementId: "G-2MFKF1WWNP"
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
    firebase.analytics();
  }
}
