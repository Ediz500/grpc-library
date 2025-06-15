# gRPCurl Test Results

---

## 📚 BookService Tests

### ✅ ListBooks

**Command:**

```bash
grpcurl -plaintext -proto university.proto 127.0.0.1:50051 university.BookService/ListBooks
```

**Response:**

![ListBooks-Image](image-1.png)

---

### ✅ CreateBook

**Command:**

```bash
grpcurl -plaintext -proto university.proto -d "{ \"id\": \"2\", \"title\": \"Brave New World\", \"author\": \"Aldous Huxley\", \"isbn\": \"9780060850524\", \"publisher\": \"Harper Perennial\", \"pageCount\": 288, \"stock\": 7 }" 127.0.0.1:50051 university.BookService/CreateBook
```

**Response:**

![CreateBook-Image](image-2.png)

````

---

### ✅ UpdateBook

**Command:**

```bash
grpcurl -plaintext -proto university.proto -d "{ \"id\": \"2\", \"title\": \"Brave New World - Updated\", \"author\": \"Aldous Huxley\", \"isbn\": \"9780060850524\", \"publisher\": \"Harper Perennial\", \"pageCount\": 300, \"stock\": 10 }" 127.0.0.1:50051 university.BookService/UpdateBook
````

**Response:**

![UpdateBook-Image](image-3.png)

---

### ✅ GetBook

**Command:**

```bash
grpcurl -plaintext -proto university.proto -d "{ \"id\": \"2\" }" 127.0.0.1:50051 university.BookService/GetBook
```

**Response:**

![GetBook-Image](image-4.png)

---

### ✅ DeleteBook

**Command:**

```bash
grpcurl -plaintext -proto university.proto -d "{ \"id\": \"2\" }" 127.0.0.1:50051 university.BookService/DeleteBook
```

**Response:**

![DeleteBook-Image](image-5.png)

---

### ✅ ListBooks (Post-Deletion)

**Command:**

```bash
grpcurl -plaintext -proto university.proto 127.0.0.1:50051 university.BookService/ListBooks
```

**Response:**

![ListBooks(Post-Deletion)-Image](image-6.png)

---

## 👤 StudentService Tests

### ✅ CreateStudent

```bash
grpcurl -plaintext -proto university.proto -d "{ \"id\": \"stu1\", \"name\": \"Alice Smith\", \"studentNumber\": \"2023001\", \"email\": \"alice@example.com\", \"isActive\": true }" 127.0.0.1:50051 university.StudentService/CreateStudent
```

**Response:**

![CreateStudent-Image](image-7.png)

---

### ✅ ListStudents

```bash
grpcurl -plaintext -proto university.proto 127.0.0.1:50051 university.StudentService/ListStudents
```

**Response:**

![listStudents-Image](image-8.png)

---

### ✅ GetStudent

```bash
grpcurl -plaintext -proto university.proto -d "{ \"id\": \"stu1\" }" 127.0.0.1:50051 university.StudentService/GetStudent
```

**Response:**

![GetStudent-Image](image-9.png)

---

### ✅ UpdateStudent

```bash
grpcurl -plaintext -proto university.proto -d "{ \"id\": \"stu1\", \"name\": \"Alice Johnson\", \"studentNumber\": \"2023001\", \"email\": \"alice.johnson@example.com\", \"isActive\": false }" 127.0.0.1:50051 university.StudentService/UpdateStudent
```

**Response:**

![UpdateStudent-Image](image-10.png)

---

### ✅ DeleteStudent

```bash
grpcurl -plaintext -proto university.proto -d "{ \"id\": \"stu1\" }" 127.0.0.1:50051 university.StudentService/DeleteStudent
```

**Response:**

![DeleteStudent-Image](image-11.png)

---

### ✅ ListStudents (Post-Deletion)

```bash
grpcurl -plaintext -proto university.proto 127.0.0.1:50051 university.StudentService/ListStudents
```

**Response:**

![ListStudents(Post-Deletion)-Image](image-12.png)

---

## 🔄 LoanService Tests

### ✅ BorrowBook

**Command:**

```bash
grpcurl -plaintext -proto university.proto -d "{ \"id\": \"loan10\", \"studentId\": \"stu100\", \"bookId\": \"book100\", \"loanDate\": \"2025-06-15\", \"status\": \"ONGOING\" }" 127.0.0.1:50051 university.LoanService/BorrowBook
```

**Response:**

![BorrowBook-Image](image-13.png)

---

### ✅ ListLoans

**Command:**

```bash
grpcurl -plaintext -proto university.proto 127.0.0.1:50051 university.LoanService/ListLoans
```

**Response (after borrow):**

![ListLoans-Image](image-14.png)

---

### ✅ GetLoan

**Command:**

```bash
grpcurl -plaintext -proto university.proto -d "{ \"id\": \"loan10\" }" 127.0.0.1:50051 university.LoanService/GetLoan
```

**Response:**

![GetLoan-Image](image-15.png)

---

### ✅ ReturnBook

**Command:**

```bash
grpcurl -plaintext -proto university.proto -d "{ \"id\": \"loan10\" }" 127.0.0.1:50051 university.LoanService/ReturnBook
```

**Response:**

![ReturnBook-Image](image-16.png)

---

### ✅ DeleteLoan

**Command:**

```bash
grpcurl -plaintext -proto university.proto -d "{ \"id\": \"loan10\" }" 127.0.0.1:50051 university.LoanService/DeleteLoan
```

**Response:**

![DeleteLoan-Image](image-17.png)

---

### ✅ ListLoans (Post-Deletion)

**Command:**

```bash
grpcurl -plaintext -proto university.proto 127.0.0.1:50051 university.LoanService/ListLoans
```

**Response:**

![ListLoans(Post-Deletion)-Image](image-18.png)
