import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, RouterOutlet } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatBadgeModule } from '@angular/material/badge';
import { MatMenuModule } from '@angular/material/menu';
import { MatDividerModule } from '@angular/material/divider';
import { MockDataService } from './services/mock-data.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    RouterOutlet,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    MatBadgeModule,
    MatMenuModule,
    MatDividerModule
  ],
  template: `
    <mat-sidenav-container class="app-container">
      <mat-sidenav #sidenav mode="side" opened class="sidenav">
        <div class="sidenav-header">
          <div class="logo">
            <mat-icon class="logo-icon">local_hospital</mat-icon>
            <span class="logo-text">MedScheduler</span>
          </div>
        </div>
        
        <mat-nav-list class="nav-list">
          <a mat-list-item routerLink="/dashboard" routerLinkActive="active">
            <mat-icon matListItemIcon>dashboard</mat-icon>
            <span matListItemTitle>Dashboard</span>
          </a>
          <a mat-list-item routerLink="/calendar" routerLinkActive="active">
            <mat-icon matListItemIcon>calendar_month</mat-icon>
            <span matListItemTitle>Calendar</span>
          </a>
          <a mat-list-item routerLink="/appointments" routerLinkActive="active">
            <mat-icon matListItemIcon>event_note</mat-icon>
            <span matListItemTitle>Appointments</span>
          </a>
          <a mat-list-item routerLink="/patients" routerLinkActive="active">
            <mat-icon matListItemIcon>people</mat-icon>
            <span matListItemTitle>Patients</span>
          </a>
          <a mat-list-item routerLink="/providers" routerLinkActive="active">
            <mat-icon matListItemIcon>medical_services</mat-icon>
            <span matListItemTitle>Providers</span>
          </a>
          
          <mat-divider class="nav-divider"></mat-divider>
          
          <a mat-list-item class="nav-item-secondary">
            <mat-icon matListItemIcon>settings</mat-icon>
            <span matListItemTitle>Settings</span>
          </a>
          <a mat-list-item class="nav-item-secondary">
            <mat-icon matListItemIcon>help_outline</mat-icon>
            <span matListItemTitle>Help & Support</span>
          </a>
        </mat-nav-list>

        <div class="sidenav-footer">
          <div class="user-info">
            <img src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=40&h=40&fit=crop" 
                 alt="User" class="user-avatar">
            <div class="user-details">
              <span class="user-name">Dr. Amanda Foster</span>
              <span class="user-role">Administrator</span>
            </div>
          </div>
        </div>
      </mat-sidenav>

      <mat-sidenav-content class="main-content">
        <mat-toolbar class="toolbar">
          <button mat-icon-button (click)="sidenav.toggle()" class="menu-button">
            <mat-icon>menu</mat-icon>
          </button>
          
          <span class="toolbar-spacer"></span>
          
          <button mat-icon-button class="toolbar-button">
            <mat-icon>search</mat-icon>
          </button>
          
          <button mat-icon-button [matMenuTriggerFor]="notificationMenu" class="toolbar-button">
            <mat-icon [matBadge]="unreadNotifications" matBadgeColor="warn" 
                      [matBadgeHidden]="unreadNotifications === 0">
              notifications
            </mat-icon>
          </button>
          
          <mat-menu #notificationMenu="matMenu" class="notification-menu">
            <div class="notification-header">
              <span>Notifications</span>
              <button mat-button color="primary">Mark all read</button>
            </div>
            <mat-divider></mat-divider>
            @for (notification of notifications.slice(0, 4); track notification.id) {
              <button mat-menu-item class="notification-item" [class.unread]="!notification.read">
                <mat-icon [class]="'notification-icon ' + notification.type">
                  {{ getNotificationIcon(notification.type) }}
                </mat-icon>
                <div class="notification-content">
                  <span class="notification-title">{{ notification.title }}</span>
                  <span class="notification-message">{{ notification.message }}</span>
                  <span class="notification-time">{{ getTimeAgo(notification.timestamp) }}</span>
                </div>
              </button>
            }
          </mat-menu>

          <button mat-icon-button [matMenuTriggerFor]="userMenu" class="user-menu-button">
            <img src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=32&h=32&fit=crop" 
                 alt="User" class="toolbar-avatar">
          </button>
          
          <mat-menu #userMenu="matMenu">
            <button mat-menu-item>
              <mat-icon>person</mat-icon>
              <span>My Profile</span>
            </button>
            <button mat-menu-item>
              <mat-icon>settings</mat-icon>
              <span>Settings</span>
            </button>
            <mat-divider></mat-divider>
            <button mat-menu-item>
              <mat-icon>logout</mat-icon>
              <span>Sign Out</span>
            </button>
          </mat-menu>
        </mat-toolbar>

        <div class="page-content">
          <router-outlet></router-outlet>
        </div>
      </mat-sidenav-content>
    </mat-sidenav-container>
  `,
  styles: [`
    .app-container {
      height: 100vh;
    }

    .sidenav {
      width: 260px;
      background: linear-gradient(180deg, #1a365d 0%, #0f172a 100%);
      border-right: none;
    }

    .sidenav-header {
      padding: 20px;
      border-bottom: 1px solid rgba(255,255,255,0.1);
    }

    .logo {
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .logo-icon {
      color: #63b3ed;
      font-size: 32px;
      width: 32px;
      height: 32px;
    }

    .logo-text {
      color: white;
      font-size: 20px;
      font-weight: 600;
      letter-spacing: -0.5px;
    }

    .nav-list {
      padding: 16px 12px;
    }

    .nav-list a {
      border-radius: 8px;
      margin-bottom: 4px;
      color: rgba(255,255,255,0.7);
      transition: all 0.2s ease;
    }

    .nav-list a:hover {
      background: rgba(255,255,255,0.1);
      color: white;
    }

    .nav-list a.active {
      background: rgba(99, 179, 237, 0.2);
      color: #63b3ed;
    }

    .nav-list a.active mat-icon {
      color: #63b3ed;
    }

    .nav-list mat-icon {
      color: rgba(255,255,255,0.6);
      margin-right: 12px;
    }

    .nav-divider {
      margin: 16px 0;
      border-color: rgba(255,255,255,0.1);
    }

    .nav-item-secondary {
      opacity: 0.7;
    }

    .sidenav-footer {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      padding: 16px;
      border-top: 1px solid rgba(255,255,255,0.1);
      background: rgba(0,0,0,0.2);
    }

    .user-info {
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .user-avatar {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      object-fit: cover;
    }

    .user-details {
      display: flex;
      flex-direction: column;
    }

    .user-name {
      color: white;
      font-weight: 500;
      font-size: 14px;
    }

    .user-role {
      color: rgba(255,255,255,0.5);
      font-size: 12px;
    }

    .main-content {
      background: #f8fafc;
    }

    .toolbar {
      background: white;
      color: #1e293b;
      border-bottom: 1px solid #e2e8f0;
      position: sticky;
      top: 0;
      z-index: 100;
    }

    .menu-button {
      margin-right: 8px;
    }

    .toolbar-spacer {
      flex: 1;
    }

    .toolbar-button {
      color: #64748b;
    }

    .toolbar-avatar {
      width: 32px;
      height: 32px;
      border-radius: 50%;
      object-fit: cover;
    }

    .user-menu-button {
      margin-left: 8px;
    }

    .notification-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 12px 16px;
      font-weight: 600;
    }

    .notification-item {
      height: auto !important;
      padding: 12px 16px !important;
      white-space: normal !important;
    }

    .notification-item.unread {
      background: #f0f9ff;
    }

    .notification-icon {
      margin-right: 12px;
    }

    .notification-icon.appointment { color: #3b82f6; }
    .notification-icon.alert { color: #ef4444; }
    .notification-icon.message { color: #10b981; }
    .notification-icon.reminder { color: #f59e0b; }

    .notification-content {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }

    .notification-title {
      font-weight: 500;
      font-size: 14px;
    }

    .notification-message {
      font-size: 12px;
      color: #64748b;
      line-height: 1.4;
    }

    .notification-time {
      font-size: 11px;
      color: #94a3b8;
    }

    .page-content {
      padding: 24px;
      min-height: calc(100vh - 64px);
    }
  `]
})
export class AppComponent implements OnInit {
  notifications: any[] = [];
  unreadNotifications = 0;

  constructor(private mockData: MockDataService) {}

  ngOnInit() {
    this.notifications = this.mockData.getNotifications();
    this.unreadNotifications = this.mockData.getUnreadNotificationCount();
  }

  getNotificationIcon(type: string): string {
    const icons: { [key: string]: string } = {
      'appointment': 'event',
      'alert': 'warning',
      'message': 'mail',
      'reminder': 'alarm'
    };
    return icons[type] || 'notifications';
  }

  getTimeAgo(date: Date): string {
    const now = new Date();
    const diff = now.getTime() - new Date(date).getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) return `${days}d ago`;
    if (hours > 0) return `${hours}h ago`;
    if (minutes > 0) return `${minutes}m ago`;
    return 'Just now';
  }
}
