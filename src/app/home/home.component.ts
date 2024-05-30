import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../shared/auth.service';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { ChangeDetectorRef } from '@angular/core';
import { User } from '../shared/user.model';
import { FormsModule } from '@angular/forms';
import { NgFor } from '@angular/common';
import { NgForm } from '@angular/forms';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  constructor(private activeRoute:ActivatedRoute,private router:Router,private authservice:AuthService,private cd: ChangeDetectorRef){ }
  
  isAuthenticated:boolean=false;
  user:User;
  test_var:boolean=false;
  goToAuth()
  {
    this.router.navigate(['/auth'],{relativeTo:this.activeRoute})
  }
  ngOnInit()
  {
    this.authservice.isAuthenticated.subscribe({
      next:(res)=>{
        this.isAuthenticated=res;
      }
    })
    this.authservice.user.subscribe({
      next:(res)=>{
        this.user=res;
      }
    })
    console.log(this.user);
    console.log(this.isAuthenticated);
    // console.log(this.user._tokenExpirationDate)
    console.log(new Date())
  }
  addcoinid(form:NgForm)
  {
    if(this.user && this.isAuthenticated==true && new Date() < this.user._tokenExpirationDate)
    {
      console.log(this.user);
      console.log(this.isAuthenticated);
      console.log(this.user._tokenExpirationDate);
      
    }
    console.log(form.form.value);
  
  }

}
