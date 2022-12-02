import { Component, OnInit } from '@angular/core';

import { UserService } from '../../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-group-list',
  templateUrl: './group-list.component.html',
  styleUrls: ['./group-list.component.scss']
})
export class GroupListComponent implements OnInit {
  groups;  
  
	constructor(
    private userService: UserService,
    private router: Router
  ) { }
  
  ngOnInit() {
    this.getGroups()
  }

	getGroups() {
    this.userService
      .getGroups()
      .subscribe((data) => {
        this.groups = data;
      })
  }
  
  onRowSelect(event) {
    this.router.navigate([`/group/${event.data.group_id}`]);
  }
}
