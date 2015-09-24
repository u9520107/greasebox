import fs from 'fs-promise';
import path from 'path';

export default async function rm(filepath) {
  if(await fs.exists(filepath)) {
    if((await fs.stat(filepath)).isDirectory()) {
      await Promise.all((await fs.readdir(filepath)).map(async item => {
        await rm(path.resolve(filepath, item));
      }));
      await fs.rmdir(filepath);
    } else {
      await fs.unlink(filepath);
    }
  }
}
