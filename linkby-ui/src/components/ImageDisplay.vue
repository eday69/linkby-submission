<script setup lang="ts">
import { computed } from 'vue'
import noImage from '../assets/no-image.png';
import type { IImage } from '@/stores/product'


interface Props {
  image: IImage | undefined
  width: string
  height: string
}
const imageSrc = computed(() => {
  if (props.image) {
    return `data:${props.image.imageType};base64, ${props.image.imageData}`
  }
  return noImage
})
const props = defineProps<Props>()
</script>

<template>
  <v-img
    :width="width"
    :height="height"
    aspect-ratio="1"
    class="image"
    cover
    :src="imageSrc"
  ></v-img>
</template>

<style scoped>
.image {
  border: 1px solid lightgrey;
}
</style>
