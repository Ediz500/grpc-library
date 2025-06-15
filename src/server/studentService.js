const grpc = require("@grpc/grpc-js");

// Mock data
const students = [
  {
    id: "stu1",
    name: "Alice Smith",
    studentNumber: "2023001",
    email: "alice@example.com",
    isActive: true,
  },
];

// CRUD funcitons
function listStudents(_, callback) {
  callback(null, { students });
}

function getStudent(call, callback) {
  const student = students.find((s) => s.id === call.request.id);
  if (!student) {
    return callback({
      code: grpc.status.NOT_FOUND,
      message: "Student not found",
    });
  }
  callback(null, student);
}

function createStudent(call, callback) {
  students.push(call.request);
  callback(null, call.request);
}

function updateStudent(call, callback) {
  const idx = students.findIndex((s) => s.id === call.request.id);
  if (idx === -1) {
    return callback({
      code: grpc.status.NOT_FOUND,
      message: "Student not found",
    });
  }
  students[idx] = call.request;
  callback(null, call.request);
}

function deleteStudent(call, callback) {
  const idx = students.findIndex((s) => s.id === call.request.id);
  if (idx === -1) {
    return callback({
      code: grpc.status.NOT_FOUND,
      message: "Student not found",
    });
  }
  students.splice(idx, 1);
  callback(null, {});
}

module.exports = {
  listStudents,
  getStudent,
  createStudent,
  updateStudent,
  deleteStudent,
};
