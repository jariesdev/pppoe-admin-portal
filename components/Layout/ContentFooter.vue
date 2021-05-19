<template>
  <footer class="footer">
    <div class="container-fluid">
      <div class="copyright">
        &copy; {{ year }}, all rights reserved.
      </div>
    </div>
  </footer>
</template>
<script>
export default {
  data() {
    return {
      year: new Date().getFullYear()
    };
  }
};
</script>
<style></style>
