// api-routes.js
// Initialize express router
let router = require('express').Router();
// Set default API response
router.get('/', function (req, res) {
        res.json({
                status: 'API Its Working',
                message: 'Welcome to Tan Phat TPE',
        });
});
// Import contact controller
var contactController = require('./contactController');
// user
router.route('/User/:Mode/:Data')
        .get(contactController.UserView)
        .post(contactController.UserAdd)
        .put(contactController.UserModify)
        .delete(contactController.UserDelete)

// Project
router.route('/Project/:Mode/:Data')
        .get(contactController.ProjectView)
        .post(contactController.ProjectAdd)
        .put(contactController.ProjectModify)
        .delete(contactController.ProjectDelete)


// QRCode
router.route('/QRCode/:Mode/:Data')
        .get(contactController.QRCodeView)
        .post(contactController.QRCodeAdd)
        .put(contactController.QRCodeModify)
        .delete(contactController.QRCodeDelete)

// Device
router.route('/Device/:Mode/:Data')
        .get(contactController.DeviceView)
        .post(contactController.DeviceAdd)
        .put(contactController.DeviceModify)
        .delete(contactController.DeviceDelete)

// Device
router.route('/Elevator/:Mode/:Data')
        .get(contactController.ElevatorView)
        .post(contactController.ElevatorAdd)
        .put(contactController.ElevatorModify)
        .delete(contactController.ElevatorDelete)

// Export API routes
module.exports = router;