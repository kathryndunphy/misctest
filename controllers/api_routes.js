/**********************************
    Initialize
***********************************/

// Import packages
const express = require("express");
const path = require("path");

// Create an instance of Router
const router = express.Router();

// Import bcrypt
const bcrypt = require("bcrypt");
const saltRounds = 12;

// Import Dropzone
const multer = require("multer");
const upload = multer({
    "dest": "uploads"
});
const sizeOf = require("image-size");

// Cookie will expire in 1 week
const cookieOptions = {
    "expires": new Date(Date.now() + 604800000),
    "httpOnly": (process.argv[2] !== "local"),
    "secure": (process.argv[2] !== "local")
};

// Talk to the models
const models = require(path.join(__dirname, "..", "models"));
const Animal = models.Animal;
const Story = models.Story;
const Photo = models.Photo;
const Dog = models.Dog;

// Default profile photos
const defaultPhotos = [
    "https://bit.ly/2FONWzE",
    "https://bit.ly/2FGDjPw",
    "https://bit.ly/2PVSmK5",
    "https://bit.ly/2TDS0ps",
    "https://bit.ly/2RdukGH",
    "https://bit.ly/2TJRJkG",
    "https://bit.ly/2Rc7vDw",
    "https://bit.ly/2r1YXnh",
    "https://bit.ly/2DJj9C0"
];

// Source: https://stackoverflow.com/questions/7905929/how-to-test-valid-uuid-guid
function isValidCookie(uuid) {
    const regex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

    return (uuid && regex.test(uuid));
}

// Pass these values if the user is not logged in
const defaultValues = {
    "aniId": null,
    "aniFullname": null,
    "customCSS": ["style"],
    "customJavascript": ["index"]
};


/**********************************
    Set up routes (related to accounts)
***********************************/

router.post("/signup", (req, res) => {
    function callback(result) {
        res.cookie("aniId", result.id, cookieOptions);
        res.cookie("aniFullname", result.fullname, cookieOptions);
        res.redirect("/");
    }

    // Salt and hash the user's password
    bcrypt.hash(req.body.password, saltRounds, (error, hash) => {
        Animal.create({
            "fullname": req.body.fullname,
            "email": req.body.email,
            "username": req.body.username,
            "hash": hash,
            "url_photo": defaultPhotos[Math.floor(defaultPhotos.length * Math.random())]

        }).then(callback);

    });
});

router.post("/login", (req, res) => {
    // Find the user's hash
    Animal.findAll({
        "attributes": ["id", "fullname", "hash"],
        "where": {
            "username": req.body.username
        }

    }).then(results => {
        // Compare hashes to verify the user
        bcrypt.compare(req.body.password, results[0].hash, (error, isMatch) => {
            if (isMatch) {
                if (!req.cookies.cookieName) {
                    res.cookie("aniId", results[0].id, cookieOptions);
                    res.cookie("aniFullname", results[0].fullname, cookieOptions);
                }

                res.redirect("/");

                // TODO: If the username or password does not match, display an error message
            } else {
                res.redirect("/");

            }
        });
    });
});


router.patch("/update-profile_:id", (req, res) => {
    const aniId = req.cookies["aniId"];
    const aniFullname = req.cookies["aniFullname"];

    // Display homepage if the user is not logged in or does not have a valid cookie
    if (!isValidCookie(aniId)) {
        res.render("index", defaultValues);

        // Only the user can edit their profile
    } else if (req.params.id !== aniId) {
        res.redirect("/");

    } else {
        function callback(result) {
            // Update the fullname cookie
            res.cookie("aniFullname", req.body.fullname);
            res.redirect("/settings");
        }

        Animal.update({
            "fullname": req.body.fullname,
            "email": req.body.email,
            "username": req.body.username

        }, {
            "where": {
                "id": req.params.id
            }

        }).then(callback);

    }
});


router.patch("/update-password_:id", (req, res) => {
    const aniId = req.cookies["aniId"];
    const aniFullname = req.cookies["aniFullname"];

    if (!isValidCookie(aniId)) {
        res.render("index", defaultValues);

        // Only the user can edit their password
    } else if (req.params.id !== aniId) {
        res.redirect("/");

    } else {
        function callback(result) {
            res.redirect("/settings");
        }

        // Find the user's hash
        Animal.findAll({
            "attributes": ["hash"],
            "where": {
                "id": req.params.id
            }

        }).then(results => {
            // Verify the user
            bcrypt.compare(req.body.password_current, results[0].hash, (error, isMatch) => {
                if (isMatch) {
                    // Salt and hash the new password
                    bcrypt.hash(req.body.password_new, saltRounds, (error, hash) => {
                        Animal.update({
                            hash
                        }, {
                            "where": {
                                "id": req.params.id
                            }

                        });
                    });
                }
            });

        }).then(callback);

    }
});


router.delete("/delete-account_:id", (req, res) => {
    const aniId = req.cookies["aniId"];
    const aniFullname = req.cookies["aniFullname"];

    if (!isValidCookie(aniId)) {
        res.render("index", defaultValues);

        // Only the user can delete their stories
    } else if (req.params.id !== aniId) {
        res.redirect("/");

    } else {
        function callback(results) {
            res.clearCookie("aniId");
            res.clearCookie("aniFullname");
            res.redirect("/");
        }

        Animal.destroy({
            "where": {
                "id": req.params.id
            }

        }).then(callback);

    }
});


/**********************************
    Set up routes (related to stories)
***********************************/
router.get("api/story/:id", (req, res) => {
    Story.findAll({
        "where": {
            "id": req.params.id
        },
        include: [Photo]
    }).then(res.json(story))
})

router.post("api/upload-photos", (req, res) => {
    console.log(req.body)
    // const aniId = req.cookies["aniId"] 

    Photo.create({
        "url": photoUrls[2],
        "thumbnail": photoUrls[1],
        "caption": req.body.caption,
        "title": req.body.title
    }).then(res.redirect("/story"))

})
router.post("/api/upload-photos", (req, res) => {
    //     // const aniId = req.cookies["aniId"]
    Story.create({
        "title": req.body.title

    }).then(res.redirect("/story"))
})
router.delete("api/story: id", (req, res) => {
    const aniId = req.cookies["aniId"]
    if (!isValidCookie(aniId)) {
        res.render("index", defaultValues);

        // Only the user can delete their stories
    } else if (req.params.id !== aniId) {
        res.redirect("/");

    } else {
        Story.destroy({
            "where": {
                "id": req.params.id
            },
            include: [Photo]
        })
        res.redirect("/story")
    }
})

// router.post("/upload-photos", upload.single("file"), (req, res, next) => {
//     if (!req.file.mimetype.startsWith("image/")) {
//         return res.status(422).json({
//             "error": "The uploaded file must be an image."
//         });
//     };
//     const dimensions = sizeOf(req.file.path);
//     if ((dimensions.width < 200) || (dimensions.height < 200)) {
//         return res.status(422).json({
//             "error": "The image must be at least 200 x 200px."
//         });
//     };

//     res.json(true);
// });





module.exports = router;