module.exports = function(sequelize, DataTypes) {
    const Animal = sequelize.define("Animal", {
        "id": {
            "type"        : DataTypes.UUID,
            "defaultValue": DataTypes.UUIDV4,
            "allowNull"   : false,
            "primaryKey"  : true
        },
        
        "fullname": {
            "type"     : DataTypes.STRING(100),
            "allowNull": false,
            "validate" : {
                "is": {
                    "args": /^[a-z\s-']+$/i,
                    "msg" : "Only letters, spaces, hyphens, and apostrophes are allowed."
                },
                "len": {
                    "args": [1, 100],
                    "msg" : "Your name cannot exceed 100 characters."
                }
            }
        },

        "email": {
            "type"     : DataTypes.STRING(100),
            "allowNull": false,
            "unique"   : true,
            "validate" : {
                "isEmail": {
                    "args": true,
                    "msg" : "Please enter a valid email."
                },
                "len": {
                    "args": [1, 100],
                    "msg": "Your email cannot exceed 100 characters."
                }
            }
        },
        ///added pet name
        // "pet": {
        //     "type"     : DataTypes.STRING(32),
        //     "allowNull": false,
        //     "unique"   : true,
        //     "validate" : {
        //         "is": {
        //             "args": /^[a-z0-9.]+$/i,
        //             "msg" : "Only letters, numbers, and periods are allowed."
        //         },
        //         "len": {
        //             "args": [1, 32],
        //             "msg" : "The pet name must have between 1 and 32 characters."
        //         }
        //     }
        // },

        "username": {
            "type"     : DataTypes.STRING(32),
            "allowNull": false,
            "unique"   : true,
            "validate" : {
                "is": {
                    "args": /^[a-z0-9.]+$/i,
                    "msg" : "Only letters, numbers, and periods are allowed."
                },
                "len": {
                    "args": [4, 32],
                    "msg" : "The username must have between 4 and 32 characters."
                }
            }
        },
        
        "hash": {
            "type"     : DataTypes.STRING(60),
            "allowNull": false,
        },

        "url_photo": {
            "type"        : DataTypes.STRING,
            "validate"    : {
                "isURL"   : {
                    "args": true,
                    "msg" : "Please enter a valid url."
                }
            }
        },
        
        "flagged": {
            "type"        : DataTypes.BOOLEAN,
            "defaultValue": false,
        }

    }, {"underscored": true});

    // Create associations
    Animal.associate = function(models) {
        Animal.hasMany(models.Story);
        Animal.hasMany(models.Dog);
    }

    return Animal;
}