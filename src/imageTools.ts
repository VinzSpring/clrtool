import { Folder, FileSystemEntity, ImageSource } from '@nativescript/core';
import BitmapFactory, { IArgb, IBitmap } from 'nativescript-bitmap-factory';

export async function getGallery(): Promise<ImageSource[]> {
  const paths: string[] = [];
  
  const folder: Folder = Folder.fromPath(android.os.Environment.getExternalStoragePublicDirectory(android.os.Environment.DIRECTORY_DCIM).getAbsolutePath() + "/Camera");

  const entities: FileSystemEntity[] = await folder.getEntities();

  for (const entity of entities) {    
    if (!entity.name.match(/.+\.(jpg|png)/)) continue;
    paths.push(entity.path);
  }  
  return await Promise.all(paths.reverse().map(imgPath => ImageSource.fromFile(imgPath)));
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