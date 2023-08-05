const router=require('express').Router()
const userC=require('../controller/usercontroller')

function handlelogin(req,res,next){
    if(req.session.user){
        next()
    }else{
        res.redirect('/login')
    }
}


router.get('/',handlelogin,userC.homepage)
router.get('/login',userC.loginpage)
router.post('/logincheck',userC.logincheck)
router.get('/registerpage',userC.registerpage)
router.post('/register',userC.register)
router.get('/profilepage',handlelogin,userC.profilepage)
router.post('/update/:id',userC.update)
router.get('/logout',userC.logout)
router.post('/search',userC.search)


module.exports=router