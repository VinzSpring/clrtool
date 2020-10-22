<template>
  <Page actionBarHidden="true">
    <PaletteView
      :imgSource="chosenImageSource"
      v-if="uiState === UI_STATE.PALETTE_VIEW"
      @backButton="uiState = UI_STATE.IMAGE_PICKER"
    />
    <ImagePicker :imgSources="imgSources" v-else @imageTapped="imageTapped" />
  </Page>
</template>

<script lang="ts">
import PaletteView from "./PaletteView.vue";
import ImagePicker from "./ImagePicker.vue";
import permissions from "nativescript-permissions";
import * as statusBar from "nativescript-status-bar";
import { getGallery } from "../imageTools";
import { requestCameraPermissions } from "@nativescript/camera";
import { ImageSource } from '@nativescript/core';

enum UI_STATE {
  IMAGE_PICKER,
  PALETTE_VIEW,
}

export default {
  components: {
    PaletteView,
    ImagePicker,
  },

  mounted() {
    this.requestPermissions().then((success) => this.loadImageSources());
  },

  methods: {
    async loadImageSources() {
      this.imgSources = await getGallery();
    },
    async requestPermissions(): Promise<any> {
      let promisedPermissions = [
        requestCameraPermissions(),
        permissions.requestPermission(
          android.Manifest.permission.READ_EXTERNAL_STORAGE
        ),
      ];

      return Promise.all(promisedPermissions)
        .then(() => {})
        .catch(() => {
          exit(0);
        });
    },
    imageTapped(imgSource: ImageSource) {
      this.chosenImageSource = imgSource;
      this.uiState = UI_STATE.PALETTE_VIEW;
    },
  },

  data() {
    return {
      imgSources: [],
      chosenImageSource: null,
      uiState: UI_STATE.IMAGE_PICKER,
      UI_STATE,
    };
  },
};
</script>

<style scoped>
</style>
