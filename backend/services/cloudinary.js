const cloudinary = require('cloudinary').v2;
const dotenv = require('dotenv');
dotenv.config();

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_SECRET_KEY
});


uploadToCloudinary = async (path, folder) => {
    return cloudinary.uploader.upload(path, { folder})
    .then ((data) => {
        return { url: data.url, public_id: data.public_id };
    })
    .catch((error) => {
        console.log(error);
    });
}

removeFromCloudinary = async (public_id) => {
    await cloudinary.uploader.destroy(public_id, function(error, result) {
        console.log(result, error);
    })
}

module.exports = { uploadToCloudinary, removeFromCloudinary };