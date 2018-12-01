module.exports = function(sequelize, DataTypes) {
    const Dog = sequelize.define("Dog", {
        "id": {
            "type"        : DataTypes.UUID,
            "defaultValue": DataTypes.UUIDV4,
            "allowNull"   : false,
            "primaryKey"  : true
        },
        
        "Dog_id": {
            "type"     : DataTypes.UUID,
            "allowNull": false,
            "validate" : {
                "isUUID": {
                    "args": 4,
                    "msg" : "Please enter a valid UUID."
                }
            }
        },
        "Dog_name":{
            "type": DataTypes.STRING,
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
        }

    }, {"underscored": true});

    // Create associations
    Dog.associate = function(models) {
        Dog.belongsTo(models.Animal, {"onDelete": "CASCADE"});
    }

    return Dog;
}