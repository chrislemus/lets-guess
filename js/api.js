const api = "http://localhost:3000"
const data = {
  getCategories: () => {
    return fetch(api + '/categories')
  },
  randomPhraseByCategory: (categoryId) => {
    return fetch(api + `/categories/${categoryId}/phrases?random=true`)
  }
}
