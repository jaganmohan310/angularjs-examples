import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-appointments',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './appointments.html',
    styleUrl: './appointments.css'
})
export class Appointments {
    currentView: 'dashboard' | 'book' | 'list' | 'schedule' | 'history' | 'detail' = 'dashboard';

    // Dummy Data
    stats = [
        { label: 'Total Appointments', value: '482', icon: 'ph-calendar-check', color: 'blue' },
        { label: "Today's Appointments", value: '28', icon: 'ph-clock', color: 'green' },
        { label: 'Available Doctors', value: '14', icon: 'ph-stethoscope', color: 'purple' },
        { label: 'Cancellations', value: '5', icon: 'ph-prohibit', color: 'red' }
    ];

    appointments = [
        { id: 'APT-1001', name: 'John Doe', age: 45, phone: '9876543210', doctor: 'Dr. Sarah Wilson', dept: 'Cardiology', date: '2024-02-05', time: '09:00 AM', status: 'Scheduled', type: 'New' },
        { id: 'APT-1002', name: 'Emma Brown', age: 29, phone: '9123456789', doctor: 'Dr. James Miller', dept: 'Neurology', date: '2024-02-05', time: '10:30 AM', status: 'Completed', type: 'Follow-up' },
        { id: 'APT-1003', name: 'Michael Ross', age: 38, phone: '8877665544', doctor: 'Dr. Sarah Wilson', dept: 'Cardiology', date: '2024-02-05', time: '11:15 AM', status: 'Cancelled', type: 'New' },
        { id: 'APT-1004', name: 'Jessica Day', age: 31, phone: '7766554433', doctor: 'Dr. Anna Lee', dept: 'Pediatrics', date: '2024-02-05', time: '02:00 PM', status: 'Scheduled', type: 'Follow-up' },
        { id: 'APT-1005', name: 'David Goggins', age: 48, phone: '6655443322', doctor: 'Dr. Robert King', dept: 'Orthopedics', date: '2024-02-06', time: '09:45 AM', status: 'Scheduled', type: 'New' }
    ];

    doctors = [
        { name: 'Dr. Sarah Wilson', dept: 'Cardiology', availability: 'Morning', bio: 'Senior Cardiologist, MD' },
        { name: 'Dr. James Miller', dept: 'Neurology', availability: 'Full Day', bio: 'Neurologist, MBBS, MD' },
        { name: 'Dr. Anna Lee', dept: 'Pediatrics', availability: 'Afternoon', bio: 'Pediatric Specialist' },
        { name: 'Dr. Robert King', dept: 'Orthopedics', availability: 'Evening', bio: 'Orthopedic Surgeon' }
    ];

    history = [
        { id: 'APT-0995', name: 'Alice Walker', doctor: 'Dr. Sarah Wilson', date: '2024-01-28', status: 'Completed', type: 'Follow-up' },
        { id: 'APT-0982', name: 'Bob Knight', doctor: 'Dr. James Miller', date: '2024-01-25', status: 'Completed', type: 'New' },
        { id: 'APT-0970', name: 'Chris Evans', doctor: 'Dr. Anna Lee', date: '2024-01-20', status: 'Cancelled', type: 'New' },
    ];

    selectedApt: any = null;
    searchTerm: string = '';

    setView(view: any, data: any = null) {
        this.currentView = view;
        if (data) this.selectedApt = data;
    }

    get filteredAppointments() {
        return this.appointments.filter(a =>
            a.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
            a.id.toLowerCase().includes(this.searchTerm.toLowerCase())
        );
    }

    bookAppointment() {
        alert('Appointment booked successfully!');
        this.setView('list');
    }

    cancelAppointment(apt: any) {
        if (confirm(`Are you sure you want to cancel appointment ${apt.id}?`)) {
            apt.status = 'Cancelled';
            alert('Appointment cancelled.');
        }
    }

    rescheduleAppointment(apt: any) {
        alert(`Redirecting to reschedule ${apt.id}...`);
        this.setView('book');
    }
}
