import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-newscard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './newscard.component.html',
  styleUrl: './newscard.component.css'
})
export class NewscardComponent {
  @Input() element:{createdAt:string,description:string,thumbnail:string,title:string,url:string}={
  createdAt:"",description:"",thumbnail:"",  title:"",  url:""};
  randomIndex=Math.floor(Math.random() * 3)+1;
}
