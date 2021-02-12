var twit = require("twit")
require("dotenv").config()

const Bot = new twit({
    consumer_key: process.env.API_KEY,
    consumer_secret: process.env.API_SECRET_KEY,
    access_token: process.env.ACCESS_TOKEN,
    access_token_secret: process.env.ACCESS_TOKEN_SECRET,
    timeout_ms: 60 * 1000,
})

function BotInit() {
    var query = {
        q: "#guto",
        result_type: "recent",
    }

    Bot.get("search/tweets", query, BotGotLastestTweet)

    function BotGotLastestTweet(error, data, response) {
        if (error) {
            console.log("O bot não conseguiu os ultimos tweets.")
        } else {
            var id = {
                id: data.statuses[0].id_str,
            }
        }
        Bot.post("statuses/retweet/:id", id, BotRetweeted)

        function BotRetweeted(error, response) {
            if (error) {
                console.log("Não retweetou." + error)
            } else {
                console.log("O bot retweetou o " + id.id)
            }
        }
    }
}
setInterval(BotInit, 30 * 60 * 1000)
BotInit()
console.log("Bot iniciado...")

// function BotInit() {
//     function random_item(items) {
//         return items[Math.floor(Math.random() * items.length)]
//     }

//     var arr = [
//         'esse guto novo é foda...',
//         'complicado esse guto novo...',
//         'na minha época o guto n era assim...',
//         'esse guto novo não tem o mínimo de vergonha na cara...'
//     ]


//     Bot.get("https://api.twitter.com/2/users/351773428/mentions?expansions=attachments.media_keys,author_id", (error, data, response, newest_id) => {
//         function tweetEvent(tweet) {
//             var reply_to = tweet.in_reply_to_screen_name;
//             // Check to see if this was, in fact, a reply to you
//             if (reply_to === 'GustavoMartinho') {
//                 // Get the username and content of the tweet
//                 var name = tweet.user.screen_name;
//                 var txt = tweet.text;
//                 // Tweet back a reply?
//             }
//           }
//         // var id = data.user
//         console.log(data.user)
//         Bot.post("statuses/update", {
//             // in_reply_to_status_id: random_item(arr)
//             status: random_item(arr)
//             // ,
//             // in_reply_to_status_id: 351773428,
//             // tweeted
//         },
//             function tweeted (err, data, response) {
//                 if(err){
//                     console.log("Deu erro no post")
//                 }else{
//                     console.log("Deu certo!!" + data)
//                 }

//             })
//     })
// }
// BotInit()
// setInterval(BotInit, 30 * 60 * 1000)