/**********************************
    Initialize
***********************************/

// Import packages
const express = require("express");
const path    = require("path");

// Create an instance of Router
const router = express.Router();

// Talk to the models
const models = require(path.join(__dirname, "..", "models"));
const Animal = models.Animal;
const Story  = models.Story;
const Photo  = models.Photo;
const Dog    = models.Dog;

// Ani team
const aniTeam = [
    {
        "fullname"    : "sohai9",
        "url_photo"   : "assets/images/0.jpg",
        "url_linkedin": "https://www.linkedin.com/",
        "biography"   : "N.A."
    },
    {
        "fullname"    : "Christian",
        "url_photo"   : "assets/images/1.jpg",
        "url_linkedin": "https://www.linkedin.com/",
        "biography"   : "N.A."
    },
    {
        "fullname"    : "zeeemaan",
        "url_photo"   : "assets/images/2.jpg",
        "url_linkedin": "https://www.linkedin.com/",
        "biography"   : "N.A."
    },
    {
        "fullname"    : "Kathryn",
        "url_photo"   : "assets/images/3.jpg",
        "url_linkedin": "https://www.linkedin.com/",
        "biography"   : "N.A."
    }
];

// Source: https://stackoverflow.com/questions/7905929/how-to-test-valid-uuid-guid
function isValidCookie(uuid) {
    const regex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

    return (uuid && regex.test(uuid));
}

// Pass these values if the user is not logged in
const defaultValues = {
    "aniId"           : null,
    "aniFullname"     : null,
    "customCSS"       : ["style"],
    "customJavascript": ["index"]
};



/**********************************
    Set up routes
***********************************/

router.get("/", (req, res) => {
    const aniId       = req.cookies["aniId"];
    const aniFullname = req.cookies["aniFullname"];

    // Display homepage if the user is not logged in or does not have a valid cookie
    if (!isValidCookie(aniId)) {
        res.render("index", defaultValues);

    // Display the profile page if the user is logged in
    } else {
        function callback(results) {
            const stories = [];

            for (let i = 0; i < results[0].Stories.length; i++) {
                stories.push({
                    "id"   : results[0].Stories[i].id,
                    "title": results[0].Stories[i].title,
                    "url"  : results[0].Stories[i].Photos[0].dataValues.url
                });
            }

            // TODO: Calculate the number of stories, Animals, and Dogs based on queries
            const animal = {
                "fullname"     : results[0].dataValues.fullname,
                "url_photo"    : results[0].dataValues.url_photo,
                "numNewStories": Math.floor(5 * Math.random()) + 1,
                "numStories"   : 6,
                "numAnimals"   : Math.floor(90 * Math.random()) + 10,
                "numDogs"   : Math.floor(90 * Math.random()) + 10,
                stories
            };

            res.render("profile", {
                aniId,
                aniFullname,
                "customCSS"       : ["style"],
                "customJavascript": ["index"],
                "editable"        : true,
                animal,
            });
        }

        // Do a nested join
        Animal.findAll({
            "where"     : {"id": aniId},
            "attributes": ["fullname", "url_photo"],
            "include"   : [
                {
                    "model"  : Story,
                    "include": [
                        {
                            "model"     : Photo,
                            "attributes": ["url"]
                        }
                    ]
                }
            ],
            "order"     : [
                [Story, "created_at", "DESC"],
                [Story, Photo, "created_at", "ASC"]
            ]

        }).then(callback);
    }
});


router.get("/logout", (req, res) => {
    const cookie = req.cookies;

    for (let value in cookie) {
        // Ignore prototype (inherited properties)
        if (cookie.hasOwnProperty(value)) {
            // Empty the value and change the expiration date to now
            res.cookie(value, "", {"expires": new Date(0)});
        }
    }
    
    res.redirect("/");
});


router.get("/profile_:id", (req, res) => {
    const aniId       = req.cookies["aniId"];
    const aniFullname = req.cookies["aniFullname"];

    if (!isValidCookie(aniId)) {
        res.render("index", defaultValues);

    } else {
        function callback(results) {
            const stories = [];

            for (let i = 0; i < results[0].Stories.length; i++) {
                stories.push({
                    "id"   : results[0].Stories[i].id,
                    "title": results[0].Stories[i].title,
                    "url"  : results[0].Stories[i].Photos[0].dataValues.url
                });
            }

            // TODO: Calculate the number of stories, animals, and dogs based on queries
            const animal = {
                "fullname"     : results[0].dataValues.fullname,
                "url_photo"    : results[0].dataValues.url_photo,
                "numNewStories": Math.floor(5 * Math.random()) + 1,
                "numStories"   : 6,
                "numAnimals"   : Math.floor(90 * Math.random()) + 10,
                "numDogs"      : Math.floor(90 * Math.random()) + 10,
                stories
            };

            res.render("profile", {
                aniId,
                aniFullname,
                "customCSS"       : ["style"],
                "customJavascript": ["profile"],
                "editable"        : (req.params.id === aniId),
                animal
            });
        }

        Animal.findAll({
            "where"     : {"id": req.params.id},
            "attributes": ["fullname", "url_photo"],
            "include"   : [
                {
                    "model"  : Story,
                    "include": [
                        {
                            "model"     : Photo,
                            "attributes": ["url"]
                        }
                    ]
                }
            ],
            "order"     : [
                [Story, "created_at", "DESC"],
                [Story, Photo, "created_at", "ASC"]
            ]

        }).then(callback);

    }
});


//////////////////////////////////////////////////////


router.get("/upload-photos", (req, res) => {
    const aniId       = req.cookies["aniId"];
    const aniFullname = req.cookies["aniFullname"];
    
    if (!isValidCookie(aniId)) {
        res.render("index", defaultValues);

    } else {
        // Must include dropzone before calling upload-photos.js
        res.render("upload-photos", {
            aniId,
            aniFullname,
            "customCSS"       : ["dropzone/dropzone", "style"],
            "customJavascript": ["dropzone/dropzone", "upload-photos"]
        });

    }
});

router.get("/create-story", (req, res) => {

});

router.get("/story_:id", (req, res) => {
    
});

router.get("/edit-story_:aniId&:storyId", (req, res) => {

});


//////////////////////////////////////////////////////

router.get("/animals", (req, res) => {
    const aniId       = req.cookies["aniId"];
    const aniFullname = req.cookies["aniFullname"];
    
    if (!isValidCookie(aniId)) {
        res.render("index", defaultValues);

    } else {
        function callback(results) {
            const animals = [];

            for (let i = 0; i < results.length; i++) {
                animals.push({
                    "id"       : results[i].id,
                    "fullname" : results[i].dataValues.fullname,
                    "url_photo": results[i].dataValues.url_photo
                });
            }

            res.render("animals", {
                aniId,
                aniFullname,
                "customCSS"       : ["style"],
                "customJavascript": ["animals"],
                animals
            });
        }

        Animal.findAll({}).then(callback);
    }
});


router.get("/settings", (req, res) => {
    const aniId       = req.cookies["aniId"];
    const aniFullname = req.cookies["aniFullname"];
    
    if (!isValidCookie(aniId)) {
        res.render("index", defaultValues);

    } else {
        function callback(results) {
            const animal = {
                "id"      : results[0].dataValues.id,
                "fullname": results[0].dataValues.fullname,
                "email"   : results[0].dataValues.email,
                "username": results[0].dataValues.username
            };

            res.render("settings", {
                aniId,
                aniFullname,
                "customCSS"       : ["style"],
                "customJavascript": ["settings"],
                animal
            });
        }

        Animal.findAll({
            "where": {"id": aniId}

        }).then(callback);
    }
});


router.get("/meet-ani", (req, res) => {
    res.render("meet-ani", {
        "aniId"           : req.cookies["aniId"],
        "aniFullname"     : req.cookies["aniFullname"],
        "customCSS"       : ["style"],
        "customJavascript": ["meet-ani"]
    });
});


router.get("/meet-ani-team", (req, res) => {
    res.render("meet-ani-team", {
        "aniId"           : req.cookies["aniId"],
        "aniFullname"     : req.cookies["aniFullname"],
        "customCSS"       : ["style"],
        "customJavascript": ["meet-ani-team"],
        aniTeam
    });
});


module.exports = router;
