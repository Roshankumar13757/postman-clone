import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

interface RequestItem {
  method: string;
  name: string;
}

interface Collection {
  name: string;
  requests: RequestItem[];
}

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
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
    { name: 'postman-back', requests: [] },
    { name: 'streaming_Web', requests: [] }
  ];

  @Output() logoutEvent = new EventEmitter<void>();

  toggle(section: string) {
    if (section === 'collections') this.collectionsOpen = !this.collectionsOpen;
    if (section === 'environments') this.environmentsOpen = !this.environmentsOpen;
    if (section === 'history') this.historyOpen = !this.historyOpen;
  }

  logout() {
    this.logoutEvent.emit();
  }
}