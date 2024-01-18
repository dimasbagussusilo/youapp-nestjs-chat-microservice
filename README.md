<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>

<body>

  <h1>Chat Microservices - PT. Ezsy Deltamax Indonesia.</h1>

<h2>Dimas Bagus Susilo -  NestJS Task Logs</h2>

<h3>Overview</h3>

  <p>This project leverages the Microservices architecture to provide a modular and scalable solution. The following documentation outlines the key components, features, and best practices employed in the development of the NestJS Task Logs system.</p>

<h3>Common Library</h3>

  <ul>
    <li><strong>Database Connection:</strong> Establishes a common connection to the database.</li>
    <li><strong>Database Repository and Schema Abstraction:</strong> Abstracts database operations and schema management for ease of use.</li>
    <li><strong>Health Check:</strong> Implements health check mechanisms for the services.</li>
  </ul>

<h3>Validator</h3>

  <p>Utilizes Class Validator, Class Transformer, and Joi for configuration validation.</p>

<h3>Logger</h3>

  <p>Integrates Nestjs-Pino, Pino-Pretty, and Pino-HTTP for efficient and customizable logging.</p>

<h3>Dockerization</h3>

  <p>Each service is containerized using Docker for seamless deployment and scalability.</p>

<h3>Auth Service</h3>

  <ul>
    <li><strong>User Management:</strong> Manages user-related operations.</li>
    <li><strong>Chat Service:</strong> Realtime chat app with nest js and socket io.</li>
    <li><strong>JWT and Passport Auth:</strong> Implements JSON Web Token and Passport for authentication.</li>
    <li><strong>Hashed Password with Bcrypt:</strong> Enhances security through password hashing.</li>
    <li><strong>Auth Guard and Auth Strategy:</strong> Utilizes NestJS Auth Guard and Strategy for enhanced security.</li>
    <li><strong>Duplicate Unique Value Validation:</strong> Ensures the uniqueness of values to prevent duplicates.</li>
    <li><strong>JWT Auth Through Each Service:</strong> Implements JWT authentication across microservices.</li>
  </ul>

<h3>Event Pattern</h3>

  <p>Microservices communicate through an event-driven pattern for efficient data exchange.</p>

<h3>Production Ready</h3>

  <ul>
    <li><strong>GCP Deployment Setup:</strong> Facilitates deployment on Google Cloud Platform.</li>
    <li><strong>Docker (Development and Production):</strong> Supports Dockerized development and production environments.</li>
    <li><strong>Cloud Deployment Configuration:</strong> Provides configurations for cloud deployment.</li>
    <li><strong>CI/CD with Cloud Build:</strong> Enables continuous integration and deployment using cloud build services.</li>
    <li><strong>Kubernetes Setup with Helm Chart:</strong> Streamlines deployment with Helm charts and credentials setup.</li>
    <li><strong>MongoDB Atlas Setup:</strong> Integrates MongoDB Atlas for scalable and managed database solutions.</li>
  </ul>

<h3>Testing</h3>

  <ul>
    <li><strong>E2E Testing:</strong> Implements end-to-end testing for robust functionality.</li>
    <li><strong>Gateway Testing (Realtime App Scenarios):</strong> Tests the gateway for real-time application scenarios.</li>
  </ul>

<h3>Services</h3>

  <ul>
    <li><strong>Auth</strong></li>
    <li><strong>User</strong></li>
    <li><strong>Chat (Main)</strong></li>
    <li><strong>Notification</strong></li>
    <li><strong>Payment</strong></li>
  </ul>

<h3>Features</h3>

  <ul>
    <li><strong>User Registration and Login</strong></li>
    <li><strong>Chat to Direct User</strong></li>
    <li><strong>Chat to Specific Group</strong></li>
    <li><strong>Email Notification (Can be more)</strong></li>
  </ul>

<h3>Incoming Features</h3>

  <ul>
    <li><strong>Premium Chat Features (e.g., Discord Nitro)</strong></li>
  </ul>

<h3>Socket.IO (WebSocket) Features</h3>

  <ul>
    <li><strong>Handle Connection</strong></li>
    <li><strong>Disconnect Server</strong></li>
    <li><strong>Ping</strong></li>
    <li><strong>Join Room</strong></li>
    <li><strong>Leave Room</strong></li>
    <li><strong>Typing Acknowledge</strong></li>
    <li><strong>Direct Message</strong></li>
    <li><strong>Message Acknowledging</strong></li>
    <li><strong>Presence (Broadcast User's Online Status)</strong></li>
    <li><strong>Get Chat Histories</strong></li>
    <li><strong>System Notification (General)</strong></li>
  </ul>

<h3>Incoming Socket.IO Features</h3>

  <ul>
    <li><strong>Edit Message</strong></li>
    <li><strong>Delete Message</strong></li>
    <li><strong>File and Image Sharing</strong></li>
    <li><strong>Mention Notification</strong></li>
    <li><strong>Etc.</strong></li>
  </ul>

  <p>This documentation provides an overview of the NestJS Task Logs project, highlighting its architecture, features, and future developments. For detailed information on each aspect, refer to the relevant sections.</p>

</body>

</html>
# nestjs-chat-microservice
# youapp-nestjs-chat-microservice
