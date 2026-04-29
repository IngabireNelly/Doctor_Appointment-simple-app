import { useState,  useEffect } from "react";
import axios from "axios";

const API_URL = "http://localhost:8098/api/doctors"

function Doctors() {
    const [doctors, setDoctors] = useState([])

    const [fullname, setFullname] = useState("")
    const [specialization, setSpecialization] = useState("")
    const [department, setDepartment] = useState("")
    const [availability, setAvailability] = useState("")

    const [message, setMessage] = useState("")

    const fetchDoctors = async () => {
        try {
            const response = await axios.get(API_URL)
            setDoctors(response.data)
        } catch (error) {
            console.error("Error fetching doctors:", error)
        }   
    }

    
useEffect(() => {
    const loadData = async () => {
        await fetchDoctors();
    };
    loadData();
}, []);
    
    const createDoctor = async () => {
        try {
            await axios.post(API_URL, {
                fullname: fullname,
                specialization: specialization,
                department: department,
                available: availability
            })
            setMessage("Doctor created successfully!")

            setFullname("")
            setSpecialization("")
            setDepartment("")
            setAvailability("")

            fetchDoctors()
        } catch (error) {
            console.error("Error creating doctor:", error)
            setMessage("Failed to create doctor.")
        }
        }

     const deleteDoctor = async (id) => {
        try {
            await axios.delete(API_URL +"/" + id)
            setMessage("Doctor deleted successfully!")
            fetchDoctors()
        } catch (error) {
            console.error("Error deleting doctor:", error)
            setMessage("Failed to delete doctor.")
        }
    }

    return (
        <div>
            <h2>Doctors</h2>

            {message && <p>{message}</p>}
            <input
                type="text"
                placeholder="Full Name"
                value={fullname}
                onChange={(e) => setFullname(e.target.value)}
            />

            <input
                type="text"
                placeholder="Specialization"
                value={specialization}
                onChange={(e) => setSpecialization(e.target.value)}
            />

            <input  
                type="text"
                placeholder="Department"
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
            />

            <label>
                Available:
                <input
                    type="checkbox"
                    checked={availability}
                    onChange={(e) => setAvailability(e.target.checked)}
                />
                
                </label>   

            <button onClick={createDoctor}>Create Doctor</button>

            <h3>Doctor List</h3>
            <table>
                <thead style={{ backgroundColor: "#f2f2f2" }}>
                    <tr>
                        <th>Full Name</th>
                        <th>Specialization</th>
                        <th>Department</th>
                        <th>Availability</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {doctors.map((doctor) => (
                        <tr key={doctor.id}>
                            <td>{doctor.fullname}</td>
                            <td>{doctor.specialization}</td>
                            <td>{doctor.department}</td>
                            <td>{doctor.available ? "Yes" : "No"}</td>
                            <td>
                                <button onClick={() => deleteDoctor(doctor.id)}>Delete</button>
                            
                            </td>
                        </tr>
                    ))}
                </tbody>


            </table>

        </div>
    )
}

export default Doctors
