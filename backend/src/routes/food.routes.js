const express = require('express');
const router  = express.Router();
 //to call this in postman  POST/api/food/
router.post('/', (req, res) => {
    // Handle food creation logic here
    res.send('Food created successfully');
});

module.exports = router;