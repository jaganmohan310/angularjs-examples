import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { InPatientService, Patient } from '../../../../services/patient.service';
import { SharedStateService } from '../../../../core/services/shared-state.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'in-patient',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './in-patient.html',
    styleUrls: ['./in-patient.css']
})
export class InPatient implements OnInit, OnDestroy {
    currentView: any = 'in-patient-list';
    isLoading: boolean = false;
    private saveSubscription: Subscription | undefined;

    // Data for In Patient List
    patientList: Patient[] = [];

    // Autocomplete Data
    users = [
        'ANKAM BOJANNA | 2327 | 1909 | 9441185972',
        'AR SUNIL KUMAR | 2313 | 1898 | 9951172331',
        'BUDARI AMBAVVA | -- | 1883 | 8185916448',
        'AGARVAL PQUSH | 2290 | 1879 | 9030258983',
        'K ANIL | 2284 | 1874 | 6304411661',
        'NAGAIAH G | 535 | 1919 | 9515181992',
        'NAINIVAR GANGARAM | 520 | 1849 | 9553917601',
        'NANGI MUTHYAM | 499 | 1798 | 9848998562',
        'BHUKYA NANDYA | 483 | 1756 | 8500212124'
    ];
    filteredUsers: string[] = [];
    showUserDropdown = false;

    // Forms
    admissionForm: any = {
        searchTerm: '', opPatientNo: '', admissionDate: new Date().toLocaleDateString('en-GB'),
        patientName: '', age: '', address: '', country: '', state: '', city: '', area: '', zipCode: '',
        emailId: '', attendantRelation: '', attendantName: '', attendantMobile: '',
        doctor: '', secondaryDoctor: '', specialization: '', patientType: '',
        department: '', referralName: '', icdCode: '', insuranceCovered: '',
        pro: '', referralDoctor: '', foodPreference: 'Veg', mlc: false, vip: false, quarantine: false,
        bedDetails: { floor: '', roomType: '', bed: '', charge: '' }
    };
    transferDoctorForm: any = {
        searchTerm: '', patientName: '', ipNo: '', mrNo: '', doa: '', currentDoctor: '', currentSpecialization: '',
        floor: '', gender: '', roomType: '', age: '', bedNo: '',
        primaryDoctor: { doctor: '', specialization: '', department: '' },
        secondaryDoctor: { doctor: '', specialization: '', department: '' },
        transferToPrimary: { doctor: '', specialization: '', department: '' },
        transferToSecondary: { doctor: '', specialization: '', department: '' },
        transferTo: { doctor: '', specialization: '', reason: '' }
    };
    transferBedForm: any = {
        searchTerm: '', patientName: '', ipNo: '', mrNo: '', doa: '',
        gender: '', mobileNo: '', age: '',
        presentBed: { no: 'BED-101', floor: '1st Floor', roomType: 'General', dateTime: '' },
        transferBed: { no: '', floor: '', roomType: '', transferDate: new Date().toLocaleDateString('en-GB'), transferTime: new Date().toLocaleTimeString('en-GB') }
    };
    advancePaymentForm: any = {
        searchTerm: '', patientName: '', ipNo: '', mrNo: '', doa: '', previousAdvance: 5000,
        type: 'Advance', gender: '', age: '', mobileNo: '', address: '',
        advanceReceived: 0, advanceRefunded: 0, netAdvanceReceived: 0, advanceAmount: 0,
        comments: '', authorization: '', paymentType: 'Cash',
        provisionalAmount: 0, netPayableAmount: 0,
        payment: { receiptNo: 'R-7782', date: new Date().toLocaleDateString('en-GB'), time: new Date().toLocaleTimeString('en-GB'), amount: '', mode: 'Cash', remarks: '' }
    };
    dischargeSummaryForm: any = {
        searchTerm: '', dischargeDate: new Date().toLocaleDateString('en-GB'),
        dischargeTime: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
        patientName: '', ipNo: '', mrNo: '', doa: '', diagnosis: '', clinicalHistory: '', physicalExamination: '', courseInHospital: '', conditionAtDischarge: '', adviseAtDischarge: '',
        gender: '', address: '', consultantDoctor: '', dischargeBy: '', nextVisitDate: '',
        templateType: '', icdCode: '', conditionAtAdmission: '', mainComplaints: '',
        surgery: '', treatmentGiven: '', treatmentAdvised: '', investigationsDone: '',
        nextVisitDateText: ''
    };
    settlementBillForm: any = {
        searchTerm: '', patientName: '', ipNo: '', mrNo: '', doa: '', dod: '', totalBill: 25000, advance: 5000,
        concession: 0, netBill: 20000, paid: 15000, balance: 5000, settlement: { mode: 'Cash', amount: '', remarks: '' },
        gender: '', mobileNo: '', age: '', address: '', patientType: '', directOrgName: '',
        totalAmount: 0, discountType: 'No Discount', discountPercent: 0, flatAmount: 0, netAmount: 0,
        advancePaidAmount: 0, serviceTax: 0, roundOff: 0, payableAmount: 0, comments: '',
        pharmacyDue: 0, labDue: 0, refundableAmount: 0, refundAmount: 0, ipDue: 0, totalDue: 0
    };
    testResultsForm = {
        searchTerm: '', patientName: '', ipNo: '', results: [] as any[],
        age: '', mrNo: '', gender: '', address: '', city: '',
        referralType: '', referralName: '', mobileNo: ''
    };
    medicalCertificateForm = {
        type: '', patientName: '', ipNo: '', result: '',
        selectedType: '', disease: '', fitDate: '', opNo: '',
        occupation: '', birthDetails: '', birthDate: '', deathTime: '',
        deathDate: '', age: '', gender: '', doa: '', doctor: ''
    };
    dueCollectionForm = {
        searchTerm: '', patientName: '', ipNo: '', mrNo: '', totalDue: 5000,
        mobileNo: '', gender: '', address: '', city: '', referralType: '', referralName: '',
        ipBill: { totalReceivable: 0, totalReceived: 0, orgBillNo: '' },
        labBill: { totalReceivable: 0, totalReceived: 0, labDue: 0 },
        pharmacyBill: { totalReceivable: 0, totalReceived: 0, dueAmount: 0 },
        summaryBill: { totalReceivable: 0, totalReceived: 0, totalDue: 0, partyType: '', paymentType: '' },
        collection: { amount: '', mode: 'Cash', remarks: '' },
        age: ''
    };
    dischargeCancellationForm = {
        searchTerm: '', patientName: '', ipNo: '', reason: '',
        name: '', age: '', gender: '', lastBed: '', newBedAllotted: '',
        doa: '', dod: ''
    };
    ipBillDetailsForm = {
        searchTerm: '', patientName: '', ipNo: '', mrNo: '', doa: '', dod: '',
        bills: [] as any[], totalAmount: 0, totalDiscount: 0, totalNet: 0,
        labBill: 0, ipBill: 0, selectedType: 'Summary'
    };

    // UI options
    certificateTypes = [
        'Fitness Certificate',
        'Rest Advice Certificate',
        'Medical Leave Certificate',
        'Emergency Certificate',
        'Essentiality Certificate',
        'Birth Certificate',
        'Death Certificate',
        'Genuine Certificate'
    ];
    doctors = ['Dr. ARUN KUMAR', 'Dr. SARITA REDDY', 'Dr. VISHAL RAO'];
    specializations = ['Cardiology', 'Neurology', 'Orthopedics', 'General Medicine'];
    patientTypesList = ['Direct', 'Organization', 'Insurance'];
    departments = ['Cardiology', 'Neurology', 'Orthopedics'];
    relations = ['Father', 'Mother', 'Spouse', 'Guardian'];
    discountTypes = ['No Discount', 'Percentage', 'Flat Amount'];
    partyTypes = ['None', 'Corporate', 'Insurance'];

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private inPatientService: InPatientService,
        private sharedState: SharedStateService
    ) { }

    ngOnInit() {
        const path = this.route.snapshot.url[0]?.path;
        const viewMap: { [key: string]: string } = {
            'in-patient-list': 'in-patient-list',
            'ip-admission': 'ip-admission',
            'ip-advance-payment': 'ip-advance-payment',
            'ip-transfer-doctor': 'ip-transfer-doctor',
            'ip-transfer-bed': 'ip-transfer-bed',
            'ip-discharge-summary': 'ip-discharge-summary',
            'ip-bill-details': 'ip-bill-details',
            'ip-settlement-bill': 'ip-settlement-bill',
            'ip-test-results': 'ip-test-results',
            'ip-medical-certificate': 'ip-medical-certificate',
            'ip-due-collection': 'ip-due-collection',
            'ip-discharge-cancellation': 'ip-discharge-cancellation'
        };
        this.currentView = viewMap[path] || 'in-patient-list';

        this.loadPatients();

        // Subscribe to global save
        this.saveSubscription = this.sharedState.saveTriggered$.subscribe(() => {
            this.saveCurrentViewData();
        });
    }

    ngOnDestroy() {
        if (this.saveSubscription) {
            this.saveSubscription.unsubscribe();
        }
    }

    loadPatients() {
        // IMMEDIATE UNBLOCK: Turn off spinner
        this.isLoading = false;

        // Initial fall-back data to ensure table renders
        this.patientList = [
            { sno: 1, ipNo: '535', doa: '06/02/2021 21:38:50', days: 1, name: 'NAGAIAH G', age: '46 Yrs', gender: 'Male', bed: 'ICU-01-06', room: 'ICU', referType: 'Direct' },
            { sno: 2, ipNo: '534', doa: '06/02/2021 18:05:11', days: 1, name: 'BAIRI GANGADHAR', age: '65 Yrs', gender: 'Male', bed: 'ICU-01-05', room: 'ICU', referType: 'Direct' }
        ];

        console.log('UI Unblocked. Attempting background service load...');

        // Try verification in background
        this.inPatientService.getPatients().subscribe({
            next: (data) => {
                console.log('Background service returned data:', data);
                if (data && data.length > 0) {
                    this.patientList = data;
                }
            },
            error: (err) => {
                console.warn('Background service failed (ignoring as fallback is active):', err);
            }
        });
    }

    setView(view: string) {
        this.currentView = view;
    }

    saveCurrentViewData() {
        this.isLoading = true;
        console.log('Global Save Triggered for view:', this.currentView);
        // Simulate real API call
        setTimeout(() => {
            this.isLoading = false;
            alert(`Data for ${this.currentView} saved successfully!`);
        }, 1000);
    }

    searchUser(query: string, context?: string) {
        console.log(`Searching for ${query} in context ${context}`);
        if (query.length > 1) {
            this.filteredUsers = this.users.filter(u => u.toLowerCase().includes(query.toLowerCase()));
            this.showUserDropdown = true;
        } else {
            this.showUserDropdown = false;
        }
    }

    selectUser(user: string) {
        const parts = user.split(' | ');
        const name = parts[0];
        const ipNo = parts[1];
        const mrNo = parts[2];

        if (this.currentView === 'ip-admission') {
            this.admissionForm.searchTerm = user;
            this.admissionForm.patientName = name;
        } else if (this.currentView === 'ip-advance-payment') {
            this.advancePaymentForm.searchTerm = user;
            this.advancePaymentForm.patientName = name;
            this.advancePaymentForm.ipNo = ipNo;
            this.advancePaymentForm.mrNo = mrNo;
        } else if (this.currentView === 'ip-transfer-doctor') {
            this.transferDoctorForm.searchTerm = user;
            this.transferDoctorForm.patientName = name;
            this.transferDoctorForm.ipNo = ipNo;
            this.transferDoctorForm.mrNo = mrNo;
        } else if (this.currentView === 'ip-transfer-bed') {
            this.transferBedForm.searchTerm = user;
            this.transferBedForm.patientName = name;
            this.transferBedForm.ipNo = ipNo;
            this.transferBedForm.mrNo = mrNo;
        } else if (this.currentView === 'ip-discharge-summary') {
            this.dischargeSummaryForm.searchTerm = user;
            this.dischargeSummaryForm.patientName = name;
            this.dischargeSummaryForm.ipNo = ipNo;
            this.dischargeSummaryForm.mrNo = mrNo;
        } else if (this.currentView === 'ip-bill-details') {
            this.ipBillDetailsForm.searchTerm = user;
            this.ipBillDetailsForm.patientName = name;
            this.ipBillDetailsForm.ipNo = ipNo;
            this.ipBillDetailsForm.mrNo = mrNo;
            this.loadBillDetails(ipNo);
        } else if (this.currentView === 'ip-settlement-bill') {
            this.settlementBillForm.searchTerm = user;
            this.settlementBillForm.patientName = name;
            this.settlementBillForm.ipNo = ipNo;
            this.settlementBillForm.mrNo = mrNo;
        } else if (this.currentView === 'ip-due-collection') {
            this.dueCollectionForm.searchTerm = user;
            this.dueCollectionForm.patientName = name;
            this.dueCollectionForm.ipNo = ipNo;
            this.dueCollectionForm.mrNo = mrNo;
            // Mock Data Population
            this.dueCollectionForm.mobileNo = '9988776655';
            this.dueCollectionForm.gender = 'Male';
            this.dueCollectionForm.address = 'H-No 123, Street 4';
            this.dueCollectionForm.city = 'Hyderabad';
            this.dueCollectionForm.referralType = 'Direct';
            this.dueCollectionForm.referralName = '-';
            this.dueCollectionForm.ipBill = { totalReceivable: 45000, totalReceived: 20000, orgBillNo: 'IP-2023-001' };
            this.dueCollectionForm.labBill = { totalReceivable: 5000, totalReceived: 2000, labDue: 3000 };
            this.dueCollectionForm.pharmacyBill = { totalReceivable: 8000, totalReceived: 4000, dueAmount: 4000 };
            this.dueCollectionForm.summaryBill.totalReceivable = 58000;
            this.dueCollectionForm.summaryBill.totalReceived = 26000;
            this.dueCollectionForm.summaryBill.totalDue = 32000;
        } else if (this.currentView === 'ip-discharge-cancellation') {
            this.dischargeCancellationForm.searchTerm = user;
            this.dischargeCancellationForm.patientName = name;
            this.dischargeCancellationForm.ipNo = ipNo;
            // Mock Data
            this.dischargeCancellationForm.age = '45 Y / 0 M / 12 D';
            this.dischargeCancellationForm.gender = 'Male';
            this.dischargeCancellationForm.lastBed = 'ICU-104';
            this.dischargeCancellationForm.newBedAllotted = 'Gen-Ward-202';
            this.dischargeCancellationForm.doa = '05-Feb-2023';
            this.dischargeCancellationForm.dod = '12-Feb-2023';
        }

        this.showUserDropdown = false;
    }

    loadBillDetails(ipNo: string) {
        this.isLoading = true;
        this.inPatientService.getBillDetails(ipNo).subscribe(data => {
            if (data) {
                this.ipBillDetailsForm.bills = data.bills;
                this.ipBillDetailsForm.totalAmount = data.totalAmount;
                this.ipBillDetailsForm.totalDiscount = data.totalDiscount;
                this.ipBillDetailsForm.totalNet = data.totalNet;
                this.ipBillDetailsForm.doa = data.doa;
            }
            this.isLoading = false;
        });
    }

    selectBed() {
        // Simulate Bed Selection Logic (e.g., opening a modal)
        // For now, auto-fill with mock data to demonstrate functionality
        this.admissionForm.bedDetails = {
            floor: '1st Floor',
            roomType: 'General Ward',
            bed: 'GW-01-08',
            charge: '500'
        };
    }
}
