<template>
  <GridLayout rows="*" height="100%">
    <!-- <ScrollView orientation="vertical" height="100%" row="0">
      <StackLayout>
        <Image
          :src="img_src"
          stretch="aspectFill"
          class="img-tile"
          width="100%"
          v-for="img_src in imgSources"
          :key="img_src"
        ></Image>
      </StackLayout>
    </ScrollView> -->
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
            width="100%"
            stretch="aspectFill"
            @tap="onImageTapped(src)"
          />
        </v-template>
      </ListView>
    </ScrollView>
    <!-- <Fab
      row="0"
      icon="~/assets/icons/camera_shutter.png"
      rippleColor="#FFC266"
      class="fab-button"
    ></Fab> -->
  </GridLayout>
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
    return {
      chosenImagePath: null,
    };
  },
};
</script>

<style scoped>
.img-tile {
  margin-top: 15px;
}

.fab-button {
  height: 70;
  width: 70;
  margin: 15;
  background-color: #ffc266;
  horizontal-align: center;
  vertical-align: bottom;
}
</style>
