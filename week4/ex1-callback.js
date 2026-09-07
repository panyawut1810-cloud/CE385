// 1
const students = [
  { id: "6501", name: "Somchai", major: "CE", score: 85 },
  { id: "6502", name: "Somsri", major: "CPE", score: 72 },
  { id: "6503", name: "Somsak", major: "SE", score: 48 },
  { id: "6504", name: "Somporn", major: "IT", score: 60 }
];

// 2
function fetchStudentById(id, callback) {

  if (typeof id !== 'string' || id.trim() === '') {
    return callback(new Error("รหัสนักศึกษาไม่ถูกต้อง"));
  }
  
  setTimeout(() => {
    const student = students.find(s => s.id === id);
    if (!student) {
    
      return callback(new Error(`ไม่พบรหัสนักศึกษา ${id}`));
    }
    
    callback(null, { ...student });
  }, 300);
}

// 3
console.log("=== เริ่มทดสอบ ข้อ 1 ===");

fetchStudentById("6501", (err, student) => {
  if (err) {
    console.error("กรณี ก) ข้อผิดพลาด:", err.message);
    return;
  }
  console.log("กรณี ก) พบข้อมูล:", student);
});

fetchStudentById("9999", (err, student) => {
  if (err) {
    console.error("กรณี ข) ข้อผิดพลาด:", err.message);
    return;
  }
  console.log("กรณี ข) พบข้อมูล:", student);
});

fetchStudentById(42, (err, student) => {
  if (err) {
    console.error("กรณี ค) ข้อผิดพลาด:", err.message);
    return;
  }
  console.log("กรณี ค) พบข้อมูล:", student);
});

/* 4
1: ถ้าลืมตรวจ error แล้วอ่าน .name ทันที จะเกิดอะไรขึ้น? ใครเห็น error นั้น?
ตอบ
  - หากมี error เกิดขึ้น ตัวแปร student จะเป็น undefined เมื่อพยายามเข้าถึง undefined.name จะเกิด TypeError: Cannot read properties of undefined (reading 'name') ทำให้โปรแกรม crash ทันที
  - ผู้ที่เห็น error คือ Developer หรือผู้รันโปรแกรมผ่าน Node.js (แสดงผลใน Console/Terminal) เนื่องจาก error ไม่ถูกคัดกรองหรือจัดการอย่างถูกต้องก่อนนำข้อมูลไปใช้

2: ทำไมต้อง return หลังเรียก callback(error)?
ตอบ
  - เพื่อหยุดการทำงานของฟังก์ชันทันที ไม่ให้โค้ดส่วนล่าง (เช่น setTimeout หรือการประมวลผลข้อมูลต่อ) ทำงานซ้ำซ้อน เพราะหากไม่ใส่ return โค้ดจะยังคงรันบรรทัดถัดไปต่อและอาจเรียก callback ซ้ำสองรอบ ทำให้เกิดพฤติกรรมที่ไม่พึงประสงค์
*/