const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { getStudent,addStudent,deleteStudentByName } = require('./student.js');

const app = express();
const PORT = 3000;

app.use(cors());

// Middleware để phân tích dữ liệu JSON
app.use(express.json());
app.use(bodyParser.json());
// Route chính
app.get('/', async (req, res) => {
    try {
        const message = await getStudent(); 
        res.json(message);
    } catch (error) {
        res.status(500).send('Error reading JSON data');
    }
});

//
app.delete('/delete/:name', async (req, res) => {
    try {
        const studentName = req.params.name;
        await deleteStudentByName(studentName);
        res.status(200).send('Xóa thành công!');
    } catch (error) {
        res.status(404).send('Không tìm thấy tên sinh viên.');
    }
});

//
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


// Route với tham số
app.get('/user/:id', (req, res) => {
    const userId = req.params.id;
    res.send(`User ID is: ${userId}`);
});

// Bắt lỗi cho route không tìm thấy
app.use((req, res) => {
    res.status(404).send('404: Not Found');
});

// Khởi động server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
