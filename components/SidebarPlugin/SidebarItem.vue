<template>
  <component
      :is="baseComponent"
      :class="{ active: isActive }"
      :to="link.path ? link.path : '/'"
      tag="li"
  >
    <a
        v-if="isMenu"
        :aria-expanded="!collapsed"
        class="sidebar-menu-item"
        data-toggle="collapse"
        @click.prevent="collapseMenu"
    >
      <template v-if="addLink">
        <span class="sidebar-normal">{{ link.name }}</span>
      </template>
      <template v-else>
        <i :class="link.icon"></i>
        <p>{{ link.name }}</p>
      </template>
    </a>
    <div v-if="isMenu" :class="{show: !collapsed}" class="collapse">
      <slot></slot>
    </div>

    <slot
        v-if="children.length === 0 && !$slots.default && link.path"
        name="title"
    >
      <component
          :is="elementType(link, false)"
          :class="{ active: link.active }"
          :href="link.path"
          :target="link.target"
          :to="link.path"
          @click.native="linkClick"
      >
        <template v-if="addLink">
          <span class="sidebar-mini-icon">P</span>
          <span class="sidebar-normal">{{ link.name }}</span>
        </template>
        <template v-else>
          <i :class="link.icon"></i>
          <p>{{ link.name }}</p>
        </template>
      </component>
    </slot>
  </component>
</template>
<script>
import {CollapseTransition} from 'vue2-transitions';

export default {
  name: 'sidebar-item',
  components: {
    CollapseTransition
  },
  props: {
    menu: {
      type: Boolean,
      default: false,
      description:
          "Whether the item is a menu. Most of the item it's not used and should be used only if you want to override the default behavior."
    },
    link: {
      type: Object,
      default: () => {
        return {
          name: '',
          path: '',
          children: []
        };
      },
      description:
          'Sidebar link. Can contain name, path, icon and other attributes. See examples for more info'
    }
  },
  provide() {
    return {
      addLink: this.addChild,
      removeLink: this.removeChild
    };
  },
  inject: {
    addLink: {default: null},
    removeLink: {default: null},
    autoClose: {
      default: true
    }
  },
  data() {
    return {
      children: [],
      collapsed: true
    };
  },
  computed: {
    baseComponent() {
      return this.isMenu || this.link.isRoute ? 'li' : 'nuxt-link';
    },
    linkPrefix() {
      if (this.link.name) {
        let words = this.link.name.split(' ');
        return words.map(word => word.substring(0, 1)).join('');
      }
    },
    isMenu() {
      if (!this.$slots.default) {
        return false
      }
      return this.$slots.default.some(item => item.tag.endsWith('sidebar-item'))
    },
    isActive() {
      if (this.$route && this.$route.path) {
        let matchingRoute = this.children.find(c =>
            this.$route.path.startsWith(c.link.path)
        );
        if (matchingRoute !== undefined) {
          return true;
        }
      }
      return false;
    }
  },
  methods: {
    addChild(item) {
      const index = this.$slots.default.indexOf(item.$vnode);
      this.children.splice(index, 0, item);
    },
    removeChild(item) {
      const tabs = this.children;
      const index = tabs.indexOf(item);
      tabs.splice(index, 1);
    },
    elementType(link, isParent = true) {
      if (link.isRoute === false) {
        return isParent ? 'li' : 'a';
      } else {
        return 'nuxt-link';
      }
    },
    linkAbbreviation(name) {
      const matches = name.match(/\b(\w)/g);
      return matches.join('');
    },
    linkClick() {
      if (
          this.autoClose &&
          this.$sidebar &&
          this.$sidebar.showSidebar === true
      ) {
        this.$sidebar.displaySidebar(false);
      }
    },
    collapseMenu() {
      this.collapsed = !this.collapsed;
    },
    collapseSubMenu(link) {
      link.collapsed = !link.collapsed;
    }
  },
  mounted() {
    if (this.addLink) {
      this.addLink(this);
    }
    if (this.link.collapsed !== undefined) {
      this.collapsed = this.link.collapsed;
    }
    if (this.isActive && this.isMenu) {
      this.collapsed = false;
    }
  },
  destroyed() {
    if (this.$el && this.$el.parentNode) {
      this.$el.parentNode.removeChild(this.$el);
    }
    if (this.removeLink) {
      this.removeLink(this);
    }
  }
};
</script>
<style lang="scss" scoped>
.sidebar-menu-item {
  cursor: pointer;
}

.collapse {
  a.active {
    font-weight: 600;

    &::before {
      visibility: hidden;
      opacity: 0;
    }
  }
}

.sidebar-mini-icon {
  opacity: 0;
  visibility: hidden;
  text-transform: uppercase;
  width: 34px;
  margin-right: 10px;
  margin-left: 0;
  font-size: 12px;
  text-align: center;
  position: relative;
  float: left;
  z-index: 1;
  display: inherit;
  line-height: 1.2rem;
  color: hsla(0, 0%, 100%, .8);
}

.sidebar-normal {
  line-height: 1.2rem;
}

</style>
