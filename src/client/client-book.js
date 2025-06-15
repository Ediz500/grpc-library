const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");
const readline = require("readline");
const path = require("path");

const PROTO_PATH = path.join(__dirname, "..", "..", "university.proto");
const packageDefinition = protoLoader.loadSync(PROTO_PATH, {});
const universityProto =
  grpc.loadPackageDefinition(packageDefinition).university;

const client = new universityProto.BookService(
  "localhost:50051",
  grpc.credentials.createInsecure()
);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const menu = `
📚 Book Service Menu:
1. List Books
2. Add Book
3. Update Book
4. Delete Book
5. Get Book Details
6. Exit
Choose an option: `;

function ask() {
  rl.question(menu, (answer) => {
    switch (answer) {
      case "1":
        client.ListBooks({}, (err, res) => {
          if (err) console.error("Error:", err.message);
          else console.log("Books:", res.books);
          ask();
        });
        break;

      case "2":
        promptBookDetails((book) => {
          client.CreateBook(book, (err, res) => {
            if (err) console.error("Error:", err.message);
            else console.log("Book added:", res);
            ask();
          });
        });
        break;

      case "3":
        promptBookDetails((book) => {
          client.UpdateBook(book, (err, res) => {
            if (err) console.error("Error:", err.message);
            else console.log("Book updated:", res);
            ask();
          });
        });
        break;

      case "4":
        rl.question("Book ID to delete: ", (id) => {
          client.DeleteBook({ id }, (err, _) => {
            if (err) console.error("Error:", err.message);
            else console.log("Book deleted.");
            ask();
          });
        });
        break;

      case "5":
        rl.question("Book ID to fetch: ", (id) => {
          client.GetBook({ id }, (err, res) => {
            if (err) console.error("Error:", err.message);
            else console.log("Book:", res);
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

function promptBookDetails(callback) {
  rl.question("Book ID: ", (id) => {
    rl.question("Title: ", (title) => {
      rl.question("Author: ", (author) => {
        rl.question("ISBN: ", (isbn) => {
          rl.question("Publisher: ", (publisher) => {
            rl.question("Page Count: ", (pageCount) => {
              rl.question("Stock: ", (stock) => {
                const book = {
                  id,
                  title,
                  author,
                  isbn,
                  publisher,
                  pageCount: parseInt(pageCount),
                  stock: parseInt(stock),
                };
                callback(book);
              });
            });
          });
        });
      });
    });
  });
}

ask();
