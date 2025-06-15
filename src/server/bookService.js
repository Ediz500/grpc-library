const grpc = require("@grpc/grpc-js");

// Mock data
const books = [
  {
    id: "1",
    title: "1984",
    author: "George Orwell",
    isbn: "9780451524935",
    publisher: "Plume",
    pageCount: 328,
    stock: 5,
  },
];

// CRUD functions
function listBooks(_, callback) {
  callback(null, { books });
}

function getBook(call, callback) {
  const book = books.find((b) => b.id === call.request.id);
  if (!book) {
    return callback({ code: grpc.status.NOT_FOUND, message: "Book not found" });
  }
  callback(null, book);
}

function createBook(call, callback) {
  books.push(call.request);
  callback(null, call.request);
}

function updateBook(call, callback) {
  const idx = books.findIndex((b) => b.id === call.request.id);
  if (idx === -1) {
    return callback({ code: grpc.status.NOT_FOUND, message: "Book not found" });
  }
  books[idx] = call.request;
  callback(null, call.request);
}

function deleteBook(call, callback) {
  const idx = books.findIndex((b) => b.id === call.request.id);
  if (idx === -1) {
    return callback({ code: grpc.status.NOT_FOUND, message: "Book not found" });
  }
  books.splice(idx, 1);
  callback(null, {});
}

module.exports = {
  listBooks,
  getBook,
  createBook,
  updateBook,
  deleteBook,
};
