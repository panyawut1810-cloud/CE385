function login(inputUser, inputPass, role, isActive, age) {
  if (inputUser !== "admin" || inputPass !== "ce385pass") {
    return "ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง";
  }

  if (isActive === false) {
    return "บัญชีนี้ถูกระงับการใช้งาน";
  }

  if (age < 18) {
    return "อายุไม่ถึงเกณฑ์";
  }

  if (role === "อาจารย์") {
    return "เข้าสู่ระบบสำเร็จ (สิทธิ์ผู้ดูแล)";
  } else if (role === "นักศึกษา") {
    return "เข้าสู่ระบบสำเร็จ (สิทธิ์ทั่วไป)";
  } else {
    return "ไม่พบสิทธิ์การใช้งานนี้";
  }
}

console.log("1. สำเร็จ (อาจารย์):", login("admin", "ce385pass", "อาจารย์", true, 30));
console.log("2. สำเร็จ (นักศึกษา):", login("admin", "ce385pass", "นักศึกษา", true, 20));
console.log("3. รหัสผ่านผิด:", login("admin", "wrongpass", "นักศึกษา", true, 20));
console.log("4. ชื่อผู้ใช้ผิด:", login("wronguser", "ce385pass", "นักศึกษา", true, 20));
console.log("5. บัญชีถูกระงับ:", login("admin", "ce385pass", "นักศึกษา", false, 20));
console.log("6. อายุไม่ถึงเกณฑ์:", login("admin", "ce385pass", "นักศึกษา", true, 16));

/*
1. ทำไมต้องตรวจ username/password ก่อนตรวจ role?
ตอบ: ตามหลักความปลอดภัย (Authentication มาก่อน Authorization) ต้องพิสูจน์ก่อนว่าผู้ใช้คือใครและมีตัวตนจริงก่อนที่จะไปเช็กสิทธิ์ 
2. ถ้าย้ายการตรวจ "อายุไม่ถึงเกณฑ์" ขึ้นไปเป็นข้อแรก จะเกิดปัญหาอะไร?
ตอบ: จะเกิดปัญหา Information Leakage (ข้อมูลรั่วไหล) เพราะระบบจะเผลอบอกเงื่อนไขภายในระบบแก่ผู้ที่ยังไม่ได้ผ่านการพิสูจน์ตัวตน
*/
