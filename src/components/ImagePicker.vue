<template>
  <ScrollView
    orientation="vertical"
    height="100%"
    row="0"
    style="margin: 0; padding: 0"
  >
    <ListView for="src in imgSources" style="margin: 0; padding: 0">
      <v-template>
        <Image
          :src="src"
          margin="0"
          height="300"
          stretch="aspectFill"
          @tap="onImageTapped(src)"
        />
      </v-template>
    </ListView>
  </ScrollView>
</template>

<script lang="ts">
import { EventData, ScrollView, StackLayout } from "@nativescript/core";

export default {
  components: {},
  props: {
    imgSources: {
      required: true,
      type: Array,
    },
  },

  methods: {
    getThumbnail(src: string) {
      return android.media.ThumbnailUtils.extractThumbnail(
        android.graphics.BitmapFactory.decodeFile(src),
        200,
        200
      );
    },
    onImageTapped(path: string) {
      this.$emit("imageTapped", path);
    },
  },

  data() {
    return {};
  },
};
</script>

<style scoped>
.img-tile {
  margin-top: 15px;
}
</style>
