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
setInterval(BotInit, 1 * 60 * 1000)
BotInit()
console.log("Bot iniciado...")