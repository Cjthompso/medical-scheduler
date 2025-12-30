import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatSortModule, MatSort } from '@angular/material/sort';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MockDataService } from '../../services/mock-data.service';
import { Patient } from '@app/models';

@Component({
  selector: 'app-patients',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    MatButtonModule,
    MatChipsModule,
    MatMenuModule,
    MatTooltipModule
  ],
  template: `
    <div class="patients-page">
      <div class="page-header">
        <div>
          <h1>Patients</h1>
          <p class="subtitle">Manage patient records and information</p>
        </div>
        <button mat-raised-button color="primary" class="new-btn">
          <mat-icon>person_add</mat-icon>
          Add Patient
        </button>
      </div>
      <mat-card class="search-card">
        <mat-form-field appearance="outline" class="search-field">
          <mat-label>Search patients</mat-label>
          <input matInput (keyup)="applyFilter($event)" placeholder="Name, email, phone...">
          <mat-icon matSuffix>search</mat-icon>
        </mat-form-field>
      </mat-card>

      <div class="patients-grid">
        @for (patient of filteredPatients; track patient.id) {
          <mat-card class="patient-card">
            <div class="patient-header">
              <div class="patient-avatar">
                {{ patient.firstName.charAt(0) }}{{ patient.lastName.charAt(0) }}
              </div>
              <div class="patient-name">
                <h3>{{ patient.firstName }} {{ patient.lastName }}</h3>
                <span class="patient-id">ID: {{ patient.id }}</span>
              </div>
              <button mat-icon-button [matMenuTriggerFor]="patientMenu">
                <mat-icon>more_vert</mat-icon>
              </button>
              <mat-menu #patientMenu="matMenu">
                <button mat-menu-item>
                  <mat-icon>visibility</mat-icon>
                  <span>View Profile</span>
                </button>
                <button mat-menu-item>
                  <mat-icon>edit</mat-icon>
                  <span>Edit</span>
                </button>
                <button mat-menu-item>
                  <mat-icon>event</mat-icon>
                  <span>Schedule Appointment</span>
                </button>
                <button mat-menu-item>
                  <mat-icon>history</mat-icon>
                  <span>View History</span>
                </button>
              </mat-menu>
            </div>

            <div class="patient-info">
              <div class="info-row">
                <mat-icon>email</mat-icon>
                <span>{{ patient.email }}</span>
              </div>
              <div class="info-row">
                <mat-icon>phone</mat-icon>
                <span>{{ patient.phone }}</span>
              </div>
              <div class="info-row">
                <mat-icon>cake</mat-icon>
                <span>{{ formatDate(patient.dateOfBirth) }} ({{ getAge(patient.dateOfBirth) }} years)</span>
              </div>
              <div class="info-row">
                <mat-icon>location_on</mat-icon>
                <span>{{ patient.address.city }}, {{ patient.address.state }}</span>
              </div>
            </div>

            @if (patient.insuranceProvider) {
              <div class="insurance-info">
                <mat-icon>health_and_safety</mat-icon>
                <div>
                  <span class="insurance-provider">{{ patient.insuranceProvider }}</span>
                  <span class="insurance-id">{{ patient.insuranceId }}</span>
                </div>
              </div>
            }

            @if (patient.allergies && patient.allergies.length > 0) {
              <div class="allergies">
                <span class="allergies-label">Allergies:</span>
                <div class="allergy-chips">
                  @for (allergy of patient.allergies; track allergy) {
                    <mat-chip class="allergy-chip">{{ allergy }}</mat-chip>
                  }
                </div>
              </div>
            }

            @if (patient.medicalHistory && patient.medicalHistory.length > 0) {
              <div class="conditions">
                <span class="conditions-label">Conditions:</span>
                <div class="condition-chips">
                  @for (condition of patient.medicalHistory; track condition) {
                    <mat-chip class="condition-chip">{{ condition }}</mat-chip>
                  }
                </div>
              </div>
            }

            <div class="patient-actions">
              <button mat-stroked-button color="primary">
                <mat-icon>event</mat-icon>
                Schedule
              </button>
              <button mat-stroked-button>
                <mat-icon>folder_open</mat-icon>
                Records
              </button>
            </div>
          </mat-card>
        }
      </div>
    </div>
  `,
  styles: [`
    .patients-page {
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

    .search-card {
      padding: 16px;
      margin-bottom: 24px;
      border-radius: 12px;
      border: 1px solid #e2e8f0;
    }

    .search-field {
      width: 100%;
      max-width: 400px;
    }

    .patients-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
      gap: 20px;
    }

    .patient-card {
      padding: 20px;
      border-radius: 12px;
      border: 1px solid #e2e8f0;
      transition: all 0.2s ease;
    }

    .patient-card:hover {
      box-shadow: 0 4px 12px rgba(0,0,0,0.08);
      border-color: #cbd5e1;
    }

    .patient-header {
      display: flex;
      align-items: center;
      gap: 12px;
      margin-bottom: 16px;
    }

    .patient-avatar {
      width: 48px;
      height: 48px;
      border-radius: 50%;
      background: linear-gradient(135deg, #1a365d, #2c5282);
      color: white;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 600;
      font-size: 16px;
    }

    .patient-name {
      flex: 1;
    }

    .patient-name h3 {
      margin: 0;
      font-size: 18px;
      font-weight: 600;
      color: #1e293b;
    }

    .patient-id {
      font-size: 12px;
      color: #64748b;
    }

    .patient-info {
      display: flex;
      flex-direction: column;
      gap: 8px;
      margin-bottom: 16px;
    }

    .info-row {
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 14px;
      color: #64748b;
    }

    .info-row mat-icon {
      font-size: 18px;
      width: 18px;
      height: 18px;
      color: #94a3b8;
    }

    .insurance-info {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 12px;
      background: #f0fdf4;
      border-radius: 8px;
      margin-bottom: 16px;
    }

    .insurance-info mat-icon {
      color: #16a34a;
    }

    .insurance-info div {
      display: flex;
      flex-direction: column;
    }

    .insurance-provider {
      font-weight: 500;
      color: #166534;
      font-size: 14px;
    }

    .insurance-id {
      font-size: 12px;
      color: #4ade80;
    }

    .allergies, .conditions {
      margin-bottom: 12px;
    }

    .allergies-label, .conditions-label {
      font-size: 12px;
      font-weight: 600;
      color: #64748b;
      display: block;
      margin-bottom: 6px;
    }

    .allergy-chips, .condition-chips {
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
    }

    .allergy-chip {
      background: #fee2e2 !important;
      color: #dc2626 !important;
      font-size: 12px;
    }

    .condition-chip {
      background: #fef3c7 !important;
      color: #d97706 !important;
      font-size: 12px;
    }

    .patient-actions {
      display: flex;
      gap: 8px;
      margin-top: 16px;
      padding-top: 16px;
      border-top: 1px solid #e2e8f0;
    }

    .patient-actions button {
      flex: 1;
    }
  `]
})
export class PatientsComponent implements OnInit {
  patients: Patient[] = [];
  filteredPatients: Patient[] = [];

  constructor(private mockData: MockDataService) {}

  ngOnInit() {
    this.patients = this.mockData.getPatients();
    this.filteredPatients = this.patients;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.toLowerCase();
    this.filteredPatients = this.patients.filter(patient =>
      patient.firstName.toLowerCase().includes(filterValue) ||
      patient.lastName.toLowerCase().includes(filterValue) ||
      patient.email.toLowerCase().includes(filterValue) ||
      patient.phone.includes(filterValue)
    );
  }

  formatDate(date: Date): string {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  }

  getAge(dateOfBirth: Date): number {
    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  }
}
