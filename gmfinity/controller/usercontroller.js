const User = require('../model/user')
const Movie = require('../model/movie')

exports.homepage = async (req, res) => {
    const user = req.session.user
    const mrecord = await Movie.find()
    const srecord = await Movie.findOne({ mname: '' })
    res.render('home.ejs', { user: user, mrecord: mrecord, srecord: srecord })
}

exports.loginpage = (req, res) => {
    res.render('login.ejs')
}

exports.registerpage = (req, res) => {
    res.render('registerpage.ejs', { message: '' })
}

exports.register = async (req, res) => {
    const { username, password } = req.body
    const recordcheck = await User.findOne({ username: username })
    if (recordcheck === null) {
        const record = new User({ username: username, password: password })
        record.save()
        //console.log(record)
        res.redirect('/registerpage')
    } else {
        res.render('registerpage.ejs', { message: `${username} already exist` })
    }
}

exports.logincheck = async (req, res) => {
    const { username, password } = req.body
    const loginrecord = await User.findOne({ username: username })
    const mrecord = await Movie.find()
    const srecord = await Movie.findOne({ mname: '' })
    if (loginrecord !== null) {
        if (loginrecord.password === password) {
            req.session.user = username
            const user = req.session.user
            res.render('home.ejs', { user: user, mrecord: mrecord, srecord: srecord })
        } else {
            res.redirect('/login')
        }
    } else {
        res.redirect('/login')
    }
}

exports.profilepage = async (req, res) => {
    const user = req.session.user
    const record = await User.findOne({ username: user })
    res.render('profilepage.ejs', { user: user, record: record })
}

exports.update = async (req, res) => {
    const { fname, lname, mnumber } = req.body
    const id = req.params.id
    await User.findByIdAndUpdate(id, { fname: fname, lname: lname, mnumber: mnumber })
    res.redirect('/')
}

exports.logout = (req, res) => {
    req.session.destroy()
    res.redirect('/login')
}

exports.search = async (req, res) => {
    const { mname } = req.body
    const user = req.session.user
    const mrecord = await Movie.find()
    const srecord = await Movie.findOne({ mname: mname })
        res.render('home.ejs',{srecord:srecord,user:user,mrecord:mrecord})
}