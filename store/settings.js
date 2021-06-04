import { find } from 'lodash'

export const state = () => {
  return {
    darkMode: true,
    backgroundColor: '',
    generalSettings: {}
  }
}

export const mutations = {
  initializedSettings (state, settingValues) {
    const generalSettings = find(settingValues, { group: 'general' })
    if (generalSettings) {
      state.generalSettings = generalSettings.settings
    }
  },
  backgroundColor (state, value) {
    state.backgroundColor = value
  },
  setDarkMode (state, value) {
    state.darkMode = value
  }
}

export const actions = {
  async load ({ commit }) {
    const settings = await this.$axios.$get('/api/settings').then(({ data }) => data)
    commit('initializedSettings', settings)
  },
  async get () {
    return await this.$axios.$get('/api/settings').then(({ data }) => data)
  }
}
