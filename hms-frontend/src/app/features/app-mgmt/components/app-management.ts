
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-app-management',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './app-management.html',
    styleUrl: './app-management.css'
})
export class AppManagement implements OnInit {
    currentView: string = 'landing';

    // Forms Data Models
    procedureForm = {
        code: '',
        name: '',
        description: '',
        ccUnit: 'Hourly',
        comments: '',
        active: true,
        isDoctorProcedure: false
    };

    serviceForm = {
        code: '',
        name: '',
        description: '',
        type: '',
        comments: '',
        chargeUnit: 'Hourly',
        active: true
    };

    chargeForm = {
        type: 'general', // 'general' or 'doctor'
        procedure: '',
        doctor: '',
        orgType: 'Hospital',
        indicator: 'Select',
        copyTo: false,
        targetOrgType: 'Hospital',
        hospitalShare: 0,
        doctorShare: 0,
        hospitalPercentage: 0,
        totalAmount: 0,
        increment: 0,
        selectedTpa: ''
    };

    referralDoctorForm = {
        firstName: '',
        middleName: '',
        lastName: '',
        clinicName: '',
        address: '',
        country: 'INDIA',
        landline: '',
        state: 'TELANGANA',
        mobile: '',
        city: 'NIZAMABAD',
        email: '',
        area: '',
        active: true
    };

    userScreenSettingsForm = {
        module: ''
    };

    roomServicesList = [
        'All',
        'DMO CHARGES',
        'General Ward',
        'NURSING CHARGES',
        'Special Room'
    ];

    generalServicesList = [
        'C-PAP',
        'ICU BED CHARGES',
        'IMPLANT CHARGES',
        'INFUSION PUMP',
        'IP ADMISSION CHARGES',
        'MLC CHARGES',
        'MONITORING',
        'NIV CHARGES',
        'OT CHARGES',
        'OXYGEN PER DAY',
        'STEP DOWN ICU',
        'VENTILATOR (PER DAY)'
    ];

    proceduresList = [
        'BIOPSY SMALL',
        'CASUALITY CHARGES',
        'C-PAP',
        'EEG',
        'INCUBATION CHARGES',
        'LUMBAR PUNCTURE',
        'MANIPULATION CHARGES',
        'MEDICAL CERTIFICATE CHARGES',
        'MLC',
        'NCS 4 Limbs',
        'NEBULIZATION CHARGES',
        'OBSERVATION CHARGES',
        'OXYGEN CHARGES(PER HOUR)',
        'PHYSIOTHERAPY',
        'POP CHARGES'
    ];

    countries = ['INDIA', 'USA', 'UK', 'UAE'];
    states = ['TELANGANA', 'ANDHRA PRADESH', 'KARNATAKA', 'MAHARASHTRA'];
    cities = ['NIZAMABAD', 'HYDERABAD', 'WARANGAL', 'KARIMNAGAR'];
    areas = ['Select', 'Area 1', 'Area 2', 'Main Road', 'Suburbs'];

    serviceChargeForm = {
        type: 'room', // 'doctor', 'room', 'general'
        service: 'Select',
        doctor: 'Select',
        roomType: 'Select',
        orgType: 'Hospital',
        indicator: 'Select',
        copyTo: false,
        targetOrgType: 'Hospital',
        hospitalShare: 0,
        doctorShare: 0,
        hospitalPercentage: 0,
        totalAmount: 0,
        increment: 0
    };

    tpaList = ['TPA 1', 'TPA 2', 'TPA 3', 'FHPL', 'STAR HEALTH', 'RELIANCE'];
    orgTypes = ['Hospital', 'TPA', 'INSURANCE', 'CASH'];
    moduleList = ['App Mgmt', 'Out Patient', 'In Patient', 'Soft Lab', 'Radiology', 'Accounting', 'Reports'];

    userReportSettingsForm = {
        module: '',
        sortByAlphabet: false
    };

    reportModules = ['Admin', 'In Patient', 'Lab', 'Out Patient', 'Pharmacy'];

    constructor(private route: ActivatedRoute) { }

    ngOnInit() {
        this.route.url.subscribe(() => {
            const path = window.location.pathname.split('/').pop() || 'landing';
            this.setViewFromPath(path);
        });
    }

    reportsData: { [key: string]: string[] } = {
        'Admin': ['My Collection', 'MRNO wise Bill Details', 'Patient wise Count', 'Procedures', 'User Collection'],
        'In Patient': [
            'Daywise IP List', 'Discharge Summary', 'Doctor Wise Room Rent', 'Doctor Wise Visit Report', 'Due Collection',
            'FromBill To ToBill', 'IP Admission Cancellations', 'IP Advances', 'IP Advances Refund Details', 'IP Available Beds',
            'IP Bed Details', 'IP Bill Adjustments', 'IP Bill Details', 'IP Day Collection', 'IP Doctor Commision',
            'IP Dues Report', 'IP Gross Day wise Collection', 'IP Patient List', 'IP Procedure Commision', 'Ip Settlement Discount Given list',
            'IP Settlements', 'IP User Collection'
        ],
        'Lab': [
            'Breakage Or Loss', 'Department Tests Report', 'Doctor and test wise collection', 'Due Collection', 'FromBill To ToBill',
            'IPNo wise Tests and Cancellations', 'Lab Day Collection', 'Lab Detailed Registrations', 'Lab Doctor Wise Collection',
            'Lab Due Report', 'Lab Registration Cancellations', 'Lab Registrations'
        ],
        'Out Patient': [
            'Area wise Consultations', 'Cancellation Report', 'Consultant Doctor Review Validity', 'Consultation Cancellations',
            'Consultation Cancellations Summary', 'Consultations With Cancellations', 'Consultations With Cancellations summary',
            'Due Collection', 'Free Reviews', 'FromBill To ToBill', 'OP Day Collection', 'OP Detailed Report',
            'OP Discount given patient details', 'OP Due Report', 'OP Gross Day Wise Collection', 'OP Referral Doctor Commision',
            'OP TDS', 'OP total Collection', 'OP User Collection', 'OP_Consultations', 'OP_Consultations Summary', 'OP_Consultations without financial'
        ],
        'Pharmacy': [
            'IPNO Wise Due Collection', 'IPNO Wise Dues', 'IPNo wise Medicine Sales and Returns',
            'Pharmacy Collection (Provisional)', 'Pharmacy Dues Report', 'Pharmacy Dump Stock',
            'Pharmacy Sales', 'Sales', 'Sales in Detail', 'Sales Summary', 'SalesReturns', 'UserWiseSales'
        ]
    };

    currentReportsList: string[] = [];
    selectedReportIndex: number | null = null;

    onReportModuleChange() {
        const mod = this.userReportSettingsForm.module;
        if (mod && this.reportsData[mod]) {
            this.currentReportsList = [...this.reportsData[mod]];
            if (this.userReportSettingsForm.sortByAlphabet) {
                this.currentReportsList.sort();
            }
        } else {
            this.currentReportsList = [];
        }
        this.selectedReportIndex = null;
    }

    toggleSort() {
        if (this.userReportSettingsForm.sortByAlphabet) {
            this.currentReportsList.sort();
        } else {
            this.onReportModuleChange();
        }
    }

    selectReport(index: number) {
        this.selectedReportIndex = index;
    }

    moveReport(direction: number) {
        if (this.selectedReportIndex === null) return;
        const index = this.selectedReportIndex;
        const newIndex = index + direction;

        if (newIndex >= 0 && newIndex < this.currentReportsList.length) {
            const item = this.currentReportsList.splice(index, 1)[0];
            this.currentReportsList.splice(newIndex, 0, item);
            this.selectedReportIndex = newIndex;
        }
    }

    // Map route path to internal view
    setViewFromPath(path: string) {
        const map: { [key: string]: string } = {
            'procedures': 'procedures',
            'service': 'service',
            'procedure-charges': 'procedure-charges',
            'referral-doctor': 'referral-doctor',
            'user-screen-settings': 'user-screen-settings',
            'service-charge': 'service-charge',
            'user-report-settings': 'user-report-settings',
            'app-management': 'landing'
        };
        this.currentView = map[path] || 'landing';
    }

    setView(view: string) {
        this.currentView = view;
    }

    save() {
        alert('Configuration Saved Successfully!');
    }
}
