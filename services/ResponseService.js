const responseOK = (res, data) => {
  data = data || {};
  data.status = 'ok';
  
  return res.status(200).json(data);
};

const responseError = (res, status, errorMessage) => {
  errorMessage = errorMessage || 'Something went wrong...';
  return res.status(status).json({ message: errorMessage });
};

module.exports = {
  responseOK,
  responseError
}