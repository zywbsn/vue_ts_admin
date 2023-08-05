<template>
  <div>
    detail
  </div>
</template>

<script setup lang="ts">
import { useRouter,useRoute } from "vue-router";
const router = useRouter();
const route = useRoute();

console.log("router",router);
console.log("route",route.query);

</script>

<style scoped></style>