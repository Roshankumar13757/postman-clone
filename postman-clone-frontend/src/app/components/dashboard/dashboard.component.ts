import { Component, OnInit } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Nav } from '../nav/nav.component';
import { MatIconModule } from '@angular/material/icon';

interface LocalUser {
  id: string;
  username: string;
  email: string;
}

interface RequestItem {
  method: string;
  name: string;
}

interface Collection {
  name: string;
  requests: RequestItem[];
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule,RouterOutlet, RouterModule, MatIconModule, Nav],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit {

  user: LocalUser | null = null;

  collectionsOpen = true;
  environmentsOpen = false;
  historyOpen = false;

  collections: Collection[] = [
    {
      name: 'squadCom',
      requests: [
        { method: 'POST', name: 'New Request' },
        { method: 'GET', name: 'login' }
      ]
    },
    {
      name: 'postman-back',
      requests: []
    },
    {
      name: 'streaming_Web',
      requests: []
    }
  ];

  constructor(private router: Router) {}

  ngOnInit() {
    const userStr = localStorage.getItem('user');
    if (!userStr) {
      this.router.navigate(['/login']);
      return;
    }
  }

  toggle(section: string) {
    if (section === 'collections') this.collectionsOpen = !this.collectionsOpen;
    if (section === 'environments') this.environmentsOpen = !this.environmentsOpen;
    if (section === 'history') this.historyOpen = !this.historyOpen;
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }

}