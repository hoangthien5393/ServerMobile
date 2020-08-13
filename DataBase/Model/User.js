let mongoose = require('mongoose');

let UserSchema = new mongoose.Schema({
        UserName: String,
        PassWord: String,
        IDDevice: String,
        IDProject: String,
        Role: String,
        AutoLogin: Boolean,
        DateCreate: {type: String, default: "0001-01-01T00:00:00"},
        DateModified: {type: String, default: "0001-01-01T00:00:00"},
        DateTimeFrom: {type: String, default: "0001-01-01T00:00:00"},
        DateTimeExpire: {type: String, default: "0001-01-01T00:00:00"},
        Enable: Boolean,
        Status: String,
        Note: String
    })

    const MongoDataUser = mongoose.model('User', UserSchema);

    class User extends MongoDataUser {

        constructor(UserName, PassWord, IDDevice, IDProject, Role, AutoLogin, DateCreate, DateModified, DateTimeFrom, DateTimeExpire, Enable, Status, Note) {
            super();
        this.UserName = UserName;
        this.PassWord = PassWord;
        this.IDDevice = IDDevice;
        this.IDProject = IDProject;
        this.Role = Role;
        this.AutoLogin = AutoLogin;
        this.DateCreate = DateCreate;
        this.DateModified = DateModified;
        this.Enable = Enable;
        this.DateTimeFrom = DateTimeFrom;
        this.DateTimeExpire = DateTimeExpire;
        this.Status = Status;
        this.Note = Note;
    
      }

      FindType = Object.freeze({"ID":1, "IDDevice":2, "UserName":3, "All":4, "IDProject": 5});
    
      async save(dataIN, Mode){
        var data = mongoose.model('User', UserSchema);
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
                var data = mongoose.model('User', UserSchema);
                switch (FindTypeIN) {
                    case this.FindType.ID:
                        var res = await data.findOne({
                            _id: KeyWord // search query
                        }).lean();
                    break;
                    case this.FindType.IDDevice:
                        var res = await data.findOne({
                            IDDevice: KeyWord // search query
                        }).lean();
                    break;
                    case this.FindType.UserName:
                        var res = await data.findOne({
                            UserName: KeyWord // search query
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
        var data = mongoose.model('User', UserSchema);
        var contact = await data.findById(dataIN._id).exec();
        contact.set(dataIN);
        var result = await contact.save();
        return result;
      }

      async Delete(dataIN)
      {
        var data = mongoose.model('User', UserSchema);
        var res = await data.deleteOne({_id: dataIN}, function (err) {
            if (err) return handleError(err);
            // saved!
          });

          return res;
      }

    
    }
    
   module.exports = User;
