const workshopRaw = 48;
const attendance = 9;
const project = 17;
const midterm = 15;
const final = 24;

const WORKSHOP_MAX_RAW = 60;
const WORKSHOP_WEIGHT = 20;
const TOTAL_MAX_SCORE = 100;
const TARGET_SCORE = 80;

const workshopScore = (workshopRaw / WORKSHOP_MAX_RAW) * WORKSHOP_WEIGHT;
const totalScore = workshopScore + attendance + project + midterm + final;
const scorePercentage = (totalScore / TOTAL_MAX_SCORE) * 100;
const missingScore = TARGET_SCORE - totalScore;

console.log(`===== สรุปคะแนนวิชา CE385 =====
คะแนน Workshop (แปลงแล้ว) : ${workshopScore.toFixed(2)} / ${WORKSHOP_WEIGHT}
คะแนนรวมทั้งหมด         : ${totalScore.toFixed(2)} / ${TOTAL_MAX_SCORE}
คิดเป็น                 : ${scorePercentage.toFixed(2)}%
คะแนนที่ขาดจากเกณฑ์ 80   : ${missingScore.toFixed(2)} คะแนน`);