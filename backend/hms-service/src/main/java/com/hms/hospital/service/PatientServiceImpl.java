package com.hms.hospital.service;

import com.hms.hospital.entity.Patient;
import com.hms.hospital.exception.ResourceNotFoundException;
import com.hms.hospital.repository.PatientRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PatientServiceImpl implements PatientService {

    private final PatientRepository patientRepository;

    public PatientServiceImpl(PatientRepository patientRepository) {
        this.patientRepository = patientRepository;
    }

    @Override
    public Patient addPatient(Patient patient) {
        return patientRepository.save(patient);
    }

    @Override
    public List<Patient> getAllPatients() {
        return patientRepository.findAll();
    }

    @Override
    public Patient getPatientById(Long patientId) {
        return patientRepository.findById(patientId)
                .orElseThrow(() -> new ResourceNotFoundException("Patient not found with id: " + patientId));
    }

    @Override
    public Patient updatePatient(Long patientId, Patient patientDetails) {
        Patient patient = getPatientById(patientId);

        patient.setFirstName(patientDetails.getFirstName());
        patient.setLastName(patientDetails.getLastName());
        patient.setGender(patientDetails.getGender());
        patient.setDateOfBirth(patientDetails.getDateOfBirth());
        patient.setPhoneNumber(patientDetails.getPhoneNumber());
        patient.setEmailId(patientDetails.getEmailId());
        patient.setAddress(patientDetails.getAddress());
        patient.setBloodGroup(patientDetails.getBloodGroup());
        patient.setEmergencyContact(patientDetails.getEmergencyContact());
        patient.setStatus(patientDetails.getStatus());

        return patientRepository.save(patient);
    }

    @Override
    public void deletePatient(Long patientId) {
        Patient patient = getPatientById(patientId);
        patientRepository.delete(patient);
    }
}
