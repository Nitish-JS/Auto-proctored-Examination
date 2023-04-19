# ExamIN
The aim of this project is to develop a software that provides a cheat-free platform for online quizzes with complete authenticity. The system continuously monitors the movements of the candidates to prevent any possibility of cheating. It is also a proctor-free automatic environment validator, making sure that an online quiz is taken with no possibility of cheating whatsoever. This project is built using the MERN (MongoDB, Express, React, Node.js) stack.

## Features
### Teacher/Admin Panel Features
* Assign quizzes to individual classes
* Add questions to the quizzes
* View results dashboard
* Monitor the proctoring logs to ensure authenticity of the test
### Student Panel Features
* Take quizzes assigned by the teacher
* View results and analyze their performance through visualizations provided
### Object Detection
* The project uses the CocoSSD model using TensorFlow API for object detection.
* The model detects mobile, multiple persons, book, laptop, and person not found.
* The system also disables right-click and detects tab switch, Ctrl key press, and Alt key press.
### Real-Time Video Stream
* The system uses React Webcam to send real-time video stream to the CocoSSD model for object detection.
* This feature helps to enhance the accuracy and reliability of the object detection system.
### Installation
* Clone the repository from GitHub.
* Navigate to the root directory of the project in the terminal.
* npm install and npm start.
* cd client
* cd esm-client
* npm install and npm start
### Technologies Used
* MERN (MongoDB, Express, React, Node.js) stack
* TensorFlow API
* CocoSSD object detection model

### Images
* SignUP page

![image](https://user-images.githubusercontent.com/73771450/233161489-33b8d19c-1469-467c-b12d-c90176038b9c.png)

* Student Dashboard

![image](https://user-images.githubusercontent.com/73771450/233161641-12de8a06-4cee-4e7a-9eda-a66fcb5bc2d3.png)

* Attempt Test

![image](https://user-images.githubusercontent.com/73771450/233161752-cef955d5-11ed-4e25-b84f-c6af19c48dbc.png)

* Test Instruction Page

![image](https://user-images.githubusercontent.com/73771450/233161861-fc5ab08c-e79a-4ea4-b3e9-2f6a3d244df7.png)

* Test Page

![image](https://user-images.githubusercontent.com/73771450/233161928-9cb879bc-8035-4d7c-a2ad-76bb74051ce4.png)

* Tab Switch detected

![image](https://user-images.githubusercontent.com/73771450/233162045-2c9d5f31-a882-4639-9599-103743f382ae.png)

* Cell phone detected

![image](https://user-images.githubusercontent.com/73771450/233162097-49d342ab-785d-494c-8fb0-f62f968021ee.png)

* Multi Person Detected 

![image](https://user-images.githubusercontent.com/73771450/233162252-c1f3fd72-1ec8-4f39-994e-8b61b2a6feb6.png)

* Face not visible

![image](https://user-images.githubusercontent.com/73771450/233162571-a10cfda6-d9ec-49f2-9ffe-5420ba72f097.png)

* Attempted Test Page

![image](https://user-images.githubusercontent.com/73771450/233162657-7dc3dd71-1737-4c89-81de-823f32f1a26e.png)

* Result View (Student)

![image](https://user-images.githubusercontent.com/73771450/233162751-5492126b-a00e-4c39-85a1-a8fd6378af9c.png)

* Create Test Page

![image](https://user-images.githubusercontent.com/73771450/233162898-1ebf2858-fff3-4273-b67b-161327278ef0.png)

![image](https://user-images.githubusercontent.com/73771450/233162940-273d6474-8562-4d39-bf0f-52b43f66ccd3.png)

* Student Logs and results 

![image](https://user-images.githubusercontent.com/73771450/233163016-cb254c90-d512-42c1-8adc-da72abfe57d1.png)



