
# Email Generator

A modern full-stack application for generating professional emails using AI.  
Built with **Spring Boot** (backend) and **React** (frontend), integrated with Google's **Gemini API** for intelligent email composition.

---

## 🚀 Features

- **AI-Powered Email Generation** – Generate contextually relevant emails using Google Gemini API  
- **React Frontend** – Responsive and intuitive UI  
- **Spring Boot Backend** – Scalable backend with reactive WebFlux programming  
- **Real-time Processing** – Asynchronous email generation using reactive streams  
- **Customizable Templates** – Create, save, and reuse email templates  
- **User-Friendly Interface** – Simple form inputs for quick email generation  

---

## ⚙️ Prerequisites

- **Java:** 24 (Preview version – ensure you have the appropriate JDK installed)  
- **Node.js:** 16.x or later  
- **npm:** 8.x or later  
- **Maven:** 3.8.x or later  
- **Google Gemini API Key:** Obtain from [Google AI Studio](https://ai.google/studio)

---

## ⚡ Installation

### ✅ Backend Setup

```bash
git clone https://github.com/nihirborkar17/Repliznen.git
cd Repliznen/email-generator
```

Create `src/main/resources/application.yml` with the following content:

```yaml
spring:
  application:
    name: email-generator

gemini:
  api:
    key: YOUR_GEMINI_API_KEY
    url: https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent
```

Build and run backend:

```bash
mvn clean install
mvn spring-boot:run
```

Backend will run at: `http://localhost:8080`

---

### ✅ Frontend Setup

```bash
cd frontend
npm install
```

Create `.env` file in `frontend/` with:

```env
REACT_APP_API_URL=http://localhost:8080
```

Start frontend:

```bash
npm start
```

Frontend available at: `http://localhost:3000`

---

## 🎯 Usage

1. Open browser and visit: [http://localhost:3000](http://localhost:3000)  
2. Fill in the form:
   - Recipient email address  
   - Subject  
   - Key points  
   - Tone (formal, casual, etc.)  
3. Click **Generate Email**  
4. Review and edit the generated email  
5. Copy or send the email directly from the UI  

---

## 📡 API Endpoints

- **POST** `/api/generate-email` – Generate an email  
  Sample Request Body:

  ```json
  {
    "recipient": "john@example.com",
    "subject": "Project Update",
    "keyPoints": ["Project completed ahead of schedule", "Under budget"],
    "tone": "professional"
  }
  ```

- **GET** `/api/templates` – Retrieve all saved email templates  
- **POST** `/api/templates` – Save a new template  
- **PUT** `/api/templates/{id}` – Update an existing template  
- **DELETE** `/api/templates/{id}` – Delete a template  

---

## 📂 Project Structure

```text
email-generator/
├── src/
│   ├── main/
│   │   ├── java/com/nenz/emailgenerator/
│   │   │   ├── controller/     # REST controllers
│   │   │   ├── service/        # Business logic
│   │   │   ├── model/          # Data models
│   │   │   ├── config/         # Configuration classes
│   │   │   └── EmailGeneratorApplication.java  # Main class
│   │   └── resources/
│   │       ├── application.yml # Configuration
│   │       └── static/         # Static resources
│   └── test/                   # Test classes
├── frontend/                   # React frontend
│   ├── public/
│   ├── src/
│   │   ├── components/         # React components
│   │   ├── services/           # API services
│   │   ├── hooks/              # Custom hooks
│   │   └── App.js              # Main App component
│   └── package.json
└── pom.xml                     # Maven configuration
```

---

## ⚙️ Configuration

Customize `src/main/resources/application.yml`:

```yaml
server:
  port: 8080

spring:
  webflux:
    base-path: /api

gemini:
  api:
    url: https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent
    timeout: 30s
```

---

## ✅ Testing

### Backend Tests

```bash
mvn test
```

### Frontend Tests

```bash
cd frontend
npm test
```

---

## 🤝 Contributing

1. Fork the repository  
2. Create your feature branch:  
   `git checkout -b feature/amazing-feature`  
3. Commit your changes:  
   `git commit -m 'Add amazing feature'`  
4. Push branch:  
   `git push origin feature/amazing-feature`  
5. Open a Pull Request

---

## 📄 License

MIT License – see the [LICENSE](LICENSE) file for details.

---

## 🎉 Acknowledgments

- [Spring Boot](https://spring.io/projects/spring-boot) – Backend framework  
- [React](https://reactjs.org/) – Frontend library  
- [Google Gemini](https://ai.google/studio) – AI-powered email generation  

---

## 💬 Support

For issues or questions, please open an issue on the [GitHub Repository](https://github.com/nihirborkar17/Repliznen).
