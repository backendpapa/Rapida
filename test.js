const router=require('express').Router()
const {index}=require('../controllers/helloController.json')

router.get('/',index())

module.exports=router;