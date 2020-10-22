<template>
  <GridLayout rows="auto, *, auto" columns="*">
    <Image
      col="0"
      row="0"
      :src="image"
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
      @tap="onBackButtonTapped"
    ></Fab>
    <Fab
      row="2"
      icon="~/assets/icons/share.png"
      rippleColor="#FFC266"
      class="fab-button-right"
      @tap="onShareButtonTapped"
    ></Fab>
  </GridLayout>
</template>

<script lang="ts">
import BitmapFactory from "nativescript-bitmap-factory";
import { ImageSource } from "@nativescript/core";
import {
  argbToInt,
  extractColorPaletteKMeans,
  getLuminance,
} from "../colorTools";
import { IArgb } from "nativescript-bitmap-factory";
import * as SocialShare from "nativescript-social-share";
import { renderColorPaletteToImage } from "../imageTools";

export default {
  data() {
    return {
      colors: [],
    };
  },
  props: {
    image: {
      required: true,
      type: String,
    },
  },
  methods: {
    async extractColorPalette() {
      let colorPalette: IArgb[] = await extractColorPaletteKMeans(
        await ImageSource.fromFile(this.image),
        5
      );
      colorPalette = colorPalette.sort(
        (argb1, argb2) => getLuminance(argb2) - getLuminance(argb1)
      );

      this.colors = colorPalette.map(
        (c) => "#" + argbToInt(c).toString(16).toUpperCase()
      );
    },

    onBackButtonTapped() {
      this.$emit("backButton");
    },

    onShareButtonTapped() {
      const colorPaletteImage = renderColorPaletteToImage(this.colors);
      SocialShare.shareImage(colorPaletteImage.toImageSource());
      colorPaletteImage.dispose();
    },
  },

  mounted() {
    this.extractColorPalette();
  },
};
</script>

<style scoped>
.img-tile {
  margin-bottom: 15px;
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
</style>
