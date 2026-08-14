let posts = [
  {
    id: "1",
    name: "kim apple",
    userid: "apple",
    text: "i am learning node.js",
    createdAt: Date.now().toString(),
    url: "",
  },
  {
    id: "2",
    name: "ban hana",
    userid: "banana",
    text: "i am learning node.js",
    createdAt: Date.now().toString(),
    url: "",
  },
  {
    id: "3",
    name: "oh renji",
    userid: "orange",
    text: "i am learning node.js",
    createdAt: Date.now().toString(),
    url: "",
  },
  {
    id: "4",
    name: "lee melon",
    userid: "melon",
    text: "i am learning node.js",
    createdAt: Date.now().toString(),
    url: "",
  },
  {
    id: "5",
    name: "shery",
    userid: "chery",
    text: "i am learning node.js",
    createdAt: Date.now().toString(),
    url: "",
  },
];

// function that returns all posts
export async function getAll() {
  return posts;
}

// function that returns a POST for the post number ID
export async function getById(id) {
  return posts.filter((post) => post.id === id);
}

// return the post for user ID (user id)
export async function getAllByUserid(userid) {
  return posts.filter((post) => post.userid === userid);
}

// write a post
export async function create(userid, name, text) {
  const post = {
    id: Date.now().toString(),
    userid,
    name,
    text,
    createdAt: Date.now().toString(),
  };
  posts = [post, ...posts];
  return post;
}

// POST change
export async function update(id, text) {
  const post = posts.find((post) => post.id === id);
  if (post) {
    post.text = text;
  }
  return post;
}

// deleting the POST
export async function remove(id) {
  posts = posts.filter((post) => post.id !== id);
}
