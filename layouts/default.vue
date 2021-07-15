<template>
  <div :class="{ 'nav-open': $sidebar.showSidebar }" class="wrapper">
    <notifications />
    <side-bar
      :background-color="sidebarBackground"
      :short-title="$t('sidebar.shortTitle')"
      :title="appName"
      :logo="appLogo"
      auto-close
    >
      <template slot="links">
        <sidebar-item
          :link="{
            name: $t('sidebar.dashboard'),
            icon: 'tim-icons icon-chart-pie-36',
            path: '/'
          }"
        />
        <sidebar-item
          :link="{
            name: $t('sidebar.job-orders'),
            icon: 'tim-icons icon-bullet-list-67',
            path: '/job-orders'
          }"
        />
        <sidebar-item
          :link="{
            name: $t('sidebar.customers'),
            icon: 'tim-icons icon-single-02',
            path: '/customers',
          }"
        />
        <sidebar-item
          :link="{
            name: $t('sidebar.billings'),
            icon: 'tim-icons icon-coins',
            path: '/billings',
          }"
        />
        <hr class="menu-separator">
        <sidebar-item
          :link="{
            name: $t('sidebar.branches'),
            icon: 'tim-icons icon-bank',
            path: '/branches'
          }"
        />
        <sidebar-item
          :link="{
            name: $t('sidebar.users'),
            icon: 'tim-icons icon-key-25',
            path: '/users'
          }"
        />
        <sidebar-item
          :link="{
            name: $t('sidebar.pppoe-profiles'),
            icon: 'tim-icons icon-cloud-download-93',
            path: '/bandwidth-profiles'
          }"
        />
        <sidebar-item
          :link="{
            name: $t('sidebar.plans'),
            icon: 'tim-icons icon-app',
            path: '/plans'
          }"
        />
        <sidebar-item
          :link="{
            name: $t('sidebar.address-pools'),
            icon: 'tim-icons icon-planet',
            path: '/address-pools'
          }"
        />
        <sidebar-item
          :link="{
            name: $t('sidebar.nas'),
            icon: 'tim-icons icon-vector',
            path: '/nas'
          }"
        />
        <sidebar-item
          :link="{
            name: $t('sidebar.settings'),
            icon: 'tim-icons icon-settings',
            path: '/settings'
          }"
        />
      </template>
    </side-bar>
    <div :data="sidebarBackground" class="main-panel">
      <dashboard-navbar />
      <router-view name="header" />

      <div
        :class="{ content: !isFullScreenRoute }"
        @click="toggleSidebar"
      >
        <zoom-center-transition :duration="200" mode="out-in">
          <!-- your content here -->
          <nuxt />
        </zoom-center-transition>
      </div>
      <content-footer v-if="!isFullScreenRoute" />
    </div>
  </div>
</template>
<script>
/* eslint-disable no-new */
import PerfectScrollbar from 'perfect-scrollbar'
import 'perfect-scrollbar/css/perfect-scrollbar.css'
import DashboardNavbar from '@/components/Layout/DashboardNavbar.vue'
import ContentFooter from '@/components/Layout/ContentFooter.vue'
import { ZoomCenterTransition } from 'vue2-transitions'
import { mapState } from 'vuex'
import { find } from 'lodash'

function hasElement (className) {
  return document.getElementsByClassName(className).length > 0
}

function initScrollbar (className) {
  if (hasElement(className)) {
    new PerfectScrollbar(`.${className}`)
  } else {
    // try to init it later in case this component is loaded async
    setTimeout(() => {
      initScrollbar(className)
    }, 100)
  }
}

export default {
  components: {
    DashboardNavbar,
    ContentFooter,
    ZoomCenterTransition
  },
  data () {
    return {}
  },
  async fetch () {
    await this.$store.dispatch('settings/load')
  },
  computed: {
    ...mapState({
      generalSettings: state => state.settings.generalSettings
    }),
    isFullScreenRoute () {
      return this.$route.path === '/maps/full-screen'
    },
    sidebarBackground () {
      return this.$store.state.settings.backgroundColor
    },
    appName () {
      const found = find(this.generalSettings, { name: 'company_name' })
      return found ? found.value : this.$t('sidebar.title')
    },
    appLogo () {
      const found = find(this.generalSettings, { name: 'system_logo' })
      return found ? found.value : this.$t('sidebar.title')
    }
  },
  beforeMount () {
    this.toggleMode()
    this.setCurrentBackgroundColor()
  },
  mounted () {
    this.initScrollbar()
  },
  methods: {
    toggleSidebar () {
      if (this.$sidebar.showSidebar) {
        this.$sidebar.displaySidebar(false)
      }
    },
    setCurrentBackgroundColor () {
      const lsValue = window.localStorage.getItem('themeBackgroundColor')
      const value = lsValue === null ? 'blue' : lsValue
      this.$store.commit('settings/backgroundColor', value)
    },
    initScrollbar () {
      const docClasses = document.body.classList
      const isWindows = navigator.platform.startsWith('Win')
      if (isWindows) {
        // if we are on windows OS we activate the perfectScrollbar function
        initScrollbar('sidebar')
        initScrollbar('main-panel')
        initScrollbar('sidebar-wrapper')

        docClasses.add('perfect-scrollbar-on')
      } else {
        docClasses.add('perfect-scrollbar-off')
      }
    },
    toggleMode () {
      const lsValue = window.localStorage.getItem('themeIsDarkMode')
      const lsInDarkMode = lsValue === '1' || lsValue === null
      this.$store.commit('settings/setDarkMode', lsInDarkMode)

      const isDarkMode = this.$store.state.settings.darkMode
      const docClasses = document.body.classList
      if (isDarkMode) {
        docClasses.remove('white-content')
      } else {
        docClasses.add('white-content')
      }
    }
  }
}
</script>
<style lang="scss">
$scaleSize: 0.95;
@keyframes zoomIn95 {
  from {
    opacity: 0;
    transform: scale3d($scaleSize, $scaleSize, $scaleSize);
  }
  to {
    opacity: 1;
  }
}

.main-panel .zoomIn {
  animation-name: zoomIn95;
}

@keyframes zoomOut95 {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
    transform: scale3d($scaleSize, $scaleSize, $scaleSize);
  }
}

.main-panel .zoomOut {
  animation-name: zoomOut95;
}

.menu-separator {
  background-color: #fdfdfd3d;
  margin: 1rem .8rem;
}
</style>
