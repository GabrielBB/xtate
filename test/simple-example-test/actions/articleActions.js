export function saveArticle(state, payload) {
    return { ...state, articles: [...state.articles, payload] };
}
