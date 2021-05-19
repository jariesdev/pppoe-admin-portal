export const state = () => {
    return {
        darkMode: true,
        backgroundColor: 'blue'
    }
}

export const mutations = {
    backgroundColor(state, value) {
        state.backgroundColor = value
    },
    setDarkMode(state, value){
        state.darkMode = value
    }
}
