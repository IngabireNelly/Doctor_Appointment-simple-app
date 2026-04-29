# Doctor_Appointment-simple-app
================================================================
   DOCTORS APPOINTMENT SYSTEM — SETUP & RUN INSTRUCTIONS
================================================================

This project has two parts:
  - Backend  : Spring Boot (Java) — folder: demo-test/demo
  - Frontend : React + Vite     — folder: DoctorsFrontend/frontend

================================================================
  REQUIREMENTS — INSTALL BEFORE STARTING
================================================================

  Backend:
    - Java JDK 17 or higher         (https://adoptium.net)
    - Maven 3.8+                    (https://maven.apache.org)
    - PostgreSQL 14+                (https://www.postgresql.org)

  Frontend:
    - Node.js 18+                   (https://nodejs.org)
    - npm (comes with Node.js)

================================================================
  STEP 1 — SET UP THE DATABASE (PostgreSQL)
================================================================

  1. Open pgAdmin or any PostgreSQL client (e.g., DBeaver)

  2. Create a new database named:
       Doctor_AppointmentDB

  3. Make sure your PostgreSQL credentials match what is in
     the backend config file:
       File: demo-test/demo/src/main/resources/application.properties

       spring.datasource.url=jdbc:postgresql://localhost:5432/Doctor_AppointmentDB
       spring.datasource.username=postgres
       spring.datasource.password=YOUR_POSTGRES_PASSWORD

     Update application.properties with your actual PostgreSQL
     password before running the backend.

  NOTE: Tables are created automatically by Hibernate on first run
        (spring.jpa.hibernate.ddl-auto=update), so you do NOT
        need to run any SQL scripts manually.

================================================================
  STEP 2 — RUN THE BACKEND (Spring Boot)
================================================================

  1. Open a terminal and navigate to the backend project folder:

       cd demo-test/demo

  2. Build and run the project using Maven:

       ./mvnw spring-boot:run          (Mac / Linux)
       mvnw.cmd spring-boot:run        (Windows)

     OR if you have Maven installed globally:

       mvn spring-boot:run

  3. Wait until you see this message in the terminal:
       Started DemoApplication in X.XXX seconds

  4. The backend will be running at:
       http://localhost:8098

  Available API endpoints:
    GET    http://localhost:8098/api/doctors
    POST   http://localhost:8098/api/doctors
    PUT    http://localhost:8098/api/doctors/{id}
    DELETE http://localhost:8098/api/doctors/{id}

    GET    http://localhost:8098/api/appointments
    POST   http://localhost:8098/api/appointments
    DELETE http://localhost:8098/api/appointments/{id}

================================================================
  STEP 3 — RUN THE FRONTEND (React + Vite)
================================================================

  1. Open a NEW terminal (keep the backend running)
     and navigate to the frontend folder:

       cd DoctorsFrontend/frontend

  2. Install dependencies (only needed the first time):

       npm install

  3. Start the development server:

       npm run dev

  4. Vite will display a local URL, usually:
       http://localhost:5173

  5. Open that URL in your browser.
     You should see two buttons: "Doctors" and "Appointment"

================================================================
  STEP 4 — USING THE APPLICATION
================================================================

  Doctors Page:
    - Fill in Full Name, Specialization, Department
    - Check "Available" if the doctor is available
    - Click "Create Doctor" to save
    - Doctors appear in the table below
    - Click "Delete" to remove a doctor

  Appointment Page:
    - Fill in Patient Name and Patient ID
    - Select a Doctor from the dropdown
    - Pick an Appointment Date
    - Select a Time Slot (08:00-09:00 | 10:00-11:00 | 14:00-15:00)
    - Click "Book Appointment" to save
    - Appointments appear in the table below
    - Click "Delete" to cancel an appointment

================================================================
  TROUBLESHOOTING
================================================================

  Problem : Backend fails to start
  Solution: Check that PostgreSQL is running and the database
            "Doctor_AppointmentDB" exists. Verify credentials in
            application.properties match your PostgreSQL setup.

  Problem : Frontend shows no doctors in dropdown
  Solution: Make sure the backend is running on port 8098
            before opening the frontend.

  Problem : CORS error in browser console
  Solution: The backend already has @CrossOrigin(origins = "*")
            on all controllers, so this should not happen.
            If it does, restart the backend.

  Problem : npm install fails
  Solution: Make sure you are using Node.js version 18 or higher.
            Run: node --version   to check.

  Problem : Port 8098 already in use
  Solution: Change the port in application.properties:
              server.port=8099
            Then update the API URLs in both frontend files:
              src/components/Doctors.jsx
              src/components/Appointment.jsx

================================================================
  PROJECT STRUCTURE
================================================================

  demo-test/demo/
  └── src/main/java/UserManager/
      ├── controller/
      │   ├── DoctorController.java
      │   └── AppointmentController.java
      ├── service/
      │   ├── DoctorService.java
      │   └── AppointmentService.java
      ├── repository/
      │   ├── DoctorRepository.java
      │   └── AppointmentRepository.java
      ├── model/
      │   ├── Doctor.java
      │   └── Appointment.java
      └── DemoApplication.java

  DoctorsFrontend/frontend/
  └── src/
      ├── components/
      │   ├── Doctors.jsx
      │   └── Appointment.jsx
      ├── App.jsx
      └── main.jsx

================================================================
  END OF README
================================================================
