const grpc = require("@grpc/grpc-js");

// Mock data
const loans = [
  {
    id: "loan1",
    studentId: "stu1",
    bookId: "1",
    loanDate: "2025-06-15",
    returnDate: "",
    status: "ONGOING",
  },
];

// ---------- Loan Service Functions ----------

// List all loans
function listLoans(_, callback) {
  callback(null, { loans });
}

// Get a specific loan by ID
function getLoan(call, callback) {
  const loan = loans.find((l) => l.id === call.request.id);
  if (!loan) {
    return callback({
      code: grpc.status.NOT_FOUND,
      message: "Loan not found",
    });
  }
  callback(null, loan);
}

// Borrow a book (create a new loan)
function borrowBook(call, callback) {
  const loan = call.request; // expects id, studentId, bookId, loanDate, status = ONGOING
  loans.push(loan);
  callback(null, loan);
}

// Return a borrowed book
function returnBook(call, callback) {
  const loan = loans.find((l) => l.id === call.request.id);
  if (!loan) {
    return callback({
      code: grpc.status.NOT_FOUND,
      message: "Loan not found",
    });
  }
  loan.returnDate = new Date().toISOString().split("T")[0];
  loan.status = "RETURNED";
  callback(null, loan);
}

// Delete a loan by ID
function deleteLoan(call, callback) {
  const idx = loans.findIndex((l) => l.id === call.request.id);
  if (idx === -1) {
    return callback({
      code: grpc.status.NOT_FOUND,
      message: "Loan not found",
    });
  }
  loans.splice(idx, 1);
  callback(null, {}); // returns Empty
}

// Export functions
module.exports = {
  listLoans,
  getLoan,
  borrowBook,
  returnBook,
  deleteLoan,
};
