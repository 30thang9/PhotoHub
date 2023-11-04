import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { User1Service } from 'src/app/services/demo/user1.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  users: User[] = [];

  constructor(private userService: User1Service) { }

  async ngOnInit(): Promise<void> {
    this.users = await this.userService.getUsers();
  }
}
