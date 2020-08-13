var DataBase = require('../../DataBase/DBControler');
//
//
// User
exports.UserView = async function (req, res) {
    try {
        if (req.params.Mode == "UserName") {
            var result = await DataBase.mainUser.Find(req.params.Data, DataBase.mainUser.FindType.UserName);

        }
        else if (req.params.Mode == "IDDevice") {
            var result = await DataBase.mainUser.Find(req.params.Data, DataBase.mainUser.FindType.IDDevice);
        }
        else if (req.params.Mode == "IDProject") {
            var result = await DataBase.mainUser.Find(req.params.Data, DataBase.mainUser.FindType.IDProject);
        }
        else if (req.params.Mode == "ID") {
            var result = await DataBase.mainUser.Find(req.params.Data, DataBase.mainUser.FindType.ID);
        }
        else {
            var result = await DataBase.mainUser.Find(req.params.Data, DataBase.mainUser.FindType.All);
        }
        if (result == null)
            res.status(502).send("error");
        else
            res.send(result);
    } catch (error) {
        res.status(500).send(error);
    }
};

exports.ProjectView = async function (req, res) {
    try {
        if (req.params.Mode == "IDProject") {
            var result = await DataBase.mainProject.Find(req.params.Data, DataBase.mainProject.FindType.IDProject);
        }
        else if (req.params.Mode == "ProjectName") {
            var result = await DataBase.mainProject.Find(req.params.Data, DataBase.mainProject.FindType.ProjectName);
        }
        else if (req.params.Mode == "ID") {
            var result = await DataBase.mainProject.Find(req.params.Data, DataBase.mainProject.FindType.ID);
        }
        else {
            var result = await DataBase.mainProject.Find(req.params.Data, DataBase.mainProject.FindType.All);
        }
        if (result == null)
            res.status(502).send("error");
        else
            res.send(result);
    } catch (error) {
        res.status(500).send(error);
    }
};

exports.QRCodeView = async function (req, res) {
    try {
        if (req.params.Mode == "IDQRCode") {
            var result = await DataBase.mainQRCode.Find(req.params.Data, DataBase.mainQRCode.FindType.IDQRCode);
        }
        else if (req.params.Mode == "BuildingName") {
            var result = await DataBase.mainQRCode.Find(req.params.Data, DataBase.mainQRCode.FindType.BuildingName);
        }
        else if (req.params.Mode == "ID") {
            var result = await DataBase.mainQRCode.Find(req.params.Data, DataBase.mainQRCode.FindType.ID);
        }
        else if (req.params.Mode == "IDProject") {
            var result = await DataBase.mainQRCode.Find(req.params.Data, DataBase.mainQRCode.FindType.IDProject);
        }
        else {
            var result = await DataBase.mainQRCode.Find(req.params.Data, DataBase.mainQRCode.FindType.All);
        }
        if (result == null)
            res.status(502).send("error");
        else
            res.send(result);
    } catch (error) {
        res.status(500).send(error);
    }
};

exports.DeviceView = async function (req, res) {
    try {
        if (req.params.Mode == "NameDevice") {
            var result = await DataBase.mainDevice.Find(req.params.Data, DataBase.mainDevice.FindType.NameDevice);
        }
        else if (req.params.Mode == "Role") {
            var result = await DataBase.mainDevice.Find(req.params.Data, DataBase.mainDevice.FindType.Role);
        }
        else if (req.params.Mode == "IDProject") {
            var result = await DataBase.mainDevice.Find(req.params.Data, DataBase.mainDevice.FindType.IDProject);
        }
        else if (req.params.Mode == "ID") {
            var result = await DataBase.mainDevice.Find(req.params.Data, DataBase.mainDevice.FindType.ID);
        }
        else {
            var result = await DataBase.mainDevice.Find(req.params.Data, DataBase.mainDevice.FindType.All);
        }
        if (result == null)
            res.status(502).send("error");
        else
            res.send(result);
    } catch (error) {
        res.status(500).send(error);
    }
};

exports.ElevatorView = async function (req, res) {
    try {
        if (req.params.Mode == "NameElevator") {
            var result = await DataBase.mainElevator.Find(req.params.Data, DataBase.mainElevator.FindType.NameElevator);
        }
        else if (req.params.Mode == "ID") {
            var result = await DataBase.mainElevator.Find(req.params.Data, DataBase.mainElevator.FindType.ID);
        }
        else if (req.params.Mode == "IDProject") {
            var result = await DataBase.mainElevator.Find(req.params.Data, DataBase.mainElevator.FindType.IDProject);
        }
        else {
            var result = await DataBase.mainElevator.Find(req.params.Data, DataBase.mainElevator.FindType.All);
        }
        if (result == null)
            res.status(502).send("error");
        else
            res.send(result);
    } catch (error) {
        res.status(500).send(error);
    }
};

//Them
exports.UserAdd = async function (req, res) {
    try {
        var result = await DataBase.mainUser.save(req.body, req.params.Mode);
        res.send(result);
    } catch (error) {
        res.status(500).send(error);
    }
};

exports.ProjectAdd = async function (req, res) {
    try {
        var result = await DataBase.mainProject.save(req.body, req.params.Mode);
        res.send(result);
    } catch (error) {
        res.status(500).send(error);
    }
};

exports.QRCodeAdd = async function (req, res) {
    try {
        var result = await DataBase.mainQRCode.save(req.body, req.params.Mode);
        res.send(result);
    } catch (error) {
        res.status(500).send(error);
    }
};

exports.DeviceAdd = async function (req, res) {
    try {
        var result = await DataBase.mainDevice.save(req.body, req.params.Mode);
        res.send(result);
    } catch (error) {
        res.status(500).send(error);
    }
};

exports.ElevatorAdd = async function (req, res) {
    try {
        var result = await DataBase.mainElevator.save(req.body, req.params.Mode);
        res.send(result);
    } catch (error) {
        res.status(500).send(error);
    }
};

//Sua
exports.UserModify = async function (req, res) {
    try {
        var result = await DataBase.mainUser.update(req.body);
        res.send(result);
    } catch (error) {
        res.status(500).send(error);
    }
};

exports.ProjectModify = async function (req, res) {
    try {
        var result = await DataBase.mainProject.update(req.body);
        res.send(result);
    } catch (error) {
        res.status(500).send(error);
    }
};

exports.QRCodeModify = async function (req, res) {
    try {
        var result = await DataBase.mainQRCode.update(req.body);
        res.send(result);
    } catch (error) {
        res.status(500).send(error);
    }
};

exports.DeviceModify = async function (req, res) {
    try {
        var result = await DataBase.mainDevice.update(req.body);
        res.send(result);
    } catch (error) {
        res.status(500).send(error);
    }
};

exports.ElevatorModify = async function (req, res) {
    try {
        var result = await DataBase.mainElevator.update(req.body);
        res.send(result);
    } catch (error) {
        res.status(500).send(error);
    }
};

//Xoa
exports.UserDelete = async function (req, res) {
    try {
        var result = await DataBase.mainUser.Delete(req.params.Data);
        res.send(result);
    } catch (error) {
        res.status(500).send(error);
    }
};

exports.ProjectDelete = async function (req, res) {
    try {
        var result = await DataBase.mainProject.Delete(req.params.Data);
        res.send(result);
    } catch (error) {
        res.status(500).send(error);
    }
};

exports.QRCodeDelete = async function (req, res) {
    try {
        var result = await DataBase.mainQRCode.Delete(req.params.Data);
        res.send(result);
    } catch (error) {
        res.status(500).send(error);
    }
};

exports.DeviceDelete = async function (req, res) {
    try {
        var result = await DataBase.mainDevice.Delete(req.params.Data);
        res.send(result);
    } catch (error) {
        res.status(500).send(error);
    }
};

exports.ElevatorDelete = async function (req, res) {
    try {
        var result = await DataBase.mainElevator.Delete(req.params.Data);
        res.send(result);
    } catch (error) {
        res.status(500).send(error);
    }
};