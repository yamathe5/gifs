import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { GiphyService } from './services/giphy.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'gifs';
  gifs: any[] = []
  searchHistory: string[] = [];
  isHovered: boolean = false;


  constructor(private giphy_service : GiphyService){}

  ngOnInit(){
    this.giphy_service.getTrendingGifs().subscribe({
      next: (gifs) => {
        this.gifs = gifs.data;
        console.log(this.gifs);
      }
    })
  }
  onHover() {
    this.isHovered = true;
  }

  onHoverExit() {
    this.isHovered = false;
  }
  searchGifs(query: string) {
    if (query.trim() === '') {
      this.giphy_service.getTrendingGifs().subscribe({
        next: (gifs) => {
          this.gifs = gifs.data;
        }
      });
    } else {
      this.giphy_service.searchGifs(query).subscribe({
        next: (response) => {
          this.gifs = response.data;
          if (!this.searchHistory.includes(query)) {
            this.searchHistory.push(query);
          }
        }
      });
    }
  
}}
