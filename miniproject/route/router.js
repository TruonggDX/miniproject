const express = require('express');
const xlsx = require('xlsx');
const multer = require('multer');

const cors = require('cors');
const bodyParser = require('body-parser');
const { getStudent,addStudent,deleteStudentById,exportExcel,importExcel , updateStudent } = require('../service/studentService.js');
const { getFee,addFee, deleteFee , updateFee} = require('../service/feeService.js');
const { getPaymentDeadline, addPaymentDeadline,deletePaymentDeadlineById,updatePaymentDeadline } = require('../service/paymentDeadline.js');

const app = express();
const PORT = 3000;

app.use(cors());

app.use(express.json());
app.use(bodyParser.json());

app.get('/', async (req, res) => {
    try {
        const message = await getStudent(); 
        res.json(message);
    } catch (error) {
        res.status(500).send('Error reading JSON data');
    }
});
app.delete('/deleteStudentById/:id', async (req, res) => {
    try {
        const studentId = req.params.id;
        await deleteStudentById(studentId);
        res.status(200).send('Xóa thành công!');
    } catch (error) {
        res.status(404).send('Không tìm thấy id học phí.');
    }
});

app.post('/addStudent', async (req, res) => {
    try {
        const student = req.body;
        await addStudent(student);
        res.status(200).send('Sinh viên đã được thêm thành công!');
    } catch (err) {
        console.error('Error adding student:', err);
        res.status(500).send('Có lỗi xảy ra khi thêm sinh viên.');
    }
});
app.put('/updateStudent', async (req, res) => {
    try {
        const student = req.body;
        await updateStudent(student);
        res.status(200).send('Cập nhật thành công!');
    } catch (err) {
        console.error('Error updating student:', err);
        res.status(500).send('Có lỗi xảy ra khi cập nhật sinh viên.');
    }
});

app.get('/export-students', async (req, res) => {
    try {
        const filePath = await exportExcel(); 
        res.download(filePath, 'students_list.xlsx', (err) => {
            if (err) {
                res.status(500).send('Lỗi tải file');
            }
        });
    } catch (error) {
        res.status(500).send('Có lỗi xảy ra khi xuất file Excel.');
    }
});

//Fee
app.get('/getAllFee', async (req, res) => {
    try {
        const message = await getFee();
        res.json(message);
    } catch (error) {
        res.status(500).send('Error reading JSON data');
    }
});
app.post('/addFee', async (req, res) => {
    try {
        const fee = req.body;
        await addFee(fee);
        res.status(200).send('Học phí đã được thêm thành công!');
    } catch (err) {
        console.error('Error adding student:', err);
        res.status(500).send('Có lỗi xảy ra khi thêm .');
    }
});
app.delete('/deleteFeeById/:id', async (req, res) => {
    try {
        const feeId = req.params.id;
        await deleteFee(feeId);
        res.status(200).send('Xóa thành công!');
    } catch (error) {
        res.status(404).send('Không tìm thấy id học phí.');
    }
});

//paymentDeadlain
app.get('/getAllPaymentDeadlain', async (req, res) => {
    try {
        const message = await getPaymentDeadline();
        res.json(message);
    } catch (error) {
        res.status(500).send('Error reading JSON data');
    }
});
app.post('/addPaymentDeadlain', async (req, res) => {
    try {
        const fee = req.body;
        await addPaymentDeadline(fee);
        res.status(200).send('Học phí đã được thêm thành công!');
    } catch (err) {
        console.error('Error adding student:', err);
        res.status(500).send('Có lỗi xảy ra khi thêm .');
    }
});
app.delete('/deletePaymentDeadlainById/:id', async (req, res) => {
    try {
        const feeId = req.params.id;
        await deletePaymentDeadlineById(feeId);
        res.status(200).send('Xóa thành công!');
    } catch (error) {
        res.status(404).send('Không tìm thấy id học phí.');
    }
});
app.put('/updatePaymentDeadline', async (req, res) => {
    try {
        const student = req.body;
        await updatePaymentDeadline(student);
        res.status(200).send('Cập nhật thành công!');
    } catch (err) {
        console.error('Error updating student:', err);
        res.status(500).send('Có lỗi xảy ra khi cập nhật.');
    }
});
app.get('/user/:id', (req, res) => {
    const userId = req.params.id;
    res.send(`User ID is: ${userId}`);
});

app.use((req, res) => {
    res.status(404).send('404: Not Found');
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
