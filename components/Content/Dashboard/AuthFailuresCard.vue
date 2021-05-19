<template>
  <card card-body-classes="table-full-width">
    <template slot="header" class="d-inline">
      <h6 class="title d-inline">Auth Failures</h6>
      <p class="card-category d-inline">{{ remainingTimeFormat }}</p>

      <base-dropdown
          class="float-right"
          menu-on-right=""
          tag="div"
          title-classes="btn btn-link btn-icon"
      >
        <i slot="title" class="tim-icons icon-settings-gear-63"></i>
        <a class="dropdown-item" href="" @click.prevent="resetCountdownAndReload()"> Refresh </a>
      </base-dropdown>
    </template>
    <AuthFailures ref="authFailure"/>
  </card>
</template>
<script>
import AuthFailures from "~/components/Content/Statistics/AuthFailures";
import intervals from "~/mixins/intervals";

export default {
  name: 'AuthFailuresCard',
  components: {AuthFailures},
  mixins: [intervals],
  data() {
    return {
      refreshCountdown: 0
    }
  },
  computed: {
    remainingTimeFormat() {
      if (this.refreshCountdown > 60) {
        const sec = this.refreshCountdown % 60
        return Math.floor(this.refreshCountdown / 60) + ':' + String(sec).padStart(2, '0')
      } else {
        return String(this.refreshCountdown).padStart(2, '0') + 's'
      }
    }
  },
  mounted() {
    this.setInterval(this.decreaseCountdownTime, 1000)
  },
  methods: {
    reloadTable() {
      if(this.$refs['authFailure']){
        this.$refs['authFailure'].reloadTable()
      }
    },
    decreaseCountdownTime() {
      if (this.refreshCountdown === 0) {
        this.reloadTable()
        this.resetCountdown()
      }
      this.refreshCountdown -= 1
    },
    resetCountdown() {
      this.refreshCountdown = 10 * 60
    },
    resetCountdownAndReload() {
      this.reloadTable()
      this.resetCountdown()
    }
  }
}
</script>
