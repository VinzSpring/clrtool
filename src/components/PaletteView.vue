<template>
  <Page>
    <GridLayout rows="auto, *, auto" columns="*">
      <Image
        col="0"
        row="0"
        :src="img_source"
        stretch="aspectFill"
        class="img-tile"
        height="70%"
      ></Image>

      <FlexboxLayout
        justifyContent="space-around"
        col="0"
        row="1"
        alignItems="center"
      >
        <FlexboxLayout
          alignItems="center"
          flexDirection="column"
          v-for="clr in colors"
          :key="clr"
        >
          <Label width="70" height="90" :backgroundColor="clr" />
          <Label height="20" :text="clr" />
        </FlexboxLayout>
      </FlexboxLayout>

      <Fab
        row="2"
        icon="~/assets/icons/arrow_back.png"
        rippleColor="#FFC266"
        class="fab-button-left"
      ></Fab>
      <Fab
        row="2"
        icon="~/assets/icons/share.png"
        rippleColor="#FFC266"
        class="fab-button-right"
      ></Fab>
    </GridLayout>
  </Page>
</template>

<script lang="ts">
import BitmapFactory from "nativescript-bitmap-factory";
import { ImageSource } from "@nativescript/core";

export default {
  data() {
    return {
      colors: ["#82695A", "#D5C0B1", "#858C88", "#70564B", "#35433E"],
      img_source:
        "https://img4.goodfon.com/wallpaper/nbig/e/ae/asian-girl-sidit-milaia-aziatka-devushka-avtoslesar-fei-xin.jpg",
    };
  },

  methods: {
    async extractColorPalette() {
      let imgSrc = await ImageSource.fromUrl(this.img_source);
      let mutable = BitmapFactory.makeMutable(imgSrc);
      let bmp = BitmapFactory.asBitmap(mutable).dispose((bmp) => {
        console.log(bmp.height);
      });
    },
  },

  mounted() {
    this.extractColorPalette();
  },
};
</script>

<style scoped>
.img-tile {
  margin-top: 15px;
}

.fab-button-left {
  height: 70;
  width: 70;
  margin: 15;
  background-color: #ffc266;
  horizontal-align: left;
}

.fab-button-right {
  height: 70;
  width: 70;
  margin: 15;
  background-color: #ffc266;
  horizontal-align: right;
}

ActionBar {
  background-color: #53ba82;
  color: #ffffff;
}
</style>
