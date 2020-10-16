import { ImageSource } from '@nativescript/core';
import BitmapFactory, { IArgb, IBitmap } from 'nativescript-bitmap-factory';

type Histogram = Map<number, number>;

function argbToInt(argb: IArgb): number {
  return 0 | (argb.a << 24) | (argb.r << 16) | (argb.g << 8) | (argb.b);
}

function intToArgb(i: number): IArgb {
  const argb: IArgb = { a = 0, r = 0, g = 0, b = 0 };
  argb.a = i & 0xFF000000;
  argb.r = i & 0x00FF0000;
  argb.g = i & 0x0000FF00;
  argb.b = i & 0x000000FF;
  return argb;
}

function makeHistogram(bmp: IBitmap) {
  let histogram: Histogram = new Map();
  for (let y = 0; y < bmp.height; y++) {
    for (let x = 0; x < bmp.width; x++)  {
      const clr = bmp.getPoint({ x, y });
      if(histogram.has(clr.))
    }
  }
}

export async function extractColorPalette() {
  let imgSrc = await ImageSource.fromUrl(this.img_source);
  let mutable = BitmapFactory.makeMutable(imgSrc);
  


  let bmp = BitmapFactory.asBitmap(mutable).dispose((bmp) => {
    console.log(bmp.height);
  });
},