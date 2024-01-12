const Note = require("../models/note.model");

const noteController = {
    //[Post]  /note/create/:id
    async createNote(req, res) {
        console.log("this is note: " + req.body.note);
        // console.log(req.params.id)
        try {
            const note = await Note.findOne({ chartId: req.params.id });
            if (note) {
                res.json({ msg: "already created" });
            } else {
                const newNote = {
                    note: req.body.note,
                    chartId: req.params.id,
                    able: true,
                };
                const note = new Note(newNote);
                await note.save();

                res.status(200).json(note);
            }
        } catch (e) {
            console.log(e);
        }
    },

    //[GET] /note/getNote/:id
    async getNote(req, res) {
        try {
            await Note.findOne({ chartId: req.params.id })
                .then(function (note) {
                    res.status(200).json(note);
                })
                .catch(function (err) {
                    console.log(err);
                });
        } catch (e) {
            console.log(e);
        }
    },

    //[PUT] /note/editNote/:id
    async editNote(req, res) {
        try {
            const updatedNote = {
                note: req.body.note,
                able: true,
                chartId: req.params.id,
            };
            await Note.findOneAndUpdate({ chartId: req.params.id }, updatedNote)
                .then(async function (note) {
                    note.save();
                    res.status(200).json(note);
                })
                .catch(function (err) {
                    console.log(err);
                });
        } catch (e) {
            console.log(e);
        }
    },
    //[DELETE] /note/delete/:id
    async deleteNote(req, res) {
        try {
            await Note.findOneAndDelete({ chartId: req.params.id })
                .then(function () {
                    console.log("success");
                })
                .catch(function (err) {
                    console.log(err);
                });
        } catch (e) {
            console.log(e);
        }
    },
};
module.exports = noteController;
