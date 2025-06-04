module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define('Comment', {
    text: {
      type: DataTypes.STRING(500),
      allowNull: false,
      validate: {
        notNull: { msg: 'Comment text is required' },
        len: {
          args: [1, 500],
          msg: 'Comment must be between 1 and 500 characters'
        }
      }
    }
  }, {
    timestamps: true
  });

  Comment.associate = models => {
    Comment.belongsTo(models.Post, { foreignKey: 'postId', allowNull: false });
    Comment.belongsTo(models.User, { foreignKey: 'userId', allowNull: false });
    Comment.belongsToMany(models.User, {
      through: 'CommentLikes',
      as: 'Likes',
      foreignKey: 'commentId',
      otherKey: 'userId'
    });
  };

  return Comment;
};
