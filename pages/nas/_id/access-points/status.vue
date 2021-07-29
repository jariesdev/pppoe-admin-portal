<template>
  <div class="ap-dashboard">
    <div class="row status-widgets">
      <div class="col-xl-6">
        <card>
          <div v-if="nas" class="nas-details">
            <div class="d-flex align-items-baseline">
              <h5 class="mr-2">
                NAS Details
              </h5>
              <div>
                <nuxt-link :to="`/nas/${nasId}`" class="small">
                  more
                </nuxt-link>
              </div>
            </div>
            <el-row :gutter="15" class="flex-wrap mb-3" type="flex">
              <el-col :lg="8" class="mb-2">
                <p>
                  Alias: <strong>{{ nas.shortname }}</strong>
                </p>
              </el-col>
              <el-col :lg="8" class="mb-2">
                <p>
                  Name: <strong>{{ nas.nasname }}</strong>
                </p>
              </el-col>
              <el-col :lg="8" class="mb-2">
                <p>
                  Type: <strong>{{ nas.type || '-' }}</strong>
                </p>
              </el-col>
              <el-col :lg="8" class="mb-2">
                <p>
                  Ports: <strong>{{ nas.ports || '-' }}</strong>
                </p>
              </el-col>
              <el-col :lg="8" class="mb-2">
                <p>
                  Secret: <strong>{{ nas.secret || '-' }}</strong>
                </p>
              </el-col>
              <el-col :lg="8" class="mb-2">
                <p>
                  Server: <strong>{{ nas.server || '-' }}</strong>
                </p>
              </el-col>
              <el-col :lg="8" class="mb-2">
                <p>
                  Community: <strong>{{ nas.community || '-' }}</strong>
                </p>
              </el-col>
              <el-col :lg="8" class="mb-2">
                <p>
                  Description: <strong>{{ nas.description || '-' }}</strong>
                </p>
              </el-col>
            </el-row>
          </div>
        </card>
      </div>
      <div class="col-xl-6">
        <system-information :nas-id="nasId" />
      </div>
      <div class="col-xl-12 col-xl-6">
        <traffic-chart3 :access-point-id="selectedAccessPoint" :nas-id="nasId" />
      </div>
      <div class="col-lg-6 col-xl-4">
        <router-firmware :nas-id="nasId" />
      </div>
      <div class="col-lg-6 col-xl-4">
        <router-clock :nas-id="nasId" />
      </div>
      <div class="col-xl-12">
        <nas-interfaces :nas-id="nasId" />
      </div>
      <div class="col-12 m-0" />
      <div class="col-lg-6 col-xl-4">
        <system-temperature :nas-id="nasId" />
      </div>
      <div class="col-lg-6 col-xl-4">
        <radius-setup :nas-id="nasId" />
      </div>
      <div class="col-lg-6 col-xl-4">
        <pppoe-service :nas-id="nasId" />
      </div>
      <div class="col-lg-6 col-xl-6">
        <address-pools :nas-id="nasId" />
      </div>
      <div class="col-lg-6 col-xl-6">
        <pppoe-profiles :nas-id="nasId" />
      </div>
    </div>
  </div>
</template>

<script>
import SystemInformation from '~/components/Content/NAS/Widgets/SystemInformation'
import SystemTemperature from '~/components/Content/NAS/Widgets/SystemTemperature'
import RouterFirmware from '~/components/Content/NAS/Widgets/RouterFirmware'
import RouterClock from '~/components/Content/NAS/Widgets/RouterClock'
import NasInterfaces from '~/components/Content/NAS/Widgets/NasInterfaces'
import RadiusSetup from '~/components/Content/NAS/Widgets/RadiusSetup'
import TrafficChart3 from '~/components/Content/NAS/Widgets/TrafficChart3'
import PppoeService from '~/components/Content/NAS/Widgets/PppoeService'
import AddressPools from '~/components/Content/NAS/Widgets/AddressPools'
import PppoeProfiles from '~/components/Content/NAS/Widgets/PppoeProfiles'

export default {
  name: 'ApDashboard',
  components: {
    PppoeProfiles,
    AddressPools,
    PppoeService,
    TrafficChart3,
    RadiusSetup,
    NasInterfaces,
    RouterClock,
    RouterFirmware,
    SystemTemperature,
    SystemInformation
  },
  async asyncData ({ store, route }) {
    const nasId = +route.params.id
    let nas
    try {
      nas = await store.dispatch('nas/get', nasId)
    } catch (e) {
      nas = {}
    }

    return {
      nasId,
      nas
    }
  },
  data () {
    return {
      selectedAccessPoint: null,
      currentAccessPoint: null
    }
  },
  head () {
    return {
      title: 'NAS Access Points'
    }
  },
  mounted () {
    this.loadActiveAccessPointDetails()
  },
  methods: {
    loadActiveAccessPointDetails () {
      this.$store.dispatch('access-point/get', { nasId: this.nasId, id: this.selectedAccessPoint })
        .then((data) => {
          this.currentAccessPoint = data
        })
        .catch(() => {
          this.$notify({
            type: 'danger',
            message: 'No selected access point'
          })
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.ap-dashboard {
  position: relative;
}

.access-point-select {
  position: sticky;
}
.status-widgets {
  & > div {
    margin-bottom: 30px;

    & > .card {
      height: 100%;
      margin: 0;
    }
  }
}
</style>
