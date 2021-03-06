const express = require('express');
const multer = require("multer");
const config = require("../config");
const {nanoid} = require("nanoid");
const path = require("path");
const auth = require("../middleware/auth");
const Artist = require('../models/Artist');
const Track = require('../models/Track');
const Album = require('../models/Album')


const router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, config.uploadPath);
    },
    filename: (req, file, cb) => {
        cb(null, nanoid() + path.extname(file.originalname))
    }
});

const upload = multer({storage});

router.get("/", async (req, res, next) => {
    try {
        const artists = await Artist.find();
        return res.send(artists);
    } catch(e) {
        next(e);
    }
});

router.post('/', auth, upload.single('image'), async (req, res, next) => {
    try {
        if (!req.body.name) {
            return res.status(400).send({message: 'name are required'});
        }

        const artistData = {
            name: req.body.name,
            information: req.body.information,
            image: null,
            is_published: false
        };

        if (req.file) {
            artistData.image = req.file.filename;
        }

        if(req.user.role === 'admin') {
            artistData.is_published = true
        }

        const artist = new Artist(artistData);

        await artist.save();

        return res.send({message: 'Created new artist', id: artist._id});
    } catch (e) {
        next(e);
    }
});

router.post('/:id/publish', auth, async (req,res,next) => {
    try {
        if (req.user.role === 'admin') {
            const isPublishArtist = await Artist.findById(req.params.id);
            isPublishArtist.is_published = true;
            isPublishArtist.save();
            return res.send({message: 'Artist published!'});
        }

        return res.send({message: 'You cannot modify!'});

    } catch (e) {
        next(e);
    }
});

router.delete('/:id', auth, async (req,res,next) => {
    try {
        if (req.user.role === 'admin') {
            const albums = await Album.find({artist: req.params.id});
            await Artist.deleteOne({_id: req.params.id});
            await Album.deleteMany({album: req.params.id});
            await Track.deleteMany({album: {$in: albums}});

            return res.send({message: 'Deleted artist'});
        }

        return res.send({message: 'You cannot delete!'});
    } catch (e) {
        next(e);
    }
});

module.exports = router;