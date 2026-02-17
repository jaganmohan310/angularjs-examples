import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
// import { delay } from 'rxjs/operators';

export interface Patient {
    sno: number;
    ipNo: string;
    doa: string;
    days: number;
    name: string;
    age: string;
    gender: string;
    bed: string;
    room: string;
    referType: string;
}

@Injectable({
    providedIn: 'root'
})
export class InPatientService {
    private mockPatients: Patient[] = [
        { sno: 1, ipNo: '535', doa: '06/02/2021 21:38:50', days: 1, name: 'NAGAIAH G', age: '46 Yrs', gender: 'Male', bed: 'ICU-01-06', room: 'ICU', referType: 'Direct' },
        { sno: 2, ipNo: '534', doa: '06/02/2021 18:05:11', days: 1, name: 'BAIRI GANGADHAR', age: '65 Yrs', gender: 'Male', bed: 'ICU-01-05', room: 'ICU', referType: 'Direct' },
        { sno: 3, ipNo: '530', doa: '06/02/2021 00:24:30', days: 2, name: 'UZER BEE', age: '35 Yrs', gender: 'Female', bed: 'ICU-01-04', room: 'ICU', referType: 'Direct' },
        { sno: 4, ipNo: '529', doa: '05/02/2021 22:04:16', days: 2, name: 'RAMESH V', age: '50 Yrs', gender: 'Male', bed: 'ICU-01-03', room: 'ICU', referType: 'Direct' },
        { sno: 5, ipNo: '526', doa: '05/02/2021 18:20:49', days: 2, name: 'THAMPULURI RAMADEVI', age: '45 Yrs', gender: 'Female', bed: 'ICU-01-02', room: 'ICU', referType: 'Direct' },
        { sno: 6, ipNo: '520', doa: '04/02/2021 11:56:22', days: 4, name: 'NAINIVAR GANGARAM', age: '65 Yrs', gender: 'Male', bed: 'ICU-01-01', room: 'ICU', referType: 'Direct' },
        { sno: 7, ipNo: '517', doa: '03/02/2021 11:54:39', days: 5, name: 'LAXMAN MALLE', age: '21 Yrs', gender: 'Male', bed: 'GW-01-04', room: 'GENERAL WARD', referType: 'Direct' },
        { sno: 8, ipNo: '499', doa: '28/01/2021 18:23:20', days: 10, name: 'NANGI MUTHYAM', age: '40 Yrs', gender: 'Male', bed: 'ICU-02-04', room: 'ICU', referType: 'Direct' },
    ];

    constructor() { }

    getPatients(): Observable<Patient[]> {
        // Removed delay for immediate loading
        return of(this.mockPatients);
    }

    getBillDetails(ipNo: string): Observable<any> {
        return of({
            patientName: 'RODOLLA DEVANAND',
            ipNo: ipNo,
            mrNo: '1667',
            doa: '01/02/2021',
            bills: [
                { sno: 1, billNo: 'B-1001', date: '01/02/2021', particulars: 'Bed Charges', amount: 5000, discount: 0, net: 5000 },
                { sno: 2, billNo: 'B-1002', date: '02/02/2021', particulars: 'Lab Investigation', amount: 2500, discount: 200, net: 2300 },
                { sno: 3, billNo: 'B-1003', date: '03/02/2021', particulars: 'Pharmacy', amount: 3000, discount: 0, net: 3000 }
            ],
            totalAmount: 10500,
            totalDiscount: 200,
            totalNet: 10300
        });
    }

    admitPatient(data: any): Observable<boolean> {
        console.log('API Call: Admit Patient', data);
        return of(true);
    }

    saveSettlement(data: any): Observable<boolean> {
        console.log('API Call: Save Settlement', data);
        return of(true);
    }
}
