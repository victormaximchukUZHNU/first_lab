const mongoose = require('mongoose');
const StudentClinicSchema = require('./StudentClinic.schema');

const StudentClinic = mongoose.model('StudentClinic', StudentClinicSchema);

StudentClinic.isValid = (object) => {
  const { fullName, course, healthStatus } = object;

  if (fullName && course && healthStatus) return true;

  return false;
}

module.exports = StudentClinic;