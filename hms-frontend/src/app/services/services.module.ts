import { NgModule } from '@angular/core';
import { InPatientService } from './patient.service';

@NgModule({
    providers: [
        InPatientService,
        // Add other DAO services here (PatientService, DoctorService, etc.)
    ]
})
export class ServicesModule { }
