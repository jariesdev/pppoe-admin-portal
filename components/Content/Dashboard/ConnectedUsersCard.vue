<template>
  <card card-body-classes="table-full-width">
    <template slot="header" class="d-inline">
      <h6 class="title d-inline">
        Connected User
      </h6>

      <base-dropdown
        class="float-right"
        menu-on-right=""
        tag="div"
        title-classes="btn btn-link btn-icon"
      >
        <i slot="title" class="tim-icons icon-settings-gear-63" />
        <a class="dropdown-item" href="" @click.prevent="resetCountdownAndReload()"> Refresh </a>
      </base-dropdown>
    </template>
    <ConnectedUsers ref="connectedUsers" />
  </card>
</template>
<script>
import ConnectedUsers from '~/components/Content/Statistics/ConnectedUsers'
import intervals from '~/mixins/intervals'

export default {
  name: 'ConnectedUsersCard',
  components: { ConnectedUsers },
  mixins: [intervals],
  data () {
    return {
      refreshCountdown: 0,
      counterInterval: null
    }
  },
  computed: {
    remainingTimeFormat () {
      if (this.refreshCountdown > 60) {
        const sec = this.refreshCountdown % 60
        return Math.floor(this.refreshCountdown / 60) + ':' + String(sec).padStart(2, '0')
      } else {
        return String(this.refreshCountdown).padStart(2, '0') + 's'
      }
    }
  },
  mounted () {
    this.setInterval(this.decreaseCountdownTime, 1000)
  },
  methods: {
    reloadTable () {
      if (this.$refs.connectedUsers) {
        this.$refs.connectedUsers.reloadTable()
      }
    },
    decreaseCountdownTime () {
      if (this.refreshCountdown === 0) {
        this.reloadTable()
        this.resetCountdown()
      }
      this.refreshCountdown -= 1
    },
    resetCountdown () {
      this.refreshCountdown = 30
    },
    resetCountdownAndReload () {
      this.reloadTable()
      this.resetCountdown()
    }
  }
}
</script>
