import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface User {
  id: number | null;
  name: string;
  lastName: string;
  email: string;
  profession: string;
  age: number | undefined;
  showDetails: boolean;
}

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  users!: User[]; 
  newUser: User = {
    id: null,
    name: '',
    lastName: '',
    email: '',
    profession: '',
    age: undefined,
    showDetails: false
  };
  editingUser: User | null = null;
  showAddUser: boolean = false;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.getUsers();
  }

  getUsers() {
    this.http.get<User[]>('https://jsonplaceholder.typicode.com/users')
      .subscribe(users => {
        this.users = users.map(user => ({
          ...user,
          lastName: '',
          profession: '',
          age: undefined,
          showDetails: false
        }));
      });
  }

  toggleDetails(user: User) {
    user.showDetails = !user.showDetails;
  }

  editUser(user: User) {
    this.originalUser = { ...user };
    this.editingUser = user;
  }
  
  originalUser: User | null = null;


  saveUser(user: User) {
    this.editingUser = null;
  }
  
  cancelEdit() {
    if (this.editingUser && this.originalUser) {
      this.editingUser.name = this.originalUser.name;
      this.editingUser.lastName = this.originalUser.lastName;
      this.editingUser.email = this.originalUser.email;
      this.editingUser.profession = this.originalUser.profession;
      this.editingUser.age = this.originalUser.age;
      this.editingUser = null;
      this.originalUser = null;
    }
  }
  
  
  deleteUser(user: User) {
    const index = this.users.indexOf(user);
    if (index !== -1) {
      this.users.splice(index, 1);
    }
  }

  addUser() {
    const newUserId = this.users.length > 0 ? this.users[this.users.length - 1].id! + 1 : 1;
    const newUser: User = {
      id: newUserId,
      name: this.newUser.name,
      lastName: this.newUser.lastName,
      email: this.newUser.email,
      profession: this.newUser.profession,
      age: this.newUser.age,
      showDetails: false
    };
    this.users.push(newUser);
    this.newUser = {
      id: null,
      name: '',
      lastName: '',
      email: '',
      profession: '',
      age: undefined,
      showDetails: false
    };
  }
}
