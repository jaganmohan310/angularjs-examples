import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { InPatientService, Patient } from '../../services/in-patient.service';
import { SharedStateService } from '../../services/shared-state.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'in-patient',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './in-patient.html',
    styleUrls: ['./in-patient.css']
})
export class InPatient implements OnInit, OnDestroy {
    currentView: string = 'in-patient-list';
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
    admissionForm = {
        searchTerm: '', opPatientNo: '', admissionDate: new Date().toLocaleDateString('en-GB'),
        patientName: '', age: '', address: '', country: '', state: '', city: '', area: '', zipCode: '',
        emailId: '', attendantRelation: '', attendantName: '', attendantMobile: '',
        doctor: '', secondaryDoctor: '', specialization: '', patientType: '', department: '',
        referralName: '', icdCode: '', insuranceCovered: 'NA', pro: '', referralDoctor: '',
        foodPreference: 'Veg', mlc: false, vip: false, quarantine: false
    };
    transferDoctorForm = {
        searchTerm: '', patientName: '', ipNo: '', mrNo: '', doa: '', currentDoctor: '', currentSpecialization: '',
        transferTo: { doctor: '', specialization: '', reason: '' },
        floor: '', gender: '', roomType: '', age: '', bedNo: '',
        primaryDoctor: { doctor: '', specialization: '', department: '' },
        transferToPrimary: { doctor: '', specialization: '', department: '' },
        secondaryDoctor: { doctor: '', specialization: '', department: '' },
        transferToSecondary: { doctor: '', specialization: '', department: '' }
    };
    transferBedForm = {
        searchTerm: '', patientName: '', ipNo: '', mrNo: '', doa: '',
        presentBed: { no: 'BED-101', floor: '1st Floor', roomType: 'General', dateTime: '' },
        transferBed: { no: '', floor: '', roomType: '', transferDate: new Date().toLocaleDateString('en-GB'), transferTime: new Date().toLocaleTimeString('en-GB') },
        gender: '', mobileNo: '', age: ''
    };
    advancePaymentForm = {
        searchTerm: '', patientName: '', ipNo: '', mrNo: '', doa: '', previousAdvance: 5000,
        payment: { receiptNo: 'R-7782', date: new Date().toLocaleDateString('en-GB'), time: new Date().toLocaleTimeString('en-GB'), amount: '', mode: 'Cash', remarks: '' },
        type: 'Advance', provisionalAmount: 0, netPayableAmount: 0, gender: '', age: '', mobileNo: '', address: '',
        advanceReceived: '', advanceRefunded: '', netAdvanceReceived: '', advanceAmount: '', comments: '', authorization: '',
        netRefundableAmount: '', refundAmount: '', paymentType: 'Cash',
        // Dynamic payment fields
        transactionNo: '', bankName: '', chequeNo: '', cardNo: ''
    };
    dischargeSummaryForm = {
        searchTerm: '', dischargeDate: new Date().toLocaleDateString('en-GB'),
        dischargeTime: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
        patientName: '', ipNo: '', mrNo: '', doa: '', diagnosis: '', clinicalHistory: '', physicalExamination: '',
        courseInHospital: '', conditionAtDischarge: '', adviseAtDischarge: '',
        gender: '', address: '', consultantDoctor: '', dischargeBy: '', nextVisitDate: '', templateType: '', icdCode: '',
        conditionAtAdmission: '', mainComplaints: '', surgery: '', treatmentGiven: '', treatmentAdvised: '', investigationsDone: '',
        nextVisitDateText: ''
    };
    settlementBillForm = {
        searchTerm: '', patientName: '', ipNo: '', mrNo: '', doa: '', dod: '', totalBill: 25000, advance: 5000,
        concession: 0, netBill: 20000, paid: 15000, balance: 5000, settlement: { mode: 'Cash', amount: '', remarks: '' },
        gender: '', mobileNo: '', age: '', address: '', patientType: '', directOrgName: '',
        totalAmount: 0, discountType: 'None', discountPercent: 0, flatAmount: 0, netAmount: 0,
        advancePaidAmount: 0, pharmacyDue: 0, labDue: 0, refundableAmount: 0, refundAmount: 0,
        ipDue: 0, totalDue: 0, comments: '', paymentType: 'Cash',
        // Dynamic payment fields
        transactionNo: '', bankName: '', chequeNo: '', cardNo: ''
    };
    testResultsForm = { searchTerm: '', patientName: '', ipNo: '', results: [] as any[], age: '', mrNo: '', gender: '' };
    medicalCertificateForm = {
        type: 'Fitness', patientName: '', ipNo: '', result: '', selectedType: '', occupation: '', birthDetails: '',
        birthDate: '', deathTime: '', deathDate: '', disease: '', fitDate: '', opNo: ''
    };
    dueCollectionForm = {
        searchTerm: '', patientName: '', ipNo: '', mrNo: '', totalDue: 5000,
        collection: { amount: '', mode: 'Cash', remarks: '' },
        labBill: { totalReceivable: 0, totalReceived: 0, labDue: 0 },
        pharmacyBill: { totalReceivable: 0, totalReceived: 0, dueAmount: 0 },
        summaryBill: {
            totalReceivable: 0, totalReceived: 0, totalDue: 0, partyType: '', paymentType: '',
            // Dynamic payment fields
            transactionNo: '', bankName: '', chequeNo: '', cardNo: ''
        },
        mobileNo: '', gender: '', address: '', city: '', referralType: '', referralName: '',
        ipBill: { totalReceivable: 0, totalReceived: 0, orgBillNo: '' }
    };
    dischargeCancellationForm = { searchTerm: '', patientName: '', ipNo: '', reason: '', name: '', age: '', gender: '', lastBed: '', newBedAllotted: '', doa: '', dod: '' };
    ipBillDetailsForm = {
        searchTerm: '', patientName: '', ipNo: '', mrNo: '', doa: '', dod: '',
        bills: [] as any[], totalAmount: 0, totalDiscount: 0, totalNet: 0
    };

    // UI options
    certificateTypes = ['Fitness', 'Rest Advice', 'Medical Leave', 'Emergency', 'Essentiality', 'Birth', 'Death', 'Genuine'];
    doctors = ['Dr. ARUN KUMAR', 'Dr. SARITA REDDY', 'Dr. VISHAL RAO'];
    specializations = ['Cardiology', 'Neurology', 'Orthopedics', 'General Medicine'];
    patientTypesList = ['Direct', 'Organization', 'Insurance'];
    departments = ['Cardiology', 'Neurology', 'Orthopedics'];
    relations = ['Father', 'Mother', 'Spouse', 'Guardian'];
    discountTypes = ['None', 'Staff', 'VIP', 'Government'];
    partyTypes = ['None', 'Corporate', 'Insurance'];
    authorizationOptions = ['Manager', 'Director', 'HOD', 'Admin'];
    paymentModeOptions = ['Cash', 'Card', 'UPI', 'Cheque', 'Net Banking'];

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private inPatientService: InPatientService,
        private sharedState: SharedStateService
    ) { }

    ngOnInit() {
        console.log('InPatient: ngOnInit fired');
        const path = this.route.snapshot.url[0]?.path;
        console.log('InPatient: Route path segment:', path);

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

        if (path && viewMap[path]) {
            this.currentView = viewMap[path];
        } else {
            this.currentView = 'in-patient-list';
        }

        console.log('InPatient: Current View set to:', this.currentView);

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
        this.isLoading = true;
        console.log('InPatient: Loading patients...');
        this.inPatientService.getPatients().subscribe(data => {
            console.log('InPatient: Patients loaded', data);
            this.patientList = data;
            this.isLoading = false;
        }, error => {
            console.error('InPatient: Error loading patients', error);
            this.isLoading = false;
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

    searchUser(query: string, type?: string) {
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
            this.transferDoctorForm.searchTerm = user;
            this.transferDoctorForm.patientName = name;
            this.transferDoctorForm.ipNo = ipNo;
            this.transferDoctorForm.mrNo = mrNo;

            // Populate extra details from patient list
            const p = this.patientList.find(p => p.ipNo === ipNo);
            if (p) {
                this.transferDoctorForm.age = p.age;
                this.transferDoctorForm.gender = p.gender;
                this.transferDoctorForm.bedNo = p.bed;
                this.transferDoctorForm.roomType = p.room;
                this.transferDoctorForm.doa = p.doa;
                this.transferDoctorForm.floor = '1st Floor'; // Default or calculate if data available
            }
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
        } else if (this.currentView === 'ip-discharge-cancellation') {
            this.dischargeCancellationForm.searchTerm = user;
            this.dischargeCancellationForm.patientName = name;
            this.dischargeCancellationForm.ipNo = ipNo;
        }

        this.showUserDropdown = false;
    }

    loadBillDetails(ipNo: string) {
        this.isLoading = true;
        this.inPatientService.getBillDetails(ipNo).subscribe(data => {
            this.ipBillDetailsForm.bills = data.bills;
            this.ipBillDetailsForm.totalAmount = data.totalAmount;
            this.ipBillDetailsForm.totalDiscount = data.totalDiscount;
            this.ipBillDetailsForm.totalNet = data.totalNet;
            this.ipBillDetailsForm.doa = data.doa;
            this.isLoading = false;
        });
    }
}
