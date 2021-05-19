<template>
  <div class="fixed-plugin" :class="{'text-white': darkMode}">
    <h4>Theme Options</h4>
    <hr class="border-light">

    <div class="mb-3">
      <strong>Theme Color</strong>
    </div>
    <div class="togglebutton switch-change-color my-3">
      <span class="label-switch">LIGHT MODE</span>
      <base-switch v-model="darkMode" @input="toggleMode"></base-switch>
      <span class="label-switch label-right">DARK MODE</span>
    </div>

    <div class="mb-3">
      <strong>Sidebar Background</strong>
    </div>

    <ul class="pb-4 list-unstyled">
      <li class="adjustments-line">
        <a class="switch-trigger background-color">
          <div class="badge-colors">
              <span
                  v-for="item in sidebarColors"
                  :key="item.color"
                  :class="[`badge-${item.color}`, { active: activeBackgroundColor === item.value }]"
                  :data-color="item.color"
                  class="badge filter"
                  @click="changeSidebarBackground(item);"
              ></span>
          </div>
          <div class="clearfix"></div>
        </a>
      </li>
    </ul>
  </div>
</template>
<script>
import {BaseSwitch} from '@/components';
import {mapState} from "vuex";

export default {
  name: 'ThemeSettings',
  components: {
    BaseSwitch
  },
  props: {
    backgroundColor: String
  },
  data() {
    return {
      sidebarMini: true,
      isOpen: false,
      sidebarColors: [
        {color: 'primary', active: false, value: 'primary'},
        {color: 'vue', active: true, value: 'vue'},
        {color: 'info', active: false, value: 'blue'},
        {color: 'success', active: false, value: 'green'}
      ]
    };
  },
  computed: {
    ...mapState({
      themeIsDarkMode: state => state.settings.darkMode,
      activeBackgroundColor: state => state.settings.backgroundColor
    }),
    darkMode: {
      get(){
        return this.themeIsDarkMode
      },
      set: function (value) {
        const b = Boolean(value)
        window.localStorage.setItem('themeIsDarkMode', b ? '1' : '0')
        this.$store.commit('settings/setDarkMode', b)
      },
    }
  },
  methods: {
    toggleDropDown() {
      this.isOpen = !this.isOpen;
    },
    closeDropDown() {
      this.isOpen = false;
    },
    toggleList(list, itemToActivate) {
      list.forEach(listItem => {
        listItem.active = false;
      });
      itemToActivate.active = true;
    },
    changeSidebarBackground(item) {
      this.$store.commit('settings/backgroundColor', item.value)
      window.localStorage.setItem('themeBackgroundColor', item.value)
      this.$emit('update:backgroundColor', item.value);
      this.toggleList(this.sidebarColors, item);
    },
    toggleMode(type) {
      let docClasses = document.body.classList;
      this.$store.commit('settings/setDarkMode', Boolean(type))
      if (type) {
        docClasses.remove('white-content');
      } else {
        docClasses.add('white-content');
      }
    },
    minimizeSidebar() {
      this.$sidebar.toggleMinimize();
    }
  }
};
</script>
<style lang="scss" scoped>
@import '~@/assets/sass/dashboard/custom/variables';

.settings-icon {
  cursor: pointer;
}

.badge-vue {
  background-color: $vue;
}
</style>
