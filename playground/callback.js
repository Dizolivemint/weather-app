var getUser = (id, callback) => {
  var user = {
    id: id,
    name: 'Vikrim'
  };
  callback(user);
};

getUser(31, (user) => {
  console.log(user);
})
