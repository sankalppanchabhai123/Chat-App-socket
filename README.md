# Chat App

A real-time chat application built using the MERN stack, featuring user authentication and a custom video call functionality.

live-project: [Chat-app](https://real-time-chat-app-with-video-call-using.onrender.com/)

<p align="center">
  <img src="https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E" alt="JavaScript Badge">
  <img src="https://img.shields.io/badge/Socket.io-010101?&style=for-the-badge&logo=Socket.io&logoColor=white" alt="Socket.io Badge">
  <img src="https://img.shields.io/badge/Node%20js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" alt="Node.js Badge">
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React Badge">
  <img src="https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB Badge">
  <img src="https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=JSON%20web%20tokens&logoColor=white" alt="JWT Badge">
  <img src="https://img.shields.io/badge/Express%20js-000000?style=for-the-badge&logo=express&logoColor=white" alt="Express.js Badge">
  <img src="https://img.shields.io/badge/Render-46E3B7?style=for-the-badge&logo=render&logoColor=white" alt="Render Badge">
</p>

## Features
- **User Authentication**: Secure sign-up and login using JWT.
- **Real-time Chat**: Instant messaging powered by WebSockets.
- **Video Calling**: Custom-built video call functionality.
- **User Profiles**: Update profile pictures and user details.
- **Media Sharing**: Share images, videos, and links within chats.
- **Responsive UI**: Mobile-friendly interface.

## Tech Stack
- **Frontend**: HTML, CSS, JavaScript, EJS
- **Backend**: Node.js, Express.js
- **Database**: PostgreSQL
- **WebSockets**: Socket.io for real-time communication
- **Authentication**: JWT for secure login

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/sankalppanchabhai123/Chat-App-socket
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory and add:
   ```env
   DATABASE_URL=your_database_url
   JWT_SECRET=your_secret_key
   ```

4. Run the development server:
   ```bash
   npm start
   ```

5. Open the app in your browser:
   ```
   http://localhost:3000 --backend
   http://localhost:5713 --frontend
   ```

## Future Improvements
- Implement group chats
- Add end-to-end encryption for messages
- Improve UI/UX with React (optional upgrade)

## Contributing
Contributions are welcome! Feel free to open an issue or submit a pull request.

## License
This project is licensed under the MIT License.
