const loading = (state = { loading: false }, action) => {
    switch (action.type) {
        case "showLoading":
            return { ...state, loading: action.payload };
        case "hideLoading":
            return { ...state, loading: action.payload };
        default:
            return state;
    }
}

export default loading