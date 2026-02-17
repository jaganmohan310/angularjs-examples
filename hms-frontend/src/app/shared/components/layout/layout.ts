import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, RouterOutlet, NavigationEnd, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SharedStateService } from '../../../core/services/shared-state.service';
import { filter } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-layout',
  standalone: true,
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
  private routeSub: Subscription | undefined;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private sharedState: SharedStateService
  ) { }

  ngOnInit() {
    this.updateDateTime();
    this.timeInterval = setInterval(() => this.updateDateTime(), 1000);

    // Initial detection on load
    this.detectRoute(this.router.url);

    // Continuous detection on navigation
    this.routeSub = this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: any) => {
      this.detectRoute(event.url);
    });
  }

  detectRoute(url: string) {
    const segments = url.split('/');
    const path = segments[segments.length - 1];

    if (!path || path === 'dashboard' || path === 'login') {
      if (path === 'dashboard') {
        this.activeModule = 'in-patient'; // Dashboard is categorized under IP for now
        this.activeScreen = 'dashboard';
        this.updateTitles('dashboard');
      }
      return;
    }

    this.activeScreen = path;

    // Detect Module
    if (['in-patient-list', 'ip-admission', 'ip-advance-payment', 'ip-transfer-doctor', 'ip-transfer-bed', 'ip-discharge-summary', 'ip-bill-details', 'ip-settlement-bill', 'ip-test-results', 'ip-medical-certificate', 'ip-due-collection', 'ip-discharge-cancellation'].includes(path)) {
      this.activeModule = 'in-patient';
    } else if (['rad-charges', 'rad-diagnostic-test'].includes(path)) {
      this.activeModule = 'rad';
    } else if (['lab-charges', 'lab-due-collection', 'lab-registration', 'lab-report-status', 'lab-test-cancellation', 'lab-test-details'].includes(path)) {
      this.activeModule = 'soft';
    } else if (['appointments', 'book-apt', 'apt-list'].includes(path)) {
      this.activeModule = 'out';
    } else if (['procedures', 'service', 'referral-doctor', 'procedure-charges', 'user-screen-settings', 'service-charge', 'user-report-settings'].includes(path)) {
      this.activeModule = 'app';
    } else if (path === 'acc-transactions') {
      this.activeModule = 'acc';
    } else if (path === 'reports') {
      this.activeModule = 'rep';
    }

    this.updateTitles(path);
  }

  private updateTitles(screen: string) {
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

  onGlobalSave() {
    this.sharedState.triggerSave();
  }

  ngOnDestroy() {
    if (this.timeInterval) clearInterval(this.timeInterval);
    if (this.routeSub) this.routeSub.unsubscribe();
  }

  updateDateTime() {
    const now = new Date();
    this.currentDate = now.toLocaleDateString('en-GB');
    this.currentTime = now.toLocaleTimeString('en-GB');
  }

  setModule(module: string) {
    this.activeModule = module;
    const defaults: { [key: string]: string } = {
      'rad': 'diagnostic/radiology',
      'soft': 'diagnostic/laboratory',
      'out': 'doctor/appointments',
      'in-patient': 'patient/list',
      'app': 'app/procedures',
      'acc': 'billing/accounting',
      'rep': 'batch/reports'
    };
    this.setScreen(defaults[module] || 'dashboard');
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
          { id: 'patient/list', label: 'In Patient List', icon: 'ph-users' },
          { id: 'patient/admission', label: 'IP Admission', icon: 'ph-user-plus' }
          // Note: Other sub-pages can be added as routes in PatientModule later if needed
        ];
      case 'rad':
        return [
          { id: 'diagnostic/radiology', label: 'Charges', icon: 'ph-currency-dollar' },
          { id: 'diagnostic/rad-diagnostic-test', label: 'Diagnostic Test', icon: 'ph-test-tube' },
        ];
      case 'soft':
        return [
          { id: 'diagnostic/laboratory', label: 'Registration', icon: 'ph-user-plus' },
          { id: 'diagnostic/lab-charges', label: 'Charges', icon: 'ph-currency-dollar' },
          { id: 'diagnostic/lab-due-collection', label: 'Lab Due Collection', icon: 'ph-money' },
          { id: 'diagnostic/lab-report-status', label: 'Report Status', icon: 'ph-file-search' },
          { id: 'diagnostic/lab-test-cancellation', label: 'Test Cancellation', icon: 'ph-x-circle' },
          { id: 'diagnostic/lab-test-details', label: 'Test Details', icon: 'ph-list-magnifying-glass' },
        ];
      case 'out':
        return [
          { id: 'doctor/appointments', label: 'Apt Dashboard', icon: 'ph-chart-pie' }
        ];
      case 'app':
        return [
          { id: 'app/procedures', label: 'Procedures', icon: 'ph-list-dashes' },
          { id: 'app/service', label: 'Service', icon: 'ph-gear' },
          { id: 'app/referral-doctor', label: 'Referral Doctor', icon: 'ph-user-md' },
          { id: 'app/procedure-charges', label: 'Procedure Charges', icon: 'ph-currency-dollar' },
          { id: 'app/user-screen-settings', label: 'User Screen Settings', icon: 'ph-monitor' },
          { id: 'app/service-charge', label: 'Service Charge', icon: 'ph-receipt' },
          { id: 'app/user-report-settings', label: 'User Report Settings', icon: 'ph-file-text' }
        ];
      case 'acc':
        return [
          { id: 'billing/accounting', label: 'Transactions', icon: 'ph-arrows-left-right' },
        ];
      case 'rep':
        return [
          { id: 'batch/reports', label: 'Reports', icon: 'ph-chart-line' },
        ];
      default:
        return [{ id: 'dashboard', label: 'Dashboard', icon: 'ph-chart-pie' }];
    }
  }

  setScreen(screen: string) {
    this.activeScreen = screen.split('/').pop() || screen;
    this.router.navigate([`/${screen}`]);
  }

  logout() {
    this.router.navigate(['/login']);
  }
}
