import { useState, useEffect } from "react";
import axios from "axios";

const APPOINTMENTS_API = "http://localhost:8098/api/appointments";
const DOCTORS_API = "http://localhost:8098/api/doctors";

const Appointment = () => {
    const [appointments, setAppointments] = useState([]);
    const [patientName, setPatientName] = useState("");
    const [patientId, setPatientId] = useState("");
    const [doctorId, setDoctorId] = useState("");
    const [appointmentDate, setAppointmentDate] = useState("");
    const [timeSlot, setTimeSlot] = useState("");
    const [doctors, setDoctors] = useState([]);
    const [message, setMessage] = useState("");

    const timeSlots = ["08:00-09:00", "10:00-11:00", "14:00-15:00"];

    const fetchDoctors = async () => {
        try {
            const response = await axios.get(DOCTORS_API);
            setDoctors(response.data);
        } catch (error) {
            console.error("Error fetching doctors:", error);
        }
    };

    const fetchAppointments = async () => {
        try {
            const response = await axios.get(APPOINTMENTS_API);
            setAppointments(response.data);
        } catch (error) {
            console.error("Error fetching appointments:", error);
        }
    };  

    const handleAppointmentSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post(APPOINTMENTS_API, { 
                patientName,
                patientId,
                doctor: { id: doctorId },
                appointmentDate,
                timeSlot,
            });
            setMessage("Appointment booked successfully!");
            fetchAppointments();
            setPatientName("");
            setPatientId("");
            setDoctorId("");
            setAppointmentDate("");
            setTimeSlot("");
        } catch (error) {
            console.error("Error booking appointment:", error);
            setMessage("Failed to book appointment. Please try again.");
        }
    };

    const handleDeleteAppointment = async (appointmentId) => {
        try {
            await axios.delete(`${APPOINTMENTS_API}/${appointmentId}`);
            setMessage("Appointment deleted successfully!");
            fetchAppointments();
        } catch (error) {
            console.error("Error deleting appointment:", error);
            setMessage("Failed to delete appointment. Please try again.");
        }
    };

useEffect(() => {
    const loadData = async () => {
        await fetchDoctors();
        await fetchAppointments();
    };
    loadData();
}, []);

    return (
        <div>
            <h2>Book an Appointment</h2>
            {message && <p>{message}</p>}
            <input
                type="text"
                placeholder="Patient Name"
                value={patientName}
                onChange={(e) => setPatientName(e.target.value)}
            />
            <input
                type="text"
                placeholder="Patient ID"
                value={patientId}
                onChange={(e) => setPatientId(e.target.value)}
            />
            <select value={doctorId} onChange={(e) => setDoctorId(e.target.value)}>
                <option value="">Select Doctor</option>
                {doctors.map((doctor) => (
                    <option key={doctor.id} value={doctor.id}>
                        {doctor.fullname} - {doctor.specialization}
                    </option>
                ))}
            </select>
            <input
                type="date"
                value={appointmentDate}
                onChange={(e) => setAppointmentDate(e.target.value)}
            />
            <select value={timeSlot} onChange={(e) => setTimeSlot(e.target.value)}>
                <option value="">Select Time Slot</option>
                {timeSlots.map((slot) => (
                    <option key={slot} value={slot}>
                        {slot}
                    </option>
                ))}
            </select>
            <button onClick={handleAppointmentSubmit}>Book Appointment</button>

            <h2>Existing Appointments</h2>
            <table>
                <thead>
                    <tr>
                        <th>Patient Name</th>
                        <th>Patient ID</th>
                        <th>Doctor</th>
                        <th>Appointment Date</th>
                        <th>Time Slot</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {appointments.map((appointment) => (
                        <tr key={appointment.id}>
                            <td>{appointment.patientName}</td>
                            <td>{appointment.patientId}</td>
                            <td>{appointment.doctor?.fullname}</td>
                            <td>{appointment.appointmentDate}</td>
                            <td>{appointment.timeSlot}</td>
                            <td>
                                <button onClick={() => handleDeleteAppointment(appointment.id)}>
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>  
    );         
};             

export default Appointment;