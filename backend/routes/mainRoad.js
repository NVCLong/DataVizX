const authentication= require('./auth.route')
const site= require('./site.route')
const report= require('./report.route')
module.exports = function route(app){
    app.use('/auth',authentication)
    app.use('/report',report)
    app.use('/', site)
}