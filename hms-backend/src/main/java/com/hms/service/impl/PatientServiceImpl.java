package com.hms.service.impl;

import com.hms.model.Patient;
import com.hms.service.PatientService;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class PatientServiceImpl implements PatientService {

    @Override
    public List<Patient> getAllPatients() {
        List<Patient> patients = new ArrayList<>();
        patients.add(new Patient("1", "IP/2026/001", "12-02-2026", "0", "ANKAM BOJANNA", "65Y/0M/0D", "Male", "FB-101", "First Floor", "Direct"));
        patients.add(new Patient("2", "IP/2026/002", "11-02-2026", "1", "AR SUNIL KUMAR", "32Y/5M/10D", "Male", "FB-102", "First Floor", "Referral"));
        patients.add(new Patient("3", "IP/2026/003", "10-02-2026", "2", "BUDARI AMBAVVA", "70Y/0M/0D", "Female", "FB-103", "First Floor", "Direct"));
        patients.add(new Patient("4", "IP/2026/004", "09-02-2026", "3", "AGARVAL PQUSH", "45Y/2M/15D", "Male", "FB-104", "First Floor", "Direct"));
        patients.add(new Patient("5", "IP/2026/005", "08-02-2026", "4", "K ANIL", "28Y/11M/5D", "Male", "FB-105", "First Floor", "Org"));
        return patients;
    }
}
