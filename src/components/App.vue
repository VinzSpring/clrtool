<template>
  <Page actionBarHidden="true">
    <PaletteView
      :image="chosenImageSource"
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
    this.requestPermissions().then((success) => this.loadImagePaths());
  },

  methods: {
    async loadImagePaths() {
      this.imgSources = await getGallery();
    },
    async requestPermissions(): Promise<any> {
      return permissions
        .requestPermission(android.Manifest.permission.READ_EXTERNAL_STORAGE)
        .then(() => {})
        .catch(() => {
          exit(0);
        });
    },
    imageTapped(path: string) {
      this.chosenImageSource = path;
      this.uiState = UI_STATE.PALETTE_VIEW;
    },
  },

  data() {
    return {
      imgSources: [
        "https://photographylife.com/wp-content/uploads/2017/01/What-is-landscape-photography.jpg",
        "https://img4.goodfon.com/wallpaper/nbig/e/ae/asian-girl-sidit-milaia-aziatka-devushka-avtoslesar-fei-xin.jpg",
        "https://www.ephotozine.com/articles/technique-and-tips-on-producing-great-landscapes-14858/images/MagicCloth_1.jpg",
        "https://m.media-amazon.com/images/I/41O7rfn2MPL.jpg",
        "https://static.photocdn.pt/images/articles/2018/12/03/articles/2017_8/improve_landscape_photography.jpg",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTt5fovKbO0e3kFcmu7Evdc6S5N_bREYHCztQ&usqp=CAU",
      ],
      chosenImageSource:
        "https://img4.goodfon.com/wallpaper/nbig/e/ae/asian-girl-sidit-milaia-aziatka-devushka-avtoslesar-fei-xin.jpg",
      uiState: UI_STATE.IMAGE_PICKER,
      UI_STATE,
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
  background-color: #ff7b7b;
  horizontal-align: center;
  vertical-align: bottom;
}
</style>
