module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define('Post', {
    content: {
      type: DataTypes.STRING(1000),
      allowNull: false,
      validate: {
        notNull: { msg: 'Post content is required' },
        len: {
          args: [1, 1000],
          msg: 'Post must be between 1 and 1000 characters'
        }
      }
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    timestamps: true
  });

  Post.associate = models => {
    Post.belongsTo(models.User, { foreignKey: 'userId', allowNull: false });
    Post.belongsToMany(models.User, {
      through: 'PostLikes',
      as: 'Likes',
      foreignKey: 'postId',
      otherKey: 'userId'
    });
    Post.hasMany(models.Comment, { foreignKey: 'postId', as: 'Comments' }); // <- ADDED 'as'
    Post.hasMany(models.Notification, { foreignKey: 'postId' });
  };

  return Post;
};
