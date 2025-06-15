const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");
const path = require("path");

// ✅ Load .proto file (located at project root)
const PROTO_PATH = path.join(__dirname, "..", "..", "university.proto");

// Load and parse proto definitions
const packageDefinition = protoLoader.loadSync(PROTO_PATH, {});
const universityProto =
  grpc.loadPackageDefinition(packageDefinition).university;

// ✅ Import service implementations
const bookService = require("./bookService");
const studentService = require("./studentService");
const loanService = require("./loanService");

// ✅ Create gRPC server
const server = new grpc.Server();

// ✅ Register services
server.addService(universityProto.BookService.service, bookService);
server.addService(universityProto.StudentService.service, studentService);
server.addService(universityProto.LoanService.service, loanService);

// ✅ Start server
const PORT = "0.0.0.0:50051";
server.bindAsync(PORT, grpc.ServerCredentials.createInsecure(), () => {
  console.log(`🚀 gRPC server running at ${PORT}`);
  server.start();
});
