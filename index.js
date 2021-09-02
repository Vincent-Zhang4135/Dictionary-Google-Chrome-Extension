const dict_key = "16450aa8-91b4-40f8-a029-923295ab74d2"
const thes_key = "c1c55072-9ee8-4cf8-b66a-f688ef151764"

const wordEl = document.getElementById("word")
const testEl = document.getElementById("testing")
const definitionsEl = document.getElementById("definitions")
let word = "Voluminous"
let definitions = ["having or marked by great volume", "having great volume", "another definition", "last one?"]
let partsOfSpeech = ["n", "v", "adj", "p"]

testEl.addEventListener("click", function() {
    render()
})

function render() {
    renderWord()
    renderDefinitions()
}

function clear() {
    wordEl.innerHTML = ""
    definitionsEl.innerHTML = ""
}

function renderWord() {
    wordEl.innerHTML = word
}

function renderDefinitions() {
    for (let i = 0; i < 3; i++) {
        if (definitions[i]) {
            definitionsEl.innerHTML +=
            `<li>
                <p>
                    <span class="parts-of-speech">${partsOfSpeech[i]}.</span>
                    <span class="definition">${definitions[i]}</span>
                </p>
            </li>
            `
        }
    }
}

