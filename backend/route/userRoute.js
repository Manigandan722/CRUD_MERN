const express = require("express");
const router = express.Router();
const User = require('../model/User');

//create post 

router.post('/users',async(req,res)=>{
 try {
    const newUser = new User(req.body)
      await newUser.save()
      res.status(201).json(newUser)
 } catch (error) {
    res.status(400).json({ message: err.message });
 }

})

// Getting data from database
router.get('/users',async(req,res)=>{
    try {
        const Users = await User.find();
          res.status(200).json(Users)
     } catch (error) {
        res.status(500).json({ message: err.message });
     }
})

//Update user datas
router.put('/users/:id',async(req,res)=>{
    console.log(req.body);
    try {
        const { id } = req.body;
        const { name, email, age } = req.body;
       
        // Find user by ID and update
        const updatedUser = await User.findByIdAndUpdate(id, { name, email, age }, { new: true });
    
        if (!updatedUser) {
          return res.status(404).json({ message: 'User not found' });
        }
    
        res.status(200).json(updatedUser);
      } catch (err) {
        res.status(500).json({ message: err.message });
      }
})
//delect user datas
router.delete('/users/:id',async(req,res)=>{
    try {
        const newUser = await User.findByIdAndDelete(req.params.id)
          res.json({message:"User deleted"})
     } catch (error) {
        res.status(500).json({ message: err.message });
     }
    
})

module.exports = router;