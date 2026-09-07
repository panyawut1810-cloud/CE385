// ข้อมูลจากข้อ1
const students = [
  { id: "6501", name: "Somchai", major: "CE", score: 85 },
  { id: "6502", name: "Somsri", major: "CPE", score: 72 },
  { id: "6503", name: "Somsak", major: "SE", score: 48 },
  { id: "6504", name: "Somporn", major: "IT", score: 60 }
];

function toGrade(score) {
  if (score >= 80) return 'A';
  if (score >= 70) return 'B';
  if (score >= 60) return 'C';
  if (score >= 50) return 'D';
  return 'F';
}

// 1
function fetchStudentByIdAsync(id) {
  return new Promise((resolve, reject) => {
    if (typeof id !== 'string' || id.trim() === '') {
      return reject(new Error("รหัสนักศึกษาไม่ถูกต้อง"));
    }

    setTimeout(() => {
      const student = students.find(s => s.id === id);
      if (!student) {
        return reject(new Error(`ไม่พบรหัสนักศึกษา ${id}`));
      }
      resolve({ ...student });
    }, 300);
  });
}

// 2
console.log("=== เริ่มทดสอบ ข้อ 2 (ส่วนที่ 2) ===");

function testCase(id) {
  fetchStudentByIdAsync(id)
    .then(student => {
      console.log(`[Result ID: ${id}] พบข้อมูล:`, student);
    })
    .catch(err => {
      console.error(`[Result ID: ${id}] Error:`, err.message);
    })
    .finally(() => {
      console.log(`[Result ID: ${id}] ทำงานเสร็จสิ้น (Finally)`);
    });
}

testCase("6501"); 
testCase("9999"); 
testCase(42);     // id ผิดรูปแบบ

// 3
fetchStudentByIdAsync("6501")
  .then(student => {
    return { name: student.name, grade: toGrade(student.score) };
  })
  .then(data => {
    return `รายงาน: คุณ ${data.name} ได้เกรด ${data.grade}`;
  })
  .then(report => {
    console.log("=== ผลลัพธ์ โซ่ 3 ขั้น ===");
    console.log(report);
  })
  .catch(err => {
    console.error("เกิดข้อผิดพลาดในโซ่:", err.message);
  });

// 4
function promisify(fn) {
  return function (...args) {
    return new Promise((resolve, reject) => {
      fn(...args, (err, result) => {
        if (err) return reject(err);
        resolve(result);
      });
    });
  };
}

// ทดสอบ
function fetchStudentByIdCallback(id, callback) {
  if (typeof id !== 'string' || id.trim() === '') {
    return callback(new Error("รหัสนักศึกษาไม่ถูกต้อง"));
  }
  setTimeout(() => {
    const student = students.find(s => s.id === id);
    if (!student) return callback(new Error(`ไม่พบรหัสนักศึกษา ${id}`));
    callback(null, { ...student });
  }, 300);
}

const fetchStudentPromisified = promisify(fetchStudentByIdCallback);

fetchStudentPromisified("6502")
  .then(res => console.log("=== ผลลัพธ์ Promisify โบนัส ===", res))
  .catch(err => console.error(err.message));