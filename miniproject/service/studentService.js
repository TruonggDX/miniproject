const fs = require('fs').promises; 
const xlsx = require('xlsx');
const { get } = require('https');
const path = require('path');
let pathStudentJson = "../dao/student.json"

async function getStudent() {
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
async function addStudent(student){
    let arrayStudent = await getStudent(); 
    arrayStudent.push(student); 

    await fs.writeFile(
        pathStudentJson,
        JSON.stringify(arrayStudent),
        err => {
            if (err) throw err;
            console.log("Done writing");
        }
    );
}
async function deleteStudentById(id) {
    try {
        const jsonFilePath = path.join(__dirname, pathStudentJson);
        let arrayStudent = await getStudent();
        const updatedStudents = arrayStudent.filter(student => student.id !== parseInt(id));
        await fs.writeFile(
            jsonFilePath,
            JSON.stringify(updatedStudents, null, 2),
            'utf8'
        );
        console.log('Xóa thành công');
    } catch (err) {
        console.error('Lỗi:', err);
    }
}

async function exportExcel(){
    try{
        const student = await getStudent()
        const workbook = xlsx.utils.book_new();
        const worksheet = xlsx.utils.json_to_sheet(student)
        xlsx.utils.book_append_sheet(workbook,worksheet,'student')
        const filePath = path.join(__dirname, 'students_list.xlsx');


        xlsx.writeFile(workbook, filePath);

        console.log('Xuất Excel thành công:', filePath);
    } catch (error) {
        console.error('Lỗi khi xuất Excel:', error);
    }
}

module.exports = { getStudent, addStudent,deleteStudentById,exportExcel};
