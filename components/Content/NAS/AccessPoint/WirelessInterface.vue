<template>
  <card>
    <h5>Wireless Interface</h5>
    <div v-if="tableData.length > 0" class="table-responsive">
      <table class="table table-sm table-hover">
        <thead>
        <tr>
          <th>default name</th>
          <th>name</th>
          <th>mtu</th>
          <th>mac address</th>
          <th>band</th>
          <th>wireless protocol</th>
          <th>rate set</th>
          <th>tx power mode</th>
          <th>security profile</th>
          <th>wps mode</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="data in tableData">
          <td>
            <a href="" @click.prevent="()=>showRowModalId = data['.id']">{{ data['name'] }}</a>
            <el-dialog :visible="showRowModalId === data['.id']" title="Wireless Interface" :before-close="()=>showRowModalId=null" width="70%">
              <div class="row">
                <div class="col-12 col-lg-6 col-xl-3">
                  <p>
                    ID: <strong>{{ data['.id'] }}</strong>
                  </p>
                </div>
                <div class="col-12 col-lg-6 col-xl-3">
                  <p>
                    Default name: <strong>{{ data['default-name'] }}</strong>
                  </p>
                </div>
                <div class="col-12 col-lg-6 col-xl-3">
                  <p>
                    Name: <strong>{{ data['name'] }}</strong>
                  </p>
                </div>
                <div class="col-12 col-lg-6 col-xl-3">
                  <p>
                    MTU: <strong>{{ data['mtu'] }}</strong>
                  </p>
                </div>
                <div class="col-12 col-lg-6 col-xl-3">
                  <p>
                    L2 MTU: <strong>{{ data['l2mtu'] }}</strong>
                  </p>
                </div>
                <div class="col-12 col-lg-6 col-xl-3">
                  <p>
                    Mac address: <strong>{{ data['mac-address'] }}</strong>
                  </p>
                </div>
                <div class="col-12 col-lg-6 col-xl-3">
                  <p>
                    ARP: <strong>{{ data['arp'] }}</strong>
                  </p>
                </div>
                <div class="col-12 col-lg-6 col-xl-3">
                  <p>
                    ARP timeout: <strong>{{ data['arp-timeout'] }}</strong>
                  </p>
                </div>
                <div class="col-12 col-lg-6 col-xl-3">
                  <p>
                    Disable running check: <strong>{{ data['disable-running-check'] }}</strong>
                  </p>
                </div>
                <div class="col-12 col-lg-6 col-xl-3">
                  <p>
                    Interface type: <strong>{{ data['interface-type'] }}</strong>
                  </p>
                </div>
                <div class="col-12 col-lg-6 col-xl-3">
                  <p>
                    Radio name: <strong>{{ data['radio-name'] }}</strong>
                  </p>
                </div>
                <div class="col-12 col-lg-6 col-xl-3">
                  <p>
                    Mode: <strong>{{ data['mode'] }}</strong>
                  </p>
                </div>
                <div class="col-12 col-lg-6 col-xl-3">
                  <p>
                    SSID: <strong>{{ data['ssid'] }}</strong>
                  </p>
                </div>
                <div class="col-12 col-lg-6 col-xl-3">
                  <p>
                    Area: <strong>{{ data['area'] }}</strong>
                  </p>
                </div>
                <div class="col-12 col-lg-6 col-xl-3">
                  <p>
                    Frequency mode: <strong>{{ data['frequency-mode'] }}</strong>
                  </p>
                </div>
                <div class="col-12 col-lg-6 col-xl-3">
                  <p>
                    Country: <strong>{{ data['country'] }}</strong>
                  </p>
                </div>
                <div class="col-12 col-lg-6 col-xl-3">
                  <p>
                    Installation: <strong>{{ data['installation'] }}</strong>
                  </p>
                </div>
                <div class="col-12 col-lg-6 col-xl-3">
                  <p>
                    Antenna gain: <strong>{{ data['antenna-gain'] }}</strong>
                  </p>
                </div>
                <div class="col-12 col-lg-6 col-xl-3">
                  <p>
                    Frequency: <strong>{{ data['frequency'] }}</strong>
                  </p>
                </div>
                <div class="col-12 col-lg-6 col-xl-3">
                  <p>
                    Band: <strong>{{ data['band'] }}</strong>
                  </p>
                </div>
                <div class="col-12 col-lg-6 col-xl-3">
                  <p>
                    Channel width: <strong>{{ data['channel-width'] }}</strong>
                  </p>
                </div>
                <div class="col-12 col-lg-6 col-xl-3">
                  <p>
                    Secondary channel: <strong>{{ data['secondary-channel'] }}</strong>
                  </p>
                </div>
                <div class="col-12 col-lg-6 col-xl-3">
                  <p>
                    Scan list: <strong>{{ data['scan-list'] }}</strong>
                  </p>
                </div>
                <div class="col-12 col-lg-6 col-xl-3">
                  <p>
                    Wireless protocol: <strong>{{ data['wireless-protocol'] }}</strong>
                  </p>
                </div>
                <div class="col-12 col-lg-6 col-xl-3">
                  <p>
                    Rate set: <strong>{{ data['rate-set'] }}</strong>
                  </p>
                </div>
                <div class="col-12 col-lg-6 col-xl-3">
                  <p>
                    Supported rates B: <strong>{{ data['supported-rates-b'] }}</strong>
                  </p>
                </div>
                <div class="col-12 col-lg-6 col-xl-3">
                  <p>
                    Supported-rates-a/g: <strong>{{ data['supported-rates-a\/g'] }}</strong>
                  </p>
                </div>
                <div class="col-12 col-lg-6 col-xl-3">
                  <p>
                    Basic rates B: <strong>{{ data['basic-rates-b'] }}</strong>
                  </p>
                </div>
                <div class="col-12 col-lg-6 col-xl-3">
                  <p>
                    Basic rates a/g: <strong>{{ data['basic-rates-a\/g'] }}</strong>
                  </p>
                </div>
                <div class="col-12 col-lg-6 col-xl-3">
                  <p>
                    Max Station Count: <strong>{{ data['max-station-count'] }}</strong>
                  </p>
                </div>
                <div class="col-12 col-lg-6 col-xl-3">
                  <p>
                    Distance: <strong>{{ data['distance'] }}</strong>
                  </p>
                </div>
                <div class="col-12 col-lg-6 col-xl-3">
                  <p>
                    Tx power mode: <strong>{{ data['tx-power-mode'] }}</strong>
                  </p>
                </div>
                <div class="col-12 col-lg-6 col-xl-3">
                  <p>
                    VLan mode: <strong>{{ data['vlan-mode'] }}</strong>
                  </p>
                </div>
                <div class="col-12 col-lg-6 col-xl-3">
                  <p>
                    VLan id: <strong>{{ data['vlan-id'] }}</strong>
                  </p>
                </div>
                <div class="col-12 col-lg-6 col-xl-3">
                  <p>
                    WDS mode: <strong>{{ data['wds-mode'] }}</strong>
                  </p>
                </div>
                <div class="col-12 col-lg-6 col-xl-3">
                  <p>
                    WDS default bridge: <strong>{{ data['wds-default-bridge'] }}</strong>
                  </p>
                </div>
                <div class="col-12 col-lg-6 col-xl-3">
                  <p>
                    WDS default cost: <strong>{{ data['wds-default-cost'] }}</strong>
                  </p>
                </div>
                <div class="col-12 col-lg-6 col-xl-3">
                  <p>
                    WDS cost range: <strong>{{ data['wds-cost-range'] }}</strong>
                  </p>
                </div>
                <div class="col-12 col-lg-6 col-xl-3">
                  <p>
                    WDS ignore ssid: <strong>{{ data['wds-ignore-ssid'] }}</strong>
                  </p>
                </div>
                <div class="col-12 col-lg-6 col-xl-3">
                  <p>
                    Update stats interval: <strong>{{ data['update-stats-interval'] }}</strong>
                  </p>
                </div>
                <div class="col-12 col-lg-6 col-xl-3">
                  <p>
                    Bridge mode: <strong>{{ data['bridge-mode'] }}</strong>
                  </p>
                </div>
                <div class="col-12 col-lg-6 col-xl-3">
                  <p>
                    Default authentication: <strong>{{ data['default-authentication'] }}</strong>
                  </p>
                </div>
                <div class="col-12 col-lg-6 col-xl-3">
                  <p>
                    Default forwarding: <strong>{{ data['default-forwarding'] }}</strong>
                  </p>
                </div>
                <div class="col-12 col-lg-6 col-xl-3">
                  <p>
                    Default ap-tx-limit: <strong>{{ data['default-ap-tx-limit'] }}</strong>
                  </p>
                </div>
                <div class="col-12 col-lg-6 col-xl-3">
                  <p>
                    Default client-tx-limit: <strong>{{ data['default-client-tx-limit'] }}</strong>
                  </p>
                </div>
                <div class="col-12 col-lg-6 col-xl-3">
                  <p>
                    WMM support: <strong>{{ data['wmm-support'] }}</strong>
                  </p>
                </div>
                <div class="col-12 col-lg-6 col-xl-3">
                  <p>
                    Hide ssid: <strong>{{ data['hide-ssid'] }}</strong>
                  </p>
                </div>
                <div class="col-12 col-lg-6 col-xl-3">
                  <p>
                    Security profile: <strong>{{ data['security-profile'] }}</strong>
                  </p>
                </div>
                <div class="col-12 col-lg-6 col-xl-3">
                  <p>
                    Interworking profile: <strong>{{ data['interworking-profile'] }}</strong>
                  </p>
                </div>
                <div class="col-12 col-lg-6 col-xl-3">
                  <p>
                    WPS mode: <strong>{{ data['wps-mode'] }}</strong>
                  </p>
                </div>
                <div class="col-12 col-lg-6 col-xl-3">
                  <p>
                    Station roaming: <strong>{{ data['station-roaming'] }}</strong>
                  </p>
                </div>
                <div class="col-12 col-lg-6 col-xl-3">
                  <p>
                    Disconnect timeout: <strong>{{ data['disconnect-timeout'] }}</strong>
                  </p>
                </div>
                <div class="col-12 col-lg-6 col-xl-3">
                  <p>
                    On-fail-retry-time: <strong>{{ data['on-fail-retry-time'] }}</strong>
                  </p>
                </div>
                <div class="col-12 col-lg-6 col-xl-3">
                  <p>
                    Preamble-mode: <strong>{{ data['preamble-mode'] }}</strong>
                  </p>
                </div>
                <div class="col-12 col-lg-6 col-xl-3">
                  <p>
                    Compression: <strong>{{ data['compression'] }}</strong>
                  </p>
                </div>
                <div class="col-12 col-lg-6 col-xl-3">
                  <p>
                    Allow sharedkey: <strong>{{ data['allow-sharedkey'] }}</strong>
                  </p>
                </div>
                <div class="col-12 col-lg-6 col-xl-3">
                  <p>
                    Station bridge-clone-mac: <strong>{{ data['station-bridge-clone-mac'] }}</strong>
                  </p>
                </div>
                <div class="col-12 col-lg-6 col-xl-3">
                  <p>
                    AMPDU priorities: <strong>{{ data['ampdu-priorities'] }}</strong>
                  </p>
                </div>
                <div class="col-12 col-lg-6 col-xl-3">
                  <p>
                    Guard interval: <strong>{{ data['guard-interval'] }}</strong>
                  </p>
                </div>
                <div class="col-12 col-lg-6 col-xl-3">
                  <p>
                    ht supported-mcs: <strong>{{ data['ht-supported-mcs'] }}</strong>
                  </p>
                </div>
                <div class="col-12 col-lg-6 col-xl-3">
                  <p>
                    ht basic-mcs: <strong>{{ data['ht-basic-mcs'] }}</strong>
                  </p>
                </div>
                <div class="col-12 col-lg-6 col-xl-3">
                  <p>
                    tx-chains: <strong>{{ data['tx-chains'] }}</strong>
                  </p>
                </div>
                <div class="col-12 col-lg-6 col-xl-3">
                  <p>
                    rx-chains: <strong>{{ data['rx-chains'] }}</strong>
                  </p>
                </div>
                <div class="col-12 col-lg-6 col-xl-3">
                  <p>
                    amsdu-limit: <strong>{{ data['amsdu-limit'] }}</strong>
                  </p>
                </div>
                <div class="col-12 col-lg-6 col-xl-3">
                  <p>
                    amsdu-threshold: <strong>{{ data['amsdu-threshold'] }}</strong>
                  </p>
                </div>
                <div class="col-12 col-lg-6 col-xl-3">
                  <p>
                    tdma-period-size: <strong>{{ data['tdma-period-size'] }}</strong>
                  </p>
                </div>
                <div class="col-12 col-lg-6 col-xl-3">
                  <p>
                    nv2-queue-count: <strong>{{ data['nv2-queue-count'] }}</strong>
                  </p>
                </div>
                <div class="col-12 col-lg-6 col-xl-3">
                  <p>
                    nv2-qos: <strong>{{ data['nv2-qos'] }}</strong>
                  </p>
                </div>
                <div class="col-12 col-lg-6 col-xl-3">
                  <p>
                    nv2-cell-radius: <strong>{{ data['nv2-cell-radius'] }}</strong>
                  </p>
                </div>
                <div class="col-12 col-lg-6 col-xl-3">
                  <p>
                    nv2-security: <strong>{{ data['nv2-security'] }}</strong>
                  </p>
                </div>
                <div class="col-12 col-lg-6 col-xl-3">
                  <p>
                    nv2-preshared-key: <strong>{{ data['nv2-preshared-key'] }}</strong>
                  </p>
                </div>
                <div class="col-12 col-lg-6 col-xl-3">
                  <p>
                    nv2-mode: <strong>{{ data['nv2-mode'] }}</strong>
                  </p>
                </div>
                <div class="col-12 col-lg-6 col-xl-3">
                  <p>
                    nv2-downlink-ratio: <strong>{{ data['nv2-downlink-ratio'] }}</strong>
                  </p>
                </div>
                <div class="col-12 col-lg-6 col-xl-3">
                  <p>
                    nv2-sync-secret: <strong>{{ data['nv2-sync-secret'] }}</strong>
                  </p>
                </div>
                <div class="col-12 col-lg-6 col-xl-3">
                  <p>
                    hw-retries: <strong>{{ data['hw-retries'] }}</strong>
                  </p>
                </div>
                <div class="col-12 col-lg-6 col-xl-3">
                  <p>
                    frame-lifetime: <strong>{{ data['frame-lifetime'] }}</strong>
                  </p>
                </div>
                <div class="col-12 col-lg-6 col-xl-3">
                  <p>
                    adaptive-noise-immunity: <strong>{{ data['adaptive-noise-immunity'] }}</strong>
                  </p>
                </div>
                <div class="col-12 col-lg-6 col-xl-3">
                  <p>
                    hw-fragmentation-threshold: <strong>{{ data['hw-fragmentation-threshold'] }}</strong>
                  </p>
                </div>
                <div class="col-12 col-lg-6 col-xl-3">
                  <p>
                    hw-protection-mode: <strong>{{ data['hw-protection-mode'] }}</strong>
                  </p>
                </div>
                <div class="col-12 col-lg-6 col-xl-3">
                  <p>
                    hw-protection-threshold: <strong>{{ data['hw-protection-threshold'] }}</strong>
                  </p>
                </div>
                <div class="col-12 col-lg-6 col-xl-3">
                  <p>
                    frequency-offset: <strong>{{ data['frequency-offset'] }}</strong>
                  </p>
                </div>
                <div class="col-12 col-lg-6 col-xl-3">
                  <p>
                    rate-selection: <strong>{{ data['rate-selection'] }}</strong>
                  </p>
                </div>
                <div class="col-12 col-lg-6 col-xl-3">
                  <p>
                    multicast-helper: <strong>{{ data['multicast-helper'] }}</strong>
                  </p>
                </div>
                <div class="col-12 col-lg-6 col-xl-3">
                  <p>
                    multicast-buffering: <strong>{{ data['multicast-buffering'] }}</strong>
                  </p>
                </div>
                <div class="col-12 col-lg-6 col-xl-3">
                  <p>
                    keepalive-frames: <strong>{{ data['keepalive-frames'] }}</strong>
                  </p>
                </div>
                <div class="col-12 col-lg-6 col-xl-3">
                  <p>
                    skip-dfs-channels: <strong>{{ data['skip-dfs-channels'] }}</strong>
                  </p>
                </div>
                <div class="col-12 col-lg-6 col-xl-3">
                  <p>
                    running: <strong>{{ data['running'] }}</strong>
                  </p>
                </div>
                <div class="col-12 col-lg-6 col-xl-3">
                  <p>
                    disabled: <strong>{{ data['disabled'] }}</strong>
                  </p>
                </div>
              </div>
            </el-dialog>
          </td>
          <td>{{ data['name'] }}</td>
          <td>{{ data['mtu'] }}</td>
          <td>{{ data['mac-address'] }}</td>
          <td>{{ data['band'] }}</td>
          <td>{{ data['wireless-protocol'] }}</td>
          <td>{{ data['rate-set'] }}</td>
          <td>{{ data['tx-power-mode'] }}</td>
          <td>{{ data['security-profile'] }}</td>
          <td>{{ data['wps-mode'] }}</td>
        </tr>
        </tbody>
      </table>
    </div>
    <p v-else class="font-italic">
      No Information yet.
    </p>
  </card>
</template>

<script>
export default {
  name: 'WirelessInterface',
  props: {
    nasId: {
      type: Number,
      required: true
    },
    accessPointId: {
      type: Number,
      required: true
    }
  },
  fetch() {
    this.$axios.$get(`/api/nas/${this.nasId}/accesspoints/${this.accessPointId}/wireless-interface`)
        .then(({data}) => {
          this.tableData = data
        })
        .catch(() => null)
  },
  data() {
    return {
      tableData: [],
      showRowModalId: null
    }
  },
  watch: {
    accessPointId(){
      this.$fetch()
    },
    nasId(){
      this.$fetch()
    }
  }
}
</script>
