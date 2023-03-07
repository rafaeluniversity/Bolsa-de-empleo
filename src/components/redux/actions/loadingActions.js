const showLoading = () => {
    return {
        type: "showLoading",
        payload: true
    }
}

const hideLoading = () => {
    return {
        type: "hideLoading",
        payload: false
    }
}

export default { showLoading, hideLoading }