package UserManager.service;

import UserManager.model.Doctor;
import UserManager.repository.DoctorRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service

public class DoctorService {
    private final DoctorRepository doctorRepository;

    public DoctorService(DoctorRepository doctorRepository) {
        this.doctorRepository = doctorRepository;
    }

    public List<Doctor> getAllDoctors() {
        return doctorRepository.findAll();
    }

    public Optional<Doctor> getDoctorById(UUID id) {
        return doctorRepository.findById(id);
    }

    public Optional<Doctor> getDoctorBySpecialization(String specialization) {
        return doctorRepository.findByspecialization(specialization);
    }

    public Doctor saveDoctor(Doctor doctor) {
        return doctorRepository.save(doctor);
    }

    public Doctor updateDoctor(UUID id, Doctor updatedDoctor) {
        return doctorRepository.findById(id)
                .map(doctor -> {
                    doctor.setFullname(updatedDoctor.getFullname());
                    doctor.setSpecialization(updatedDoctor.getSpecialization());
                    doctor.setDepartment(updatedDoctor.getDepartment());
                    doctor.setAvailable(updatedDoctor.getAvailable());

                    return doctorRepository.save(doctor);
                })
                .orElseThrow(() -> new RuntimeException("Doctor not found with id: " + id));
    }

    public void deleteDoctor(UUID id) {
        doctorRepository.deleteById(id);
    }


}
