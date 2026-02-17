import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { delay, catchError } from 'rxjs/operators';

export interface Patient {
    sno: string | number;
    ipNo: string;
    doa: string;
    days: string | number;
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
    private apiUrl = '/api/patients';

    private mockPatients: Patient[] = [
        { sno: 1, ipNo: '535', doa: '06/02/2021 21:38:50', days: 1, name: 'NAGAIAH G', age: '46 Yrs', gender: 'Male', bed: 'ICU-01-06', room: 'ICU', referType: 'Direct' },
        { sno: 2, ipNo: '534', doa: '06/02/2021 18:05:11', days: 1, name: 'BAIRI GANGADHAR', age: '65 Yrs', gender: 'Male', bed: 'ICU-01-05', room: 'ICU', referType: 'Direct' }
    ];

    constructor(private http: HttpClient) { }

    getPatients(): Observable<Patient[]> {
        // Temporary/Mock Database Mode enabled by request
        return of(this.mockPatients).pipe(delay(500));
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
        }).pipe(delay(300));
    }

    admitPatient(data: any): Observable<boolean> {
        console.log('API Call: Admit Patient', data);
        return of(true).pipe(delay(800));
    }

    saveSettlement(data: any): Observable<boolean> {
        console.log('API Call: Save Settlement', data);
        return of(true).pipe(delay(1000));
    }
}
