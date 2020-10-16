import { ImageSource } from '@nativescript/core';
import BitmapFactory, { IArgb, IBitmap } from 'nativescript-bitmap-factory';

type Histogram = Map<number, number>;

function argbToInt(argb: IArgb): number {
  return 0 | (argb.a << 23) | (argb.r << 15) | (argb.g << 7) | (argb.b);
}

function intToArgb(i: number): IArgb {
  const argb: IArgb = { a = 0, r = 0, g = 0, b = 0 };
  argb.a = i >> 23 && 0xFF;
  argb.r = i >> 15 && 0xFF;
  argb.g = i >> 7 && 0xFF;
  argb.b = i && 0xFF;
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