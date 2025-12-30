import { Injectable } from '@angular/core';
import { 
  Patient, Provider, Appointment, Notification, DashboardStats,
  AppointmentType, AppointmentStatus 
} from '@app/models';

@Injectable({
  providedIn: 'root'
})
export class MockDataService {
  
  private patients: Patient[] = [
    {
      id: 'p1',
      firstName: 'Sarah',
      lastName: 'Johnson',
      email: 'sarah.johnson@email.com',
      phone: '(312) 555-0101',
      dateOfBirth: new Date('1985-03-15'),
      gender: 'female',
      address: { street: '123 Oak Street', city: 'Chicago', state: 'IL', zipCode: '60601' },
      insuranceProvider: 'Blue Cross Blue Shield',
      insuranceId: 'BCBS-12345',
      medicalHistory: ['Hypertension', 'Type 2 Diabetes'],
      allergies: ['Penicillin'],
      createdAt: new Date('2023-01-15'),
      updatedAt: new Date('2024-06-01')
    },
    {
      id: 'p2',
      firstName: 'Michael',
      lastName: 'Chen',
      email: 'michael.chen@email.com',
      phone: '(312) 555-0102',
      dateOfBirth: new Date('1978-07-22'),
      gender: 'male',
      address: { street: '456 Maple Ave', city: 'Chicago', state: 'IL', zipCode: '60602' },
      insuranceProvider: 'Aetna',
      insuranceId: 'AET-67890',
      medicalHistory: ['Asthma'],
      allergies: [],
      createdAt: new Date('2023-03-20'),
      updatedAt: new Date('2024-05-15')
    },
    {
      id: 'p3',
      firstName: 'Emily',
      lastName: 'Rodriguez',
      email: 'emily.rodriguez@email.com',
      phone: '(312) 555-0103',
      dateOfBirth: new Date('1992-11-08'),
      gender: 'female',
      address: { street: '789 Pine Lane', city: 'Chicago', state: 'IL', zipCode: '60603' },
      insuranceProvider: 'United Healthcare',
      insuranceId: 'UHC-11111',
      medicalHistory: [],
      allergies: ['Latex', 'Sulfa drugs'],
      createdAt: new Date('2023-06-10'),
      updatedAt: new Date('2024-04-20')
    },
    {
      id: 'p4',
      firstName: 'James',
      lastName: 'Williams',
      email: 'james.williams@email.com',
      phone: '(312) 555-0104',
      dateOfBirth: new Date('1965-02-28'),
      gender: 'male',
      address: { street: '321 Elm Court', city: 'Chicago', state: 'IL', zipCode: '60604' },
      insuranceProvider: 'Medicare',
      insuranceId: 'MED-22222',
      medicalHistory: ['Heart Disease', 'High Cholesterol', 'Arthritis'],
      allergies: ['Aspirin'],
      createdAt: new Date('2022-09-05'),
      updatedAt: new Date('2024-06-10')
    },
    {
      id: 'p5',
      firstName: 'Lisa',
      lastName: 'Thompson',
      email: 'lisa.thompson@email.com',
      phone: '(312) 555-0105',
      dateOfBirth: new Date('1988-09-14'),
      gender: 'female',
      address: { street: '654 Birch Blvd', city: 'Chicago', state: 'IL', zipCode: '60605' },
      insuranceProvider: 'Cigna',
      insuranceId: 'CIG-33333',
      medicalHistory: ['Anxiety', 'Migraines'],
      allergies: [],
      createdAt: new Date('2024-01-08'),
      updatedAt: new Date('2024-06-01')
    },
    {
      id: 'p6',
      firstName: 'David',
      lastName: 'Martinez',
      email: 'david.martinez@email.com',
      phone: '(312) 555-0106',
      dateOfBirth: new Date('1975-12-03'),
      gender: 'male',
      address: { street: '987 Cedar Way', city: 'Chicago', state: 'IL', zipCode: '60606' },
      insuranceProvider: 'Humana',
      insuranceId: 'HUM-44444',
      medicalHistory: ['Back Pain', 'Sleep Apnea'],
      allergies: ['Codeine'],
      createdAt: new Date('2023-08-22'),
      updatedAt: new Date('2024-05-30')
    }
  ];

  private providers: Provider[] = [
    {
      id: 'dr1',
      firstName: 'Amanda',
      lastName: 'Foster',
      email: 'dr.foster@medclinic.com',
      phone: '(312) 555-1001',
      specialty: 'Internal Medicine',
      department: 'Primary Care',
      title: 'MD, FACP',
      avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&h=150&fit=crop',
      availability: [
        { dayOfWeek: 1, startTime: '09:00', endTime: '17:00' },
        { dayOfWeek: 2, startTime: '09:00', endTime: '17:00' },
        { dayOfWeek: 3, startTime: '09:00', endTime: '13:00' },
        { dayOfWeek: 4, startTime: '09:00', endTime: '17:00' },
        { dayOfWeek: 5, startTime: '09:00', endTime: '15:00' }
      ],
      bio: 'Board-certified internist with 15 years of experience in comprehensive adult care.',
      education: ['Harvard Medical School', 'Johns Hopkins Residency'],
      certifications: ['Board Certified Internal Medicine', 'Advanced Cardiac Life Support'],
      rating: 4.9,
      reviewCount: 287
    },
    {
      id: 'dr2',
      firstName: 'Robert',
      lastName: 'Kim',
      email: 'dr.kim@medclinic.com',
      phone: '(312) 555-1002',
      specialty: 'Cardiology',
      department: 'Cardiovascular',
      title: 'MD, FACC',
      avatar: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=150&h=150&fit=crop',
      availability: [
        { dayOfWeek: 1, startTime: '08:00', endTime: '16:00' },
        { dayOfWeek: 2, startTime: '08:00', endTime: '16:00' },
        { dayOfWeek: 4, startTime: '08:00', endTime: '16:00' },
        { dayOfWeek: 5, startTime: '08:00', endTime: '12:00' }
      ],
      bio: 'Specialist in preventive cardiology and heart failure management.',
      education: ['Stanford Medical School', 'Cleveland Clinic Fellowship'],
      certifications: ['Board Certified Cardiology', 'Nuclear Cardiology'],
      rating: 4.8,
      reviewCount: 195
    },
    {
      id: 'dr3',
      firstName: 'Jennifer',
      lastName: 'Patel',
      email: 'dr.patel@medclinic.com',
      phone: '(312) 555-1003',
      specialty: 'Dermatology',
      department: 'Dermatology',
      title: 'MD, FAAD',
      avatar: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=150&h=150&fit=crop',
      availability: [
        { dayOfWeek: 1, startTime: '10:00', endTime: '18:00' },
        { dayOfWeek: 2, startTime: '10:00', endTime: '18:00' },
        { dayOfWeek: 3, startTime: '10:00', endTime: '18:00' },
        { dayOfWeek: 5, startTime: '10:00', endTime: '16:00' }
      ],
      bio: 'Expert in medical and cosmetic dermatology with focus on skin cancer prevention.',
      education: ['Yale School of Medicine', 'NYU Dermatology Residency'],
      certifications: ['Board Certified Dermatology', 'Mohs Surgery'],
      rating: 4.9,
      reviewCount: 342
    },
    {
      id: 'dr4',
      firstName: 'Marcus',
      lastName: 'Johnson',
      email: 'dr.johnson@medclinic.com',
      phone: '(312) 555-1004',
      specialty: 'Orthopedics',
      department: 'Orthopedic Surgery',
      title: 'MD, FAAOS',
      avatar: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=150&h=150&fit=crop',
      availability: [
        { dayOfWeek: 1, startTime: '07:00', endTime: '15:00' },
        { dayOfWeek: 3, startTime: '07:00', endTime: '15:00' },
        { dayOfWeek: 4, startTime: '07:00', endTime: '15:00' },
        { dayOfWeek: 5, startTime: '07:00', endTime: '12:00' }
      ],
      bio: 'Sports medicine specialist with expertise in minimally invasive joint surgery.',
      education: ['Duke University School of Medicine', 'Hospital for Special Surgery Fellowship'],
      certifications: ['Board Certified Orthopedic Surgery', 'Sports Medicine'],
      rating: 4.7,
      reviewCount: 156
    }
  ];

  private appointments: Appointment[] = this.generateAppointments();

  private notifications: Notification[] = [
    {
      id: 'n1',
      type: 'appointment',
      title: 'Upcoming Appointment',
      message: 'Reminder: Sarah Johnson has an appointment tomorrow at 10:00 AM',
      timestamp: new Date(Date.now() - 1000 * 60 * 30),
      read: false,
      actionUrl: '/appointments'
    },
    {
      id: 'n2',
      type: 'alert',
      title: 'Schedule Conflict',
      message: 'Dr. Foster has a scheduling conflict on Friday at 2:00 PM',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
      read: false,
      actionUrl: '/calendar'
    },
    {
      id: 'n3',
      type: 'message',
      title: 'New Patient Message',
      message: 'Michael Chen sent a message regarding his prescription',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5),
      read: true
    },
    {
      id: 'n4',
      type: 'reminder',
      title: 'Lab Results Ready',
      message: 'Lab results for Emily Rodriguez are ready for review',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24),
      read: true,
      actionUrl: '/patients/p3'
    }
  ];

  private generateAppointments(): Appointment[] {
    const appointments: Appointment[] = [];
    const types: AppointmentType[] = ['consultation', 'follow-up', 'annual-checkup', 'urgent', 'procedure', 'lab-work'];
    const statuses: AppointmentStatus[] = ['scheduled', 'confirmed', 'completed', 'cancelled'];
    
    const today = new Date();
    
    for (let dayOffset = -7; dayOffset <= 14; dayOffset++) {
      const date = new Date(today);
      date.setDate(date.getDate() + dayOffset);
      
      if (date.getDay() === 0 || date.getDay() === 6) continue;
      const numAppointments = Math.floor(Math.random() * 5) + 4;
      
      for (let i = 0; i < numAppointments; i++) {
        const hour = 8 + Math.floor(Math.random() * 9); // 8 AM to 5 PM
        const minute = Math.random() > 0.5 ? 0 : 30;
        
        const appointmentDate = new Date(date);
        appointmentDate.setHours(hour, minute, 0, 0);
        
        const duration = [30, 45, 60][Math.floor(Math.random() * 3)];
        const endTime = new Date(appointmentDate.getTime() + duration * 60000);
        
        const patientIndex = Math.floor(Math.random() * this.patients.length);
        const providerIndex = Math.floor(Math.random() * this.providers.length);
        
        let status: AppointmentStatus;
        if (dayOffset < 0) {
          status = Math.random() > 0.1 ? 'completed' : 'no-show';
        } else if (dayOffset === 0) {
          status = ['scheduled', 'confirmed', 'checked-in', 'in-progress'][Math.floor(Math.random() * 4)] as AppointmentStatus;
        } else {
          status = Math.random() > 0.8 ? 'confirmed' : 'scheduled';
        }
        
        appointments.push({
          id: `apt-${dayOffset}-${i}`,
          patientId: this.patients[patientIndex].id,
          providerId: this.providers[providerIndex].id,
          patient: this.patients[patientIndex],
          provider: this.providers[providerIndex],
          dateTime: appointmentDate,
          endTime: endTime,
          duration: duration,
          type: types[Math.floor(Math.random() * types.length)],
          status: status,
          reason: this.getRandomReason(),
          isVirtual: Math.random() > 0.7,
          createdAt: new Date(appointmentDate.getTime() - 1000 * 60 * 60 * 24 * 7),
          updatedAt: new Date()
        });
      }
    }
    
    return appointments.sort((a, b) => a.dateTime.getTime() - b.dateTime.getTime());
  }

  private getRandomReason(): string {
    const reasons = [
      'Annual physical examination',
      'Follow-up on blood pressure',
      'Persistent headaches',
      'Skin rash evaluation',
      'Joint pain consultation',
      'Medication review',
      'Post-surgery follow-up',
      'Chest pain evaluation',
      'Fatigue and tiredness',
      'Routine lab work'
    ];
    return reasons[Math.floor(Math.random() * reasons.length)];
  }

  getPatients(): Patient[] {
    return this.patients;
  }

  getPatientById(id: string): Patient | undefined {
    return this.patients.find(p => p.id === id);
  }

  getProviders(): Provider[] {
    return this.providers;
  }

  getProviderById(id: string): Provider | undefined {
    return this.providers.find(p => p.id === id);
  }

  getAppointments(): Appointment[] {
    return this.appointments;
  }

  getAppointmentsByDate(date: Date): Appointment[] {
    return this.appointments.filter(apt => {
      const aptDate = new Date(apt.dateTime);
      return aptDate.toDateString() === date.toDateString();
    });
  }

  getAppointmentsByProvider(providerId: string): Appointment[] {
    return this.appointments.filter(apt => apt.providerId === providerId);
  }

  getAppointmentsByPatient(patientId: string): Appointment[] {
    return this.appointments.filter(apt => apt.patientId === patientId);
  }

  getTodayAppointments(): Appointment[] {
    return this.getAppointmentsByDate(new Date());
  }

  getUpcomingAppointments(limit: number = 5): Appointment[] {
    const now = new Date();
    return this.appointments
      .filter(apt => new Date(apt.dateTime) > now && apt.status !== 'cancelled')
      .slice(0, limit);
  }

  getNotifications(): Notification[] {
    return this.notifications;
  }

  getUnreadNotificationCount(): number {
    return this.notifications.filter(n => !n.read).length;
  }

  getDashboardStats(): DashboardStats {
    const today = new Date();
    const thisMonth = today.getMonth();
    const thisYear = today.getFullYear();

    const todayApts = this.getTodayAppointments();
    const completedApts = this.appointments.filter(a => a.status === 'completed');
    const pendingApts = this.appointments.filter(a => 
      ['scheduled', 'confirmed'].includes(a.status) && new Date(a.dateTime) > today
    );

    const newPatients = this.patients.filter(p => {
      const created = new Date(p.createdAt);
      return created.getMonth() === thisMonth && created.getFullYear() === thisYear;
    });
    const typeCount: { [key: string]: number } = {};
    this.appointments.forEach(apt => {
      typeCount[apt.type] = (typeCount[apt.type] || 0) + 1;
    });
    const appointmentsByType = Object.entries(typeCount).map(([type, count]) => ({ type, count }));
    const statusCount: { [key: string]: number } = {};
    this.appointments.forEach(apt => {
      statusCount[apt.status] = (statusCount[apt.status] || 0) + 1;
    });
    const appointmentsByStatus = Object.entries(statusCount).map(([status, count]) => ({ status, count }));

    const weeklyAppointments = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'].map(day => {
      const count = Math.floor(Math.random() * 15) + 10;
      return { day, count };
    });

    const monthlyRevenue = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'].map(month => ({
      month,
      amount: Math.floor(Math.random() * 50000) + 80000
    }));

    return {
      totalAppointments: this.appointments.length,
      todayAppointments: todayApts.length,
      pendingAppointments: pendingApts.length,
      completedAppointments: completedApts.length,
      totalPatients: this.patients.length,
      newPatientsThisMonth: newPatients.length,
      totalProviders: this.providers.length,
      averageWaitTime: 12,
      patientSatisfaction: 4.7,
      appointmentsByType,
      appointmentsByStatus,
      weeklyAppointments,
      monthlyRevenue
    };
  }
  addAppointment(appointment: Partial<Appointment>): Appointment {
    const newAppointment: Appointment = {
      id: `apt-new-${Date.now()}`,
      patientId: appointment.patientId!,
      providerId: appointment.providerId!,
      patient: this.getPatientById(appointment.patientId!),
      provider: this.getProviderById(appointment.providerId!),
      dateTime: appointment.dateTime!,
      endTime: new Date(appointment.dateTime!.getTime() + (appointment.duration || 30) * 60000),
      duration: appointment.duration || 30,
      type: appointment.type || 'consultation',
      status: 'scheduled',
      reason: appointment.reason || '',
      isVirtual: appointment.isVirtual || false,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    this.appointments.push(newAppointment);
    return newAppointment;
  }

  updateAppointmentStatus(id: string, status: AppointmentStatus): void {
    const apt = this.appointments.find(a => a.id === id);
    if (apt) {
      apt.status = status;
      apt.updatedAt = new Date();
    }
  }

  markNotificationAsRead(id: string): void {
    const notification = this.notifications.find(n => n.id === id);
    if (notification) {
      notification.read = true;
    }
  }
}
