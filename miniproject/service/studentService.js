const fs = require('fs').promises; 
const xlsx = require('xlsx');
const multer = require('multer');
const excelToJson = require('convert-excel-to-json');
const fse = require('fs-extra');
const { get } = require('https');
const path = require('path');
let pathStudentJson = "../dao/student.json"
const upload = multer({ dest: 'uploads/' });


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

async function exportExcel() {
    try {
        const student = await getStudent();
        const workbook = xlsx.utils.book_new();
        const worksheet = xlsx.utils.json_to_sheet(student);
        xlsx.utils.book_append_sheet(workbook, worksheet, 'student');
        const filePath = path.join(__dirname, 'students_list.xlsx');

        xlsx.writeFile(workbook, filePath);

        console.log('Xuất Excel thành công:', filePath);
        return filePath;  
    } catch (error) {
        console.error('Lỗi khi xuất Excel:', error);
        throw error;
    }
}
async function updateStudent(newStudent) {
    let arrayStudent = await getStudent(); 
    const index = arrayStudent.findIndex(obj => obj.id === newStudent.id);

    if (index !== -1) {
        arrayStudent[index] = newStudent;

        await fs.writeFile(
            pathStudentJson,
            JSON.stringify(arrayStudent, null, 2) 
        );
        console.log("Đã cập nhật thành công");
    } else {
        console.error('Sinh viên không tồn tại');
        throw new Error('Sinh viên không tồn tại');
    }
}   

async function importExcel(filePath) {
    try {
        const workbook = xlsx.readFile(filePath);
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const data = xlsx.utils.sheet_to_json(worksheet);
        return data;
    } catch (error) {
        console.error('Lỗi đọc file:', error);
        throw error;
    }
}


async function importData(filePath) {
    try {
        const newData = await importExcel(filePath);
        const currentData = await getStudent();
        const updatedData = currentData.concat(newData);
        await fs.writeFile(pathStudentJson, JSON.stringify(updatedData, null, 2), 'utf8');
        console.log('Thành công');
    } catch (error) {
        console.error('Error importing data:', error);
        throw error;
    }
}
module.exports = { getStudent, addStudent,deleteStudentById,exportExcel,importExcel,importData,updateStudent};
