import { Component } from '@angular/core';
import { NewscardComponent } from './newscard/newscard.component';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-news',
  standalone: true,
  imports: [NewscardComponent,CommonModule],
  templateUrl: './news.component.html',
  styleUrl: './news.component.css'
})
export class NewsComponent {
constructor(private http:HttpClient){}
private newsHeaders= new HttpHeaders({
  'X-RapidAPI-Key': '5273bb30c3msh58e3023355d1531p14ca63jsna27040b80cbe',
  'X-RapidAPI-Host': 'cryptocurrency-news2.p.rapidapi.com'
})
newsData:any[]=[];
ngOnInit()
{
  this.http.get("https://cryptocurrency-news2.p.rapidapi.com/v1/coindesk",{headers:this.newsHeaders}).subscribe({
    next:(res:any)=>{
      console.log(res.data);
      this.newsData=res.data;
    },
    error:(err)=>{
      console.log(err);
    },
  })
}
}
