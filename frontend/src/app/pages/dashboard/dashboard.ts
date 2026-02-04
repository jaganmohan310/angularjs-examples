import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {
  patients = [
    { id: 'PID-8821', name: 'Rahul Sharma', ward: 'General Ward', doctor: 'Dr. Sarah Johnson', date: '01/02/2026' },
    { id: 'PID-8825', name: 'Priya Verma', ward: 'ICU', doctor: 'Dr. Michael Chen', date: '03/02/2026' },
    { id: 'PID-8829', name: 'Amit Kumar', ward: 'Private', doctor: 'Dr. Robert Wilson', date: '30/01/2026' }
  ];
}
