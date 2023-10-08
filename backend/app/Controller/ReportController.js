const reportDB= require('../Model/Report');

class ReportController{

    //[GET] /report
    reportForm(req,res){
        res.json({success:true,
            msg: "This is report form"})
    }


    //[POST] /report/store/:id
    async storeReport(req,res){
        try{
            const userId='64ba50ca48c117b27389812b';
            // algorithm to find user in user list


            // algorithm to store report

            const newReport= new reportDB(
                {
                    userId:userId,
                    content: req.body.content,
                }
            );
            // save new report to database
            await newReport.save();
            res.status(200).json(newReport);

        }catch(e){
            res.status(500).json({message:" have an error", success: false})
            console.log("Error when storing report")
            console.log(e)
        }

    }
}


module.exports = new ReportController();