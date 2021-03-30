const api = "http://localhost:3000"
const Data = {
  getCategories: () => {
    return fetch(api + '/categories')
  },
  randomPhraseByCategory: (categoryId) => {
    return fetch(api + `/categories/${categoryId}/phrases?random=true`)
  },
  uploadNewGameRecord: (username, elapsed_time, phrase_id) => {
    const url = `${api}/game_records`
    const gameRecord = { username, elapsed_time,phrase_id};
    
    // method: "POST" is missing from the object below
    let configObj = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(gameRecord)
    };
    return fetch( url, configObj )
  }
}
