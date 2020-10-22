<template>
  <GridLayout rows="*" height="100%">
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
    <Fab
      row="0"
      icon="~/assets/icons/camera_shutter.png"
      rippleColor="#FFC266"
      class="fab-button-center"
      @tap="onTakePictureTapped"
    ></Fab>
  </GridLayout>
</template>

<script lang="ts">
import {
  EventData,
  ImageAsset,
  Image,
  ScrollView,
  StackLayout,
  ImageSource,
} from "@nativescript/core";
import * as camera from "@nativescript/camera";

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
    onImageTapped(imgSrc: ImageSource) {
      this.$emit("imageTapped", imgSrc);
    },
    async onTakePictureTapped() {
      if (!camera.isAvailable()) return;
      const imgAsset: ImageAsset = await camera.takePicture({
        saveToGallery: false,
      });
      this.onImageTapped(await ImageSource.fromAsset(imgAsset));
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

.fab-button-center {
  height: 70;
  width: 70;
  margin: 15;
  background-color: #ffc266;
  horizontal-align: center;
  vertical-align: bottom;
}
</style>
