import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatTabsModule } from '@angular/material/tabs';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MockDataService } from '../../services/mock-data.service';
import { Provider } from '@app/models';

@Component({
  selector: 'app-providers',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatChipsModule,
    MatTabsModule,
    MatProgressBarModule
  ],
  template: `
    <div class="providers-page">
      <div class="page-header">
        <div>
          <h1>Providers</h1>
          <p class="subtitle">Medical staff and healthcare providers</p>
        </div>
        <button mat-raised-button color="primary" class="new-btn">
          <mat-icon>person_add</mat-icon>
          Add Provider
        </button>
      </div>

      <div class="providers-grid">
        @for (provider of providers; track provider.id) {
          <mat-card class="provider-card">
            <div class="provider-header">
              <img [src]="provider.avatar" [alt]="provider.lastName" class="provider-avatar">
              <div class="provider-rating">
                <mat-icon>star</mat-icon>
                <span>{{ provider.rating }}</span>
              </div>
            </div>

            <div class="provider-info">
              <h3>Dr. {{ provider.firstName }} {{ provider.lastName }}</h3>
              <span class="provider-title">{{ provider.title }}</span>
              <div class="provider-specialty">
                <mat-chip class="specialty-chip">{{ provider.specialty }}</mat-chip>
              </div>
            </div>

            <div class="provider-stats">
              <div class="stat">
                <span class="stat-value">{{ getAppointmentCount(provider.id) }}</span>
                <span class="stat-label">Appointments</span>
              </div>
              <div class="stat">
                <span class="stat-value">{{ provider.reviewCount }}</span>
                <span class="stat-label">Reviews</span>
              </div>
              <div class="stat">
                <span class="stat-value">{{ provider.rating }}/5</span>
                <span class="stat-label">Rating</span>
              </div>
            </div>

            <mat-tab-group class="provider-tabs" animationDuration="200ms">
              <mat-tab label="About">
                <div class="tab-content">
                  <p class="bio">{{ provider.bio }}</p>
                  
                  <div class="contact-info">
                    <div class="contact-row">
                      <mat-icon>email</mat-icon>
                      <span>{{ provider.email }}</span>
                    </div>
                    <div class="contact-row">
                      <mat-icon>phone</mat-icon>
                      <span>{{ provider.phone }}</span>
                    </div>
                    <div class="contact-row">
                      <mat-icon>business</mat-icon>
                      <span>{{ provider.department }}</span>
                    </div>
                  </div>
                </div>
              </mat-tab>

              <mat-tab label="Schedule">
                <div class="tab-content">
                  <div class="schedule-list">
                    @for (slot of provider.availability; track slot.dayOfWeek) {
                      <div class="schedule-row">
                        <span class="day-name">{{ getDayName(slot.dayOfWeek) }}</span>
                        <span class="time-range">{{ slot.startTime }} - {{ slot.endTime }}</span>
                      </div>
                    }
                  </div>
                </div>
              </mat-tab>

              <mat-tab label="Credentials">
                <div class="tab-content">
                  @if (provider.education) {
                    <div class="credentials-section">
                      <h4>Education</h4>
                      <ul>
                        @for (edu of provider.education; track edu) {
                          <li>{{ edu }}</li>
                        }
                      </ul>
                    </div>
                  }
                  @if (provider.certifications) {
                    <div class="credentials-section">
                      <h4>Certifications</h4>
                      <ul>
                        @for (cert of provider.certifications; track cert) {
                          <li>{{ cert }}</li>
                        }
                      </ul>
                    </div>
                  }
                </div>
              </mat-tab>
            </mat-tab-group>

            <div class="provider-actions">
              <button mat-stroked-button color="primary">
                <mat-icon>event</mat-icon>
                Book Appointment
              </button>
              <button mat-stroked-button>
                <mat-icon>message</mat-icon>
                Message
              </button>
            </div>
          </mat-card>
        }
      </div>
    </div>
  `,
  styles: [`
    .providers-page {
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

    .providers-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(380px, 1fr));
      gap: 24px;
    }

    .provider-card {
      border-radius: 16px;
      border: 1px solid #e2e8f0;
      overflow: hidden;
      transition: all 0.2s ease;
    }

    .provider-card:hover {
      box-shadow: 0 8px 24px rgba(0,0,0,0.1);
      transform: translateY(-2px);
    }

    .provider-header {
      position: relative;
      height: 120px;
      background: linear-gradient(135deg, #1a365d, #2c5282);
      display: flex;
      justify-content: center;
    }

    .provider-avatar {
      width: 100px;
      height: 100px;
      border-radius: 50%;
      object-fit: cover;
      border: 4px solid white;
      position: absolute;
      bottom: -50px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    }

    .provider-rating {
      position: absolute;
      top: 12px;
      right: 12px;
      display: flex;
      align-items: center;
      gap: 4px;
      background: rgba(255,255,255,0.2);
      backdrop-filter: blur(10px);
      padding: 6px 10px;
      border-radius: 20px;
      color: white;
    }

    .provider-rating mat-icon {
      font-size: 16px;
      width: 16px;
      height: 16px;
      color: #fbbf24;
    }

    .provider-info {
      text-align: center;
      padding: 60px 20px 20px;
    }

    .provider-info h3 {
      margin: 0;
      font-size: 20px;
      font-weight: 600;
      color: #1e293b;
    }

    .provider-title {
      font-size: 14px;
      color: #64748b;
    }

    .provider-specialty {
      margin-top: 12px;
    }

    .specialty-chip {
      background: #dbeafe !important;
      color: #1d4ed8 !important;
    }

    .provider-stats {
      display: flex;
      justify-content: center;
      gap: 32px;
      padding: 16px;
      border-top: 1px solid #e2e8f0;
      border-bottom: 1px solid #e2e8f0;
    }

    .stat {
      text-align: center;
    }

    .stat-value {
      display: block;
      font-size: 20px;
      font-weight: 700;
      color: #1e293b;
    }

    .stat-label {
      font-size: 12px;
      color: #64748b;
    }

    .provider-tabs {
      padding: 0 16px;
    }

    .tab-content {
      padding: 16px 0;
      min-height: 150px;
    }

    .bio {
      color: #64748b;
      font-size: 14px;
      line-height: 1.6;
      margin-bottom: 16px;
    }

    .contact-info {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .contact-row {
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 14px;
      color: #64748b;
    }

    .contact-row mat-icon {
      font-size: 18px;
      width: 18px;
      height: 18px;
      color: #94a3b8;
    }

    .schedule-list {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .schedule-row {
      display: flex;
      justify-content: space-between;
      padding: 8px 12px;
      background: #f8fafc;
      border-radius: 6px;
    }

    .day-name {
      font-weight: 500;
      color: #1e293b;
    }

    .time-range {
      color: #64748b;
    }

    .credentials-section {
      margin-bottom: 16px;
    }

    .credentials-section h4 {
      font-size: 14px;
      font-weight: 600;
      color: #1e293b;
      margin: 0 0 8px 0;
    }

    .credentials-section ul {
      margin: 0;
      padding-left: 20px;
      color: #64748b;
      font-size: 14px;
    }

    .credentials-section li {
      margin-bottom: 4px;
    }

    .provider-actions {
      display: flex;
      gap: 8px;
      padding: 16px;
    }

    .provider-actions button {
      flex: 1;
    }
  `]
})
export class ProvidersComponent implements OnInit {
  providers: Provider[] = [];

  constructor(private mockData: MockDataService) {}

  ngOnInit() {
    this.providers = this.mockData.getProviders();
  }

  getAppointmentCount(providerId: string): number {
    return this.mockData.getAppointmentsByProvider(providerId).length;
  }

  getDayName(dayOfWeek: number): string {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return days[dayOfWeek];
  }
}
