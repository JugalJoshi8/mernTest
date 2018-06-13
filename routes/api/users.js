const express = require('express');
const router = express.Router();

//user api
router.get('/test', (req, res) => {
    console.log('asssssssssssss---------------')
    res.json({msg: "user works"});
})

module.exports = router;