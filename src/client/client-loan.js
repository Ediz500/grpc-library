const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");
const readline = require("readline");
const path = require("path");

const PROTO_PATH = path.join(__dirname, "..", "..", "university.proto");

const packageDefinition = protoLoader.loadSync(PROTO_PATH, {});
const universityProto =
  grpc.loadPackageDefinition(packageDefinition).university;

const client = new universityProto.LoanService(
  "localhost:50051",
  grpc.credentials.createInsecure()
);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const menu = `
🔄 Loan Service Menu:
1. List Loans
2. Borrow Book
3. Return Book
4. Get Loan Details
5. Delete Loan
6. Exit
Choose an option: `;

function ask() {
  rl.question(menu, (answer) => {
    switch (answer) {
      case "1":
        client.ListLoans({}, (err, res) => {
          if (err) console.error("Error:", err.message);
          else console.log("Loans:", res.loans);
          ask();
        });
        break;

      case "2":
        rl.question("Loan ID: ", (id) => {
          rl.question("Student ID: ", (studentId) => {
            rl.question("Book ID: ", (bookId) => {
              const loan = {
                id,
                studentId,
                bookId,
                loanDate: new Date().toISOString().split("T")[0],
                status: "ONGOING",
              };
              client.BorrowBook(loan, (err, res) => {
                if (err) console.error("Error:", err.message);
                else console.log("Borrowed:", res);
                ask();
              });
            });
          });
        });
        break;

      case "3":
        rl.question("Loan ID to return: ", (id) => {
          client.ReturnBook({ id }, (err, res) => {
            if (err) console.error("Error:", err.message);
            else console.log("Returned:", res);
            ask();
          });
        });
        break;

      case "4":
        rl.question("Loan ID to get: ", (id) => {
          client.GetLoan({ id }, (err, res) => {
            if (err) console.error("Error:", err.message);
            else console.log("Loan:", res);
            ask();
          });
        });
        break;

      case "5":
        rl.question("Loan ID to delete: ", (id) => {
          client.DeleteLoan({ id }, (err, res) => {
            if (err) console.error("Error:", err.message);
            else console.log("Deleted.");
            ask();
          });
        });
        break;

      case "6":
        rl.close();
        break;

      default:
        console.log("❌ Invalid option.");
        ask();
    }
  });
}

ask();
