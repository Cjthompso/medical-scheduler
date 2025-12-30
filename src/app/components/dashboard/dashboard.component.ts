import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatChipsModule } from '@angular/material/chips';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MockDataService } from '../../services/mock-data.service';
import { DashboardStats, Appointment } from '@app/models';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatTableModule,
    MatChipsModule,
    MatProgressBarModule
  ],
  template: `
    <div class="dashboard">
      <div class="dashboard-header">
        <div>
          <h1>Dashboard</h1>
          <p class="subtitle">Welcome back, Dr. Foster. Here's what's happening today.</p>
        </div>
        <div class="header-actions">
          <button mat-raised-button color="primary">
            <mat-icon>add</mat-icon>
            New Appointment
          </button>
        </div>
      </div>
      <div class="stats-grid">
        <mat-card class="stat-card">
          <div class="stat-icon appointments">
            <mat-icon>event_note</mat-icon>
          </div>
          <div class="stat-content">
            <span class="stat-value">{{ stats.todayAppointments }}</span>
            <span class="stat-label">Today's Appointments</span>
            <span class="stat-change positive">
              <mat-icon>trending_up</mat-icon>
              12% from yesterday
            </span>
          </div>
        </mat-card>

        <mat-card class="stat-card">
          <div class="stat-icon patients">
            <mat-icon>people</mat-icon>
          </div>
          <div class="stat-content">
            <span class="stat-value">{{ stats.totalPatients }}</span>
            <span class="stat-label">Total Patients</span>
            <span class="stat-change positive">
              <mat-icon>trending_up</mat-icon>
              {{ stats.newPatientsThisMonth }} new this month
            </span>
          </div>
        </mat-card>

        <mat-card class="stat-card">
          <div class="stat-icon pending">
            <mat-icon>schedule</mat-icon>
          </div>
          <div class="stat-content">
            <span class="stat-value">{{ stats.pendingAppointments }}</span>
            <span class="stat-label">Pending Appointments</span>
            <span class="stat-change neutral">
              <mat-icon>remove</mat-icon>
              Awaiting confirmation
            </span>
          </div>
        </mat-card>

        <mat-card class="stat-card">
          <div class="stat-icon satisfaction">
            <mat-icon>star</mat-icon>
          </div>
          <div class="stat-content">
            <span class="stat-value">{{ stats.patientSatisfaction }}</span>
            <span class="stat-label">Patient Satisfaction</span>
            <span class="stat-change positive">
              <mat-icon>trending_up</mat-icon>
              Above average
            </span>
          </div>
        </mat-card>
      </div>

      <div class="charts-grid">
        <mat-card class="chart-card">
          <mat-card-header>
            <mat-card-title>Weekly Appointments</mat-card-title>
            <mat-card-subtitle>Appointments per day this week</mat-card-subtitle>
          </mat-card-header>
          <mat-card-content>
            <canvas #weeklyChart></canvas>
          </mat-card-content>
        </mat-card>

        <mat-card class="chart-card">
          <mat-card-header>
            <mat-card-title>Appointments by Type</mat-card-title>
            <mat-card-subtitle>Distribution of appointment types</mat-card-subtitle>
          </mat-card-header>
          <mat-card-content>
            <canvas #typeChart></canvas>
          </mat-card-content>
        </mat-card>
      </div>

      <div class="bottom-grid">
        <mat-card class="schedule-card">
          <mat-card-header>
            <mat-card-title>Today's Schedule</mat-card-title>
            <button mat-button color="primary" class="view-all-btn">View All</button>
          </mat-card-header>
          <mat-card-content>
            <div class="schedule-list">
              @for (apt of todayAppointments.slice(0, 5); track apt.id) {
                <div class="schedule-item">
                  <div class="schedule-time">
                    <span class="time">{{ formatTime(apt.dateTime) }}</span>
                    <span class="duration">{{ apt.duration }} min</span>
                  </div>
                  <div class="schedule-details">
                    <span class="patient-name">{{ apt.patient?.firstName }} {{ apt.patient?.lastName }}</span>
                    <span class="appointment-type">{{ formatType(apt.type) }}</span>
                  </div>
                  <div class="schedule-provider">
                    <img [src]="apt.provider?.avatar" [alt]="apt.provider?.lastName" class="provider-avatar">
                    <span>Dr. {{ apt.provider?.lastName }}</span>
                  </div>
                  <mat-chip [class]="'status-chip ' + apt.status">
                    {{ formatStatus(apt.status) }}
                  </mat-chip>
                </div>
              }
              @if (todayAppointments.length === 0) {
                <div class="no-appointments">
                  <mat-icon>event_available</mat-icon>
                  <span>No appointments scheduled for today</span>
                </div>
              }
            </div>
          </mat-card-content>
        </mat-card>

        <mat-card class="activity-card">
          <mat-card-header>
            <mat-card-title>Provider Performance</mat-card-title>
            <mat-card-subtitle>This month's statistics</mat-card-subtitle>
          </mat-card-header>
          <mat-card-content>
            <div class="provider-list">
              @for (provider of providers; track provider.id) {
                <div class="provider-item">
                  <img [src]="provider.avatar" [alt]="provider.lastName" class="provider-avatar-lg">
                  <div class="provider-info">
                    <span class="provider-name">Dr. {{ provider.firstName }} {{ provider.lastName }}</span>
                    <span class="provider-specialty">{{ provider.specialty }}</span>
                    <div class="provider-stats">
                      <div class="provider-stat">
                        <mat-icon>event</mat-icon>
                        <span>{{ getProviderAppointments(provider.id) }} appointments</span>
                      </div>
                      <div class="provider-stat">
                        <mat-icon>star</mat-icon>
                        <span>{{ provider.rating }} rating</span>
                      </div>
                    </div>
                  </div>
                </div>
              }
            </div>
          </mat-card-content>
        </mat-card>
      </div>
    </div>
  `,
  styles: [`
    .dashboard {
      max-width: 1400px;
      margin: 0 auto;
    }

    .dashboard-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: 24px;
    }

    .dashboard-header h1 {
      margin: 0;
      font-size: 28px;
      font-weight: 600;
      color: #1e293b;
    }

    .subtitle {
      color: #64748b;
      margin-top: 4px;
    }

    .header-actions button {
      background: linear-gradient(135deg, #1a365d, #2c5282);
    }

    .stats-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
      gap: 20px;
      margin-bottom: 24px;
    }

    .stat-card {
      padding: 20px;
      display: flex;
      align-items: flex-start;
      gap: 16px;
      border-radius: 12px;
      border: 1px solid #e2e8f0;
      box-shadow: 0 1px 3px rgba(0,0,0,0.05);
    }

    .stat-icon {
      width: 48px;
      height: 48px;
      border-radius: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .stat-icon mat-icon {
      color: white;
      font-size: 24px;
      width: 24px;
      height: 24px;
    }

    .stat-icon.appointments { background: linear-gradient(135deg, #3b82f6, #1d4ed8); }
    .stat-icon.patients { background: linear-gradient(135deg, #10b981, #059669); }
    .stat-icon.pending { background: linear-gradient(135deg, #f59e0b, #d97706); }
    .stat-icon.satisfaction { background: linear-gradient(135deg, #8b5cf6, #7c3aed); }

    .stat-content {
      display: flex;
      flex-direction: column;
    }

    .stat-value {
      font-size: 28px;
      font-weight: 700;
      color: #1e293b;
      line-height: 1;
    }

    .stat-label {
      font-size: 14px;
      color: #64748b;
      margin-top: 4px;
    }

    .stat-change {
      display: flex;
      align-items: center;
      gap: 4px;
      font-size: 12px;
      margin-top: 8px;
    }

    .stat-change mat-icon {
      font-size: 14px;
      width: 14px;
      height: 14px;
    }

    .stat-change.positive { color: #10b981; }
    .stat-change.negative { color: #ef4444; }
    .stat-change.neutral { color: #64748b; }

    .charts-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
      gap: 20px;
      margin-bottom: 24px;
    }

    .chart-card {
      border-radius: 12px;
      border: 1px solid #e2e8f0;
    }

    .chart-card mat-card-content {
      padding: 16px;
      height: 250px;
    }

    .bottom-grid {
      display: grid;
      grid-template-columns: 2fr 1fr;
      gap: 20px;
    }

    @media (max-width: 1024px) {
      .bottom-grid {
        grid-template-columns: 1fr;
      }
    }

    .schedule-card, .activity-card {
      border-radius: 12px;
      border: 1px solid #e2e8f0;
    }

    .schedule-card mat-card-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .view-all-btn {
      margin-right: -8px;
    }

    .schedule-list {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }

    .schedule-item {
      display: grid;
      grid-template-columns: 80px 1fr 140px auto;
      align-items: center;
      gap: 16px;
      padding: 12px;
      background: #f8fafc;
      border-radius: 8px;
      transition: all 0.2s ease;
    }

    .schedule-item:hover {
      background: #f1f5f9;
    }

    .schedule-time {
      display: flex;
      flex-direction: column;
    }

    .schedule-time .time {
      font-weight: 600;
      color: #1e293b;
    }

    .schedule-time .duration {
      font-size: 12px;
      color: #64748b;
    }

    .schedule-details {
      display: flex;
      flex-direction: column;
    }

    .patient-name {
      font-weight: 500;
      color: #1e293b;
    }

    .appointment-type {
      font-size: 13px;
      color: #64748b;
    }

    .schedule-provider {
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 13px;
      color: #64748b;
    }

    .provider-avatar {
      width: 28px;
      height: 28px;
      border-radius: 50%;
      object-fit: cover;
    }

    .status-chip {
      font-size: 11px;
      padding: 4px 8px;
      height: auto;
      min-height: unset;
    }

    .status-chip.scheduled { background: #dbeafe; color: #1d4ed8; }
    .status-chip.confirmed { background: #d1fae5; color: #059669; }
    .status-chip.checked-in { background: #fef3c7; color: #d97706; }
    .status-chip.in-progress { background: #e0e7ff; color: #4338ca; }
    .status-chip.completed { background: #d1fae5; color: #059669; }
    .status-chip.cancelled { background: #fee2e2; color: #dc2626; }

    .no-appointments {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 40px;
      color: #94a3b8;
    }

    .no-appointments mat-icon {
      font-size: 48px;
      width: 48px;
      height: 48px;
      margin-bottom: 12px;
    }

    .provider-list {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }

    .provider-item {
      display: flex;
      gap: 12px;
      padding: 12px;
      background: #f8fafc;
      border-radius: 8px;
    }

    .provider-avatar-lg {
      width: 48px;
      height: 48px;
      border-radius: 50%;
      object-fit: cover;
    }

    .provider-info {
      display: flex;
      flex-direction: column;
      flex: 1;
    }

    .provider-name {
      font-weight: 600;
      color: #1e293b;
    }

    .provider-specialty {
      font-size: 13px;
      color: #64748b;
    }

    .provider-stats {
      display: flex;
      gap: 16px;
      margin-top: 8px;
    }

    .provider-stat {
      display: flex;
      align-items: center;
      gap: 4px;
      font-size: 12px;
      color: #64748b;
    }

    .provider-stat mat-icon {
      font-size: 14px;
      width: 14px;
      height: 14px;
    }
  `]
})
export class DashboardComponent implements OnInit, AfterViewInit {
  @ViewChild('weeklyChart') weeklyChartRef!: ElementRef<HTMLCanvasElement>;
  @ViewChild('typeChart') typeChartRef!: ElementRef<HTMLCanvasElement>;

  stats!: DashboardStats;
  todayAppointments: Appointment[] = [];
  providers: any[] = [];

  constructor(private mockData: MockDataService) {}

  ngOnInit() {
    this.stats = this.mockData.getDashboardStats();
    this.todayAppointments = this.mockData.getTodayAppointments();
    this.providers = this.mockData.getProviders();
  }

  ngAfterViewInit() {
    this.createWeeklyChart();
    this.createTypeChart();
  }

  createWeeklyChart() {
    const ctx = this.weeklyChartRef.nativeElement.getContext('2d');
    if (!ctx) return;

    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: this.stats.weeklyAppointments.map(d => d.day),
        datasets: [{
          label: 'Appointments',
          data: this.stats.weeklyAppointments.map(d => d.count),
          backgroundColor: 'rgba(26, 54, 93, 0.8)',
          borderRadius: 6,
          borderSkipped: false
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false }
        },
        scales: {
          y: {
            beginAtZero: true,
            grid: { color: '#e2e8f0' }
          },
          x: {
            grid: { display: false }
          }
        }
      }
    });
  }

  createTypeChart() {
    const ctx = this.typeChartRef.nativeElement.getContext('2d');
    if (!ctx) return;

    const colors = ['#1a365d', '#2c5282', '#3182ce', '#63b3ed', '#90cdf4', '#bee3f8'];

    new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: this.stats.appointmentsByType.map(d => this.formatType(d.type)),
        datasets: [{
          data: this.stats.appointmentsByType.map(d => d.count),
          backgroundColor: colors,
          borderWidth: 0
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'right',
            labels: {
              boxWidth: 12,
              padding: 12
            }
          }
        }
      }
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

  getProviderAppointments(providerId: string): number {
    return this.mockData.getAppointmentsByProvider(providerId).length;
  }
}
