export interface Patient {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: Date;
  gender: 'male' | 'female' | 'other';
  address: Address;
  insuranceProvider?: string;
  insuranceId?: string;
  medicalHistory?: string[];
  allergies?: string[];
  emergencyContact?: EmergencyContact;
  createdAt: Date;
  updatedAt: Date;
}

export interface Address {
  street: string;
  city: string;
  state: string;
  zipCode: string;
}

export interface EmergencyContact {
  name: string;
  relationship: string;
  phone: string;
}

export interface Provider {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  specialty: string;
  department: string;
  title: string;
  avatar?: string;
  availability: AvailabilitySlot[];
  bio?: string;
  education?: string[];
  certifications?: string[];
  rating: number;
  reviewCount: number;
}

export interface AvailabilitySlot {
  dayOfWeek: number; // 0-6 (Sunday-Saturday)
  startTime: string; // HH:mm format
  endTime: string;
}

export interface Appointment {
  id: string;
  patientId: string;
  providerId: string;
  patient?: Patient;
  provider?: Provider;
  dateTime: Date;
  endTime: Date;
  duration: number; // in minutes
  type: AppointmentType;
  status: AppointmentStatus;
  reason: string;
  notes?: string;
  isVirtual: boolean;
  meetingLink?: string;
  createdAt: Date;
  updatedAt: Date;
}

export type AppointmentType = 
  | 'consultation'
  | 'follow-up'
  | 'annual-checkup'
  | 'urgent'
  | 'procedure'
  | 'lab-work'
  | 'imaging';

export type AppointmentStatus = 
  | 'scheduled'
  | 'confirmed'
  | 'checked-in'
  | 'in-progress'
  | 'completed'
  | 'cancelled'
  | 'no-show';

export interface Notification {
  id: string;
  type: 'appointment' | 'reminder' | 'alert' | 'message';
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
  actionUrl?: string;
}

export interface DashboardStats {
  totalAppointments: number;
  todayAppointments: number;
  pendingAppointments: number;
  completedAppointments: number;
  totalPatients: number;
  newPatientsThisMonth: number;
  totalProviders: number;
  averageWaitTime: number;
  patientSatisfaction: number;
  appointmentsByType: { type: string; count: number }[];
  appointmentsByStatus: { status: string; count: number }[];
  weeklyAppointments: { day: string; count: number }[];
  monthlyRevenue: { month: string; amount: number }[];
}

export interface TimeSlot {
  time: string;
  available: boolean;
  appointmentId?: string;
}
