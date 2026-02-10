import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-accounting',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './accounting.html',
    styleUrls: ['./accounting.css']
})
export class Accounting implements OnInit {
    currentView: string = 'transactions';

    transactionForm = {
        type: 'Income', // Income or Expense
        partyType: '',
        isPatientDetails: false,
        billingDept: 'Accounting',
        orgBillNo: '',
        accountHead: '',
        accountSubHead: '',
        accountSubSubHead: '',
        partyName: '',
        contactNo: '',
        address: '',
        paymentType: 'Cash',
        amount: '',
        remarks: ''
    };

    // Dropdown Options
    partyTypes = ['Self', 'Organization', 'Insurance', 'Third Party'];
    billingDepts = ['Accounting', 'Central Pharma', 'In Patient', 'Lab', 'Out Patient', 'Pharmacy'];
    accountHeads = ['Operational Income', 'Administrative Expenses', 'Salary', 'Misc'];
    paymentTypes = ['Cash', 'Card', 'Cheque', 'Online Transfer'];

    constructor(private router: Router, private route: ActivatedRoute) { }

    ngOnInit() {
        const path = this.route.snapshot.url[0]?.path;
        if (path === 'acc-transactions') {
            this.currentView = 'transactions';
        }
    }

    setView(view: string) {
        this.currentView = view;
    }

    saveTransaction() {
        console.log('Saving transaction:', this.transactionForm);
        // Logic to save data to backend will go here
        alert('Transaction saved successfully (Mock)');
    }

    clearForm() {
        this.transactionForm = {
            type: 'Income',
            partyType: '',
            isPatientDetails: false,
            billingDept: 'Accounting',
            orgBillNo: '',
            accountHead: '',
            accountSubHead: '',
            accountSubSubHead: '',
            partyName: '',
            contactNo: '',
            address: '',
            paymentType: 'Cash',
            amount: '',
            remarks: ''
        };
    }
}
