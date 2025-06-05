module.exports = (sequelize, DataTypes) => {
  const PostLikes = sequelize.define('PostLikes', {}, { timestamps: false });

  return PostLikes;
};
