module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: 'Name is required' },
        len: { args: [2], msg: 'Name must be at least 2 characters' }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notNull: { msg: 'Email is required' },
        isEmail: { msg: 'Email is invalid' }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: 'Password is required' },
        len: { args: [6], msg: 'Password must be at least 6 characters' }
      }
    },
    avatar: {
      type: DataTypes.STRING
    },
    skills: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      validate: {
        maxSkills(value) {
          if (value.length > 10) {
            throw new Error('You can specify up to 10 skills only');
          }
        }
      }
    },
    isAdmin: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  }, {
    timestamps: true
  });

  User.associate = models => {
    User.belongsToMany(models.User, {
      as: 'Followers',
      through: 'UserFollowers',
      foreignKey: 'followingId',
      otherKey: 'followerId'
    });

    User.belongsToMany(models.User, {
      as: 'Following',
      through: 'UserFollowers',
      foreignKey: 'followerId',
      otherKey: 'followingId'
    });

    User.hasMany(models.Post, { foreignKey: 'userId' });
    User.hasMany(models.Comment, { foreignKey: 'userId' });
    User.hasMany(models.Notification, { foreignKey: 'recipientId' });
    User.hasMany(models.Notification, { foreignKey: 'senderId' });
  };

  return User;
};