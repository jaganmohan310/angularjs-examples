
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
    selector: 'radiology',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './radiology.html',
    styleUrls: ['./radiology.css']
})
export class Radiology implements OnInit {
    currentView: string = 'charges'; // 'charges' | 'diagnostic-test'

    // Data Lists
    departments = ['AUDIOLOGY', 'CT SCAN', 'MRI', 'NUEROLOGY', 'RADIOLOGY', 'ULTRASONOGRAPHY', 'ULTRASOUND'];
    organizationTypes = ['Hospital', 'TPA', 'Insurance'];
    investigations = [
        'USG HIP JOINT (SF)',
        'USG MAMOGRAM (BOTH BREAST)',
        'USG MAMOGRAM (SINGLE BREAST)',
        'USG NUCLEAR EC SCAN',
        'USG OBST SCAN WITH DOPPLER',
        'USG PELVIC RECTAL CONTRAAST',
        'USG SCAN GUIDED PHEREAL TAPPING',
        'USG SCROTUM',
        'USG SMALL PART',
        'USG SOUND SCREENING',
        'USG THERAPEUTIC ASPIRATION',
        'USG USG CYSTOGRAM',
        'USGSCROTUM',
        'X RAY WRIST AP/LAT',
        'X-RAY',
        'X-RAY ABDOMEN ERECT POSITION',
        'X-RAY ABDOMEN ERECT POSTITION [ BED SIDE]',
        'X-RAY ANKLE AP VIEW',
        'X-RAY ANKLE AP/LAT',
        'X-RAY ANKLE JOINT AP&LAT [BEDSIDE]'
    ];

    // Forms
    chargesForm = {
        department: 'RADIOLOGY',
        investigation: '',
        orgType: 'Hospital',
        copyTo: false,
        targetOrgType: 'Hospital',
        hospitalShare: '',
        doctorShare: '',
        increment: 0
    };

    diagnosticTestForm = {
        testCode: '',
        testName: '',
        description: '',
        instruction: '',
        department: '',
        active: true,
        reagent: '',
        quantity: ''
    };

    constructor(private router: Router, private route: ActivatedRoute) { }

    ngOnInit() {
        // Determine view based on URL
        const path = this.route.snapshot.url[0]?.path;
        if (path === 'rad-charges') this.currentView = 'charges';
        else if (path === 'rad-diagnostic-test') this.currentView = 'diagnostic-test';
    }

    // Navigation (if needed internal)
    setView(view: string) {
        this.currentView = view;
    }
}
