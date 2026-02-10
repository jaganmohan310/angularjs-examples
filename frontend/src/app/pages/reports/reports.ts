import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { SharedStateService } from '../../services/shared-state.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'reports',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './reports.html',
    styleUrls: ['./reports.css']
})
export class Reports implements OnInit, OnDestroy {
    isLoading = false;
    private saveSubscription: Subscription | undefined;

    // Sidebar options
    currentModule: string = 'Application Mgmt';
    modules = ['Application Mgmt', 'In Patient', 'Lab', 'Out Patient', 'Pharmacy'];

    // Current selected report in the radio list
    selectedReport: string = '';

    // Data for each module's report list
    moduleReports: { [key: string]: string[] } = {
        'Application Mgmt': [
            'My Collection',
            'MRNO wise Bill Details',
            'Patient wise Count',
            'Procedures',
            'User Collection'
        ],
        'In Patient': [
            'Daywise IP List',
            'Discharge Summary',
            'Doctor Wise Room Rent',
            'Doctor Wise Visit Report',
            'Due Collection',
            'FromBill To ToBill',
            'IP Admission Cancellations',
            'IP Advances',
            'IP Advances Refund Details',
            'IP Available Beds',
            'IP Bed Details',
            'IP Bill Adjustments',
            'IP Bill Details',
            'IP Day Collection',
            'IP Doctor Commision',
            'IP Dues Report',
            'IP Gross Day wise Collection',
            'IP Patient List',
            'IP Procedure Commision',
            'Ip Settlement Discount Given list',
            'IP Settlements',
            'IP User Collection',
            'IP_Admissions',
            'OP to IP Converted Patients',
            'Unsettled IP Patients'
        ],
        'Lab': [
            'Breakage Or Loss',
            'Department Tests Report',
            'Doctor and test wise collection',
            'Due Collection',
            'FromBill To ToBill',
            'IPNo wise Tests and Cancellations',
            'Lab Day Collection',
            'Lab Detailed Registrations',
            'Lab Doctor Wise Collection',
            'Lab Due Report',
            'Lab Registration Cancellations',
            'Lab Registrations'
        ],
        'Out Patient': [
            'Area wise Consultations',
            'Cancellation Report',
            'Consultant Doctor Review Validity',
            'Consultation Cancellations',
            'Consultation Cancellations Summary',
            'Consultations With Cancellations',
            'Consultations With Cancellations summary',
            'Due Collection',
            'Free Reviews',
            'FromBill To ToBill',
            'OP Day Collection',
            'OP Detailed Report',
            'OP Discount given patient details',
            'OP Due Report',
            'OP Gross Day Wise Collection',
            'OP Referral Doctor Commision',
            'OP TDS',
            'OP total Collection',
            'OP User Collection',
            'OP_Consultations',
            'OP_Consultations Summary',
            'OP_Consultations without financial',
            'OP_Procedures',
            'OP_Procedures(Provisional)',
            'OP_ProceduresCancellations',
            'Organization Consultaions',
            'Procedure Count',
            'Procedure with cancellation',
            'Referral Consultaions',
            'Referral Doctor Commission',
            'Referral Doctor Commission Report',
            'Referral Doctor Consultations',
            'Registration Fee Master',
            'Registrations',
            'TPA Consultaions'
        ],
        'Pharmacy': [
            'IPNO Wise Due Collection',
            'IPNO Wise Dues',
            'IPNo wise Medicine Sales and Returns',
            'Pharmacy Collection (Provisional)',
            'Pharmacy Dues Report',
            'Pharmacy Dump Stock',
            'Pharmacy Sales',
            'Sales',
            'Sales in Detail',
            'Sales Summary',
            'SalesReturns',
            'UserWiseSales'
        ]
    };

    // Filter Models
    filter = {
        fromDate: '2021-07-02T12:00', // Default based on screenshot
        toDate: '2021-07-02T17:58',
        fromMrno: '',
        toMrno: '',
        year1: '2021',
        year2: '2021',
        user: 'All',
        module: 'All'
    };

    years = ['2020', '2021', '2022', '2023', '2024', '2025'];

    // User list for dropdown
    users = ['All', 'GANESH', 'JAGAN', 'KANNAIAH', 'LAXMAN', 'MADAVI', 'NANY', 'NAVEENR', 'PH.SHARVAN', 'PHARAMCY', 'PRASAD', 'SHRAVAN', 'SOUNDHARYA', 'SRAVAN', 'SRINIVASM', 'support'];

    // Module list for dropdown
    modulesList = ['All', 'Admin', 'In Patient', 'Lab', 'Out Patient', 'Pharmacy'];

    constructor(private router: Router, private sharedState: SharedStateService) { }

    ngOnInit() {
        this.saveSubscription = this.sharedState.saveTriggered$.subscribe(() => {
            this.getReport();
        });
    }

    ngOnDestroy() {
        if (this.saveSubscription) {
            this.saveSubscription.unsubscribe();
        }
    }

    selectModule(mod: string) {
        this.currentModule = mod;
        this.selectedReport = ''; // Reset selection
    }

    get currentReports() {
        return this.moduleReports[this.currentModule] || [];
    }

    get showDateRange() {
        return ['My Collection', 'User Collection'].includes(this.selectedReport);
    }

    get showMrnoRange() {
        return this.selectedReport === 'MRNO wise Bill Details';
    }

    get showYearDropdowns() {
        return this.selectedReport === 'Patient wise Count';
    }

    get showUserCollectionFilters() {
        return this.selectedReport === 'User Collection';
    }

    get showProceduresPreview() {
        return this.selectedReport === 'Procedures';
    }

    get showUserCollectionPreview() {
        return this.selectedReport === 'User Collection';
    }

    get showNoParametersMessage() {
        return !this.showDateRange && !this.showMrnoRange && !this.showYearDropdowns && !this.showUserCollectionFilters;
    }

    getReport() {
        if (!this.selectedReport) {
            alert('Please select a report first!');
            return;
        }
        this.isLoading = true;
        console.log('Generating report:', this.selectedReport, this.filter);
        setTimeout(() => {
            this.isLoading = false;
            alert(`Report "${this.selectedReport}" generated successfully!`);
        }, 1500);
    }

    cancel() {
        this.selectedReport = '';
    }
}
