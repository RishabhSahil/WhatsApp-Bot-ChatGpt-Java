// App-Name:- Jarvis A.I Bot
// Developer-Name:- R.S (RISHABH-SAHIL)
// GitHub:- https://github.com/RishabhSahil/whatsapp-bot-type-script
// Linkden:- https://www.linkedin.com/in/rishabhsahil/
// OpenAI-API-KEY:- https://platform.openai.com/

console.log("\n\nApp-Name:- Jarvis A.I Bot\nDeveloper-Name:- R.S (RISHABH-SAHIL)\nGitHub:- https://github.com/RishabhSahil/whatsapp-bot-type-script\nLinkden:- https://www.linkedin.com/in/rishabhsahil/\nOpenAI-API-KEY:- https://platform.openai.com/")

const qrcode = require('qrcode-terminal');
const fs = require("fs")
const { Client, LegacySessionAuth, LocalAuth, MessageMedia} = require('whatsapp-web.js');
const { getSystemErrorMap } = require('util');
const { Configuration, OpenAIApi } = require("openai");
let setting = require('./key.json');
const { url } = require('inspector');
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
    console.log("Ready To Message\n\n")
});

function man(){
    try {
        client.on('message', async message => {
            console.log("Human: "+message.body.toLowerCase())
            if(message.body.includes('*') || message.body.includes('.')) {
                let text = message.body.split('*')[1] ||  message.body.split('.')[1];
                var qst = `Human: ${text}\nJarvis:`;
                const response = await openai.createCompletion({
                    model: "text-davinci-003",
                    prompt: qst,
                    temperature: 0,
                    max_tokens: 300,
                    top_p: 1.0,
                    frequency_penalty: 0.0,
                    presence_penalty: 0.0,
                });
                console.log("Jarvis: "+response.data.choices[0].text+"\n\n~~RISHABH-SAHIL~~");
                message.reply(response.data.choices[0].text);
            }
            else if(message.body.includes('/draw') || message.body.includes('/create image') || message.body.includes('/ draw') || message.body.includes('/ create image')) {
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
                console.log("Jarvis: ~RISHABH-SAHIL~")
            }
            else if(message.body.includes('sahil') || message.body.includes('shahil')) {
                message.reply("Hey, I am Jarvis ! SAHIL Sir Abhi busy hai");
                console.log("Jarvis: Hey, I am Jarvis ! SAHIL Sir Abhi busy hai");
            }
            else if(message.body.includes('rishabh') || message.body.includes('rishab') || message.body.includes('rishav') || message.body.includes('risab')) {
                message.reply("Hey, I am Jarvis ! RISHABH Sir Abhi busy hai");
                console.log("Jarvis: Hey, I am Jarvis ! RISHABH Sir Abhi busy hai");
            }
            else if(message.body.toLowerCase()=="oye" || message.body.toLowerCase()=="hii jarvis" || message.body.toLowerCase()=="hey jarvis" || message.body.toLowerCase()=="hey jarvis" || message.body.toLowerCase()=="hyyy jarvis" || message.body.toLowerCase()=="hii jarvis" || message.body.toLowerCase()=="hyy jarvis" || message.body.toLowerCase()=="jarvis" || message.body.toLowerCase()=="hey" || message.body.toLowerCase()=="heyyy" || message.body.toLowerCase()=="hyy" || message.body.toLowerCase()=="hyyy" || message.body.toLowerCase()=="hi" || message.body.toLowerCase()=="hii" || message.body.toLowerCase()=="hii" || message.body.includes("hello") || message.body.includes("hey rishabh") || message.body.toLowerCase()=="hlo" || message.body.toLowerCase()=="hlo rishabh" || message.body.toLowerCase()=="hlo sahil" || message.body.toLowerCase()=="hlo shahil" || message.body.toLowerCase()=="hlo rishab" || message.body.toLowerCase()=="hlo rishav" || message.body.toLowerCase()=="hlo rishu") {
                message.reply("*Hey, I am Jarvis. How Can I Help You?*");
                console.log("Jarvis: *Hey, I am Jarvis. How Can I Help You?*");
            }
            else if(message.body.toLowerCase()=="help" || message.body.toLowerCase()=="?") {
                message.reply("English:- \n\n*Welcome Sir, I am Jarvis.* Sir, A new feature has been added to me. You can imagine any image and say what you want in that image by making a sentence, but before that '/draw' or '/create image', after that write the sentence of your imagine image, your image is made.\n Example 1.> /draw Lion in forest moon art \nExample 2.> .  /create image Lion in forest moon art\n\nAnd the first one is also  feature, you can ask any questions '*' or '.' Then your questions.\n Example 1.> * What is Python? \nExample 2.> . What is python? \n\n Hindi:-\n\n*स्वागत है सर, मैं जार्विस हूं।* सर, मेरे साथ एक नई सुविधा जोड़ी गई है। आप किसी भी छवि की कल्पना कर सकते हैं और एक वाक्य बनाकर उस छवि में जो चाहते हैं उसे कह सकते हैं, लेकिन उससे पहले '/draw' या '/create image', उसके बाद अपनी कल्पना की छवि का वाक्य लिखें, आपकी छवि बन जाती है।\nExample 1.> /draw Lion in forest moon art\nExample 2.> .  /create image Lion in forest moon art\n\n और पहला वाला भी फीचर है, आप कोई भी सवाल पूछ सकते हैं '*' या '.' फिर आपके प्रश्न।\n Example 1.> * What is Python? \nExample 2.> . What is python? \n\n\n *~RISHABH-SAHIL~*");
                console.log("Jarvis: *Hey, I am Jarvis. How Can I Help You?*\nkoi bhi question puchhne keliye * lagakar questions puchh skte hai Example me\n\n*What is Python?\n\n\n Ek New Feature Add hua hai '/create image' ya '/draw' likh kar koi bhi topic de skte hai A.I Ki help se image send kar diya jaye ga \n\n *~RISHABH-SAHIL~*");
            }
            else if(message.body.includes('sahil') || message.body.includes('shahil')) {
                message.reply("Hey, I am Jarvis ! SAHIL Sir Abhi busy hai");
                console.log("Jarvis: Hey, I am Jarvis ! SAHIL Sir Abhi busy hai")
            }
            else if (message.body.includes("good morning") || message.body.toLowerCase()=="gm" || message.body.toLowerCase()=="gm rishabh" || message.body.toLowerCase()=="gm sahil" || message.body.toLowerCase()=="gm shahil" || message.body.toLowerCase()=="gm rishab" || message.body.toLowerCase()=="gm rishav") {
                message.reply("Good Morning Sir, How can i help you?");
                console.log("Jarvis: Good Morning Sir, How can i help you?");
            } 
            else if (message.body.includes("good afternoon") || message.body.toLowerCase()=="ga") {
                message.reply("Good Afternoon Sir, How can i help you?");
                console.log("Jarvis: Good Afternoon Sir, How can i help you?");
            }   
            else if (message.body.includes("good evening") || message.body.toLowerCase()=="ge") {
                message.reply("Good Evening Sir, How can i help you?");
                console.log("Jarvis: Good Evening Sir, How can i help you?");
            }     
            else if (message.body.includes("good nigt") || message.body.toLowerCase()=="gn" || message.body.toLowerCase()=="gn rishabh" || message.body.toLowerCase()=="gn sahil" || message.body.toLowerCase()=="gn shahil" || message.body.toLowerCase()=="gn rishab" || message.body.toLowerCase()=="gn rishav") {
                message.reply("Good Nigt Sir, How can i help you?");
                console.log("Jarvis: Good Nigt Sir, How can i help you?");
            }
            else if (message.body.includes("Thank you") || message.body.toLowerCase()=="thnx") {
                message.reply("*Welcome*");
                console.log("Jarvis: *Welcome*");
            } 
            else {
                console.log("Jarvis: *Adding New Features...!!*");
            } 
        });
    } catch(err) {
        message.reply("*Sir there is an error so now we have to wait till RISHABH sir solve this error...!!*");
        console.log("Error");
      }
}

man();