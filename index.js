const dict_key = "16450aa8-91b4-40f8-a029-923295ab74d2"
const thes_key = "c1c55072-9ee8-4cf8-b66a-f688ef151764"

const wordEl = document.getElementById("word")
const inputEl = document.getElementById("input-word")
const posEl = document.getElementById("part-of-speech")
const definitionsEl = document.getElementById("definitions")
const errEl = document.getElementById("err")
const partsOfSpeech = {
    "pronoun" : "pn.",
    "noun" : "n.",
    "adjective" : "adj.",
    "verb" : "v.",
    "adverb" : "adv.",
    "conjunction" : "conj.",
    "interjection" : "intj.",
    "preposition" : "prep.",
    "auxiliary verb" : "aux v.",
    "article" : "artc."
}

let word = ""

inputEl.addEventListener("keyup", async function(e) {
    if (e.key === "Enter") {
        word = inputEl.value
        inputEl.value = ""
        // clear out the previous entry, and then render the new one
        clear()
        const dictionary = await fetchFromDictionaryAPI()
        render(dictionary)
    }
})

async function fetchFromDictionaryAPI() {
    url = `https://www.dictionaryapi.com/api/v3/references/collegiate/json/${word}?key=${dict_key}`
    try {
        let promise = await fetch(url) 
        response = await promise.json()
    } catch (error) {
        console.error(error)
    }
    return response[0]
}

function clear() {
    wordEl.innerHTML = ""
    posEl.innerHTML = ""
    definitionsEl.innerHTML = ""
}

function render(dict) {
    // the dictionary API returns an array of words you might have intended to type in
    // if your word is not in their API. Then, since we retrieve the first object from
    // the JSON, we can check to see if it is a string (meaning the word was mispelled),
    // an object (the usual), or undefined (if the word is so jumbled none of the words match)
    console.log(typeof dict)
    if (typeof dict === "object") {
        hideError()
    } else if (typeof dict === "string") {
        displayQuery(dict)
    } else {
        displayError()
    }
    renderWord(dict)
    renderDefinitions(dict)
}

function renderWord(dict) {
    syllableWord = dict.hwi.hw.replace(/\*/g, "-")
    partOfSpeech = dict.fl
    wordEl.innerHTML = syllableWord
    posEl.innerHTML = partsOfSpeech[partOfSpeech]
}

function renderDefinitions(dict) {
    for (let i = 0; i < 3; i++) {
        if (dict.shortdef[i]) {
            definitionsEl.innerHTML +=
            `<li>
                <p class="definition">
                    <span class="shortdef">${dict.shortdef[i]}</span>
                </p>
            </li>
            `
        }
    }
}

function hideError() {
    errEl.style.display = "none"
}

function displayError() {
    errEl.style.display = "block"
    errEl.innerHTML = "Sorry, your word was not found"
}

function displayQuery(dict) {
    errEl.style.display = "block"
    errEl.innerHTML = `did you mean ${dict}?`
}