let users = [
  {
    id: "1",
    userid: "apple",
    password: "1111",
    name: "kim apple",
    email: "apple@apple.com",
    url: "",
  },
  {
    id: "2",
    userid: "banana",
    password: "1111",
    name: "ban hana",
    email: "banana@banana.com",
    url: "",
  },
  {
    id: "3",
    userid: "orange",
    password: "1111",
    name: "oh renji",
    email: "orange@orange.com",
    url: "",
  },
  {
    id: "4",
    userid: "melon",
    password: "1111",
    name: "lee melon",
    email: "melon@melon.com",
    url: "",
  },
  {
    id: "5",
    userid: "cherry",
    password: "1111",
    name: "cherry",
    email: "cherry@cherry.com",
    url: "",
  },
];

export async function createUser(userid, password, name, email) {
  const user = {
    id: Date.now().toString(),
    userid,
    password,
    name,
    email,
    url: "",
  };
  users = [user, ...users];
  return user;
}

export async function login(userid, password) {
  const user = users.find(
    (user) => user.userid === userid && user.password === password,
  );
  return user;
}

export async function findByUserid(userid) {
  const user = users.find((user) => user.userid === userid);
  return user;
}

export async function findById(id) {
  return users.find((user) => user.id === id);
}
