// GET frase da API (frases em Ingles)

async function getQuote(){
    const proxyUrl =  'http://cors-anywhere.herokuapp.com/'
    const apiUrl = 'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json'
    try {
        const response = await fetch(proxyUrl + apiUrl)
        const data = await response.json()
        console.log(data)
    } catch (error) {
        getQuote()
        console.log('Eitha, Não temos frase!' , error)
    }
}

getQuote()