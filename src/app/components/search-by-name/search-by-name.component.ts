import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-by-name',
  templateUrl: './search-by-name.component.html',
  styleUrls: ['./search-by-name.component.css']
})
export class SearchByNameComponent implements OnInit {
  smallSearchInput!:boolean;
  constructor(private route: Router) { }

  ngOnInit(): void {
    this.smallSearchInput= true;
  }

  searchProduct(inputSearch: string){
     inputSearch = inputSearch.trim();
      if(inputSearch.length > 0){
        this.route.navigate(['search/'+inputSearch]);
      }else {
        this.route.navigate(['products']);
      }
  }

}
