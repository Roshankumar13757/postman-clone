import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDividerModule } from '@angular/material/divider';

interface LocalUser {
  id: string;
  username: string;
  email: string;
}

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [
  CommonModule,
  RouterModule,
  FormsModule,
  MatIconModule,
  MatButtonModule,
  MatMenuModule,
  MatTooltipModule,
  MatDividerModule,  
],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.scss',
})
export class Nav implements OnInit {
  @Input() user: LocalUser | null = null;

  searchQuery = '';
  showWorkspacesMenu = false;
  avatarInitial = '';
  avatarColor = '';

  private colors = [
    '#E74C3C','#E67E22','#F1C40F','#2ECC71',
    '#1ABC9C','#3498DB','#9B59B6','#E91E63'
  ];

  constructor(private router: Router) {}

  ngOnInit() {
    if (this.user) {
      this.avatarInitial = this.user.username.charAt(0).toUpperCase();
      const idx = this.user.username.charCodeAt(0) % this.colors.length;
      this.avatarColor = this.colors[idx];
    }
  }

  onSearch() {
    if (this.searchQuery.trim()) {
      this.router.navigate(['/dashboard'], {
        queryParams: { q: this.searchQuery.trim() }
      });
    }
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }

  getAvatarInitial(): string {
    if (!this.user) return '?';
    return this.user.username.charAt(0).toUpperCase();
  }
}