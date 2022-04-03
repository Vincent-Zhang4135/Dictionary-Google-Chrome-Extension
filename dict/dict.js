const dict_key = "16450aa8-91b4-40f8-a029-923295ab74d2"
const thes_key = "c1c55072-9ee8-4cf8-b66a-f688ef151764"
/*
async function getDICT() {
    response = await fetch("https://www.dictionaryapi.com/api/v3/references/collegiate/json/voluminous?key=16450aa8-91b4-40f8-a029-923295ab74d2")
    console.log(response)
}

getDICT()*/

async function getDICT() {
    let url = "https://www.dictionaryapi.com/api/v3/references/collegiate/json/voluminous?key=16450aa8-91b4-40f8-a029-923295ab74d2"
    try {
        let res = await fetch(url)
        json = await res.json()
        console.log(json)
    } catch (error) {
        console.error(error)
    }
}

getDICT()