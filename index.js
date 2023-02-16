// App-Name:- Jarvis A.I Bot
// Developer-Name:- R.S (RISHABH-SAHIL)
// GitHub:- https://github.com/RishabhSahil/whatsapp-bot-type-script
// Linkden:- https://www.linkedin.com/in/rishabhsahil/
// OpenAI-API-KEY:- https://platform.openai.com/

console.log("\n\nApp-Name:- Jarvis A.I Bot\nDeveloper-Name:- R.S (RISHABH-SAHIL)\nGitHub:- https://github.com/RishabhSahil/whatsapp-bot-type-script\nLinkden:- https://www.linkedin.com/in/rishabhsahil/\nOpenAI-API-KEY:- https://platform.openai.com/")

const qrcode = require('qrcode-terminal');
const fs = require("fs")
const { Client, LegacySessionAuth, LocalAuth, MessageMedia} = require('whatsapp-web.js'); // npm i whatsapp-web.js
const { getSystemErrorMap } = require('util');
const { Configuration, OpenAIApi } = require("openai"); 
let setting = require('./key.json');
const { url } = require('inspector');
const axios = require('axios'); // npm i axios
const NewsAPI = require('newsapi'); // npm install newsapi
const newsapi = new NewsAPI(setting.newsapikey); 
const configuration = new Configuration({
  apiKey: setting.keyopenai, //'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',
});
const openai = new OpenAIApi(configuration);
const client = new Client({
     authStrategy: new LocalAuth({
          clientId: "client-one" //Un identificador(Sugiero que no lo modifiques)
     })
})

// Save session values to the file upon successful auth
client.on('authenticated', (session) => {
    console.log("\n\nAuthenticated Successfully");
    // console.log(session);
});
 
client.initialize();
client.on("qr", qr => {
    qrcode.generate(qr, {small: true} );
})

client.on('ready', () => {
    console.log("Ready To Message\n\n");
      // Number where you want to send the message.
    const number = "+918709664805";

    // Your message.
    const text = setting.jarvison+setting.sitelink+"\n\n"+setting.developer;

    // Getting chatId from the number.
    // we have to delete "+" from the beginning and add "@c.us" at the end of the number.
    const chatId = number.substring(1) + "@c.us";

    // Sending message.
    client.sendMessage(chatId, text);
});

function man(){
    try {
        client.on('message', async message => {
            console.log("Human: "+message.body.toLowerCase())
            if(message.body[0] === "*" || message.body[0] === ".") {
                let text = message.body.split('*')[1] ||  message.body.split('.')[1];
                var qst = `Human: ${text}\nJarvis:`;
                const response = await openai.createCompletion({
                    model: "text-davinci-003",
                    prompt: qst,
                    temperature: 0.5,
                    max_tokens: 3000,
                    top_p: 0.3,
                    frequency_penalty: 0.5,
                    presence_penalty: 0,
                });
                console.log("Jarvis: "+response.data.choices[0].text+"\n~~RISHABH-SAHIL~~\n\n");
                message.reply(response.data.choices[0].text);
            }
            else if(message.body.toLowerCase().includes('/draw') || message.body.toLowerCase().includes('/create image') || message.body.includes('/ draw') || message.body.includes('/ create image')) {
                message.reply("Okey Wait I am Creating...!!")
                console.log("Jarvis: Okey Wait I am Creating...!!")
                let text = message.body.split('/draw')[1] || message.body.split('/create image')[1] || message.body.split('/ draw')[1] || message.body.split('/ create image')[1];
                var qst = `Human: ${text}\nJarvis:`;
                const response = await openai.createImage({
                    prompt: text,
                    n: 1,
                    size: '512x512'
                });
                var imgUrl = response.data.data[0].url;
                const media = await MessageMedia.fromUrl(imgUrl);
                await client.sendMessage(message.from, media, {caption: "~RISHABH-SAHIL~"})
                console.log("Jarvis: ~RISHABH-SAHIL~\n\n")
            }
            else if(message.body.includes('sahil') || message.body.includes('shahil')) {
                message.reply("Hey, I am Jarvis ! SAHIL Sir Abhi busy hai");
                console.log("Jarvis: Hey, I am Jarvis ! SAHIL Sir Abhi busy hai\n\n");
            }
            else if(message.body.includes('rishabh') || message.body.includes('rishab') || message.body.includes('rishav') || message.body.includes('risab')) {
                message.reply("Hey, I am Jarvis ! RISHABH Sir Abhi busy hai");
                console.log("Jarvis: Hey, I am Jarvis ! RISHABH Sir Abhi busy hai\n\n");
            }
            else if(message.body.toLowerCase()=="oye" || message.body.toLowerCase()=="hii jarvis" || message.body.toLowerCase()=="hey jarvis" || message.body.toLowerCase()=="hey jarvis" || message.body.toLowerCase()=="hyyy jarvis" || message.body.toLowerCase()=="hii jarvis" || message.body.toLowerCase()=="hyy jarvis" || message.body.toLowerCase()=="jarvis" || message.body.toLowerCase()=="hey" || message.body.toLowerCase()=="heyyy" || message.body.toLowerCase()=="hyy" || message.body.toLowerCase()=="hyyy" || message.body.toLowerCase()=="hi" || message.body.toLowerCase()=="hii" || message.body.toLowerCase()=="hii" || message.body.includes("hello") || message.body.includes("hey rishabh") || message.body.toLowerCase()=="hlo" || message.body.toLowerCase()=="hlo rishabh" || message.body.toLowerCase()=="hlo sahil" || message.body.toLowerCase()=="hlo shahil" || message.body.toLowerCase()=="hlo rishab" || message.body.toLowerCase()=="hlo rishav" || message.body.toLowerCase()=="hlo rishu") {
                message.reply("*Hey, I am Jarvis. How Can I Help You?*");
                console.log("Jarvis: *Hey, I am Jarvis. How Can I Help You?*\n\n");
            }
            else if(message.body.toLowerCase()=="bye" || message.body.toLowerCase()=="bye jarvis" || message.body.toLowerCase()=="byee jarvis" || message.body.toLowerCase()=="bee jarvis" || message.body.toLowerCase()=="byeee jarvis" || message.body.toLowerCase()=="byy jarvis" || message.body.toLowerCase()=="beey jarvis" || message.body.toLowerCase()=="byy" || message.body.toLowerCase()=="bey" || message.body.toLowerCase()=="byee" || message.body.toLowerCase()=="byyy" || message.body.toLowerCase()=="byeee" || message.body.includes("bye") || message.body.includes("bye rishabh") || message.body.toLowerCase()=="byy rishabh" || message.body.toLowerCase()=="byee sahil" || message.body.toLowerCase()=="hlo shahil" || message.body.toLowerCase()=="bye rishab" || message.body.toLowerCase()=="byee rishav" || message.body.toLowerCase()=="bye rishu") {
                message.reply("*Bye Sir, Have A Nice Day.*");
                console.log("Jarvis: *Hey, I am Jarvis. How Can I Help You?*\n\n");
            }
            else if(message.body.toLowerCase()=="help" || message.body.toLowerCase()=="?") {
                message.reply("English:- \n\n*Welcome Sir, I am Jarvis.* Sir, A new feature has been added to me. You can imagine any image and say what you want in that image by making a sentence, but before that '/draw' or '/create image', after that write the sentence of your imagine image, your image is made.\n Example 1.> /draw Lion in forest moon art \nExample 2.> .  /create image Lion in forest moon art\n\nAnd the first one is also  feature, you can ask any questions '*' or '.' Then your questions.\n Example 1.> * What is Python? \nExample 2.> . What is python? \n\n Hindi:-\n\n*स्वागत है सर, मैं जार्विस हूं।* सर, मेरे साथ एक नई सुविधा जोड़ी गई है। आप किसी भी छवि की कल्पना कर सकते हैं और एक वाक्य बनाकर उस छवि में जो चाहते हैं उसे कह सकते हैं, लेकिन उससे पहले '/draw' या '/create image', उसके बाद अपनी कल्पना की छवि का वाक्य लिखें, आपकी छवि बन जाती है।\nExample 1.> /draw Lion in forest moon art\nExample 2.> .  /create image Lion in forest moon art\n\n और पहला वाला भी फीचर है, आप कोई भी सवाल पूछ सकते हैं '*' या '.' फिर आपके प्रश्न।\n Example 1.> * What is Python? \nExample 2.> . What is python? \n\n\n *~RISHABH-SAHIL~*");
                console.log("Jarvis: *Hey, I am Jarvis. How Can I Help You?*\nkoi bhi question puchhne keliye * lagakar questions puchh skte hai Example me\n\n*What is Python?\n\n\n Ek New Feature Add hua hai '/create image' ya '/draw' likh kar koi bhi topic de skte hai A.I Ki help se image send kar diya jaye ga \n\n *~RISHABH-SAHIL~*\n\n");
            }
            else if(message.body.includes('sahil') || message.body.includes('shahil')) {
                message.reply("Hey, I am Jarvis ! SAHIL Sir Abhi busy hai");
                console.log("Jarvis: Hey, I am Jarvis ! SAHIL Sir Abhi busy hai\n\n")
            }
            else if (message.body.includes("good morning") || message.body.toLowerCase()=="gm" || message.body.toLowerCase()=="gm rishabh" || message.body.toLowerCase()=="gm sahil" || message.body.toLowerCase()=="gm shahil" || message.body.toLowerCase()=="gm rishab" || message.body.toLowerCase()=="gm rishav") {
                message.reply("Good Morning Sir, How can i help you?");
                console.log("Jarvis: Good Morning Sir, How can i help you?\n\n");
            } 
            else if (message.body.includes("good afternoon") || message.body.toLowerCase()=="ga") {
                message.reply("Good Afternoon Sir, How can i help you?");
                console.log("Jarvis: Good Afternoon Sir, How can i help you?\n\n");
            }   
            else if (message.body.includes("good evening") || message.body.toLowerCase()=="ge") {
                message.reply("Good Evening Sir, How can i help you?");
                console.log("Jarvis: Good Evening Sir, How can i help you?\n\n");
            }     
            else if (message.body.includes("good nigt") || message.body.toLowerCase()=="gn" || message.body.toLowerCase()=="gn rishabh" || message.body.toLowerCase()=="gn sahil" || message.body.toLowerCase()=="gn shahil" || message.body.toLowerCase()=="gn rishab" || message.body.toLowerCase()=="gn rishav") {
                message.reply("Good Nigt Sir, How can i help you?");
                console.log("Jarvis: Good Nigt Sir, How can i help you?\n\n");
            }
            else if (message.body.includes("Thank you") || message.body.toLowerCase()=="thnx") {
                message.reply("*Welcome Sir*");
                console.log("Jarvis: *Welcome*\n\n");
            } 
            else if (message.body.toLowerCase()=="memes" || message.body.toLowerCase()=="send memes" || message.body.toLowerCase()=="meme" || message.body.toLowerCase()=="send meme"){
                const meme = await axios("https://meme-api.com/gimme")
                .then(res => res.data)
                const media = await MessageMedia.fromUrl(meme.url);
                await client.sendMessage(message.from, media)
            }
            else if (message.body.toLowerCase()=="send news" || message.body.toLowerCase()=="today news" || message.body.toLowerCase()=="top news" || message.body.toLowerCase()=="news"){
                message.reply("*Top 10 Headlines*\n\n");
                try {
                    newsapi.v2.everything({
                        sources: 'bbc-news'
                    }, {
                        noCache: true
                    }).then(response => {
                        for (let i = 0; i <= 9; i++) {
                                const newses = "News: "+1+"\n\n*Link:-* "+newsurl+"\n*Title:* "+response['articles'][i]['title']+"\n*Description:* "+response['articles'][i]['description']+"\n*Content:* "+response['articles'][i]['content']+"\n\n*Date:- "+response['articles'][i]['publishedAt']+"*"
                                const newsurl = response['articles'][i]['url']
                                const newsimgurl = response['articles'][i]['urlToImage']
                                console.log("\n\n"+newses)
                                message.reply(newses)
                                    
                        }
                    });
                }catch(err) {
                    message.reply("*Sir there is an error so now we have to wait till RISHABH sir solve this error...!!*");
                    console.log("Error");
                  }
            }
            else if (message.body.toLowerCase().includes("what") || message.body.toLowerCase().includes("how")) {
                let text = message.body;
                var qst = `Human: ${text}\nJarvis:`;
                const response = await openai.createCompletion({
                    model: "text-davinci-003",
                    prompt: qst,
                    temperature: 0.5,
                    max_tokens: 3000,
                    top_p: 0.3,
                    frequency_penalty: 0.5,
                    presence_penalty: 0,
                });
                console.log("Jarvis: "+response.data.choices[0].text+"\n~~RISHABH-SAHIL~~\n\n");
                message.reply(response.data.choices[0].text);
            }
            else {
                // message.reply("*Hello I am Jarvis Your Assistant.* To know more about me you can help message and know how to use.\n\n *A.I Powered Bot Created By ~~RISHABH-SAHIL~~*");
                console.log("Jarvis: *Hello I am Jarvis Your Assistant.* To know more about me you can help message and know how to use.\n\n *A.I Powered Bot Created By ~~RISHABH-SAHIL~~*\n\n");
            } 
        });
    } catch(err) {
        message.reply("*Sir there is an error so now we have to wait till RISHABH sir solve this error...!!*");
        console.log("Error");
      }
}

man();
