const User = require("../models/user.model");
const {
    uploadToCloudinary,
    removeFromCloudinary,
} = require("../services/cloudinary");

const userProfileController = {

    // [POST] /profile/upload/:id
    async imageUpload(req, res) {
        try {
            const data = await uploadToCloudinary(req.file.path, "user-image");

            const savedImg = await User.updateOne(
                { _id: req.params.id },
                {
                    $set: {
                        imageUrl: data.url,
                        publicId: data.public_id,
                    },
                }
            );

            res.status(200).send("Image uploaded successfully");
        } catch (error) {
            res.status(400).send(error.message);
        }
    },

    // [POST] /profile/delete/:id
    async imageDelete(req, res) {
        try {
            const user = await User.findOne({ _id: req.params.id });

            const publicId = user.publicId;
            await removeFromCloudinary(publicId);

            const deleteImg = await User.updateOne(
                { _id: req.params.id },
                {
                    $set: {
                        imageUrl: "",
                        publicId: "",
                    },
                }
            );
            res.status(200).send("Image deleted successfully");
        } catch (error) {
            res.status(400).send(error.message);
        }
    },

    // [GET] /profile/:id
    async getUserData(req, res) {
        
        try {
            const user = await User.findOne({ _id: req.params.id }).select("userName email imageUrl");
            res.json(user);
        } catch (error) {
            res.status(400).send(error.message);
        }
    },
};

module.exports = userProfileController;
