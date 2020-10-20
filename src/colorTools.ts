import { ImageSource } from '@nativescript/core';
import BitmapFactory, { IArgb, IBitmap } from 'nativescript-bitmap-factory';
import { clusterColors } from './kMeans';

type Histogram = Map<number, number>;

export function argbToInt(argb: IArgb): number {
  return (argb.a << 24 >>> 0) + (argb.r << 16 >>> 0) + (argb.g << 8 >>> 0) + argb.b >>> 0;
}

export function intToArgb(i: number): IArgb {
  const argb: IArgb = { a: 0, r: 0, g: 0, b: 0 };
  argb.a = i >> 23 & 0xFF;
  argb.r = i >> 15 & 0xFF;
  argb.g = i >> 7 & 0xFF;
  argb.b = i & 0xFF;
  return argb;
}

function makeHistogram(bmp: IBitmap): Histogram {
  let histogram: Histogram = new Map();
  for (let y = 0; y < bmp.height; y++) {
    for (let x = 0; x < bmp.width; x++)  {
      const clr = bmp.getPoint({ x, y });
      const clrInt = argbToInt(clr);
      histogram[clrInt] = histogram.has(clrInt) ? histogram[clrInt] + 1 : 1;
    }
  }
  return histogram;
}

export function getLuminance(argb: IArgb) {
  return argb.a * (0.299*argb.r + 0.587*argb.g + 0.114*argb.b)
}

export async function extractColorPaletteKMeans(img_source: ImageSource, nColors: number): Promise<IArgb[]> {
  let mutable = BitmapFactory.makeMutable(img_source);
  let bmp = BitmapFactory.asBitmap(mutable);
  bmp = bmp.resizeWidth(300);
  let clrs: IArgb[] = [];
  for (let y = 0; y < bmp.height; y++) {
    for (let x = 0; x < bmp.width; x++) {
      clrs.push(bmp.getPoint({ x, y }));
    }
  }
  const clusteredColors: IArgb[] = clusterColors(clrs, nColors);
  bmp.dispose();
  return clusteredColors;
}


export function renderColorPaletteToImage(colors: IArgb[]): IBitmap {
  const tileSpacing = 10;
  const tileW = 180;
  const tileH = 200;

  let bmp = BitmapFactory.create(tileW * colors.length + tileSpacing * (colors.length - 1), tileH);
  bmp.drawRect(bmp.size, { x: 0, y: 0 }, "#FFFFFFFF", "#FFFFFFFF");  
  for (let i = 0; i < colors.length; i++) {
    bmp.drawRect({ width: tileW, height: tileH }, { x: i * (tileW + tileSpacing), y: 0 }, colors[i], colors[i]);
  }
  return bmp;
}