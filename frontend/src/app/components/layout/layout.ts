import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

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
  activeModule = 'in';
  activeScreen = 'dashboard';
  workspaceTitle = 'Admission Statistics';

  modules = [
    { id: 'app', label: 'App Mgmt', icon: 'ph-squares-four' },
    { id: 'out', label: 'Out Patient', icon: 'ph-user' },
    { id: 'soft', label: 'Soft Lab', icon: 'ph-flask' },
    { id: 'in', label: 'In Patient', icon: 'ph-hospital' },
    { id: 'acc', label: 'Accounting', icon: 'ph-calculator' },
    { id: 'rep', label: 'Reports', icon: 'ph-chart-line' },
    { id: 'rad', label: 'Radiology', icon: 'ph-radioactive' },
  ];

  private timeInterval: any;

  constructor(private router: Router) { }

  ngOnInit() {
    this.updateDateTime();
    this.timeInterval = setInterval(() => this.updateDateTime(), 1000);
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
  }

  setScreen(screen: string) {
    this.activeScreen = screen;
    this.router.navigate([`/${screen}`]);

    const titleMap: { [key: string]: string } = {
      'dashboard': 'Admission Statistics',
      'admission': 'Registration',
      'cancellation': 'Consultation Cancellation',
      'patients': 'In-Patient List',
      'procedure': 'Procedure',
      'billing': 'Accounting',
      'discharge': 'Discharge Summary'
    };

    this.workspaceTitle = titleMap[screen] || 'Workspace';
  }

  logout() {
    this.router.navigate(['/login']);
  }
}
