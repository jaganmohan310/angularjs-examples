import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-laboratory',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './laboratory.html',
    styleUrl: './laboratory.css'
})
export class Laboratory {
    currentView: 'dashboard' | 'requests' | 'collection' | 'entry' | 'report' | 'history' = 'dashboard';

    // Dummy Data
    stats = [
        { label: 'Total Lab Tests', value: '2,840', icon: 'ph-test-tube', color: 'blue' },
        { label: 'Collected Today', value: '124', icon: 'ph-drop', color: 'red' },
        { label: 'Pending Results', value: '38', icon: 'ph-hourglass', color: 'orange' },
        { label: 'Completed Reports', value: '2,678', icon: 'ph-check-square', color: 'green' }
    ];

    requests = [
        { id: 'LR-2024-101', pid: 'P-5001', name: 'Alice Johnson', test: 'Complete Blood Count (CBC)', doctor: 'Dr. Roberts', status: 'Requested', date: '2024-02-05' },
        { id: 'LR-2024-102', pid: 'P-5002', name: 'Bob Smith', test: 'Blood Sugar (Fasting)', doctor: 'Dr. Lee', status: 'Collected', date: '2024-02-05' },
        { id: 'LR-2024-103', pid: 'P-5003', name: 'Charlie Davis', test: 'Lipid Profile', doctor: 'Dr. White', status: 'Completed', date: '2024-02-04' },
        { id: 'LR-2024-104', pid: 'P-5004', name: 'Diana Prince', test: 'Liver Function Test', doctor: 'Dr. Roberts', status: 'Requested', date: '2024-02-05' },
    ];

    testParameters = [
        { name: 'Hemoglobin', value: '13.5', range: '13.0 - 17.0', unit: 'g/dL' },
        { name: 'RBC Count', value: '4.8', range: '4.5 - 5.5', unit: 'million/uL' },
        { name: 'WBC Count', value: '7500', range: '4000 - 11000', unit: '/uL' },
        { name: 'Platelets', value: '250000', range: '150000 - 450000', unit: '/uL' }
    ];

    selectedRequest: any = null;
    searchTerm: string = '';

    setView(view: any, data: any = null) {
        this.currentView = view;
        if (data) this.selectedRequest = data;
    }

    get filteredRequests() {
        return this.requests.filter(r =>
            r.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
            r.id.toLowerCase().includes(this.searchTerm.toLowerCase())
        );
    }

    saveResults() {
        alert('Results saved successfully. Report generated!');
        this.setView('dashboard');
    }

    collectSample() {
        alert('Sample marked as collected.');
        this.setView('requests');
    }
}
