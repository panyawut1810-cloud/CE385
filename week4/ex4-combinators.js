// เครื่องมือจำลอง
const wait = (ms, value, willFail = false) =>
  new Promise((resolve, reject) => {
    setTimeout(() => (willFail ? reject(new Error(`${value} ล้มเหลว`)) : resolve(value)), ms);
  });

// ฟังก์ชันสร้าง Timeout Helper สำหรับสถานการณ์ที่ 4
const timeoutPromise = (ms) => 
  new Promise((_, reject) => setTimeout(() => reject(new Error("Timeout")), ms));

async function main() {
  console.log("=== ข้อที่ 4: Combinators ===\n");

  // สถานการณ์ที่ 1 หน้าแรก "โปรไฟล์" (300ms) + "ตารางเรียน" (400ms) + "ประกาศ" (500ms)
  // เหตุผลคือต้องการข้อมูลครบทุกส่วนเพื่อเปิดหน้าแรก หากมีส่วนใดล้มเหลว หน้าแรกจะเปิดไม่ได้ทันที 
  // จึงต้องใช้ Promise.all ซึ่งจะ reject ทันทีที่อันใดอันหนึ่งล้มเหลว

  console.log("--- สถานการณ์ที่ 1 ---");

  try {
    const res1 = await Promise.all([
      wait(300, "โปรไฟล์"),
      wait(400, "ตารางเรียน"),
      wait(500, "ประกาศ")
    ]);
    console.log(`เปิดหน้าแรก: ${res1.join(" + ")}`);
  } catch (err) {
    console.log(`หน้าแรกเปิดไม่ได้: <${err.message}>`);
  }

  try {
    const res1Fail = await Promise.all([
      wait(300, "โปรไฟล์"),
      wait(400, "ตารางเรียน"),
      wait(500, "ประกาศ", true)
    ]);
    console.log(`เปิดหน้าแรก: ${res1Fail.join(" + ")}`);
  } catch (err) {
    console.log(`หน้าแรกเปิดไม่ได้: <${err.message}>`);
  }
  
  // สถานการณ์ที่ 2 แจ้งเตือนผลสอบ: "อีเมล" (300ms สำเร็จ) · "SMS" (500ms ล้ม) · "แอป" (400ms สำเร็จ)
  // เหตุผลคือต้องการส่งหลายช่องทางและต้องทราบรายงานของทุกช่องทาง ไม่ว่าจะสำเร็จหรือล้มเหลว โดยห้ามล้มเหลวยกแก๊ง
  // จึงเลือกใช้ Promise.allSettled เพื่อเก็บผลลัพธ์ (fulfilled/rejected) ครบทุกอัน

  console.log("\n--- สถานการณ์ที่ 2 ---");
  const res2 = await Promise.allSettled([
    wait(300, "อีเมล"),
    wait(500, "SMS", true),
    wait(400, "แอป")
  ]);
  
  console.log("รายงานการส่งแจ้งเตือน:");
  res2.forEach((result, idx) => {
    const channels = ["อีเมล", "SMS", "แอป"];
    if (result.status === "fulfilled") {
      console.log(` - ช่องทาง ${channels[idx]}: สำเร็จ (${result.value})`);
    } else {
      console.log(` - ช่องทาง ${channels[idx]}: ล้มเหลว (${result.reason.message})`);
    }
  });

  // สถานการณ์ที่ 3 mirror server: mirror-A (300ms ล้ม) · mirror-B (600ms สำเร็จ)
  // เหตุผลคือต้องการข้อมูลจากเซิร์ฟเวอร์สำรองที่ "สำเร็จเป็นตัวแรก" โดยมองข้ามตัวที่ล้มเหลวไป
  // จึงเลือกใช้ Promise.any เพื่อเอาผลลัพธ์สำเร็จแรกสุด

  console.log("\n--- สถานการณ์ที่ 3 ---");
  try {
    const res3 = await Promise.any([
      wait(300, "mirror-A", true),
      wait(600, "mirror-B")
    ]);
    console.log(`ได้ข้อมูลจาก: ${res3}`);
  } catch (err) {
    console.log("ล้มเหลวทุกเซิร์ฟเวอร์");
  }


  // สถานการณ์ที่ 4 ค้นหา: ฐานข้อมูล (1200ms สำเร็จ) แต่ผู้ใช้รอได้ 800ms
  // เหตุผลคือต้องการวัดการแข่งขันเรื่องเวลา (Race Condition) ระหว่างการดึงข้อมูลกับเวลาหมดตัว (Timeout)
  // อะไรเสร็จ/จบก่อนเอาอันนั้น จึงเลือกใช้ Promise.race คู่กับตัวกำหนดเวลา timeout
 
  console.log("\n--- สถานการณ์ที่ 4 ---");
  try {
    const res4 = await Promise.race([
      wait(1200, "ฐานข้อมูล"),
      timeoutPromise(800)
    ]);
    console.log(`ใช้ข้อมูลจาก: ${res4}`);
  } catch (err) {
    console.log("เกิน 800ms -> เลิกรอ -> ใช้แคชเก่าแทน");
  }
}

main();