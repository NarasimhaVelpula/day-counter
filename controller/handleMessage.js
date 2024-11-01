
const axios= require("axios");
const { qoutes } = require("../qoutes");
const sendMessage = async (data) => {
    const headers = {
      'Authorization': "Bearer EAAIJncZCPfnoBAFZAGAZCtNyYBo1p8ZA34P4hAftaZCY5ERft3wxBLmdjhE4axoKQIKcJ8d5ZCHKnjmEScBlnNCqI7jvz9VginBoFeh9HnklNbdcbdd8JPaAp4NzFbnlZAUi0F0wmGFjMRAfmKZALibv58K9061Erg0JsZCjfYBd2b4RjTwlySif9",
      "Content-Type": "application/json"
    }
    try {
      let result = await axios.post('https://graph.facebook.com/v13.0/110516435077052/messages', data, { headers: headers })
      if (result.data) {
        let message_data = result.data
        console.log(message_data)
        return message_data.messages.id
      }
    }
    catch (err) {
      console.log(err)
    }
  }

const daysCalculator= ()=>{
    const originDate= new Date(2024,5,26);
    const today=new Date();
    let Difference_In_Time =
    today.getTime() - originDate.getTime();

// Calculating the no. of days between
// two dates
let Difference_In_Days =
    Math.round
        (Difference_In_Time / (1000 * 3600 * 24));
    return Difference_In_Days;
}

const getQoute=(day)=>{
    const totalQoutes=qoutes.length;
    const id=day%totalQoutes;
    return qoutes[id]
}

const handleMessage=(req,res,next)=>{
    console.log("---------Message handling--------------")
    
    let Difference_In_Days=daysCalculator();
    let qoute=getQoute(Difference_In_Days)
    const naniData = {
        "messaging_product": "whatsapp",
        "recipient_type": "individual",
        "to": "919949911067",
        "type": "text",
        "text": {
          "preview_url": false,
          "body": `Hi Nani
Good Morning!
This is your ${Difference_In_Days} day with your darling
*Message:* ${qoute}
`
        }
      }

    const sailuData = {
        "messaging_product": "whatsapp",
        "recipient_type": "individual",
        "to": "7013316045",
        "type": "text",
        "text": {
          "preview_url": false,
          "body": `Hi Sailu
Good Morning!
This is your ${Difference_In_Days} day with your hubby
*Message:* ${qoute}
`
        }
      }
    sendMessage(naniData);
    sendMessage(sailuData);
    res.status(200).send("OK")
}

module.exports={handleMessage}