package UserManager.model;
import jakarta.persistence.*;
import lombok.*;
import java.util.UUID;

@Entity
@Table(name = "Doctors")
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter

public class Doctor {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(nullable = false, unique = true)
    private String fullname;

    @Column(nullable = false)
    private String specialization;

    @Column(nullable = false)
    private String department;

    @Column(nullable = false)
    private Boolean available;
}

