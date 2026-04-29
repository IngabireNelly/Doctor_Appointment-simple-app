import { useState } from 'react'
import Doctors from './components/Doctors'
import Appointment from './components/Appointment'

function App() {
  const [page, setPage] = useState("Doctors")

  return (
   <div>

    <button onClick={() => setPage("Doctors")}>Doctors</button>
    <button onClick={() => setPage("Appointment")}>Appointment</button>

    {page === "Doctors" && <Doctors />}
    {page === "Appointment" && <Appointment />}
   </div>
  )
}

export default App
