<template>
  <div class="ap-dashboard">
    <div class="row status-widgets">
      <div class="col-xl-6">
        <card>
          <div v-if="currentAccessPoint" class="ap-details border-bottom border-dark mb-3">
            <h5>Access Point Details</h5>
            <el-row :gutter="15" class="flex-wrap mb-3" type="flex">
              <el-col :lg="8" class="mb-2">
                <p>
                  AP Name: <strong>{{ currentAccessPoint.ap_name || '-' }}</strong>
                </p>
              </el-col>
              <el-col :lg="8" class="mb-2">
                <p>
                  AP Address: <strong>{{ currentAccessPoint.ap_address || '-' }}{{ currentAccessPoint.ap_port ? `:${currentAccessPoint.ap_port}`: '' }}</strong>
                </p>
              </el-col>
            </el-row>
          </div>
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
        <system-information :access-point-id="selectedAccessPoint" :nas-id="nasId" />
      </div>
      <div class="col-xl-12 col-xl-6">
        <traffic-chart3 :access-point-id="selectedAccessPoint" :nas-id="nasId" />
      </div>
      <div class="col-lg-6 col-xl-4">
        <dhcp-connected :access-point-id="selectedAccessPoint" :nas-id="nasId" />
      </div>
      <div class="col-lg-6 col-xl-4">
        <hotspot-connected :access-point-id="selectedAccessPoint" :nas-id="nasId" />
      </div>
      <div class="col-lg-6 col-xl-4">
        <router-firmware :access-point-id="selectedAccessPoint" :nas-id="nasId" />
      </div>
      <div class="col-lg-6 col-xl-4">
        <router-clock :access-point-id="selectedAccessPoint" :nas-id="nasId" />
      </div>
      <div class="col-lg-6 col-xl-4">
        <tr-client :access-point-id="selectedAccessPoint" :nas-id="nasId" />
      </div>
      <div class="col-lg-6 col-xl-4">
        <caps-man :access-point-id="selectedAccessPoint" :nas-id="nasId" />
      </div>
      <div class="col-xl-12">
        <nas-interfaces :access-point-id="selectedAccessPoint" :nas-id="nasId" />
      </div>
      <div class="col-12 m-0" />
      <div class="col-lg-6 col-xl-4">
        <system-temperature :access-point-id="selectedAccessPoint" :nas-id="nasId" />
      </div>
      <div class="col-lg-6 col-xl-4">
        <radius-setup :nas-id="nasId" />
      </div>
      <div class="col-lg-6 col-xl-4">
        <pppoe-service :nas-id="nasId" />
      </div>
    </div>
  </div>
</template>

<script>
import SystemInformation from '~/components/Content/NAS/Widgets/SystemInformation'
import SystemTemperature from '~/components/Content/NAS/Widgets/SystemTemperature'
import DhcpConnected from '~/components/Content/NAS/Widgets/DhcpConnected'
import RouterFirmware from '~/components/Content/NAS/Widgets/RouterFirmware'
import RouterClock from '~/components/Content/NAS/Widgets/RouterClock'
import TrClient from '~/components/Content/NAS/Widgets/TrClient'
import NasInterfaces from '~/components/Content/NAS/Widgets/NasInterfaces'
import CapsMan from '~/components/Content/NAS/Widgets/CapsMan'
import HotspotConnected from '~/components/Content/NAS/Widgets/HotspotConnected'
import RadiusSetup from '~/components/Content/NAS/Widgets/RadiusSetup'
import TrafficChart3 from '~/components/Content/NAS/Widgets/TrafficChart3'
import PppoeService from '~/components/Content/NAS/Widgets/PppoeService'

export default {
  name: 'ApDashboard',
  components: {
    PppoeService,
    TrafficChart3,
    RadiusSetup,
    HotspotConnected,
    CapsMan,
    NasInterfaces,
    TrClient,
    RouterClock,
    RouterFirmware,
    DhcpConnected,
    SystemTemperature,
    SystemInformation
  },
  async asyncData ({ store, route }) {
    const nasId = +route.params.id
    let accessPoints, nas
    try {
      nas = await store.dispatch('nas/get', nasId)
      accessPoints = await store.dispatch('nas/getNasAccessPoints', nasId)
    } catch (e) {
      nas = {}
      accessPoints = []
    }

    return {
      nasId,
      nas,
      accessPoints
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
  created () {
    if (this.accessPoints.length > 0 && this.$route.query.id) {
      this.selectedAccessPoint = +(this.$route.query.id)
    } else if (this.accessPoints.length > 0) {
      this.selectedAccessPoint = this.accessPoints[0].id
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
