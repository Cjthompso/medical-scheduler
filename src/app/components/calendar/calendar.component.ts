import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatChipsModule } from '@angular/material/chips';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MockDataService } from '../../services/mock-data.service';
import { Appointment, Provider } from '@app/models';

interface CalendarDay {
  date: Date;
  isCurrentMonth: boolean;
  isToday: boolean;
  appointments: Appointment[];
}

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatSelectModule,
    MatFormFieldModule,
    MatChipsModule,
    MatTooltipModule
  ],
  template: `
    <div class="calendar-page">
      <div class="calendar-header">
        <div class="header-left">
          <h1>Calendar</h1>
          <p class="subtitle">Manage appointments and schedules</p>
        </div>
        <div class="header-right">
          <mat-form-field appearance="outline" class="provider-select">
            <mat-label>Filter by Provider</mat-label>
            <mat-select [(value)]="selectedProvider" (selectionChange)="filterByProvider()">
              <mat-option value="all">All Providers</mat-option>
              @for (provider of providers; track provider.id) {
                <mat-option [value]="provider.id">Dr. {{ provider.lastName }}</mat-option>
              }
            </mat-select>
          </mat-form-field>
          <button mat-raised-button color="primary" class="new-apt-btn">
            <mat-icon>add</mat-icon>
            New Appointment
          </button>
        </div>
      </div>

      <mat-card class="calendar-card">
        <div class="calendar-nav">
          <button mat-icon-button (click)="previousMonth()">
            <mat-icon>chevron_left</mat-icon>
          </button>
          <h2 class="month-year">{{ currentMonthYear }}</h2>
          <button mat-icon-button (click)="nextMonth()">
            <mat-icon>chevron_right</mat-icon>
          </button>
          <button mat-stroked-button class="today-btn" (click)="goToToday()">Today</button>
        </div>
        <div class="calendar-grid">
          <div class="weekday-header">
            @for (day of weekdays; track day) {
              <div class="weekday">{{ day }}</div>
            }
          </div>
          <div class="days-grid">
            @for (day of calendarDays; track day.date.toISOString()) {
              <div class="calendar-day" 
                   [class.other-month]="!day.isCurrentMonth"
                   [class.today]="day.isToday"
                   [class.has-appointments]="day.appointments.length > 0"
                   (click)="selectDate(day.date)">
                <span class="day-number">{{ day.date.getDate() }}</span>
                
                @if (day.appointments.length > 0) {
                  <div class="day-appointments">
                    @for (apt of day.appointments.slice(0, 3); track apt.id) {
                      <div class="mini-appointment" 
                           [class]="'status-' + apt.status"
                           [matTooltip]="apt.patient?.firstName + ' ' + apt.patient?.lastName + ' - ' + formatTime(apt.dateTime)">
                        <span class="apt-time">{{ formatTimeShort(apt.dateTime) }}</span>
                        <span class="apt-name">{{ apt.patient?.lastName }}</span>
                      </div>
                    }
                    @if (day.appointments.length > 3) {
                      <div class="more-appointments">
                        +{{ day.appointments.length - 3 }} more
                      </div>
                    }
                  </div>
                }
              </div>
            }
          </div>
        </div>
      </mat-card>
      @if (selectedDate) {
        <mat-card class="day-details-card">
          <mat-card-header>
            <mat-card-title>{{ formatSelectedDate() }}</mat-card-title>
            <mat-card-subtitle>{{ selectedDayAppointments.length }} appointments</mat-card-subtitle>
          </mat-card-header>
          <mat-card-content>
            @if (selectedDayAppointments.length > 0) {
              <div class="appointments-list">
                @for (apt of selectedDayAppointments; track apt.id) {
                  <div class="appointment-item">
                    <div class="apt-time-block">
                      <span class="apt-start">{{ formatTime(apt.dateTime) }}</span>
                      <span class="apt-end">{{ formatTime(apt.endTime) }}</span>
                    </div>
                    <div class="apt-details">
                      <div class="apt-header">
                        <span class="apt-patient">{{ apt.patient?.firstName }} {{ apt.patient?.lastName }}</span>
                        <mat-chip [class]="'status-chip ' + apt.status" size="small">
                          {{ formatStatus(apt.status) }}
                        </mat-chip>
                      </div>
                      <span class="apt-type">{{ formatType(apt.type) }}</span>
                      <span class="apt-reason">{{ apt.reason }}</span>
                      <div class="apt-provider">
                        <img [src]="apt.provider?.avatar" class="provider-avatar" [alt]="apt.provider?.lastName">
                        <span>Dr. {{ apt.provider?.firstName }} {{ apt.provider?.lastName }}</span>
                      </div>
                    </div>
                    <div class="apt-actions">
                      @if (apt.isVirtual) {
                        <button mat-icon-button color="primary" matTooltip="Join Video Call">
                          <mat-icon>videocam</mat-icon>
                        </button>
                      }
                      <button mat-icon-button matTooltip="Edit">
                        <mat-icon>edit</mat-icon>
                      </button>
                      <button mat-icon-button matTooltip="More Options">
                        <mat-icon>more_vert</mat-icon>
                      </button>
                    </div>
                  </div>
                }
              </div>
            } @else {
              <div class="no-appointments">
                <mat-icon>event_available</mat-icon>
                <span>No appointments on this day</span>
                <button mat-stroked-button color="primary">
                  <mat-icon>add</mat-icon>
                  Schedule Appointment
                </button>
              </div>
            }
          </mat-card-content>
        </mat-card>
      }
    </div>
  `,
  styles: [`
    .calendar-page {
      max-width: 1400px;
      margin: 0 auto;
    }

    .calendar-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: 24px;
      flex-wrap: wrap;
      gap: 16px;
    }

    .calendar-header h1 {
      margin: 0;
      font-size: 28px;
      font-weight: 600;
      color: #1e293b;
    }

    .subtitle {
      color: #64748b;
      margin-top: 4px;
    }

    .header-right {
      display: flex;
      gap: 12px;
      align-items: center;
    }

    .provider-select {
      width: 200px;
    }

    .new-apt-btn {
      background: linear-gradient(135deg, #1a365d, #2c5282);
    }

    .calendar-card {
      border-radius: 12px;
      border: 1px solid #e2e8f0;
      margin-bottom: 24px;
    }

    .calendar-nav {
      display: flex;
      align-items: center;
      padding: 16px 20px;
      border-bottom: 1px solid #e2e8f0;
      gap: 8px;
    }

    .month-year {
      font-size: 20px;
      font-weight: 600;
      color: #1e293b;
      min-width: 200px;
      text-align: center;
    }

    .today-btn {
      margin-left: auto;
    }

    .calendar-grid {
      padding: 16px;
    }

    .weekday-header {
      display: grid;
      grid-template-columns: repeat(7, 1fr);
      gap: 4px;
      margin-bottom: 8px;
    }

    .weekday {
      text-align: center;
      font-weight: 600;
      color: #64748b;
      font-size: 13px;
      padding: 8px;
    }

    .days-grid {
      display: grid;
      grid-template-columns: repeat(7, 1fr);
      gap: 4px;
    }

    .calendar-day {
      min-height: 100px;
      padding: 8px;
      border: 1px solid #e2e8f0;
      border-radius: 8px;
      cursor: pointer;
      transition: all 0.2s ease;
      background: white;
    }

    .calendar-day:hover {
      border-color: #3182ce;
      box-shadow: 0 2px 8px rgba(49, 130, 206, 0.15);
    }

    .calendar-day.other-month {
      background: #f8fafc;
      opacity: 0.6;
    }

    .calendar-day.today {
      border-color: #1a365d;
      background: #f0f9ff;
    }

    .calendar-day.today .day-number {
      background: #1a365d;
      color: white;
      border-radius: 50%;
      width: 28px;
      height: 28px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .day-number {
      font-weight: 600;
      color: #1e293b;
      font-size: 14px;
      margin-bottom: 4px;
    }

    .day-appointments {
      display: flex;
      flex-direction: column;
      gap: 2px;
    }

    .mini-appointment {
      font-size: 11px;
      padding: 2px 6px;
      border-radius: 4px;
      display: flex;
      gap: 4px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .mini-appointment.status-scheduled { background: #dbeafe; color: #1d4ed8; }
    .mini-appointment.status-confirmed { background: #d1fae5; color: #059669; }
    .mini-appointment.status-checked-in { background: #fef3c7; color: #d97706; }
    .mini-appointment.status-in-progress { background: #e0e7ff; color: #4338ca; }
    .mini-appointment.status-completed { background: #d1fae5; color: #059669; }
    .mini-appointment.status-cancelled { background: #fee2e2; color: #dc2626; }

    .apt-time {
      font-weight: 600;
    }

    .apt-name {
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .more-appointments {
      font-size: 11px;
      color: #64748b;
      text-align: center;
      padding: 2px;
    }

    .day-details-card {
      border-radius: 12px;
      border: 1px solid #e2e8f0;
    }

    .appointments-list {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }

    .appointment-item {
      display: grid;
      grid-template-columns: 80px 1fr auto;
      gap: 16px;
      padding: 16px;
      background: #f8fafc;
      border-radius: 8px;
      transition: all 0.2s ease;
    }

    .appointment-item:hover {
      background: #f1f5f9;
    }

    .apt-time-block {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 8px;
      background: white;
      border-radius: 8px;
      border: 1px solid #e2e8f0;
    }

    .apt-start {
      font-weight: 600;
      color: #1e293b;
    }

    .apt-end {
      font-size: 12px;
      color: #64748b;
    }

    .apt-details {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }

    .apt-header {
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .apt-patient {
      font-weight: 600;
      color: #1e293b;
      font-size: 16px;
    }

    .status-chip {
      font-size: 11px;
      height: 24px;
    }

    .status-chip.scheduled { background: #dbeafe; color: #1d4ed8; }
    .status-chip.confirmed { background: #d1fae5; color: #059669; }
    .status-chip.checked-in { background: #fef3c7; color: #d97706; }
    .status-chip.in-progress { background: #e0e7ff; color: #4338ca; }

    .apt-type {
      font-size: 13px;
      color: #1a365d;
      font-weight: 500;
    }

    .apt-reason {
      font-size: 13px;
      color: #64748b;
    }

    .apt-provider {
      display: flex;
      align-items: center;
      gap: 8px;
      margin-top: 4px;
      font-size: 13px;
      color: #64748b;
    }

    .provider-avatar {
      width: 24px;
      height: 24px;
      border-radius: 50%;
      object-fit: cover;
    }

    .apt-actions {
      display: flex;
      gap: 4px;
      align-items: flex-start;
    }

    .no-appointments {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 48px;
      color: #94a3b8;
      gap: 12px;
    }

    .no-appointments mat-icon {
      font-size: 48px;
      width: 48px;
      height: 48px;
    }

    @media (max-width: 768px) {
      .calendar-day {
        min-height: 60px;
        padding: 4px;
      }

      .mini-appointment {
        font-size: 10px;
        padding: 1px 4px;
      }

      .apt-name {
        display: none;
      }
    }
  `]
})
export class CalendarComponent implements OnInit {
  weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  calendarDays: CalendarDay[] = [];
  currentDate = new Date();
  selectedDate: Date | null = null;
  selectedDayAppointments: Appointment[] = [];
  providers: Provider[] = [];
  selectedProvider = 'all';
  allAppointments: Appointment[] = [];

  constructor(private mockData: MockDataService) {}

  ngOnInit() {
    this.providers = this.mockData.getProviders();
    this.allAppointments = this.mockData.getAppointments();
    this.generateCalendar();
    this.selectDate(new Date());
  }

  get currentMonthYear(): string {
    return this.currentDate.toLocaleDateString('en-US', { 
      month: 'long', 
      year: 'numeric' 
    });
  }

  generateCalendar() {
    const year = this.currentDate.getFullYear();
    const month = this.currentDate.getMonth();
    
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay());
    
    const endDate = new Date(lastDay);
    endDate.setDate(endDate.getDate() + (6 - lastDay.getDay()));
    
    this.calendarDays = [];
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const currentDate = new Date(startDate);
    while (currentDate <= endDate) {
      const dayDate = new Date(currentDate);
      const appointments = this.getFilteredAppointments(dayDate);
      
      this.calendarDays.push({
        date: dayDate,
        isCurrentMonth: dayDate.getMonth() === month,
        isToday: dayDate.getTime() === today.getTime(),
        appointments: appointments
      });
      
      currentDate.setDate(currentDate.getDate() + 1);
    }
  }

  getFilteredAppointments(date: Date): Appointment[] {
    let appointments = this.mockData.getAppointmentsByDate(date);
    if (this.selectedProvider !== 'all') {
      appointments = appointments.filter(apt => apt.providerId === this.selectedProvider);
    }
    return appointments;
  }

  filterByProvider() {
    this.generateCalendar();
    if (this.selectedDate) {
      this.selectedDayAppointments = this.getFilteredAppointments(this.selectedDate);
    }
  }

  previousMonth() {
    this.currentDate = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() - 1, 1);
    this.generateCalendar();
  }

  nextMonth() {
    this.currentDate = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() + 1, 1);
    this.generateCalendar();
  }

  goToToday() {
    this.currentDate = new Date();
    this.generateCalendar();
    this.selectDate(new Date());
  }

  selectDate(date: Date) {
    this.selectedDate = date;
    this.selectedDayAppointments = this.getFilteredAppointments(date);
  }

  formatSelectedDate(): string {
    if (!this.selectedDate) return '';
    return this.selectedDate.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
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

  formatTimeShort(date: Date): string {
    return new Date(date).toLocaleTimeString('en-US', {
      hour: 'numeric',
      hour12: true
    }).replace(' ', '');
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
