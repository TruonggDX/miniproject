
const fs = require('fs').promises;
const { get } = require('https');
const path = require('path');
let pathStudentJson = "../dao/fee.json"

async function getFee() {
    const jsonFilePath = path.join(__dirname, pathStudentJson);

    try {
        const data = await fs.readFile(jsonFilePath, 'utf8');
        const jsonData = JSON.parse(data);
        return jsonData;
    } catch (err) {
        console.error('Error reading or parsing file:', err);
        throw err;
    }
}
async function addFee(fee){
    let arrayStudent = await getFee();
    arrayStudent.push(fee);

    await fs.writeFile(
        pathStudentJson,
        JSON.stringify(arrayStudent),
        err => {
            if (err) throw err;
            console.log("Done writing");
        }
    );
}
// async function deleteFee(name) {
//     try {
//         let arrayStudent = await getStudent();
//         const updatedStudents = arrayStudent.filter(student => student.name !== name);
//         await fs.writeFile(
//             pathStudentJson,
//             JSON.stringify(updatedStudents, null, 2),
//             'utf8'
//         );
//         console.log('Xóa thành công');
//     } catch (err) {
//         console.error('Lỗi:', err);
//     }
// }

module.exports = { getFee, addFee };
