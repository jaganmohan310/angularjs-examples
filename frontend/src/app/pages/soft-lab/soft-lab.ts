
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
    selector: 'soft-lab',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './soft-lab.html',
    styleUrls: ['./soft-lab.css']
})
export class SoftLab implements OnInit {
    currentView: string = 'charges'; // 'charges' | 'due-collection' | 'registration' | 'report-status' | 'test-cancellation' | 'test-details'

    // Data
    departments = ['AUDIOLOGY', 'CT SCAN', 'MRI', 'NUEROLOGY', 'RADIOLOGY', 'ULTRASONOGRAPHY', 'ULTRASOUND'];
    patientTypes = ['Direct', 'IP', 'OP'];
    titles = ['Mr', 'Ms', 'Mrs', 'Dr'];
    paymentTypes = ['Cash', 'Card', 'UPI', 'Cheque', 'Net Banking'];
    discTypes = ['No Discount', 'Percentage', 'Fixed Amount'];
    proList = ['Select', 'PRO1', 'PRO2']; // Placeholder
    doctorsList = ['Dr. Smith', 'Dr. Jones', 'Dr. Emily', 'Dr. Michael'];
    referralDoctorsList = ['Dr. Williams', 'Dr. Brown', 'Dr. Davis', 'Dr. Miller'];
    investigationTypes = ['Pathology', 'Radiology', 'Microbiology', 'Biochemistry'];
    investigationList = ['Complete Blood Count', 'X-Ray Chest', 'Urine Culture', 'Liver Function Test', 'MRI Brain', 'CT Scan'];

    // Auto-complete Data
    users = [
        'BASSI SUNITHA | 1922 | 7893377413',
        'JELA SATEVVA | 1921 | 9494265334',
        'MAMAI SHIVABAI | 1920 | 9440884323',
        'NAGAIAH G | 1919 | 9515181992',
        'BAIRI GANGADHAR | 1918 | 8897575783',
        'GANTHA PUSHPALATHA | 1917 | 9603905858',
        'P VINODA | 1916 | 9866497318',
        'T VIMALA | 1915 | 9391227858'
    ];

    testNames = [
        'GLYCOSYLATED HEMOGLOBIN (HBA1C)[HBA1C]',
        'HEMOGLOBIN PERCENTAGE(HB%)[HBPERCENT]',
        'HBSAG ELISA[HBSAGELISA]',
        'HCV GENOTYPING[HCVGEN]',
        'HEAMOGRAM[HEAMO]',
        'X-RAY HIP AP/LAT[HIP]',
        'HIV (ELISA)[HIVE]'
    ];

    filteredUsers: string[] = [];
    filteredTestNames: string[] = [];
    showUserDropdown = false;
    showTestDropdown = false;


    // Registration Form 
    regForm = {
        date: '',
        patientType: 'Direct',
        mrNo: '',
        firstName: '',
        title: 'Mr',
        lastName: '',
        gender: 'Male',
        consDoctor: '',
        referralDoctor: '',
        pro: '',
        mobile: ''
    };

    // Billing Form
    billing = {
        testName: '',
        testPackage: 'Test',
        totalAmount: 1500.00,
        discType: 'Fixed Amount',
        discountAmount: 0,
        discPercent: 0,
        netAmount: 1500.00,
        paidAmount: 0,
        dueAmount: 0,
        paymentType: 'Cash',
        remarks: ''
    };

    // Charges Form
    chargesForm = {
        invType: '',
        department: '',
        investigation: '',
        orgType: 'Hospital',
        copyTo: false,
        targetOrgType: 'Hospital',
        hospitalPercent: '',
        totalAmount: '',
        increment: 0
    };

    // Report Status Data
    reportStatusData = [
        { labNo: '2570', patientName: 'THAMPULURI RAMADEVI', testName: 'ECG BED SIDED', status: 'Sample Collected' },
        { labNo: '2569', patientName: 'PULLENI SUPRIYA', testName: 'MINOR SURGICAL PROFILE', status: 'Registered' },
        { labNo: '2568', patientName: 'BAIRI GANGADHAR', testName: 'X-RAY CHEST AP VIEW FOR RIB', status: 'Registered' },
        { labNo: '2567', patientName: 'JELA SATEVVA', testName: 'X-RAY CERVICAL SPINE AP&LAT VIEW', status: 'Registered' },
        { labNo: '2566', patientName: 'ANKAM BOJANNA', testName: 'CRP (C-REACTIVE PROTEIN)', status: 'Sample Collected' },
        { labNo: '2566', patientName: 'ANKAM BOJANNA', testName: 'ERYTHROSITE SEDIMENTATION RATE', status: 'Sample Collected' },
        { labNo: '2565', patientName: 'MAMAI SHIVABAI', testName: 'ECG BED SIDED', status: 'Sample Collected' },
        { labNo: '2564', patientName: 'NANGI MUTHYAM', testName: 'COMPLETE BLOOD PICTURE', status: 'Sample Collected' },
        { labNo: '2564', patientName: 'NANGI MUTHYAM', testName: 'SERUM CREATININE', status: 'Sample Collected' },
        { labNo: '2564', patientName: 'NANGI MUTHYAM', testName: 'SERUM ELECTROLYTES (IP)', status: 'Registered' }
    ];

    // Test Cancellation Form
    cancellationForm = {
        searchName: '',
        date: '',
        totalAmount: 0,
        netAmount: 0,
        dueAmount: 0,
        refundedAmount: 'Total Amount',
        discAmt: 0,
        paidAmount: 0,
        discPercent: 0,
        discAdjAmt: 0,

        // Patient Details
        patientType: '',
        firstName: 'Mr',
        firstNameText: '',
        middleName: '',
        lastName: '',
        age: '',
        gender: 'Male',
        mobile: '',
        address: '',
        consDoctor: '',
        refType: '',
        refName: '',
        referralDoctor: '',

        // Refund Details
        totalRefundAmt: 0,
        netRefundableAmt: 0,
        payableAmount: 0,
        balanceAmount: 0,
        discountAdjusted: 0,
        adjustments: '',
        paidAmountRef: 0,
        authorization: '',
        paymentType: 'Cash',
        remarks: ''
    };

    // Due Collection Form
    dueCollectionForm = {
        searchName: '',
        date: '',
        billNo: '',
        totalAmount: 0,
        paidAmount: 0,
        dueAmount: 0,
        paymentType: 'Cash',
        amount: 0,
        remarks: ''
    };

    // Test Selection Table
    selectedTests = [
        { code: 'CA125', name: 'CA 125', rate: 1200.00 },
        { code: 'CBP', name: 'COMPLETE BLOOD PICTURE', rate: 300.00 }
    ];

    // Data for Test Details Screen
    labDepartments = [
        'BIOCHEMISTRY', 'CARDIOLOGY', 'CYTOLOGY', 'HEAMATOLOGY',
        'HISTOPATHOLOGY', 'IMMUNOASSAYS', 'MICROBIOLOGY', 'PATHOLOGY', 'SEROLOGY'
    ];

    labTestNames: { [key: string]: string[] } = {
        'BIOCHEMISTRY': ['ANTI THROMBIN III', 'ALPHA FETO PROTIEN', 'ALPHA FETO PROTIEN(AFP)', 'AMMONIA', 'AMMONIA ACID'],
        'CARDIOLOGY': ['2D ECHO', '2D ECHO BEDSIDE', '2D ECHO EMERGENCY', 'BAL FLUID FOR GRAM STAIN', 'BED SIDE 2D ECHO', 'CAD CAG+RAG+PAG', 'CAR ECG'],
        'CYTOLOGY': ['ASCITIC FLUID FOR CYTOLOGY', 'ASCTIC FLUID FOR CYTOLOGY', 'BONE MARROW ASPIRATION', 'CSF FOR CYTOLOGY', 'FNAC', 'PAP SMEAR'],
        'HEAMATOLOGY': ['ABSOLUTE EOSINOPHIL COUNT', 'ABSOLUTE NEUTROPHIL COUNT', 'ANTI THYROID ANTIBODIES(ATG&AMA)', 'BLOOD GLUCOSE(F & PP)', 'C.E.A', 'CELL COUNT'],
        // Default empty for others for now
        'HISTOPATHOLOGY': ['BIOPSY SMALL', 'BIOPSY MEDIUM', 'BIOPSY LARGE', 'IMMUNOHISTOCHEMISTRY', 'FROZEN SECTION', 'CYTOLOGY FLUID', 'PAP SMECC'],
        'IMMUNOASSAYS': ['ANTI MULLARIAN HORMONE (AMH)', 'SERUM IGE LEVEL ESTIMATION', 'TROPONIN I', 'VITAMIN D', 'VITAMIN B12'],
        'MICROBIOLOGY': ['URINE CULTURE', 'BLOOD CULTURE', 'STOOL PUS FOR CULTURE', 'SPUTUM CULTURE', 'WOUND SWAB', 'GRAM STAIN', 'AFB STAIN'],
        'PATHOLOGY': ['ACITIC FLUID', 'ANTI HAV IGM', 'ANTI HEP E IGM', 'ANTI HEV (IGG-IGM)', 'ANTI MITOCHONDRIAL ANTI BODY', 'ANTI PHOSPHOLIPID ANTIBODIES-IGG', 'ANTI PHOSPHOLIPID ANTIBODY IGG-IGM', 'ANTI SMOOTH MUSCLE ANTIBODY(ASMA)', 'APOLIPOPROTEIN-A1(APO-A1)', 'ASCITIC FLUID EXAMINATION', 'ASCITIC FLUID FOR CELL TYPE AND CELL COUNT', 'ASCITIC FLUID FOR CYTOLOG', 'ASCITIC FLUID FOR TC & DC', 'ASCITIC FULID FOR CELLCOUNT', 'B12', 'BICORBONATE', 'BIG BIOPSY', 'BIOPSY LARGE', 'BIOPSY(LARGE)'],
        'SEROLOGY': ['ABSOLUTE EOSINOPHIL COUNT', 'ABSOLUTE NEUTROPHIL COUNT', 'ANTI THYROID ANTIBODIES(ATG&AMA)', 'ANTI TPO', 'APOLIPOPROTEIN - B/A1 RATIO', 'BAEPS', 'BLOOD FOR ANEROBIC CULTURE', 'BLOOD GLUCOSE(F & PP)', 'BLOOD GLUCOSE(F&PP)', 'C.E.A', 'CARBAMAZEPINE/TERTERTOL', 'CEA', 'CELL COUNT', 'COLONOSCOPY', 'CT CONTRAST_1', 'DIFFERENTIAL COUNT (DC)', 'DI-HYDROTESTOSTERONE(DHT)', 'EPINEPHRINE/ADRENALINE', 'ERYTHROSITE SEDIMENTATION RATE']
    };

    currentTestList: string[] = [];

    testDetailsForm = {
        department: '',
        testName: '',
        fieldName: '',
        unit: '',
        type: 'Qualitative', // Qualitative, Quantitative, Sub Header
        isSubHeader: false
    };

    constructor(private router: Router, private route: ActivatedRoute) { }

    ngOnInit() {
        const path = this.route.snapshot.url[0]?.path;
        if (path === 'lab-charges') this.currentView = 'charges';
        else if (path === 'lab-registration') this.currentView = 'registration';
        else if (path === 'lab-due-collection') this.currentView = 'due-collection';
        else if (path === 'lab-report-status') this.currentView = 'report-status';
        else if (path === 'lab-test-cancellation') this.currentView = 'test-cancellation';
        else if (path === 'lab-test-details') this.currentView = 'test-details';

        // Initialize with all tests as default
        this.currentTestList = [...this.labTestNames['BIOCHEMISTRY'], ...this.labTestNames['HEAMATOLOGY']];
    }

    onDepartmentChange() {
        this.currentTestList = this.labTestNames[this.testDetailsForm.department] || [];
        this.testDetailsForm.testName = '';
    }

    setView(view: string) {
        this.currentView = view;
    }

    // Search Logic
    searchUser(query: string) {
        if (query.length > 0) {
            this.filteredUsers = this.users.filter(u => u.toLowerCase().includes(query.toLowerCase()));
            this.showUserDropdown = true;
        } else {
            this.showUserDropdown = false;
        }
    }

    selectUser(user: string) {
        // Parse user string to fill form
        // Format: NAME | MRNO | MOBILE
        const parts = user.split('|').map(s => s.trim());
        if (parts.length >= 3) {
            this.regForm.firstName = parts[0]; // Simplistic
            this.regForm.mrNo = parts[1];
            this.regForm.mobile = parts[2];
        }
        this.showUserDropdown = false;
    }

    searchTest(query: string) {
        if (query.length > 0) {
            this.filteredTestNames = this.testNames.filter(t => t.toLowerCase().includes(query.toLowerCase()));
            this.showTestDropdown = true;
        } else {
            this.showTestDropdown = false;
        }
    }

    selectTest(test: string) {
        this.billing.testName = test;
        this.showTestDropdown = false;
        // Logic to add test to table wouild go here
    }

    calculateTotals() {
        // Logic for discount calculation
        if (this.billing.discType === 'Percentage') {
            this.billing.discountAmount = (this.billing.totalAmount * this.billing.discPercent) / 100;
        } else if (this.billing.discType === 'Fixed Amount') {
            // manual entry usually
        } else {
            this.billing.discountAmount = 0;
        }
        this.billing.netAmount = this.billing.totalAmount - this.billing.discountAmount;
        this.billing.dueAmount = this.billing.netAmount - this.billing.paidAmount;
    }
}
