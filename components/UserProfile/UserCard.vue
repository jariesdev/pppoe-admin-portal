<template>
  <card class="card-user">
    <p class="card-text"></p>
    <div class="author">
      <div class="block block-one"></div>
      <div class="block block-two"></div>
      <div class="block block-three"></div>
      <div class="block block-four"></div>
      <a href="javascript:void(0)">
        <img class="avatar" src="img/default-avatar-2.jpg" alt="..." />
        <h5 class="title">{{ $auth.user.name }}</h5>
      </a>
      <p class="description">Employee / User</p>
    </div>
    <p></p>
    <div class="card-description"></div>

    <div slot="footer" class="button-container">
<!--      <base-button class="btn-facebook" icon round>
        <i class="fab fa-facebook"></i>
      </base-button>
      <base-button class="btn-twitter" icon round>
        <i class="fab fa-twitter"></i>
      </base-button>
      <base-button class="btn-google" icon round>
        <i class="fab fa-google-plus"></i>
      </base-button>-->
    </div>
  </card>
</template>
<script>
export default {};
</script>
<style></style>
