import { extname, join } from "path";
import { promises as fs } from 'fs';

export const imageFileFilter = (req, file, callback) => {
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
        return callback(null, false);
    }


    callback(null, true);
};

export const editFileName = (req, file, callback) => {
    const name = file.originalname.split('.')[0];
    const fileExtName = extname(file.originalname);
    const randomName = Array(4)
        .fill(null)
        .map(() => Math.round(Math.random() * 16).toString(16))
        .join('');
    callback(null, `${Date.now()}-${randomName}${fileExtName}`);
};

export const deleteFile = async (path, filename, callback) => {

    const userAvatarFilePath = join(path, filename);

    const userAvatarFileExists = await fs.stat(userAvatarFilePath);

    if (userAvatarFileExists) {
        await fs.unlink(userAvatarFilePath);
    }

    callback(null, true);
};