const express = require('express')
const router = express.Router()

// getting all
router.get('/', (req, res)=>{
    res.send('hello iziiii');
})
// getting one
router.get('/:id', (req, res)=>{
    //req.params.id
})
// createing one
router.post('/', (req, res)=>{
    
})
// updating one
router.patch('/', (req, res)=>{
    
})
// deleting one
router.delete(('/:id', (req, res)=>{
    //req.params.id
}))

module.exports = router