let mongoose = require('mongoose');

let ElevatorSchema = new mongoose.Schema({
    NameElevator: String,
    FloorName: String,
    IDProject: String,
    DateCreate: { type: String, default: "0001-01-01T00:00:00" },
    DateModified: { type: String, default: "0001-01-01T00:00:00" },
    Enable: Boolean,
    Status: String,
    Note: String
})

const MongoDataElevator = mongoose.model('Elevator', ElevatorSchema);

class Elevator extends MongoDataElevator {

    constructor(NameElevator, FloorName, IDProject, DateCreate, DateModified, Enable, Status, Note) {
        super();
        this.NameElevator = NameElevator;
        this.FloorName = FloorName;
        this.IDProject = IDProject;
        this.DateCreate = DateCreate;
        this.DateModified = DateModified;
        this.Enable = Enable;
        this.Status = Status;
        this.Note = Note;

    }

    FindType = Object.freeze({ "ID": 1, "NameElevator": 2, "IDProject": 3, "All": 4 });

    async save(dataIN, Mode) {
        var data = mongoose.model('Elevator', ElevatorSchema);
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
        var data = mongoose.model('Elevator', ElevatorSchema);
        switch (FindTypeIN) {
            case this.FindType.ID:
                var res = await data.findOne({
                    _id: KeyWord // search query
                }).lean();
                break;
            case this.FindType.NameElevator:
                var res = await data.findOne({
                    NameElevator: KeyWord // search query
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
        var data = mongoose.model('Elevator', ElevatorSchema);
        var contact = await data.findById(dataIN._id).exec();
        contact.set(dataIN);
        var result = await contact.save();
        return result;
    }

    async Delete(dataIN) {
        var data = mongoose.model('Elevator', ElevatorSchema);
        var res = await data.deleteOne({ _id: dataIN }, function (err) {
            if (err) return handleError(err);
            // saved!
        });

        return res;
    }


}

module.exports = Elevator;