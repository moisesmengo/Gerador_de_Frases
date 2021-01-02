const quoteContainer = document.getElementById('quote-container')
const quoteText = document.getElementById('quote')
const authorText = document.getElementById('author')
const twitterBtn = document.getElementById('twitter')
const newQuoteBtn = document.getElementById('new-quote')
const loader = document.getElementById('loader')

//loading
function loading(){
    loader.hidden = false
    quoteContainer.hidden = true
}

function complete(){
    if(!loader.hidden){
        quoteContainer.hidden = false
        loader.hidden = true
    }
}

// GET frase da API (frases em Ingles)
async function getQuote(){

    loading()

    const proxyUrl =  'http://cors-anywhere.herokuapp.com/'
    const apiUrl = 'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json'

    try {
        const response = await fetch(proxyUrl + apiUrl)
        const data = await response.json()

        // Se não tiver autor na frase
        if(data.quoteAuthor === ''){
            authorText.innerText = 'Unknown'
        }else{
            authorText.innerText = data.quoteAuthor
        }
        
        // Se a frase for muito longa
        if(data.quoteText.length > 120){
            quoteText.classList.add('long-quote')
        }else{
            quoteText.classList.remove('long-quote')
        }
        quoteText.innerText = data.quoteText

        //stop loading

        complete()

    } catch (error) {
        getQuote()
    }
}
//Tweet quote
function tweetQuote(){
    const quote = quoteText.innerText
    const author = authorText.innerText
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`
    window.open(twitterUrl, '_blank')
}

// eventos
newQuoteBtn.addEventListener('click', getQuote)
twitterBtn.addEventListener('click', tweetQuote)

// on Load
getQuote()