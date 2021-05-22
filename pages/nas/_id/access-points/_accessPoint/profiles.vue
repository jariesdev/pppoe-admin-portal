<template>
  <div>
    <NasProfiles :access-point-id="accessPointId" :nas-id="nasId" />
    <card>
      <base-button @click="$router.back()">
        Back
      </base-button>
    </card>
  </div>
</template>

<script>
import NasProfiles from '~/components/Content/NAS/Widgets/NasProfiles'

export default {
  components: { NasProfiles },
  data () {
    return {
      nasId: null,
      accessPointId: null
    }
  },
  head () {
    return {
      title: 'NAS Profiles'
    }
  },
  created () {
    this.nasId = parseInt(this.$route.params.id)
    this.accessPointId = parseInt(this.$route.params.accessPoint)
  }
}
</script>
