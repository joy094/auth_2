const sessionIdToUserMap = new Map();
const setUser = (id, user) => {
  sessionIdToUserMap.set(id, user);
};
// function setUser(id, user) {
//   sessionIdToUserMap.set(id, user);
// }
const getUser = (id, user) => {
  return sessionIdToUserMap.get(id);

};


module.exports = { setUser, getUser };
