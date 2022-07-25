import { Injectable } from '@angular/core';
import { ReplaySubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private users = [
    {username:'admin', password: '1234', roles: ['ADMIN', 'USER']},
    {username:'user1', password: '1234', roles: ['USER']},
    {username:'user2', password: '1234', roles: ['USER']}
  ];
  isAuthenticated: Subject<boolean> = new ReplaySubject<boolean>(0);
  isAdmin: Subject<boolean> = new ReplaySubject<boolean>(0);

  userAuthenticated:any = undefined;
  token! :string;


  constructor() { }

  public login (username:string , password: string){
    this.users.forEach(u  => {
      if(u["username"] == username && u["password"]== password){
        if(u["roles"][0]== "ADMIN"){
          //publish the new Values
          this.isAdmin.next(true)
        }else{
          this.isAdmin.next(false);
        }
        //persist in Computer
        this.token =btoa(JSON.stringify({username: u.username ,roles:u.roles}));

        this.isAuthenticated.next(true);
        this.userAuthenticated = u;
      }
    });
    this.saveAuthenticatedUser();

    return this.userAuthenticated;
  }


  public saveAuthenticatedUser(){
    this.isAuthenticated.subscribe(
      data =>  localStorage.setItem('authToken', this.token)
    )
  }

  public loadUserAuthentictatedUserFromLocalStorage():void{
    let t:any= localStorage.getItem('authToken');
    if(t){
      let user =JSON.parse(atob(t));
      this.userAuthenticated ={username: user.usernmae, roles: user.roles};
      this.isAuthenticated.next(true);

      if(this.userAuthenticated.roles[0]== "ADMIN"){
        this.isAdmin.next(true);
      }
      this.token = t;
    }
  }

  public removeTockenFromLocalStorage(){
      localStorage.removeItem('authToken');

      this.isAuthenticated.next(false);
      this.isAdmin.next(false);
      this.userAuthenticated = undefined;
  }
}
