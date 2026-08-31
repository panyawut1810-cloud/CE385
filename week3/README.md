1.ex1-functions.js
-เขียน Arrow Function แยกฟังก์ชันย่อยๆ เช่น เช็กคะแนนถูกไหม, ตัดเกรด, คิดคะแนน workshop, รวมคะแนน
-ตรงตัดเกรด เอาคะแนนไปเช็ก isValidScore ก่อน แล้วใช้ .find() ดึงเกรดจาก array ของกฎเอา จะได้ไม่ต้องเขียน if-else ซ้อนกันเยอะ
-เรื่อง Default Parameter: ถ้าส่ง undefined เข้าไป JavaScript จะถือว่าไม่มีค่าส่งมา มันเลยไปหยิบค่า default ที่ตั้งไว้ (full = 60) มาใช้แทน คำนวณออกมาเลยได้ (48 / 60) * 25 = 20
-สุดท้ายเอาข้อมูลเด็ก 3 คนมาเข้าฟังก์ชัน แล้วใช้ console.table() พ่นตารางตอนท้ายข้อ 

2.ex2-collection.js
-สร้าง array เก็บ object นักศึกษา 6 คน ห้ามใช้ .push() แก้ array เดิมเด็ดขาด ให้ใช้ spread [...] เวลาเพิ่มคนใหม่แทน
-findById ใช้ .find() หาตาม ID / findByMajor ใช้ .filter() ดึงตามสาขา / hasFailingStudent ใช้ .some() เช็กว่ามีคนคะแนนน้อยกว่า 50 ไหม
-getEmail ใช้ ?. (Optional Chaining) กับ ?? (Nullish Coalescing) ดึงอีเมล กันโปรแกรมพังเวลาเจอคนไม่มี contact

3.ex3-transform.js
-สรุปข้อมูลห้ามใช้ลูป for/while
-getNames ใช้ .map() ดึงแต่ชื่อ / getPassedStudents ใช้ .filter() คัดคนผ่าน / getTotalScore ใช้ .reduce() รวมคะแนน
-getAverageScore คิดค่าเฉลี่ย ถ้าดักเจอ array ว่าง [] ให้ return 0 ออกไปเลย กันขึ้น NaN
-countByGrade กับ getTopStudent ใช้ .reduce() สรุปจำนวนเกรดกับหาคนคะแนนสูงสุด
-ท่อข้อมูล (Chaining) บรรทัดเดียว: เอา students.filter() คัดเด็ก CE ที่ผ่าน -> .map() ดึงคะแนน -> .reduce() คิดค่าเฉลี่ย
-ตอนท้ายลองส่ง [] เข้าทุกฟังก์ชันเพื่อเช็กว่าไม่เกิด error