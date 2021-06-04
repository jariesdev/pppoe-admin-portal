<template>
  <base-nav
    v-model="showMenu"
    :transparent="true"
    class="navbar-absolute top-navbar"
    type="white"
  >
    <div slot="brand" class="navbar-wrapper">
      <div
        :class="{ toggled: $sidebar.showSidebar }"
        class="navbar-toggle d-inline"
      >
        <button class="navbar-toggler" type="button" @click="toggleSidebar">
          <span class="navbar-toggler-bar bar1" />
          <span class="navbar-toggler-bar bar2" />
          <span class="navbar-toggler-bar bar3" />
        </button>
      </div>
      <nuxt-link class="navbar-brand ml-xl-3 ml-5" to="/">
        {{ routeName }}
      </nuxt-link>
    </div>

    <ul :class="$rtl.isRTL ? 'mr-auto' : 'ml-auto'" class="navbar-nav">
      <div class="search-bar input-group" @click="searchModalVisible = true">
        <button
          id="search-button"
          class="btn btn-link"
          data-target="#searchModal"
          data-toggle="modal"
        >
          <i class="tim-icons icon-zoom-split" />
        </button>
        <!-- You can choose types of search input -->
      </div>
      <modal
        id="searchModal"
        :centered="false"
        :show-close="true"
        :show.sync="searchModalVisible"
        class="modal-search"
        @open="()=>{ $refs.searchInput.focus(); $refs.searchInput.setSelectionRange(0, $refs.searchInput.value.length) }"
      >
        <input
          id="inlineFormInputGroup"
          ref="searchInput"
          slot="header"
          v-model="searchQuery"
          class="form-control"
          placeholder="SEARCH"
          type="text"
          @keypress.enter="searchSubmit()"
          @keyup.esc="searchModalVisible=false"
        >
      </modal>
      <!--      <base-dropdown
                :menu-on-right="!$rtl.isRTL"
                class="nav-item"
                tag="li"
                title-classes="nav-link"
                title-tag="a"
            >
              <template
                  slot="title"
              >
                <div class="notification d-none d-lg-block d-xl-block"></div>
                <i class="tim-icons icon-sound-wave"></i>
                <p class="d-lg-none">New Notifications</p>
              </template>
              <li class="nav-link">
                <a class="nav-item dropdown-item" href="#"
                >Mike John responded to your email</a
                >
              </li>
              <li class="nav-link">
                <a class="nav-item dropdown-item" href="#">You have 5 more tasks</a>
              </li>
              <li class="nav-link">
                <a class="nav-item dropdown-item" href="#"
                >Your friend Michael is in town</a
                >
              </li>
              <li class="nav-link">
                <a class="nav-item dropdown-item" href="#">Another notification</a>
              </li>
              <li class="nav-link">
                <a class="nav-item dropdown-item" href="#">Another one</a>
              </li>
            </base-dropdown>-->
      <base-dropdown
        :menu-on-right="!$rtl.isRTL"
        class="nav-item"
        menu-classes="dropdown-navbar"
        tag="li"
        title-classes="nav-link"
        title-tag="a"
      >
        <template
          slot="title"
        >
          <div class="photo">
            <img src="img/default-avatar-2.jpg">
          </div>
          <b class="caret d-none d-lg-block d-xl-block" />
          <p class="d-lg-none">
            Log out
          </p>
        </template>
        <li class="nav-link">
          <nuxt-link class="nav-item dropdown-item" to="/user">
            Profile
          </nuxt-link>
        </li>
        <li class="nav-link">
          <nuxt-link class="nav-item dropdown-item" to="settings">
            Settings
          </nuxt-link>
        </li>
        <div class="dropdown-divider" />
        <li class="nav-link">
          <a class="nav-item dropdown-item" href="#" @click.prevent="logout">Log out</a>
        </li>
      </base-dropdown>
    </ul>
  </base-nav>
</template>
<script>
import { BaseNav, Modal } from '@/components'

export default {
  components: {
    BaseNav,
    Modal
  },
  data () {
    return {
      activeNotifications: false,
      showMenu: false,
      searchModalVisible: false,
      searchQuery: ''
    }
  },
  computed: {
    routeName () {
      const { path } = this.$route
      const parts = path.split('/')
      // eslint-disable-next-line eqeqeq
      if (parts == ',') {
        return 'Dashboard'
      }
      return (parts || []).filter(o => !o.match(/^[\d]+$/))
        .map(p => p ? String(p).replace(/[^a-zA-Z\d]/, ' ') : p)
        .map(p => this.capitalizeFirstLetter(p)).join(' ')
    },
    isRTL () {
      return this.$rtl.isRTL
    }
  },
  methods: {
    capitalizeFirstLetter (string) {
      if (!string || typeof string !== 'string') {
        return ''
      }
      return string.charAt(0).toUpperCase() + string.slice(1)
    },
    closeDropDown () {
      this.activeNotifications = false
    },
    toggleSidebar () {
      this.$sidebar.displaySidebar(!this.$sidebar.showSidebar)
    },
    toggleMenu () {
      this.showMenu = !this.showMenu
    },
    async logout () {
      await this.$auth.logout()
      await this.$router.push('/login')
    },
    searchSubmit () {
      this.$root.$emit('search-submitted', this.searchQuery)
    }
  }
}
</script>
<style scoped>
.top-navbar {
  top: 0px;
}
</style>
