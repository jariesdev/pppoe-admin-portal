<template>
  <div>
    <NasProfiles :access-point-id="accessPointId" :nas-id="nasId"/>
    <card>
      <base-button @click="$router.back()">Back</base-button>
    </card>
  </div>
</template>

<script>
import NasProfiles from "~/components/Content/NAS/AccessPoint/NasProfiles";

export default {
  components: {NasProfiles},
  data() {
    return {
      nasId: null,
      accessPointId: null,
    }
  },
  created() {
    this.nasId = parseInt(this.$route.params.id)
    this.accessPointId = parseInt(this.$route.params.accessPoint)
  },
  head() {
    return {
      title: 'NAS Profiles'
    }
  }
}
</script>
