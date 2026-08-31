const students = [
  { id: '6501', name: 'Somchai', major: 'CE', score: 85, contact: { email: 'somchai@ce.com', phone: '081-111-1111' } },
  { id: '6502', name: 'Somsak',  major: 'IT', score: 45, contact: { email: 'somsak@it.com', phone: '082-222-2222' } },
  { id: '6503', name: 'Somsri',  major: 'CE', score: 72, contact: { email: 'somsri@ce.com', phone: '083-333-3333' } },
  { id: '6504', name: 'Sompong', major: 'IT', score: 68, contact: { email: 'sompong@it.com', phone: '084-444-4444' } },
  { id: '6505', name: 'Somporn', major: 'CE', score: 40, contact: { email: 'somporn@ce.com', phone: '085-555-5555' } },
  { id: '6506', name: 'Somjai',  major: 'IT', score: 90, contact: { email: 'somjai@it.com', phone: '086-666-6666' } }
];

const findById = (stdList, id) => stdList.find((student) => student.id === id);

const findByMajor = (stdList, major) => stdList.filter((student) => student.major === major);

const hasFailingStudent = (stdList) => stdList.some((student) => student.score < 50);

const getEmail = (stdList, id) => {
  const student = findById(stdList, id);
  return student?.contact?.email ?? 'ไม่พบข้อมูลติดต่อ';
};

console.log('--- ส่วนที่ 3: ทดสอบกรณีหาไม่เจอ ---');
console.log('findById(students, "9999"):', findById(students, '9999')); // undefined
console.log('getEmail(students, "9999"):', getEmail(students, '9999')); // "ไม่พบข้อมูลติดต่อ"

const newStudentNoContact = { id: '6507', name: 'Somneuk', major: 'IT', score: 55 };
const updatedStudents = [...students, newStudentNoContact];

console.log('getEmail คนที่ไม่มี contact (6507):', getEmail(updatedStudents, '6507')); // "ไม่พบข้อมูลติดต่อ"