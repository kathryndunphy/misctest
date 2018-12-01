module.exports = function(sequelize, DataTypes) {
    const Photo = sequelize.define("Photo", {
        "id": {
            "type"        : DataTypes.UUID,
            "defaultValue": DataTypes.UUIDV4,
            "allowNull"   : false,
            "primaryKey"  : true
        },

        "url": {
            "type"     : DataTypes.STRING,
            "allowNull": true,
            "validate" : {
                "isURL": {
                    "args": true,
                    "msg" : "Please enter a valid url."
                }
            }
        },
        ///added url for thumbnail
        "thumbUrl": {
            "type"     : DataTypes.STRING,
            "allowNull": true,
            "validate" : {
                "isURL": {
                    "args": true,
                    "msg" : "Please enter a valid url."
                }
            }
        },
        
        "caption": {
            "type"     : DataTypes.TEXT,
            "allowNull": false,
            "validate" : {
                "notEmpty": {
                    "args": true,
                    "msg" : "Please enter a caption."
                }
            }
        },

        "title": {
            "type"     : DataTypes.STRING(100),
            "allowNull": false,
            "validate" : {
                "len": {
                    "args": [1, 100],
                    "msg" : "Your title cannot exceed 100 characters."
                }
            }
        }
        
        // "time_taken": {
        //     "type"    : DataTypes.DATE,
        //     "validate": {
        //         "isDate": {
        //             "args": true,
        //             "msg" : "Please enter a valid date string."
        //         }
        //     }
        // }

    }, {"underscored": true});

    // Create associations
    Photo.associate = function(models) {
        Photo.belongsTo(models.Story, {"onDelete": "CASCADE"});
    }

    return Photo;
}