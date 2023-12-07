const authentication= require('./auth.route')
const site= require('./site.route')
module.exports = function route(app){
    app.use('/auth',authentication)
    app.use('/', site)
}