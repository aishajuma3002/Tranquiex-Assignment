<h1 align="center" style="color:#4CAF50; font-size: 40px;">🌟 Your Task Manager 🌟</h1>
<h3 align="center" style="color:gray;">Empowering Your Career Journey with Modern Way</h3>

<p align="center" style="font-size: 16px;">
A modern, full-stack task management web application built with Mern Stack. The app allows users to register, log in, manage tasks (create, update, delete, mark as completed), and receive email notifications for task activities. It features a responsive, dark-themed UI with a glowing particle background effect, hover animations, and seamless navigation.
</p>
<li><a href="https://task-manager.netlify.app/">LIVE DEMO</a></li>

<hr>

<h2>📚 Table of Contents</h2>

<ul>
  <li><a href="#about">About the Project</a></li>
  <li><a href="#structure">Folder & File Structure</a></li>
  <li><a href="#tech">Tech Stack</a></li>
  <li><a href="#dependencies">All Dependencies</a></li>
  <li><a href="#setup">How to Use This Project</a></li>
  <li><a href="#features">Key Features</a></li>
  <li><a href="#enhancements">Future Enhancements</a></li>
  <li><a href="#contact">Contact Me</a></li>
  <li><a href="#creator">Created By</a></li>
  <li><a href="#screenshots">Preview</a></li>
</ul>

<hr>

<h2 id="about">🧭 About the Project</h2>

<p>
Task Manager is a user-friendly platform for managing tasks efficiently. Built with the MERN stack, it features secure authentication, task CRUD operations, and email notifications via Nodemailer. The frontend boasts a responsive, dark-themed UI, making it both functional and visually stunning.
</p>

<ul>
  <li>Secure user registration and login with OTP verification.</li>
  <li>Create, update, delete, and track tasks with deadlines and status.</li>
  <li>Receive email notifications for task creation and status changes.</li>
  <li>Contact form integrated with Getform.io for feedback.</li>
  <li>Responsive design with a modern navbar and particle animations.</li>
</ul>

<hr>

<h2 id="structure">🗂️ Folder & File Structure</h2>

<pre>
TRANQIX/
├── BACKEND/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   ├── taskController.js
│   │   └── userController.js
│   ├── middleware/
│   │   └── auth.js
│   ├── models/
│   │   ├── Task.js
│   │   └── User.js
│   ├── routes/
│   │   ├── taskRoutes.js
│   │   └── userRoutes.js
│   ├── utils/
│   │   └── sendEmail.js
│   ├── .env
│   ├── server.js
│   └── package.json
├── FRONTEND/
│   ├── src/
│   │   ├── Components/
│   │   │   ├── CreateTask.jsx
│   │   │   ├── Navbar.jsx
│   │   │   ├── Contact.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Home.jsx
│   │   │   ├── Login.jsx
│   │   │   └── Register.jsx
│   │   ├── App.jsx
│   │   └── index.css
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
└── README.md
</pre>

<hr>

<h2 id="tech">🧰 Tech Stack</h2>

<table>
  <tr><th>Part</th><th>Technology</th></tr>
  <tr><td>Frontend</td><td>React, Vite, Tailwind CSS</td></tr>
  <tr><td>Backend</td><td>Node.js, Express.js, MongoDB</td></tr>
  <tr><td>Deployment</td><td>Netlify (Frontend), Render (Backend)</td></tr>
</table>

<hr>

<h2 id="dependencies">📦 All Dependencies</h2>

<h3>🔧 Backend</h3>

<table>
<tr><th>Package</th><th>Version</th></tr>
<tr><td>bcryptjs</td><td>^3.0.2</td></tr>
<tr><td>cors</td><td>^2.8.5</td></tr>
<tr><td>dotenv</td><td>^17.2.2</td></tr>
<tr><td>express</td><td>^5.1.0</td></tr>
<tr><td>jsonwebtoken</td><td>^9.0.2</td></tr>
<tr><td>mongoose</td><td>^8.18.0</td></tr>
<tr><td>nodemailer</td><td>^7.0.6</td></tr>
<tr><td>nodemon</td><td>^3.1.10</td></tr>
</table>

<h3>🎨 Frontend</h3>

<table>
<tr><th>Package</th><th>Version</th></tr>
<tr><td>@tailwindcss/vite</td><td>^4.1.12</td></tr>
<tr><td>axios</td><td>^1.11.0</td></tr>
<tr><td>lucide-react</td><td>^0.542.0</td></tr>
<tr><td>react</td><td>^19.1.1</td></tr>
<tr><td>react-dom</td><td>^19.1.1</td></tr>
<tr><td>react-icons</td><td>^5.5.0</td></tr>
<tr><td>react-router-dom</td><td>^7.8.2</td></tr>
<tr><td>tailwindcss</td><td>^4.1.12</td></tr>
</table>

<hr>

<h2 id="setup">⚙️ How to Use This Project</h2>

<h3>📋 Prerequisites</h3>
<ul>
  <li>Node.js (v18 or higher)</li>
  <li>MongoDB (local or cloud instance)</li>
  <li>Email service credentials (e.g., Nodemailer)</li>
</ul>

<h3>🧩 Backend</h3>

```bash
cd BACKEND
npm install
# Create a .env file with:
# MONGO_URI=<your-mongodb-uri>
# JWT_SECRET=<your-jwt-secret>
# EMAIL_USER=<your-email-service-email>
# EMAIL_PASS=<your-email-service-password>
npm run dev

🎨 Frontend

cd FRONTEND
npm install

npm run dev

🌐 Open Your Browser

http://localhost:5173

The backend typically runs on http://localhost:5000 (configurable in server.js).
```
<hr> 
<h2 id="features">✨ Key Features</h2>
 <ul>
  <li>🔒 Secure Authentication: Register and log in with OTP verification via email.</li>
   <li>📋 Task Management: Create, update, delete, and mark tasks as completed or pending.</li>
    <li>📧 Email Notifications: Receive emails for task creation, status changes, and OTP verification.</li>
     <li>📬 Contact Form: Submit feedback via Getform.io with a responsive, glowing form design.</li>
      <li>📱 Responsive Design: Seamless experience across mobile and desktop with a dynamic navbar.</li>
  </ul> 
        <hr> 
        <h2 id="enhancements">🚀 Future Enhancements</h2>
         <ul>
          <li>📱 Launch Android/iOS app</li>
           <li>📊 Task analytics dashboard with charts and insights.</li> 
           <li>🤖 AI-powered task prioritization using Gemini API.</li> 
           <li>🔗 Blockchain traceability</li>
            </ul> 
            <hr> 
            <h2 id="contact">📬 Contact Me</h2>
             <ul>
              <li><strong>Name:</strong> Aman Gupta</li>
               <li><strong>Email:</strong>  <a href="ag0567688@gmail.com">Send me an email</a> </li>
                <li><strong>LinkedIn:</strong> <a href="https://linkedin.com/in/amangupta9454">LINKEDIN</a></li>
                 <li><strong>GitHub:</strong> <a href="https://github.com/amangupta9454">GITHUB</a></li>
                 <li><strong>Portfolio:</strong> <a href="http://gupta-aman-portfolio.netlify.app/">PORTFOLIO</a></li>
                  </ul> 
                  <hr>
                   <h2 id="creator">👨‍💻 Created By</h2> 
                   <p><strong>Aman Gupta</strong><br>B.Tech 3rd year Student | HIET Ghaziabad<br>Passionate about building AI-driven solutions to empower career growth 🚀</p>
                    <p align="center">⭐ If you found this project helpful, give it a star!</p>

<div style="font-family: Arial, sans-serif; color: #333; line-height: 1.6;">
    <h2 id="screenshots" style="color: #4CAF50; font-size: 28px; font-weight: bold; margin-bottom: 20px;">📸 Screenshots</h2>
    <p style="font-size: 16px; color: #666; margin-bottom: 20px;">
        Explore the Task Manager's interface through these screenshots, showcasing the dark-themed UI, particle effects, and key features.
    </p>
    <div style="display: flex; flex-wrap: wrap; gap: 20px; margin-bottom: 20px;">
        <div style="flex: 1 1 280px; background-color: #fff; padding: 15px; text-align: center; border: 1px solid #ddd;">
            <h3 style="color: #333; font-size: 20px; font-weight: bold; margin: 0 0 10px;">Home Page</h3>
            <img src="https://res.cloudinary.com/dgtyqhtor/image/upload/v1756867885/Screenshot_2025-09-03_082010_f8m7bi.png" alt="Home Page" style="max-width: 100%; height: auto; border: 1px solid #ddd;">
        </div>
        <div style="flex: 1 1 280px; background-color: #fff; padding: 15px; text-align: center; border: 1px solid #ddd;">
            <h3 style="color: #333; font-size: 20px; font-weight: bold; margin: 0 0 10px;">Create Tasks</h3>
            <img src="https://res.cloudinary.com/dgtyqhtor/image/upload/v1756868862/Screenshot_2025-09-03_083652_eitzzh.png" alt="Create Task" style="max-width: 100%; height: auto; border: 1px solid #ddd;">
        </div>
        <div style="flex: 1 1 280px; background-color: #fff; padding: 15px; text-align: center; border: 1px solid #ddd;">
            <h3 style="color: #333; font-size: 20px; font-weight: bold; margin: 0 0 10px;">Dashboard</h3>
            <img src="https://res.cloudinary.com/dgtyqhtor/image/upload/v1756867885/Screenshot_2025-09-03_082103_mv6yak.png" alt="Dashboard Page" style="max-width: 100%; height: auto; border: 1px solid #ddd;">
        </div>
        <div style="flex: 1 1 280px; background-color: #fff; padding: 15px; text-align: center; border: 1px solid #ddd;">
            <h3 style="color: #333; font-size: 20px; font-weight: bold; margin: 0 0 10px;">Register</h3>
            <img src="https://res.cloudinary.com/dgtyqhtor/image/upload/v1756867886/Screenshot_2025-09-03_082039_azrcof.png" alt="Register Page" style="max-width: 100%; height: auto; border: 1px solid #ddd;">
        </div>
        <div style="flex: 1 1 280px; background-color: #fff; padding: 15px; text-align: center; border: 1px solid #ddd;">
            <h3 style="color: #333; font-size: 20px; font-weight: bold; margin: 0 0 10px;">Login Page</h3>
            <img src="https://res.cloudinary.com/dgtyqhtor/image/upload/v1756867885/Screenshot_2025-09-03_082029_tfsnbj.png" alt="Login" style="max-width: 100%; height: auto; border: 1px solid #ddd;">
        </div>
         <div style="flex: 1 1 280px; background-color: #fff; padding: 15px; text-align: center; border: 1px solid #ddd;">
            <h3 style="color: #333; font-size: 20px; font-weight: bold; margin: 0 0 10px;">Contact Us</h3>
            <img src="https://res.cloudinary.com/dgtyqhtor/image/upload/v1756867885/Screenshot_2025-09-03_082050_fqgnfx.png" alt="Contact" style="max-width: 100%; height: auto; border: 1px solid #ddd;">
        </div>
    </div>
</div>

<hr>

