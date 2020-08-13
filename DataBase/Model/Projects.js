let mongoose = require('mongoose');


let ProjectSchema = new mongoose.Schema({
        IDProject: String,
        ProjectName: String,
        BuildingName: String,
        DateCreate: {type: String, default: "0001-01-01T00:00:00"},
        DateModified: {type: String, default: "0001-01-01T00:00:00"},
        Enable: Boolean,
        Status: String,
        Note: String
    })

    const MongoDataProject = mongoose.model('Project', ProjectSchema);

    class Project extends MongoDataProject {

        constructor(IDProject, ProjectName, BuildingName, DateCreate, DateModified, Enable, Status, Note) {
            super();
        this.IDProject = IDProject;
        this.ProjectName = ProjectName;
        this.BuildingName = BuildingName;
        this.DateCreate = DateCreate;
        this.DateModified = DateModified;
        this.Enable = Enable;
        this.Status = Status;
        this.Note = Note;
    
      }

      FindType = Object.freeze({"ID":1, "IDProject":2, "ProjectName":3, "All":4});

      async save(dataIN, Mode){
        var data = mongoose.model('Project', ProjectSchema);

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
                var data = mongoose.model('Project', ProjectSchema);
                switch (FindTypeIN) {
                    case this.FindType.ID:
                        var res = await data.findOne({
                            _id: KeyWord // search query
                        }).lean();
                    break;
                    case this.FindType.IDProject:
                        var res = await data.findOne({
                            IDProject: KeyWord // search query
                        }).lean();
                    break;
                    case this.FindType.ProjectName:
                        var res = await data.findOne({
                            ProjectName: KeyWord // search query
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
        var data = mongoose.model('Project', ProjectSchema);
        var contact = await data.findById(dataIN._id).exec();
        contact.set(dataIN);
        var result = await contact.save();
        return result;
      }

      async Delete(dataIN)
      {
        var data = mongoose.model('Project', ProjectSchema);
        var res = await data.deleteOne({_id: dataIN}, function (err) {
            if (err) return handleError(err);
            // saved!
          });

          return res;
      }

    
    }
    
   module.exports = Project;