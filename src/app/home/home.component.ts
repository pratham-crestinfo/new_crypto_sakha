import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../shared/auth.service';
import { CommonModule } from '@angular/common';
import { User } from '../shared/user.model';
import { FormsModule } from '@angular/forms';
import { NgFor } from '@angular/common';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  constructor(
    private activeRoute: ActivatedRoute,
    private router: Router,
    private authservice: AuthService,
    private http: HttpClient
  ) {}

  isAuthenticated: boolean = false;
  user: User;
  test_var: boolean = false;
  canAdd: boolean = false;
  coinid_array: string[]=[];



  goToAuth() {
    this.router.navigate(['/auth'], { relativeTo: this.activeRoute });
  }


  ngOnInit() {
    this.authservice.isAuthenticated.subscribe({
      next: (res) => {
        this.isAuthenticated = res;
      },
    });
    this.authservice.user.subscribe({
      next: (res) => {
        this.user = res;
      },
    });
    // console.log(this.user);
    // console.log(this.isAuthenticated);
    if (
      this.user &&
      this.isAuthenticated == true &&
      new Date() < this.user._tokenExpirationDate
    ) {
      this.canAdd = true;
    }
  }


  addcoinid(myform: NgForm) {
    if (this.canAdd == true) {

      console.log('Adding');
      this.coinid_array.push(myform.form.value.coinid);

      this.http
        .post(`https://crypto-sakha-default-rtdb.firebaseio.com/${this.user.id}.json`,this.coinid_array)
        .subscribe({
          next: (res) => {console.log(res);},
          error: (error: Error) => {console.log(error);},
        });
        this.http.get(`https://crypto-sakha-default-rtdb.firebaseio.com/${this.user.id}.json`).subscribe({
          next:(res)=>{
            console.log(res)
          }
        })
    }
  }
}
      // console.log(this.user);
      // console.log(this.isAuthenticated);
      // console.log(this.user._tokenExpirationDate);