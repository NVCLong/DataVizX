const OpenAI= require("openai");
const dotenv= require("dotenv");
dotenv.config()
const openai= new OpenAI({
    apiKey: process.env.API
});
const supportController= {

    async getRequest(req, res){
        try{
            const  response= await openai.chat.completions.create({
                model: 'gpt-3.5-turbo',
                message:[{"role": "user", "content": req.body.question}],
                max_tokens: 100
            })
            console.log(response)
        }catch(e){
            console.log(e)
        }
    }
}
module.exports=supportController