package com.hms.hospital.service;

import java.util.List;
import com.hms.hospital.entity.Patient;

public interface PatientService {
    Patient addPatient(Patient patient);

    List<Patient> getAllPatients();

    Patient getPatientById(Long patientId);

    Patient updatePatient(Long patientId, Patient patientDetails);

    void deletePatient(Long patientId);
}
