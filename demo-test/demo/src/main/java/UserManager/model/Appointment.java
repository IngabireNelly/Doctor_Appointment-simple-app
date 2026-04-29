package UserManager.model;

import jakarta.persistence.*;
import lombok.*;
import java.util.UUID;

@Entity
@Table(name = "appointments")
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter

public class Appointment {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;
     
    @Column(nullable = false)
    private String patientName;

    @Column(nullable = false)
    private String patientId;

    @ManyToOne
    @JoinColumn(name = "doctor_id", nullable = false)
    private Doctor doctor;
    
    private String appointmentDate;
    private String timeSlot;
    
}




//Doctor (id, fullName, specialization, department, available)

//(id, patientName,
//patientId, doctorId, appointmentDate, timeSlot).