const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");
const readline = require("readline");
const path = require("path");

const PROTO_PATH = path.join(__dirname, "..", "..", "university.proto");

const packageDefinition = protoLoader.loadSync(PROTO_PATH, {});
const universityProto =
  grpc.loadPackageDefinition(packageDefinition).university;

const client = new universityProto.StudentService(
  "localhost:50051",
  grpc.credentials.createInsecure()
);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const menu = `
👤 Student Service Menu:
1. List Students
2. Add Student
3. Update Student
4. Delete Student
5. Get Student Details
6. Exit
Choose an option: `;

function ask() {
  rl.question(menu, (answer) => {
    switch (answer) {
      case "1":
        client.ListStudents({}, (err, res) => {
          if (err) console.error("Error:", err.message);
          else console.log("Students:", res.students);
          ask();
        });
        break;

      case "2":
        promptStudentDetails((student) => {
          client.CreateStudent(student, (err, res) => {
            if (err) console.error("Error:", err.message);
            else console.log("Student added:", res);
            ask();
          });
        });
        break;

      case "3":
        promptStudentDetails((student) => {
          client.UpdateStudent(student, (err, res) => {
            if (err) console.error("Error:", err.message);
            else console.log("Student updated:", res);
            ask();
          });
        });
        break;

      case "4":
        rl.question("Student ID to delete: ", (id) => {
          client.DeleteStudent({ id }, (err, _) => {
            if (err) console.error("Error:", err.message);
            else console.log("Student deleted.");
            ask();
          });
        });
        break;

      case "5":
        rl.question("Student ID to fetch: ", (id) => {
          client.GetStudent({ id }, (err, res) => {
            if (err) console.error("Error:", err.message);
            else console.log("Student:", res);
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

function promptStudentDetails(callback) {
  rl.question("Student ID: ", (id) => {
    rl.question("Name: ", (name) => {
      rl.question("Student Number: ", (studentNumber) => {
        rl.question("Email: ", (email) => {
          rl.question("Is Active (true/false): ", (isActive) => {
            const student = {
              id,
              name,
              studentNumber,
              email,
              isActive: isActive.toLowerCase() === "true",
            };
            callback(student);
          });
        });
      });
    });
  });
}

ask();
