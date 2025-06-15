# gRPC University Library System

This project is a gRPC-based server-client application designed for a fictional university's online library system. It allows managing books, students, and loan transactions using Protocol Buffers and gRPC.

## 📦 Project Structure

```
grpc-library/
├── university.proto             # gRPC API definition file
├── grpcurl-tests.md            # grpcurl test documentation
├── src/
│   ├── server/
│   │   ├── server.js
│   │   ├── bookService.js
│   │   ├── studentService.js
│   │   └── loanService.js
│   └── client/
│       ├── client-book.js
│       ├── client-student.js
│       └── client-loan.js
├── package.json
└── README.md
```

## 📚 Features

### Book Service

- List all books
- Get a book by ID
- Add a new book
- Update a book
- Delete a book

### Student Service

- List all students
- Get a student by ID
- Add a new student
- Update a student
- Delete a student

### Loan Service

- List all loans
- Get a loan by ID
- Borrow a book
- Return a book
- Delete a loan

## 🚀 Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Start the gRPC Server

```bash
node src/server/server.js
```

### 3. Run Clients

Each service has its own client script:

```bash
node src/client/client-book.js
node src/client/client-student.js
node src/client/client-loan.js
```

### 4. Run grpcurl Tests

Make sure the server is running, then execute grpcurl commands documented in `grpcurl-tests.md`.

## 🧪 Requirements

- Node.js
- gRPC & Protobuf
- grpcurl

## 📄 License

This project is provided as an academic assignment for educational purposes.
