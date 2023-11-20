/**
 * Controller to handle GET / which tests if the server is running.
 * @param {*} req the request body from the client
 * @param {*} res the response body that will be sent to the client
 * @see routes/routes.js#getIndex
 */
function getIndex(req, res) {
    res.send('I am a healthy server!');
  }
  
module.exports = getIndex;
  