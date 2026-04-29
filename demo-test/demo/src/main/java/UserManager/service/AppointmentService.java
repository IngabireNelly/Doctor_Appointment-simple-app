package UserManager.service;

import UserManager.model.Appointment;
import UserManager.model.Doctor;
import UserManager.repository.AppointmentRepository;
import UserManager.repository.DoctorRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.UUID;

@Service
public class AppointmentService {

    private final AppointmentRepository appointmentReppository;
    private final DoctorRepository doctorRepository;

    public AppointmentService(AppointmentRepository appointmentReppository, DoctorRepository doctorRepository) {
        this.appointmentReppository = appointmentReppository;
        this.doctorRepository = doctorRepository;
    }

    public List<Appointment> getAllAppointments() {
        return appointmentReppository.findAll();
    }

    public Appointment getAppointmentById(UUID id) {
        return appointmentReppository.findById(id).orElse(null);
    }

    public Appointment createAppointment(Appointment appointment) {
        UUID doctorId = appointment.getDoctor().getId();
        Doctor doctor = doctorRepository.findById(doctorId)
            .orElseThrow(() -> new ResponseStatusException(
                HttpStatus.NOT_FOUND, "Doctor not found with id: " + doctorId));
        appointment.setDoctor(doctor);
        return appointmentReppository.save(appointment);
    }

    public void deleteAppointment(UUID id) {
        appointmentReppository.deleteById(id);
    }
}