<script setup lang="ts">
import { computed } from 'vue'
import noImage from '../assets/no-image.png';

interface Props {
  imageSrc: string
}
const imageSrc = computed(() => {
  if (props.imageSrc) {
    return 'something'
  }
  return noImage
})
const props = defineProps<Props>()
</script>

<template>
  <v-img
    :width="300"
    aspect-ratio="16/9"
    cover
    :src="imageSrc"
  ></v-img>
</template>

<style scoped>

</style>
