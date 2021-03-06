const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');
const Profile = require('./../../models/Profile');
const User = require('./../../models/User');
const profileValidator = require('./../../validations/profile');



router.get('/test', (req, res) => {
    res.json({'msg': 'profile works'});
});

router.get('/', passport.authenticate('jwt', { session: false}), (req, res) => {
    const errors = {};
    Profile.findOne({ user: req.user.id })
    .populate('user', ['name', 'email']).then(profile => {
        if(!profile) {
            errors.noProfile = 'no profile found for the user';
            return res.status(404).json(errors);
        }
        res.json(profile);
    }).catch(err => {
        res.status(400).json(err);
    });
});

router.post('/', passport.authenticate('jwt', { session: false}), (req, res) => {
   const { errors, isValid } = profileValidator(req.body);
   if(!isValid) {
       return res.json(errors);
   }
   const profileFields = {};
   profileFields.user = req.user.id;
   if(req.body.handle) {
       profileFields.handle = req.body.handle;
   }
   if(req.body.company) {
       profileFields.company = req.body.company;
   }
   if(req.body.website) {
       profileFields.website = req.body.website;
   }
   if(req.body.location) {
       profileFields.location = req.body.location;
   }
   if(req.body.bio) {
       profileFields.bio = req.body.bio;
   }
   if(req.body.status) {
       profileFields.status = req.body.status;
   }
   if(req.body.githubusername) {
       profileFields.githubusername = req.body.githubusername;
   }
   if(req.body.skills) {
       profileFields.skills = req.body.skills.split(',');
   }
   profileFields.social = {};
   if(req.body.youtube) {
       profileFields.social.youtube = req.body.youtube;
   }
   if(req.body.twitter) {
       profileFields.social.twitter = req.body.twitter;
   }
   if(req.body.instagram) {
       profileFields.social.instagram = req.body.instagram;
   }
   if(req.body.facebook) {
       profileFields.social.facebook = req.body.facebook;
   }
   if(req.body.lindedin) {
       profileFields.social.lindedin = req.body.lindedin;
   }
   Profile.findOne({user: req.user.id}).then(profile => {
       if(profile) {
            Profile.findOneAndUpdate({ user: req.user.id },
            { $set: profileFields},
            { new: true}).then(profile => {
                res.json(profile);
            })
       } else {
            new Profile(profileFields).save().then(profile => res.json(profile));
       }

   })
});

module.exports = router;