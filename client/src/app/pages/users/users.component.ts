import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  users: any[] = [];
  newUser: any = { firstName: '', lastName: '', username: '', email: '', password: '', isAdmin: false, roles: [] };
  addUserSuccess = false;
  addUserError = '';
  deleteUserSuccess = '';
  deleteUserError = '';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchUsers();
  }

  fetchUsers() {
    this.http.get<any>('http://localhost:8800/api/user').subscribe({
      next: (res) => {
        this.users = res.data;
      },
      error: (err) => {
        this.users = [];
      }
    });
  }

  addUser() {
    this.addUserSuccess = false;
    this.addUserError = '';
    // For demo, assign default role (should fetch from API in real app)
    this.newUser.roles = ["64c8e7e2e2b1e2a1b2c3d4e5"];
    this.http.post<any>('http://localhost:8800/api/user', this.newUser).subscribe({
      next: (res) => {
        this.addUserSuccess = true;
        this.addUserError = '';
        this.newUser = { firstName: '', lastName: '', username: '', email: '', password: '', isAdmin: false, roles: ["64c8e7e2e2b1e2a1b2c3d4e5"] };
        this.fetchUsers();
      },
      error: (err) => {
        this.addUserSuccess = false;
        this.addUserError = err?.error?.message || 'Error adding user';
      }
    });
  }

  deleteUser(id: string) {
    if (!confirm('Are you sure you want to delete this user?')) return;
    this.deleteUserSuccess = '';
    this.deleteUserError = '';
    this.http.delete<any>(`http://localhost:8800/api/user/${id}`).subscribe({
      next: (res) => {
        this.deleteUserSuccess = 'User deleted!';
        this.deleteUserError = '';
        this.fetchUsers();
      },
      error: (err) => {
        this.deleteUserSuccess = '';
        this.deleteUserError = err?.error?.message || 'Error deleting user';
      }
    });
  }
}
