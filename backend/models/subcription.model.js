const subscription = (sequelize) => {
  const Subscription = sequelize.define(
    "Inscricao",
    {},
    {
      tableName: "inscricao",
    }
  );

  Subscription.hasOne(User);
  User.belongsTo(Subscription);
  Subscription.hasMany(Course);
  Course.belongsToMany(Subscription);

  return Subscription;
};

export default subscription;
