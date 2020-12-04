const _ = require('lodash');
const StudentClinic = require('../models/StudentClinic.model');
const ObjectId = require('mongodb').ObjectID;
const { responseOK, responseError } = require('../services/ResponseService');


const index = async (req, res) => {
    const { fullName, course, healthStatus } = req.query;

    if (!fullName && !course && !healthStatus) return responseOK(res, await StudentClinic.find({}));

    const attrs = {};

    if (fullName) attrs.fullName = fullName;
    if (course) attrs.course = course;
    if (healthStatus) attrs.healthStatus = healthStatus;

    const result = await StudentClinic.find(attrs);

    return responseOK(res, result);
}

const create = async (req, res) => {
    const { fullName, course, healthStatus } = req.body;

    if (fullName && course && healthStatus) {
        try {
            await StudentClinic.create(req.body);

            return responseOK(res)
        } catch (err) {
            return responseError(res, 400, err.message);
        }
    }

    return responseError(res, 400, 'bad request');
};

const createMany = async (req, res) => {
    const { studentsParams } = req.body;
    let valid = true;

    if (_.isEmpty(studentsParams)) return responseError(res, 400, 'bad request');

    studentsParams.forEach(sp => {
        if (StudentClinic.isValid(sp)) return;

        valid = false;
        return;
    });

    if (!valid) return responseError(res, 400, 'bad request');

    await StudentClinic.insertMany(studentsParams);

    return responseOK(res);
};

const show = async (req, res) => {
    const { id } = req.params;
    const sc = await StudentClinic.findOne({ _id: ObjectId(id) });

    if (sc) return responseOK(res, sc);

    return responseError(res, 404, 'not found');
};

const update = async (req, res) => {
    const { id } = req.params;
    const { fullName, course, healthStatus } = req.body;
    const attrs = {};

    if (fullName) attrs.fullName = fullName;
    if (course) attrs.course = course;
    if (healthStatus) attrs.healthStatus = healthStatus;

    const sc = await StudentClinic.findOneAndUpdate({ _id: ObjectId(id) }, attrs);

    if (sc) return responseOK(res, { message: 'updated successfully!' });

    return responseError(res, 404, 'not found');
};

const destroy = async (req, res) => {
    if (!id) return responseError(res, 400, 'bad request');

    await StudentClinic.deleteOne({ _id: ObjectId(id) });
    return responseOK(res, { message: 'deleted successfully!' });
};

module.exports = {
    index,
    create,
    createMany,
    show,
    update,
    destroy
};
