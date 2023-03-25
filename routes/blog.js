const router = require('express').Router();
const Blog = require('../models/Blog')
const app = require('../app')

// Your routing code goes here



// router.get('/blog',async(req,res)=>{
//     const page = req.query.page;
//     const limit = 5
//     const search = req.query.title || ''
//     console.log(search);
//     // const data = await Blog.find({ topic: { $regex: search, $options: 'i' } })
//     // const result = await data.skip((page-1)*limit).limit(limit).exec()
//     // console.log(result)
//     // res.send(result)
//     const query = Blog.find({ topic: { $regex: search, $options: 'i' } }).skip((page-1)*limit).limit(limit+1);
//     const data = await query.exec();
//     res.send(data);
// })
router.get('/blog', async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = 5;
    const search = req.query.search || '';
  
    const skipIndex = (page - 1) * limit;
  
    const query = Blog.find({ topic: { $regex: search, $options: 'i' } }).skip(skipIndex).limit(limit);
    const data = await query.exec();
  
    res.send(data);
  });

router.post('/blog' ,async (req , res)=>{
    const new_blog = new Blog(req.body)
    const result =await new_blog.save()
    const response = {
        status:"success",
        result: {result}
        }
        
    res.send(response)
})

router.put('/blog/:id' , async (req,res)=>{
    const {id} = req.params;
    const { topic, description, posted_at,posted_by } = req.body
    console.log({id} , { topic, description, posted_at,posted_by });
    const updatedUser = await Blog.findByIdAndUpdate(
        id,
      { topic, description, posted_at,posted_by },
      { new: true }
    )
    if (!updatedUser) {
        return res.status(404).json({ error: 'User not found' });
      }
      const response = {
        status:"success",
        result: {updatedUser}
        }
    res.send(response)
})

router.delete("/blog/:id" , async(req,res)=>{
    const id = req.params.id
    const deleteUser = await Blog.findByIdAndDelete(id)
    if (!deleteUser) {
        return res.status(404).json({ error: 'User not found' });
      }
      const response = {
        status:"success",
        result: {deleteUser}
        }
    res.send(response)
})



module.exports = router;