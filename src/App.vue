<template>
  <div>
    <div class="links">
      <router-link to="/transfer">穿梭框</router-link>
      <router-link to="/horizontal-calendar">横向日历</router-link>
    </div>
    <router-view></router-view>
  </div>
</template>
<script setup></script>
<style scoped lang="less">
.links {
  display: flex;
  gap: 20px;
  margin-bottom: 30px;
}
</style>
