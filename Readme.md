# Polling System API

## Description

- The Polling System API project is a backend project built using Nodejs and MongoDB. This project is used to create questions with options. User can create questions with multiple options, and can add votes to the options. User can add, delet options. User can vote options of a question

## How to run

1. Clone the repository:

   ```bash
   git clone https://github.com/chetandeshpande1/Polling-System-Api.git
   ```

2. Install dependencies:

   ```bash
   npm install / npm i
   ```

3. Run the application
   ```bash
   node index
   ```

## Postman API Routes

### Question creation:

- Endpoint: POST /api/questions/create
- Body: { "title": "Question you want to create" }

### Option creation for Question:

- Endpoint: POST /api/questions/:id/options/create
- Params: id (Question ID)
- Body: { "text": "Option for the question" }

### Get Question by ID:

- Endpoint: GET /api/questions/:id
- Params: id (Question ID)

### Delete Question by ID:

- Endpoint: DELETE /api/questions/:id/delete
- Params: id (Question ID)
- Options

### Delete Option by ID:

- Endpoint: DELETE /api/options/:id/delete
- Params: id (Option ID)

### Add Vote to Option:

- Endpoint: GET /api/options/:id/add_vote
- Params: id (Option ID)
