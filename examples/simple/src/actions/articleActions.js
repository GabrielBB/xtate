
export function saveArticle(state, payload) {
    return { ...state, articles: [...state.articles, payload] };
}

export function deleteArticle(state, payload) {
    const articles = [...state.articles];
    const index = articles.indexOf(payload);
    articles.splice(index, 1)

    return { ...state, articles };
}