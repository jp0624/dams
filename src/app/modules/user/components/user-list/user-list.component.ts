import { Component, OnInit } from '@angular/core';

import { UserService } from '../../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  users;  
  
	constructor(
    private userService: UserService,
    private router: Router
  ) { }
  
  ngOnInit() {
    this.getUsers()
  }

	getUsers() {
    this.userService
      .getUsers()
      .subscribe((data) => {
        this.users = data;
      })
  }
  onRowSelect(event) {
    this.router.navigate([`/user/${event.data.user_id}`]);
  }
}
