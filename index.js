const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { DB_URI } = require('./config/connection');
const StudentClinicController = require('./controllers/StudentClinicController');

const app = express();

app.use(bodyParser.json());

mongoose.connect(DB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.set('useFindAndModify', false);

app.get('/student-clinic', StudentClinicController.index);
app.post('/student-clinic', StudentClinicController.create);
app.post('/student-clinic/create-many', StudentClinicController.createMany);
app.get('/student-clinic/:id', StudentClinicController.show);
app.put('/student-clinic/:id', StudentClinicController.update);
app.delete('/student-clinic/:id', StudentClinicController.destroy);

app.listen(3000, () => {});