const express = require('express');
const StudentClinicController = require('./controllers/StudentClinicController');

const router = express.Router();

router.get('/student-clinic', StudentClinicController.index);
router.post('/student-clinic', StudentClinicController.create);
router.post('/student-clinic/create-many', StudentClinicController.createMany);
router.get('/student-clinic/:id', StudentClinicController.show);
router.put('/student-clinic/:id', StudentClinicController.update);
router.delete('/student-clinic/:id', StudentClinicController.destroy);

module.exports = router;
