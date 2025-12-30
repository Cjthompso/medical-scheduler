import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatSortModule, MatSort } from '@angular/material/sort';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialogModule } from '@angular/material/dialog';
import { MockDataService } from '../../services/mock-data.service';
import { Appointment } from '@app/models';
import { MatDivider } from "@angular/material/divider";

@Component({
  selector: 'app-appointments',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatIconModule,
    MatButtonModule,
    MatChipsModule,
    MatMenuModule,
    MatTooltipModule,
    MatDialogModule,
    MatDivider
],
  template: `
    <div class="appointments-page">
      <div class="page-header">
        <div>
          <h1>Appointments</h1>
          <p class="subtitle">Manage and track all appointments</p>
        </div>
        <button mat-raised-button color="primary" class="new-btn">
          <mat-icon>add</mat-icon>
          New Appointment
        </button>
      </div>
      <div class="stats-row">
        <mat-card class="mini-stat">
          <mat-icon class="stat-icon scheduled">event</mat-icon>
          <div class="stat-info">
            <span class="stat-value">{{ getStatusCount('scheduled') }}</span>
            <span class="stat-label">Scheduled</span>
          </div>
        </mat-card>
        <mat-card class="mini-stat">
          <mat-icon class="stat-icon confirmed">check_circle</mat-icon>
          <div class="stat-info">
            <span class="stat-value">{{ getStatusCount('confirmed') }}</span>
            <span class="stat-label">Confirmed</span>
          </div>
        </mat-card>
        <mat-card class="mini-stat">
          <mat-icon class="stat-icon in-progress">play_circle</mat-icon>
          <div class="stat-info">
            <span class="stat-value">{{ getStatusCount('in-progress') }}</span>
            <span class="stat-label">In Progress</span>
          </div>
        </mat-card>
        <mat-card class="mini-stat">
          <mat-icon class="stat-icon completed">task_alt</mat-icon>
          <div class="stat-info">
            <span class="stat-value">{{ getStatusCount('completed') }}</span>
            <span class="stat-label">Completed</span>
          </div>
        </mat-card>
      </div>
      <mat-card class="filters-card">
        <div class="filters">
          <mat-form-field appearance="outline" class="search-field">
            <mat-label>Search appointments</mat-label>
            <input matInput (keyup)="applyFilter($event)" placeholder="Patient name, provider, reason...">
            <mat-icon matSuffix>search</mat-icon>
          </mat-form-field>

          <mat-form-field appearance="outline">
            <mat-label>Status</mat-label>
            <mat-select [(value)]="statusFilter" (selectionChange)="filterByStatus()">
              <mat-option value="all">All Statuses</mat-option>
              <mat-option value="scheduled">Scheduled</mat-option>
              <mat-option value="confirmed">Confirmed</mat-option>
              <mat-option value="checked-in">Checked In</mat-option>
              <mat-option value="in-progress">In Progress</mat-option>
              <mat-option value="completed">Completed</mat-option>
              <mat-option value="cancelled">Cancelled</mat-option>
            </mat-select>
          </mat-form-field>

          <mat-form-field appearance="outline">
            <mat-label>Type</mat-label>
            <mat-select [(value)]="typeFilter" (selectionChange)="filterByType()">
              <mat-option value="all">All Types</mat-option>
              <mat-option value="consultation">Consultation</mat-option>
              <mat-option value="follow-up">Follow-up</mat-option>
              <mat-option value="annual-checkup">Annual Checkup</mat-option>
              <mat-option value="urgent">Urgent</mat-option>
              <mat-option value="procedure">Procedure</mat-option>
              <mat-option value="lab-work">Lab Work</mat-option>
            </mat-select>
          </mat-form-field>
        </div>
      </mat-card>
      <mat-card class="table-card">
        <table mat-table [dataSource]="dataSource" matSort class="appointments-table">
          <ng-container matColumnDef="dateTime">
            <th mat-header-cell *matHeaderCellDef mat-sort-header>Date & Time</th>
            <td mat-cell *matCellDef="let apt">
              <div class="date-cell">
                <span class="date">{{ formatDate(apt.dateTime) }}</span>
                <span class="time">{{ formatTime(apt.dateTime) }}</span>
              </div>
            </td>
          </ng-container>
          <ng-container matColumnDef="patient">
            <th mat-header-cell *matHeaderCellDef mat-sort-header>Patient</th>
            <td mat-cell *matCellDef="let apt">
              <div class="patient-cell">
                <span class="name">{{ apt.patient?.firstName }} {{ apt.patient?.lastName }}</span>
                <span class="email">{{ apt.patient?.email }}</span>
              </div>
            </td>
          </ng-container>
          <ng-container matColumnDef="provider">
            <th mat-header-cell *matHeaderCellDef mat-sort-header>Provider</th>
            <td mat-cell *matCellDef="let apt">
              <div class="provider-cell">
                <img [src]="apt.provider?.avatar" class="avatar" [alt]="apt.provider?.lastName">
                <div>
                  <span class="name">Dr. {{ apt.provider?.lastName }}</span>
                  <span class="specialty">{{ apt.provider?.specialty }}</span>
                </div>
              </div>
            </td>
          </ng-container>
          <ng-container matColumnDef="type">
            <th mat-header-cell *matHeaderCellDef mat-sort-header>Type</th>
            <td mat-cell *matCellDef="let apt">
              <span class="type-badge">{{ formatType(apt.type) }}</span>
            </td>
          </ng-container>
          <ng-container matColumnDef="status">
            <th mat-header-cell *matHeaderCellDef mat-sort-header>Status</th>
            <td mat-cell *matCellDef="let apt">
              <mat-chip [class]="'status-chip ' + apt.status">
                {{ formatStatus(apt.status) }}
              </mat-chip>
            </td>
          </ng-container>
          <ng-container matColumnDef="isVirtual">
            <th mat-header-cell *matHeaderCellDef>Type</th>
            <td mat-cell *matCellDef="let apt">
              @if (apt.isVirtual) {
                <mat-icon class="virtual-icon" matTooltip="Virtual Visit">videocam</mat-icon>
              } @else {
                <mat-icon class="inperson-icon" matTooltip="In-Person">person</mat-icon>
              }
            </td>
          </ng-container>
          <ng-container matColumnDef="actions">
            <th mat-header-cell *matHeaderCellDef>Actions</th>
            <td mat-cell *matCellDef="let apt">
              <button mat-icon-button [matMenuTriggerFor]="actionMenu">
                <mat-icon>more_vert</mat-icon>
              </button>
              <mat-menu #actionMenu="matMenu">
                <button mat-menu-item>
                  <mat-icon>visibility</mat-icon>
                  <span>View Details</span>
                </button>
                <button mat-menu-item>
                  <mat-icon>edit</mat-icon>
                  <span>Edit</span>
                </button>
                @if (apt.isVirtual && apt.status !== 'completed' && apt.status !== 'cancelled') {
                  <button mat-menu-item>
                    <mat-icon>videocam</mat-icon>
                    <span>Start Video Call</span>
                  </button>
                }
                <button mat-menu-item>
                  <mat-icon>check_circle</mat-icon>
                  <span>Mark Complete</span>
                </button>
                <mat-divider></mat-divider>
                <button mat-menu-item class="cancel-action">
                  <mat-icon>cancel</mat-icon>
                  <span>Cancel</span>
                </button>
              </mat-menu>
            </td>
          </ng-container>

          <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
          <tr mat-row *matRowDef="let row; columns: displayedColumns;" class="table-row"></tr>
        </table>

        <mat-paginator [pageSizeOptions]="[10, 25, 50]" showFirstLastButtons></mat-paginator>
      </mat-card>
    </div>
  `,
  styles: [`
    .appointments-page {
      max-width: 1400px;
      margin: 0 auto;
    }

    .page-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: 24px;
    }

    .page-header h1 {
      margin: 0;
      font-size: 28px;
      font-weight: 600;
      color: #1e293b;
    }

    .subtitle {
      color: #64748b;
      margin-top: 4px;
    }

    .new-btn {
      background: linear-gradient(135deg, #1a365d, #2c5282);
    }

    .stats-row {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
      gap: 16px;
      margin-bottom: 24px;
    }

    .mini-stat {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 16px;
      border-radius: 12px;
      border: 1px solid #e2e8f0;
    }

    .stat-icon {
      padding: 10px;
      border-radius: 10px;
      font-size: 24px;
      width: 24px;
      height: 24px;
    }

    .stat-icon.scheduled { background: #dbeafe; color: #1d4ed8; }
    .stat-icon.confirmed { background: #d1fae5; color: #059669; }
    .stat-icon.in-progress { background: #e0e7ff; color: #4338ca; }
    .stat-icon.completed { background: #dcfce7; color: #16a34a; }

    .stat-info {
      display: flex;
      flex-direction: column;
    }

    .stat-value {
      font-size: 24px;
      font-weight: 700;
      color: #1e293b;
    }

    .stat-label {
      font-size: 13px;
      color: #64748b;
    }

    .filters-card {
      padding: 16px;
      margin-bottom: 24px;
      border-radius: 12px;
      border: 1px solid #e2e8f0;
    }

    .filters {
      display: flex;
      gap: 16px;
      flex-wrap: wrap;
    }

    .search-field {
      flex: 1;
      min-width: 250px;
    }

    .table-card {
      border-radius: 12px;
      border: 1px solid #e2e8f0;
      overflow: hidden;
    }

    .appointments-table {
      width: 100%;
    }

    .table-row:hover {
      background: #f8fafc;
    }

    .date-cell {
      display: flex;
      flex-direction: column;
    }

    .date-cell .date {
      font-weight: 500;
      color: #1e293b;
    }

    .date-cell .time {
      font-size: 13px;
      color: #64748b;
    }

    .patient-cell, .provider-cell {
      display: flex;
      flex-direction: column;
    }

    .provider-cell {
      flex-direction: row;
      align-items: center;
      gap: 10px;
    }

    .provider-cell > div {
      display: flex;
      flex-direction: column;
    }

    .avatar {
      width: 36px;
      height: 36px;
      border-radius: 50%;
      object-fit: cover;
    }

    .name {
      font-weight: 500;
      color: #1e293b;
    }

    .email, .specialty {
      font-size: 12px;
      color: #64748b;
    }

    .type-badge {
      font-size: 13px;
      color: #1a365d;
      font-weight: 500;
    }

    .status-chip {
      font-size: 11px;
    }

    .status-chip.scheduled { background: #dbeafe; color: #1d4ed8; }
    .status-chip.confirmed { background: #d1fae5; color: #059669; }
    .status-chip.checked-in { background: #fef3c7; color: #d97706; }
    .status-chip.in-progress { background: #e0e7ff; color: #4338ca; }
    .status-chip.completed { background: #dcfce7; color: #16a34a; }
    .status-chip.cancelled { background: #fee2e2; color: #dc2626; }
    .status-chip.no-show { background: #fef2f2; color: #991b1b; }

    .virtual-icon { color: #3b82f6; }
    .inperson-icon { color: #64748b; }

    .cancel-action {
      color: #dc2626;
    }

    mat-paginator {
      border-top: 1px solid #e2e8f0;
    }
  `]
})
export class AppointmentsComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  displayedColumns = ['dateTime', 'patient', 'provider', 'type', 'status', 'isVirtual', 'actions'];
  dataSource = new MatTableDataSource<Appointment>();
  allAppointments: Appointment[] = [];
  statusFilter = 'all';
  typeFilter = 'all';

  constructor(private mockData: MockDataService) {}

  ngOnInit() {
    this.allAppointments = this.mockData.getAppointments();
    this.dataSource.data = this.allAppointments;
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    
    this.dataSource.filterPredicate = (data: Appointment, filter: string) => {
      const searchStr = filter.toLowerCase();
      return (
        data.patient?.firstName?.toLowerCase().includes(searchStr) ||
        data.patient?.lastName?.toLowerCase().includes(searchStr) ||
        data.provider?.lastName?.toLowerCase().includes(searchStr) ||
        data.reason?.toLowerCase().includes(searchStr) ||
        data.type?.toLowerCase().includes(searchStr)
      ) as boolean;
    };
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  filterByStatus() {
    this.applyFilters();
  }

  filterByType() {
    this.applyFilters();
  }

  applyFilters() {
    let filtered = this.allAppointments;
    
    if (this.statusFilter !== 'all') {
      filtered = filtered.filter(apt => apt.status === this.statusFilter);
    }
    
    if (this.typeFilter !== 'all') {
      filtered = filtered.filter(apt => apt.type === this.typeFilter);
    }
    
    this.dataSource.data = filtered;
  }

  getStatusCount(status: string): number {
    return this.allAppointments.filter(apt => apt.status === status).length;
  }

  formatDate(date: Date): string {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  }

  formatTime(date: Date): string {
    return new Date(date).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  }

  formatType(type: string): string {
    return type.split('-').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  }

  formatStatus(status: string): string {
    return status.split('-').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  }
}
