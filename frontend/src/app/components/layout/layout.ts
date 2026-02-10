import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SharedStateService } from '../../services/shared-state.service';

@Component({
  selector: 'app-layout',
  imports: [RouterOutlet, CommonModule],
  templateUrl: './layout.html',
  styleUrl: './layout.css',
})
export class Layout implements OnInit, OnDestroy {
  username = 'MADAVI';
  currentDate = '';
  currentTime = '';
  activeModule = 'in-patient';
  activeScreen = 'in-patient-list';
  workspaceTitle = 'Admission Statistics';

  modules = [
    { id: 'app', label: 'App Mgmt', icon: 'ph-squares-four' },
    { id: 'out', label: 'Out Patient', icon: 'ph-user' },
    { id: 'soft', label: 'Soft Lab', icon: 'ph-flask' },
    { id: 'in-patient', label: 'In Patient', icon: 'ph-hospital' },
    { id: 'acc', label: 'Accounting', icon: 'ph-calculator' },
    { id: 'rep', label: 'Reports', icon: 'ph-chart-line' },
    { id: 'rad', label: 'Radiology', icon: 'ph-radioactive' },
  ];

  private timeInterval: any;

  constructor(private router: Router, private sharedState: SharedStateService) { }

  ngOnInit() {
    this.updateDateTime();
    this.timeInterval = setInterval(() => this.updateDateTime(), 1000);
  }

  onGlobalSave() {
    this.sharedState.triggerSave();
  }

  ngOnDestroy() {
    if (this.timeInterval) {
      clearInterval(this.timeInterval);
    }
  }

  updateDateTime() {
    const now = new Date();
    this.currentDate = now.toLocaleDateString('en-GB');
    this.currentTime = now.toLocaleTimeString('en-GB');
  }

  setModule(module: string) {
    this.activeModule = module;
    if (module === 'rad') {
      this.setScreen('rad-charges');
    } else if (module === 'soft') {
      this.setScreen('lab-registration');
    } else if (module === 'out') {
      this.setScreen('appointments');
    } else if (module === 'in-patient') {
      this.setScreen('in-patient-list');
    } else if (module === 'app') {
      this.setScreen('procedures');
    } else if (module === 'acc') {
      this.setScreen('acc-transactions');
    }
  }

  get sidebarTitle(): string {
    const map: { [key: string]: string } = {
      'in-patient': 'IN-PATIENT SERVICES',
      'rad': 'RADIOLOGY SERVICES',
      'out': 'OUT-PATIENT SERVICES',
      'soft': 'LABORATORY SERVICES',
      'acc': 'ACCOUNTING',
      'rep': 'REPORTING',
      'app': 'SYSTEM MGMT'
    };
    return map[this.activeModule] || 'SERVICES';
  }

  get sidebarLinks() {
    switch (this.activeModule) {
      case 'in-patient':
        return [
          { id: 'in-patient-list', label: 'In Patient List', icon: 'ph-users' },
          { id: 'ip-admission', label: 'IP Admission', icon: 'ph-user-plus' },
          { id: 'ip-advance-payment', label: 'Advance Payment', icon: 'ph-money' },
          { id: 'ip-transfer-doctor', label: 'Transfer Doctor', icon: 'ph-user-md' },
          { id: 'ip-transfer-bed', label: 'Transfer Bed', icon: 'ph-bed' },
          { id: 'ip-discharge-summary', label: 'Discharge Summary', icon: 'ph-file-text' },
          { id: 'ip-bill-details', label: 'IP Bill Details', icon: 'ph-receipt' },
          { id: 'ip-settlement-bill', label: 'Settlement Bill', icon: 'ph-currency-dollar' },
          { id: 'ip-test-results', label: 'IP wise Test Results', icon: 'ph-flask' },
          { id: 'ip-medical-certificate', label: 'Medical Certificate', icon: 'ph-certificate' },
          { id: 'ip-due-collection', label: 'Due Collection', icon: 'ph-money' },
          { id: 'ip-discharge-cancellation', label: 'Discharge Cancellation', icon: 'ph-x-circle' }
        ];
      case 'rad':
        return [
          { id: 'rad-charges', label: 'Charges', icon: 'ph-currency-dollar' },
          { id: 'rad-diagnostic-test', label: 'Diagnostic Test', icon: 'ph-test-tube' },
        ];
      case 'soft':
        return [
          { id: 'lab-charges', label: 'Charges', icon: 'ph-currency-dollar' },
          { id: 'lab-due-collection', label: 'Lab Due Collection', icon: 'ph-money' },
          { id: 'lab-registration', label: 'Registration', icon: 'ph-user-plus' },
          { id: 'lab-report-status', label: 'Report Status', icon: 'ph-file-search' },
          { id: 'lab-test-cancellation', label: 'Test Cancellation', icon: 'ph-x-circle' },
          { id: 'lab-test-details', label: 'Test Details', icon: 'ph-list-magnifying-glass' },
        ];
      case 'out':
        return [
          { id: 'appointments', label: 'Apt Dashboard', icon: 'ph-chart-pie' },
          { id: 'book-apt', label: 'Book Slot', icon: 'ph-calendar-plus' },
          { id: 'apt-list', label: 'Apt List', icon: 'ph-list-bullets' },
        ];
      case 'app':
        return [
          { id: 'procedures', label: 'Procedures', icon: 'ph-list-dashes' },
          { id: 'service', label: 'Service', icon: 'ph-gear' },
          { id: 'referral-doctor', label: 'Referral Doctor', icon: 'ph-user-md' },
          { id: 'procedure-charges', label: 'Procedure Charges', icon: 'ph-currency-dollar' },
          { id: 'user-screen-settings', label: 'User Screen Settings', icon: 'ph-monitor' },
          { id: 'service-charge', label: 'Service Charge', icon: 'ph-receipt' },
          { id: 'user-report-settings', label: 'User Report Settings', icon: 'ph-file-text' }
        ];
      case 'acc':
        return [
          { id: 'acc-transactions', label: 'Transactions', icon: 'ph-arrows-left-right' },
        ];
      default:
        return [{ id: 'dashboard', label: 'Dashboard', icon: 'ph-chart-pie' }];
    }
  }

  setScreen(screen: string) {
    this.activeScreen = screen;
    this.router.navigate([`/${screen}`]);

    const titleMap: { [key: string]: string } = {
      'dashboard': 'Admission Statistics',
      'rad-charges': 'Radiology Charges',
      'rad-diagnostic-test': 'Radiology Diagnostic Test',
      'lab-charges': 'Lab Charges',
      'lab-due-collection': 'Lab Due Collection',
      'lab-registration': 'Lab Patient Registration',
      'lab-report-status': 'Lab Report Status',
      'lab-test-cancellation': 'Lab Test Cancellation',
      'lab-test-details': 'Lab Test Details',
      'in-patient-list': 'In Patient List',
      'ip-admission': 'IP Admission',
      'ip-advance-payment': 'Advance Payment',
      'ip-transfer-doctor': 'Transfer Doctor',
      'ip-transfer-bed': 'Transfer Bed',
      'ip-discharge-summary': 'Discharge Summary',
      'ip-bill-details': 'IP Bill Details',
      'ip-settlement-bill': 'Settlement Bill',
      'ip-test-results': 'IP Wise Test Results',
      'ip-medical-certificate': 'Medical Certificate',
      'ip-due-collection': 'Due Collection',
      'ip-discharge-cancellation': 'Discharge Cancellation',
      'acc-transactions': 'Account Transactions',
      'appointments': 'Appointment Management',
      'procedures': 'Procedure Configuration',
      'service': 'Service Configuration',
      'referral-doctor': 'Referral Doctor Management',
      'procedure-charges': 'Procedure Charges Configuration',
      'user-screen-settings': 'User Screen Settings',
      'service-charge': 'Service Charges',
      'user-report-settings': 'User Report Settings'
    };

    this.workspaceTitle = titleMap[screen] || 'Workspace';
  }

  logout() {
    this.router.navigate(['/login']);
  }
}
