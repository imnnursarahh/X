import * as postRepository from "../data/post.mjs";

// function to get all the posts
// function to retrieve the POST for the ID
export async function getPosts(req, res, next) {
  const userid = req.query.userid;
  const data = await (userid
    ? postRepository.getAllByUserid(userid)
    : postRepository.getAll());
  res.status(200).json(data);
}

// function to get a single POST
export async function getPost(req, res, next) {
  const id = req.params.id;
  const post = await postRepository.getById(id);
  if (post) {
    res.status(200).json(post);
  } else {
    res.status(200).json({ message: `there is no post for ${id}` });
  }
}

// function for creating a post
export async function createPost(req, res, next) {
  const { userid, name, text } = req.body;
  const post = await postRepository.create(userid, name, text);
  res.status(201).json(post);
}

// function that modifies the post
export async function updatePost(req, res, next) {
  const id = req.params.id;
  const text = req.body.text;
  const post = await postRepository.update(id, text);
  if (post) {
    res.status(201).json(post);
  } else {
    res.status(404).json({ message: `there is no post for ${id}` });
  }
}

// function for deleting a post
export async function deletePost(req, res, next) {
  const id = req.params.id;
  await postRepository.remove(id);
  res.sendStatus(204);
}
