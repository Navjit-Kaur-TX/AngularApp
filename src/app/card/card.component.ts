import { Component, OnInit } from '@angular/core';
import axios from 'axios'
import { HttpClient } from '@angular/common/http';
import { CardDataService } from '../card-data.service';
import { LoaderService } from 'src/service/loader.service'

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {
  toggle: boolean = false;
  users: Array<any> = [];
  allUsersData: Array<any> = []
  search: any = ''
  i: number = 0;
  newData: any;
  loading$ = this.loader.isLoading$;


  constructor(public http: HttpClient, private service: CardDataService, private loader: LoaderService) {
  }

  ngOnInit(): void {
    this.fetchAllUsers();
    this.getNextUser();
    this.service.getData().subscribe(a=>{
      console.log(a);
      this.newData = a;
    })
    console.log(this.loader.isLoading$)
  }

  fetchAllUsers() {
    console.log(this.loading$,"Start")
    this.http.get<any[]>(`http://localhost:3000/users`)
      .subscribe(response => {
        const data = response; // [{}, {}]
        this.allUsersData = data
        data.slice(0, 10).map((item: any) => {
          this.users.push(item);
          console.log(this.users)
        });
      },
      );
      console.log(this.loading$,"End")
  }

  sortUser = () => {
    this.users = [];
    this.allUsersData.sort((a: any, b: any) => a.author_name !== b.author_name ? a.author_name < b.author_name ? (!this.toggle ? -1 : 1) : (!this.toggle ? 1 : -1) : 0);
    this.allUsersData.slice(0, 10).map((item) => {
      this.users.push(item);
    });
    this.toggle = !this.toggle;
  }

  watch(search: { value: string; }) {
    this.users = this.allUsersData.filter(user => user.author_name.toLowerCase().includes(search));
  }

 getNextUser = () => {
    window.onscroll = () => {

      // on top of the screen
      if (document.documentElement.scrollTop < 60) {
        this.i = 0;
        this.users = [];
        this.allUsersData.slice(this.i * 10, (this.i + 1) * 10).map((item) => {
          this.users.push(item);
        });
      }
      // bottom of the screen
      let bottomOfWindow = Math.round(document.documentElement.scrollTop + window.innerHeight) === document.documentElement.offsetHeight;
      if (bottomOfWindow) {
        this.i++;
        this.allUsersData.slice(this.i * 10, (this.i + 1) * 10).map((item) => {
          this.users.push(item);
        });
      }
    }
  }


}
