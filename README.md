🕒 Time-Bot - Admin

Time-Bot is a modern AI-powered appointment scheduling platform that lets clients book, cancel, and reschedule appointments with admins (VIPs), interact with an AI assistant, and manage their profile. Built with React and Vite, Time-Bot delivers a seamless and intuitive user experience.

----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
🚀 Features
Client Features

📅 Book appointments with admins (VIPs)

📋 View and manage current & previous appointments

💬 Interact with AI Chat Assistant for booking, cancellation, or rescheduling

💳 Pay fees and receive admin IDs after payment

🔍 Search for VIPs by name or specialty

----------------------------------------------------------------------------------------------------------------------------------------------------------------------------

AI Chat Assistant

🗨️ Conversational interface to guide clients

📅 Book, cancel, or reschedule appointments

✅ Check VIP availability

🤖 Supports multiple AI providers (Claude & OpenAI)

----------------------------------------------------------------------------------------------------------------------------------------------------------------------------

Profile Management

👤 View personal and account information

✏️ Edit profile including avatar, phone number, and address

----------------------------------------------------------------------------------------------------------------------------------------------------------------------------

Navigation

🧭 Responsive navigation bar for quick access

🔒 Logout with confirmation modal

----------------------------------------------------------------------------------------------------------------------------------------------------------------------------

🛠️ Technologies Used

Frontend: React

Build Tool: Vite

Styling: CSS

State Management: React Hooks (useState, useEffect)

Routing: React Router v6

HTTP Requests: Axios / Fetch API

Storage: localStorage for persisting chat and user data

----------------------------------------------------------------------------------------------------------------------------------------------------------------------------

⚙️ Getting Started
Prerequisites

Node.js (LTS version recommended)

npm or yarn

Installation
git clone https://github.com/Ram-Bhatt08/Time-Bot-Client.git
cd Time-Bot-Client
npm install

Run the Project
npm run dev

----------------------------------------------------------------------------------------------------------------------------------------------------------------------------

The application will run at http://localhost:5173.

Make sure the backend server is running at http://localhost:5000.

----------------------------------------------------------------------------------------------------------------------------------------------------------------------------

🔗 Backend

This is the frontend repository. Full functionality requires the corresponding backend.

Ensure the backend is set up and API endpoints are configured in the frontend.

----------------------------------------------------------------------------------------------------------------------------------------------------------------------------

📂 Project Structure

Time-Bot-Frontend/ <br>
├── public/ <br>
│   └── vite.svg <br>
├── src/ <br>
│   ├── assets/ <br>
│   │   └── react.svg <br>
│   ├── components/ <br>
│   │   ├── Bot/ <br>
│   │   │   └── Bot.jsx, Bot.css <br>
│   │   │  
│   │   ├── Home/ <br>
│   │   │   └── Home.jsx <br>
│   │   ├── Loading/<br>
│   │   │   └── Loading.jsx <br>
│   │   ├── Login/ <br>
│   │   │   └── Login.jsx, Login.css <br>
│   │   ├── My_Appointment/ <br>
│   │   │   └── My_Appointment.jsx <br>
│   │   ├── Nav/ <br>
│   │   │   └── Nav.jsx, Nav.css <br>
│   │   ├── Profile/ <br>
│   │   │   └── Profile.jsx <br>
│   │   └── ... (other components) <br>
│   ├── App.jsx <br>
│   └── main.jsx <br>
├── .eslintrc.cjs <br>
├── index.html <br>
├── package.json <br>
└── vite.config.js <br>

----------------------------------------------------------------------------------------------------------------------------------------------------------------------------

🎮 How It Works

Client Login: Users log in or register to access the platform.

Book Appointment: Users select VIPs and schedule appointments.

Interact with AI Assistant: Chat to book, cancel, or reschedule appointments.

Payment & ID: Pay fees and receive admin IDs after successful payment.

Profile Management: View & edit profile, manage appointments.

----------------------------------------------------------------------------------------------------------------------------------------------------------------------------

📝 Future Enhancements

🌙 Dark mode support

🔔 Notification system for upcoming appointments

🧠 AI assistant memory across sessions

📱 Enhanced mobile responsiveness

💳 Integration with real payment gateways

----------------------------------------------------------------------------------------------------------------------------------------------------------------------------

🤝 Contributing

We welcome contributions!

Fork the repository

Create your feature branch: git checkout -b feature/AmazingFeature

Commit your changes: git commit -m 'Add some AmazingFeature'

Push to the branch: git push origin feature/AmazingFeature

Open a Pull Request

----------------------------------------------------------------------------------------------------------------------------------------------------------------------------

👨‍💻 Author

Ram Bhatt
📧 Email:the.ram.bhatt@gmail.com

🔗 Portfolio:https://the-ram-bhatt.vercel.app/

💼 LinkedIn:https://www.linkedin.com/in/ram-bhatt08/

🐙 Project Link:https://time-bot-admin.vercel.app/
