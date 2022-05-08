const jimp = require("jimp");
const path = require("path");
const fs = require("fs/promises");
const { User } = require("../models/user");

const getCurrent = async (req, res) => {
  const { email, subscription, avatarURL } = req.user;
  res.json({
    status: "success",
    code: 200,
    data: { email, subscription, avatarURL },
  });
};

const avatar = async (req, res) => {
  const { id } = req.user;
  const pathFile = req.file.path;
  const filename = req.file.filename;
  const staticFolder = process.env.STATIC_FOLDER;

  const pic = await jimp.read(pathFile);
  await pic
    .autocrop()
    .cover(250, 250, jimp.HORIZONTAL_ALIGN_CENTER | jimp.VERTICAL_ALIGN_MIDDLE)
    .writeAsync(pathFile);

  const destination = path.join(staticFolder, "avatars", id);
  await fs.mkdir(destination, { recursive: true });
  await fs.rename(pathFile, path.join(destination, filename));
  const avatarURL = path.normalize(path.join("avatars", id, filename));
  await User.findByIdAndUpdate(id, { avatarURL });

  res.json({ status: "success", code: 200, avatar: avatarURL });
};

module.exports = { getCurrent, avatar };
