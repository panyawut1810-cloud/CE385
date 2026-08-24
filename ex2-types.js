const strVal = "สวัสดี";
const numVal = 100;
const boolVal = true;
let undefVal;
const nullVal = null;
const arrVal = [1, 2, 3];

console.log(`ค่า: ${strVal} | ชนิด: ${typeof strVal}`);
console.log(`ค่า: ${numVal} | ชนิด: ${typeof numVal}`);
console.log(`ค่า: ${boolVal} | ชนิด: ${typeof boolVal}`);
console.log(`ค่า: ${undefVal} | ชนิด: ${typeof undefVal}`);
console.log(`ค่า: ${nullVal} | ชนิด: ${typeof nullVal}`);
console.log(`ค่า: ${arrVal} | ชนิด: ${typeof arrVal}`);

console.log("\n--- ส่วนที่ 2 ---");
console.log(`typeof null ได้ผลว่า: ${typeof nullVal} (ทางเทคนิคถือเป็น bug ประวัติศาสตร์ของ JS ซึ่งในความเป็นจริง null ไม่ใช่ object)`);
console.log(`ตัวแปรที่ประกาศแล้วยังไม่กำหนดค่า มีชนิดเป็น: ${typeof undefVal}`);

const nanVal = Number("abc");
console.log(`typeof NaN ได้ผลว่า: ${typeof nanVal} (สร้าง NaN ด้วย Number("abc"))`);
console.log(`ตรวจสอบ NaN ด้วย Number.isNaN: ${Number.isNaN(nanVal)}`);

console.log("\n--- ส่วนที่ 3 ---");
const inputAge = "20";
const inputScore = "85.5";

const ageNumber = Number(inputAge) + 5;
console.log(`แปลง inputAge เป็นตัวเลขแล้ว +5: ${ageNumber}`);

const scoreNumber = Number(inputScore);
console.log(`แปลง inputScore แล้วแสดงผลทศนิยม 1 ตำแหน่ง: ${scoreNumber.toFixed(1)}`);

console.log(`inputAge === 20 ผลคือ: ${inputAge === 20}`);
console.log(`Number(inputAge) === 20 ผลคือ: ${Number(inputAge) === 20}`);