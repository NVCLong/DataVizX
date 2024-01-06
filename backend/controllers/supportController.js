const OpenAI= require("openai");
const dotenv= require("dotenv");
dotenv.config()
const openai= new OpenAI({
    apiKey: process.env.API
});
const supportController= {
    // support/post     (post the question and get the answer from the server with the openai support)
    async getRequest(req, res){
        try{
            console.log(typeof req.body.question)
            const  response= await openai.chat.completions.create({
                model: 'gpt-3.5-turbo',
                messages:[{"role": "user", "content": req.body.question}],
                max_tokens: 100
            })
            res.status(200).json({response: response.choices[0].message})
        }catch(e){
            console.log(e)
        }
    }
}
module.exports=supportController