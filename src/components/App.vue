<template>
  <!-- <Page>
    <grid-layout rows="auto, *">
      <ScrollView orientation="vertical" height="100%" row="1">
        <StackLayout>
          <Image
            :src="img_src"
            stretch="aspectFill"
            class="img-tile"
            width="100%"
            v-for="img_src in img_sources"
            :key="img_src"
          ></Image>
        </StackLayout>
      </ScrollView>
      <Fab
        row="1"
        icon="~/assets/icons/camera_shutter.png"
        rippleColor="#FFC266"
        class="fab-button"
      ></Fab>
    </grid-layout>
  </Page> -->
  <PaletteView/>
  <!-- <ImagePicker/> -->
</template>

<script lang="ts">
import PaletteView from "./PaletteView.vue";
import ImagePicker from "./ImagePicker.vue";

export default {
  components: {
    PaletteView,
    ImagePicker
  },

  data() {
    return {
      img_sources: [
        "https://photographylife.com/wp-content/uploads/2017/01/What-is-landscape-photography.jpg",
        "https://img4.goodfon.com/wallpaper/nbig/e/ae/asian-girl-sidit-milaia-aziatka-devushka-avtoslesar-fei-xin.jpg",
        "https://www.ephotozine.com/articles/technique-and-tips-on-producing-great-landscapes-14858/images/MagicCloth_1.jpg",
        "https://m.media-amazon.com/images/I/41O7rfn2MPL.jpg",
        "https://static.photocdn.pt/images/articles/2018/12/03/articles/2017_8/improve_landscape_photography.jpg",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTt5fovKbO0e3kFcmu7Evdc6S5N_bREYHCztQ&usqp=CAU",
      ],
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

ActionBar {
  background-color: #53ba82;
  color: #ffffff;
}
</style>
