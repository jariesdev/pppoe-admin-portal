<template>
  <div class="sidebar" :data="backgroundColor">
    <div ref="sidebarScrollArea" class="sidebar-wrapper">
      <div class="logo">
        <nuxt-link to="/" class="simple-text logo-mini">
          <img :src="logo" alt="app-logo">
        </nuxt-link>
        <nuxt-link to="/" class="simple-text logo-normal">
          {{ title }}
        </nuxt-link>
      </div>
      <slot />
      <ul class="nav">
        <slot name="links">
          <sidebar-item
            v-for="(link, index) in sidebarLinks"
            :key="link.name + index"
            :link="link"
          />
        </slot>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Sidebar',
  provide () {
    return {
      autoClose: this.autoClose
    }
  },
  props: {
    title: {
      type: String,
      default: 'Hotspot',
      description: 'Sidebar title'
    },
    shortTitle: {
      type: String,
      default: 'CT',
      description: 'Sidebar short title'
    },
    logo: {
      type: String,
      default: 'https://demos.creative-tim.com/nuxt-black-dashboard-pro/img/icon-nuxt.svg',
      description: 'Sidebar app logo'
    },
    backgroundColor: {
      type: String,
      default: 'vue',
      validator: (value) => {
        const acceptedValues = [
          '',
          'vue',
          'blue',
          'green',
          'primary'
        ]
        return acceptedValues.includes(value)
      },
      description:
        'Sidebar background color (vue|blue|green|orange|red|primary)'
    },
    sidebarLinks: {
      type: Array,
      default: () => [],
      description:
        "List of sidebar links as an array if you don't want to use components for these."
    },
    autoClose: {
      type: Boolean,
      default: true,
      description:
        'Whether sidebar should autoclose on mobile when clicking an item'
    }
  },
  beforeDestroy () {
    if (this.$sidebar.showSidebar) {
      this.$sidebar.showSidebar = false
    }
  }
}
</script>
<style>
@media (min-width: 992px) {
  .navbar-search-form-mobile,
  .nav-mobile-menu {
    display: none;
  }
}
</style>
