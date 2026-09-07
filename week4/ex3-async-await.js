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

function fetchStudentByIdAsync(id) {
  return new Promise((resolve, reject) => {
    if (typeof id !== 'string' || id.trim() === '') {
      return reject(new Error("รหัสนักศึกษาไม่ถูกต้อง"));
    }
    setTimeout(() => {
      const student = students.find(s => s.id === id);
      if (!student) return reject(new Error(`ไม่พบรหัสนักศึกษา ${id}`));
      resolve({ ...student });
    }, 300);
  });
}

// 1
async function reportSequential() {
  const start = Date.now();
  const ids = ["6501", "6502", "6503"];
  
  for (const id of ids) {
    const student = await fetchStudentByIdAsync(id);
    console.log(`Sequential: ${student.name} (เกรด ${toGrade(student.score)})`);
  }
  
  const timeTaken = Date.now() - start;
  console.log(`Sequential ใช้เวลาทั้งหมด: ${timeTaken} ms\n`);
  return timeTaken;
}

// 2
async function reportParallel(seqTime) {
  const start = Date.now();
  const ids = ["6501", "6502", "6503"];
  
  const promises = ids.map(id => fetchStudentByIdAsync(id));
  const results = await Promise.all(promises);
  
  results.forEach(student => {
    console.log(`Parallel: ${student.name} (เกรด ${toGrade(student.score)})`);
  });
  
  const timeTaken = Date.now() - start;
  const speedup = (seqTime / timeTaken).toFixed(2);
  console.log(`Parallel ใช้เวลาทั้งหมด: ${timeTaken} ms (เร็วกว่าแบบลำดับ ~${speedup} เท่า)\n`);
}

// 3
async function safeReport(id) {
  try {
    const student = await fetchStudentByIdAsync(id);
    console.log(`พบข้อมูล: ${student.name} (เกรด ${toGrade(student.score)})`);
  } catch (error) {
    console.log(`ไม่พบพิมพ์ ตรวจไม่พบ: ${error.message}`);
  } finally {
    console.log(`-- จบการตรวจสอบ ${id} --`);
  }
}

async function main() {
  console.log("=== ข้อที่ 3: async/await ===");
  const seqTime = await reportSequential();
  await reportParallel(seqTime);
  
  console.log("--- ทดสอบ safeReport ---");
  await safeReport("6501"); 
  await safeReport("9999"); 
}

main();

/* 4 
1: ทำไม try-catch ครอบ await จับ reject ได้ แต่ครอบการเรียก callback ธรรมดาไม่ได้?
ตอบ
  - await จะทำการแปลง Promise ที่สถานะ rejected ให้กลายเป็น Exception (throw error) ออกมาในสโคปที่กำลังรันอยู่ try-catch จึงจับ error นั้นได้
  - แต่การเรียก callback ธรรมดา งานใน callback จะถูกส่งไปรันใน Event Loop รอบอื่น (Asynchronous Task) เมื่อ callback ถูกเรียกและโยน error สโคปของ try-catch ในรอบปัจจุบันได้จบการทำงานไปแล้ว จึงไม่สามารถจับ error ข้ามเวลาได้

2: ทดลอง "ลืม await" หน้า Promise.all แล้วเอาผลไปใช้ต่อ เกิดอะไรขึ้น?
ตอบ
  - หากลืมใส่ await หน้า Promise.all(...) ตัวแปรที่รับค่าไปจะไม่ใช่ "อาร์เรย์ของข้อมูลนักศึกษา" แต่จะเป็น "Promise Object" ที่ยังอยู่ในสถานะ pending
  - เมื่อนำไปใช้งานต่อ (เช่น ใช้ .forEach() หรือเข้าถึงดึงข้อมูล) จะเกิด Error หรือได้ค่า undefined/ผิดพลาดทันที เพราะข้อมูลจริงยังดึงมาไม่เสร็จ
*/