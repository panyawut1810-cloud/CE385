const isValidScore = (score) => typeof score === 'number' && score >= 0 && score <= 100;

const toGrade = (score) => {
  if (!isValidScore(score)) {
    return 'Invalid Score';
  }

  const gradeRules = [
    { min: 80, grade: 'A' },
    { min: 75, grade: 'B+' },
    { min: 70, grade: 'B' },
    { min: 65, grade: 'C+' },
    { min: 60, grade: 'C' },
    { min: 55, grade: 'D+' },
    { min: 50, grade: 'D' },
    { min: 0,  grade: 'F' }
  ];

  const matched = gradeRules.find((rule) => score >= rule.min);
  return matched ? matched.grade : 'F';
};

const calculateWorkshopScore = (raw, full = 60, weight = 20) => {
  const actualFull = full ?? 60; // รองรับกรณีส่ง undefined เข้ามา
  return (raw / actualFull) * weight;
};

const calculateTotal = (workshop, attendance, project, midterm, final) => {
  return workshop + attendance + project + midterm + final;
};

const studentsData = [
  { name: 'Somchai', workshopRaw: 50, attendance: 10, project: 20, midterm: 25, final: 25 },
  { name: 'Somsak',  workshopRaw: 30, attendance: 8,  project: 15, midterm: 18, final: 20 },
  { name: 'Somsri',  workshopRaw: 58, attendance: 10, project: 25, midterm: 28, final: 27 }
];

const studentResultsTable = studentsData.map((s) => {
  const wsScore = calculateWorkshopScore(s.workshopRaw);
  const totalScore = calculateTotal(wsScore, s.attendance, s.project, s.midterm, s.final);
  return {
    Name: s.name,
    Workshop: wsScore.toFixed(2),
    Total: totalScore.toFixed(2),
    Grade: toGrade(totalScore)
  };
});

console.log('--- ส่วนที่ 2: ผลการคำนวณคะแนนนักศึกษา 3 คน ---');
console.table(studentResultsTable);

const score1 = calculateWorkshopScore(48);
const score2 = calculateWorkshopScore(48, 60, 20);
const score3 = calculateWorkshopScore(48, undefined, 25);

console.log('\n--- ส่วนที่ 3: พิสูจน์ ค่าเริ่มต้น (Default Parameters) ---');
console.log('calculateWorkshopScore(48) =', score1);
console.log('calculateWorkshopScore(48, 60, 20) =', score2);
console.log('ผลลัพธ์เท่ากันหรือไม่:', score1 === score2); // ได้ true
console.log('calculateWorkshopScore(48, undefined, 25) =', score3);

/*
 * คำอธิบาย
 * การส่งค่า undefined เข้าไปในพารามิเตอร์ตำแหน่งที่สอง (full) จะทำให้ JavaScript ข้ามค่านั้นไป
 * และดึงค่า Default Parameter (full = 60) มาใช้แทนทันที ส่วนค่าน้ำหนัก (weight = 25) 
 * จะถูกนำไปใช้คำนวณตามที่ระบุส่งเข้าไปใหม่ ส่งผลให้ได้ผลลัพธ์คือ (48 / 60) * 25 = 20
 */