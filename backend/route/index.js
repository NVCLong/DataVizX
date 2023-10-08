

const site= require('../route/site')
const report= require('../route/report')

module.exports = function Route(app){

    app.use('/report',report)
    app.use('/',site)
}
