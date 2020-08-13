let mongoose = require('mongoose');

let DeviceSchema = new mongoose.Schema({
    NameDevice: String,
    IPAdress: String,
    IDDevice: String,
    Role: String,
    IDProject: String,
    IDElevator: String,
    NameElevator: String,
    DateCreate: { type: String, default: "0001-01-01T00:00:00" },
    DateModified: { type: String, default: "0001-01-01T00:00:00" },
    Enable: Boolean,
    Status: String,
    Note: String
})

const MongoDataDevice = mongoose.model('Device', DeviceSchema);

class Device extends MongoDataDevice {

    constructor(NameDevice, IPAdress, IDDevice, Role, IDProject, IDElevator, NameElevator, DateCreate, DateModified, Enable, Status, Note) {
        super();
        this.NameDevice = NameDevice;
        this.IPAdress = IPAdress;
        this.IDDevice = IDDevice;
        this.Role = Role;
        this.IDProject = IDProject;
        this.IDElevator = IDElevator;
        this.NameElevator = NameElevator;
        this.DateCreate = DateCreate;
        this.DateModified = DateModified;
        this.Enable = Enable;
        this.Status = Status;
        this.Note = Note;

    }

    FindType = Object.freeze({ "ID": 1, "NameDevice": 2, "Role": 3, "IDProject": 4, "All": 5 });

    async save(dataIN, Mode) {
        var data = mongoose.model('Device', DeviceSchema);
        if (Mode == 'list') {
            await data.collection.insertMany(dataIN, function (err) {
                if (err) {
                    console.log(err);
                };
            });
        }
        else {
            var gg = new data(dataIN)
            await gg.save();
        }



    }

    async Find(KeyWord, FindTypeIN) {
        var data = mongoose.model('Device', DeviceSchema);
        switch (FindTypeIN) {
            case this.FindType.ID:
                var res = await data.findOne({
                    _id: KeyWord // search query
                }).lean();
                break;
            case this.FindType.NameDevice:
                var res = await data.find({
                    NameDevice: KeyWord // search query
                }).lean();
                break;
            case this.FindType.Role:
                var res = await data.find({
                    Role: KeyWord // search query
                }).lean();
                break;
            case this.FindType.IDProject:
                var res = await data.find({
                    IDProject: KeyWord // search query
                }).lean();
                break;
            case this.FindType.All:
                var res = await data.find().lean();
                break;
            default:
                console.log("Default");
                break;
        }
        return res;
    }

    async update(dataIN) {
        var data = mongoose.model('Device', DeviceSchema);
        var contact = await data.findById(dataIN._id).exec();
        contact.set(dataIN);
        var result = await contact.save();
        return result;
    }

    async Delete(dataIN) {
        var data = mongoose.model('Device', DeviceSchema);
        var res = await data.deleteOne({ _id: dataIN }, function (err) {
            if (err) return handleError(err);
            // saved!
        });

        return res;
    }


}

module.exports = Device;