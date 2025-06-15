# gRPCurl Test Results

---

## 📚 BookService Tests

### ✅ ListBooks

**Command:**

```bash
grpcurl -plaintext -proto university.proto 127.0.0.1:50051 university.BookService/ListBooks
```

**Response:**

```json
{
  "books": [
    {
      "id": "1",
      "title": "1984",
      "author": "George Orwell",
      "isbn": "9780451524935",
      "publisher": "Plume",
      "pageCount": 328,
      "stock": 5
    }
  ]
}
```

---

### ✅ CreateBook

**Command:**

```bash
grpcurl -plaintext -proto university.proto -d "{ \"id\": \"2\", \"title\": \"Brave New World\", \"author\": \"Aldous Huxley\", \"isbn\": \"9780060850524\", \"publisher\": \"Harper Perennial\", \"pageCount\": 288, \"stock\": 7 }" 127.0.0.1:50051 university.BookService/CreateBook
```

**Response:**

```json
{
  "id": "2",
  "title": "Brave New World",
  "author": "Aldous Huxley",
  "isbn": "9780060850524",
  "publisher": "Harper Perennial",
  "pageCount": 288,
  "stock": 7
}
```

---

### ✅ UpdateBook

**Command:**

```bash
grpcurl -plaintext -proto university.proto -d "{ \"id\": \"2\", \"title\": \"Brave New World - Updated\", \"author\": \"Aldous Huxley\", \"isbn\": \"9780060850524\", \"publisher\": \"Harper Perennial\", \"pageCount\": 300, \"stock\": 10 }" 127.0.0.1:50051 university.BookService/UpdateBook
```

**Response:**

```json
{
  "id": "2",
  "title": "Brave New World - Updated",
  "author": "Aldous Huxley",
  "isbn": "9780060850524",
  "publisher": "Harper Perennial",
  "pageCount": 300,
  "stock": 10
}
```

---

### ✅ GetBook

**Command:**

```bash
grpcurl -plaintext -proto university.proto -d "{ \"id\": \"2\" }" 127.0.0.1:50051 university.BookService/GetBook
```

**Response:**

```json
{
  "id": "2",
  "title": "Brave New World - Updated",
  "author": "Aldous Huxley",
  "isbn": "9780060850524",
  "publisher": "Harper Perennial",
  "pageCount": 300,
  "stock": 10
}
```

---

### ✅ DeleteBook

**Command:**

```bash
grpcurl -plaintext -proto university.proto -d "{ \"id\": \"2\" }" 127.0.0.1:50051 university.BookService/DeleteBook
```

**Response:**

```json
{}
```

---

### ✅ ListBooks (Post-Deletion)

**Command:**

```bash
grpcurl -plaintext -proto university.proto 127.0.0.1:50051 university.BookService/ListBooks
```

**Response:**

```json
{
  "books": [
    {
      "id": "1",
      "title": "1984",
      "author": "George Orwell",
      "isbn": "9780451524935",
      "publisher": "Plume",
      "pageCount": 328,
      "stock": 5
    }
  ]
}
```

---

## 👤 StudentService Tests

### ✅ CreateStudent

```bash
grpcurl -plaintext -proto university.proto -d "{ \"id\": \"stu1\", \"name\": \"Alice Smith\", \"studentNumber\": \"2023001\", \"email\": \"alice@example.com\", \"isActive\": true }" 127.0.0.1:50051 university.StudentService/CreateStudent
```

**Response:**

```json
{
  "id": "stu1",
  "name": "Alice Smith",
  "studentNumber": "2023001",
  "email": "alice@example.com",
  "isActive": true
}
```

---

### ✅ ListStudents

```bash
grpcurl -plaintext -proto university.proto 127.0.0.1:50051 university.StudentService/ListStudents
```

**Response:**

```json
{
  "students": [
    {
      "id": "stu1",
      "name": "Alice Smith",
      "studentNumber": "2023001",
      "email": "alice@example.com",
      "isActive": true
    },
    {
      "id": "stu1",
      "name": "Alice Smith",
      "studentNumber": "2023001",
      "email": "alice@example.com",
      "isActive": true
    }
  ]
}
```

---

### ✅ GetStudent

```bash
grpcurl -plaintext -proto university.proto -d "{ \"id\": \"stu1\" }" 127.0.0.1:50051 university.StudentService/GetStudent
```

**Response:**

```json
{
  "id": "stu1",
  "name": "Alice Smith",
  "studentNumber": "2023001",
  "email": "alice@example.com",
  "isActive": true
}
```

---

### ✅ UpdateStudent

```bash
grpcurl -plaintext -proto university.proto -d "{ \"id\": \"stu1\", \"name\": \"Alice Johnson\", \"studentNumber\": \"2023001\", \"email\": \"alice.johnson@example.com\", \"isActive\": false }" 127.0.0.1:50051 university.StudentService/UpdateStudent
```

**Response:**

```json
{
  "id": "stu1",
  "name": "Alice Johnson",
  "studentNumber": "2023001",
  "email": "alice.johnson@example.com"
}
```

---

### ✅ DeleteStudent

```bash
grpcurl -plaintext -proto university.proto -d "{ \"id\": \"stu1\" }" 127.0.0.1:50051 university.StudentService/DeleteStudent
```

**Response:**

```json
{}
```

---

### ✅ ListStudents (Post-Deletion)

```bash
grpcurl -plaintext -proto university.proto 127.0.0.1:50051 university.StudentService/ListStudents
```

**Response:**

```json
{
  "students": [
    {
      "id": "stu1",
      "name": "Alice Smith",
      "studentNumber": "2023001",
      "email": "alice@example.com",
      "isActive": true
    }
  ]
}
```

---

## 🔄 LoanService Tests

### ✅ BorrowBook

**Command:**

```bash
grpcurl -plaintext -proto university.proto -d "{ \"id\": \"loan10\", \"studentId\": \"stu100\", \"bookId\": \"book100\", \"loanDate\": \"2025-06-15\", \"status\": \"ONGOING\" }" 127.0.0.1:50051 university.LoanService/BorrowBook
```

**Response:**

```json
{
  "id": "loan10",
  "studentId": "stu100",
  "bookId": "book100",
  "loanDate": "2025-06-15"
}
```

---

### ✅ ListLoans

**Command:**

```bash
grpcurl -plaintext -proto university.proto 127.0.0.1:50051 university.LoanService/ListLoans
```

**Response (after borrow):**

```json
{
  "loans": [
    {
      "id": "loan1",
      "studentId": "stu1",
      "bookId": "1",
      "loanDate": "2025-06-15"
    },
    {
      "id": "loan10",
      "studentId": "stu100",
      "bookId": "book100",
      "loanDate": "2025-06-15"
    }
  ]
}
```

---

### ✅ GetLoan

**Command:**

```bash
grpcurl -plaintext -proto university.proto -d "{ \"id\": \"loan10\" }" 127.0.0.1:50051 university.LoanService/GetLoan
```

**Response:**

```json
{
  "id": "loan10",
  "studentId": "stu100",
  "bookId": "book100",
  "loanDate": "2025-06-15"
}
```

---

### ✅ ReturnBook

**Command:**

```bash
grpcurl -plaintext -proto university.proto -d "{ \"id\": \"loan10\" }" 127.0.0.1:50051 university.LoanService/ReturnBook
```

**Response:**

```json
{
  "id": "loan10",
  "studentId": "stu100",
  "bookId": "book100",
  "loanDate": "2025-06-15",
  "returnDate": "2025-06-15",
  "status": "RETURNED"
}
```

---

### ✅ DeleteLoan

**Command:**

```bash
grpcurl -plaintext -proto university.proto -d "{ \"id\": \"loan10\" }" 127.0.0.1:50051 university.LoanService/DeleteLoan
```

**Response:**

```json
{}
```

---

### ✅ ListLoans (Post-Deletion)

**Command:**

```bash
grpcurl -plaintext -proto university.proto 127.0.0.1:50051 university.LoanService/ListLoans
```

**Response:**

```json
{
  "loans": [
    {
      "id": "loan1",
      "studentId": "stu1",
      "bookId": "1",
      "loanDate": "2025-06-15"
    }
  ]
}
```
