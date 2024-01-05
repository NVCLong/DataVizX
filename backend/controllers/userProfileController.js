const Image = require('../models/image.model');

const userProfileController = {
    async uploadImage(req, res) {
        const newImg = new Image({
            name: req.body.name,
            desc: req.body.desc,
            img: {
                data: req.file.buffer,
                contentType: req.file.mimetype
            }
        });

        newImg.save()
            .then(() => res.json('Image uploaded!'))
            .catch(err => res.status(400).json('Error: ' + err));
    },
}

module.exports = userProfileController;