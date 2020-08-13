let mongoose = require('mongoose');


let QRCodeSchema = new mongoose.Schema({
        IDQRCode: String,
        FloorName: String,
        IDProject: String,
        BuildingName: String,
        DateCreate: {type: String, default: "0001-01-01T00:00:00"},
        DateModified: {type: String, default: "0001-01-01T00:00:00"},
        Enable: Boolean,
        Status: String,
        Note: String
    })

    const MongoDataQRCode = mongoose.model('QRCode', QRCodeSchema);

    class QRCode extends MongoDataQRCode {

        constructor(IDQRCode, FloorName, IDProject, BuildingName, DateCreate, DateModified, Enable, Status, Note) {
            super();
        this.IDQRCode = IDQRCode;
        this.IDProject = IDProject;
        this.BuildingName = BuildingName;
        this.FloorName = FloorName;
        this.DateCreate = DateCreate;
        this.DateModified = DateModified;
        this.Enable = Enable;
        this.Status = Status;
        this.Note = Note;
    
      }

      FindType = Object.freeze({"ID":1, "IDQRCode":2, "BuildingName":3, "All":4, "IDProject": 5});
    
      async save(dataIN, Mode){
        var data = mongoose.model('QRCode', QRCodeSchema);
        if(Mode == 'list')
        {
            await data.collection.insertMany(dataIN, function (err) {
                if (err) {
                    console.log(err);
                };
            });
        }
        else
        {
            var gg = new data(dataIN)
            await gg.save();
        }

       
      }
    
      async Find(KeyWord, FindTypeIN){
                var data = mongoose.model('QRCode', QRCodeSchema);
                switch (FindTypeIN) {
                    case this.FindType.ID:
                        var res = await data.findOne({
                            _id: KeyWord // search query
                        }).lean();
                    break;
                    case this.FindType.IDQRCode:
                        var res = await data.findOne({
                            IDQRCode: KeyWord // search query
                        }).lean();
                    break;
                    case this.FindType.BuildingName:
                        var res = await data.find({
                            BuildingName: KeyWord // search query
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
    
      async update(dataIN)
      {
        var data = mongoose.model('QRCode', QRCodeSchema);
        var contact = await data.findById(dataIN._id).exec();
        contact.set(dataIN);
        var result = await contact.save();
        return result;
      }

      async Delete(dataIN)
      {
        var data = mongoose.model('QRCode', QRCodeSchema);
        var res = await data.deleteOne({_id: dataIN}, function (err) {
            if (err) return handleError(err);
            // saved!
          });

          return res;
      }

    
    }
    
   module.exports = QRCode;
    
//module.exports = mongoose.model('Card', CardSchema)