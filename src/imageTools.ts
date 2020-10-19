import { knownFolders, path, File, Folder, ImageSource, FileSystemEntity } from '@nativescript/core';
import { Context } from 'vm';

export async function getGallery(): Promise<string[]> {
  const paths: string[] = [];
  
  const folder: Folder = Folder.fromPath(android.os.Environment.getExternalStoragePublicDirectory(android.os.Environment.DIRECTORY_DCIM).getAbsolutePath() + "/Camera");

  const entities: FileSystemEntity[] = await folder.getEntities();

  for (const entity of entities) {    
    if (!entity.name.match(/.+\.(jpg|png)/)) continue;
    paths.push(entity.path);
  }  
  return paths.reverse();
}
