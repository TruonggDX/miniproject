const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { getStudent,addStudent,deleteStudentByName } = require('../service/studentService.js');
const { getFee,addFee, deleteFee } = require('../service/feeService.js');

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

app.delete('/delete/:name', async (req, res) => {
    try {
        const studentName = req.params.name;
        await deleteStudentByName(studentName);
        res.status(200).send('Xóa thành công!');
    } catch (error) {
        res.status(404).send('Không tìm thấy tên sinh viên.');
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

// app.get('/user/:id', (req, res) => {
//     const userId = req.params.id;
//     res.send(`User ID is: ${userId}`);
// });

app.use((req, res) => {
    res.status(404).send('404: Not Found');
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
