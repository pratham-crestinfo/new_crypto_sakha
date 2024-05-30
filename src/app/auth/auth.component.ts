import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { AuthService } from '../shared/auth.service';
import { User } from '../shared/user.model';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css'
})
export class AuthComponent {
  constructor(private authservice:AuthService,private router: Router,private activeRoute:ActivatedRoute){}
  onSignUp(myform:NgForm)
  {
    console.log("signup...");
    this.authservice.signUp(myform.form.value.email,myform.form.value.password).subscribe({
      next:(res)=>{
        console.log(res);
        const expirationDate = new Date(new Date().getTime() + +res.expiresIn * 1000);
        const user = new User(res.email,res.localId,res.idToken,expirationDate);
        this.authservice.user.next(user);
        this.authservice.isAuthenticated.next(true);
      },
      error:(err:Error)=>
      {
        console.log(err)
      },
      complete:()=>{

        this.router.navigate(['/home'],{relativeTo:this.activeRoute})
      }
    })
  }
  onSignIn(form:NgForm)
  {
    console.log("SIGNin...");
    this.authservice.SignIn(form.form.value.email,form.form.value.password).subscribe({
      next:(res)=>{
        console.log(res);
        const expirationDate = new Date(new Date().getTime() + +res.expiresIn * 1000);
        const user = new User(res.email,res.localId,res.idToken,expirationDate);
        this.authservice.user.next(user);
        this.authservice.isAuthenticated.next(true);
      },
      error:(err:Error)=>
      {
        console.log(err);
      },
      complete:()=>{
        this.router.navigate(['/home'],{relativeTo:this.activeRoute})
      }
    })
  }
}
