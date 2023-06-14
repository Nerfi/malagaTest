//FROM DOCS
const { PrismaClient } = require("@prisma/client");
const fastify = require("fastify")({ logger: true });
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const fastifyCors = require("@fastify/cors");
fastify.register(require("fastify-jwt"), {
  secret: process.env.SECRET_JWT_KEY,
});

// Prisma instance
const prisma = new PrismaClient();

fastify.register(fastifyCors, {
  // Set the CORS options
  origin: true, // or specific origin(s) ['http://localhost:3000']
});

//decorator para el metodo de auth , usamremos JWT
fastify.decorate("authenticate", async function (request, reply) {
  try {
    await request.jwtVerify();
  } catch (err) {
    reply.send(err);
  }
});

//LOGIN
fastify.post("/login", async (request, res) => {
  const { name, password } = request.body;
  console.log(name, password, "credentials");
  // Find the user by username
  const user = await prisma.user.findUnique({
    where: {
      name,
    },
  });

  // Check if the user exists and the password is correct
  if (!user || !(await bcrypt.compare(password, user.password))) {
    res.code(401).send({ error: "Invalid credentials", ok: false });
    return;
  }

  // Generate a JWT token
  const token = jwt.sign({ id: user.id }, process.env.SECRET_JWT_KEY);

  res.send({ token, ok: true });
});

// register new user
fastify.post("/register", async (request, reply) => {
  const { email, password, name } = request.body;

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create a new user
  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });

  reply.send({ message: "User registered successfully", user, ok: true });
});

/// Create a new post - protected route
fastify.post(
  "/posts",
  { preHandler: [fastify.authenticate] },
  async (request, reply) => {
    const { title, description } = request.body;

    try {
      // Access the authenticated user from the request object
      const user = request.user;

      // Create a new post associated with the authenticated user
      const newPost = await prisma.post.create({
        data: {
          title,
          description,
          userId: Number(user.id), // Assign the user's ID to the userId field
        },
      });

      reply.code(201).send({ newPost, ok: true });
    } catch (error) {
      console.error(error);
      reply.status(500).send("Internal Server Error");
    }
  }
);

fastify.get(
  "/posts",
  { preHandler: [fastify.authenticate] },
  async (req, res) => {
    const data = await prisma.post.findMany();
    // console.log(data, "the data?");
    return res.send(data);
  }
);
//test route delete after

fastify.get("/users", async (req, res) => {
  const users = await prisma.user.findMany();
  res.send(users);
});

//

fastify.get(
  "/post/:id",
  { preHandler: [fastify.authenticate] },
  async (req, res) => {
    const postId = req.params.id;

    try {
      console.log(postId, "user IDD");
      const posts = await prisma.post.findUnique({
        where: {
          id: Number(postId),
        },
        // de momento no queremos el usuario al cual pertenece este post, de momento
        // include: {
        //   User: true
        // },
      });

      res.status(200).send(posts);
    } catch (error) {
      console.error(error);
      res.status(500).send("Error retrieving posts");
    }
  }
);

//delete route

fastify.delete("/posts/:postId", async (request, reply) => {
  const { postId } = request.params;
  //esto deberia ir en un middleware, lo se!!
  let token;

  if (
    request.headers.authorization &&
    request.headers.authorization.startsWith("Bearer")
  ) {
    token = request.headers.authorization.split(" ")[1];
  }
  if (!token) {
    return reply.status(401).json({ error: "token missing" });
  }

  const decoded = jwt.verify(token, process.env.SECRET_JWT_KEY);
  request.user = decoded;
  //

  const userId = request.user.id;

  try {
    const post = await prisma.post.findUnique({
      where: {
        id: parseInt(postId),
      },
    });

    if (!post) {
      return reply.status(404).send({ error: "Post not found", ok: false });
    }

    if (post.userId !== userId) {
      return reply.status(403).send({ error: "Unauthorized", ok: false });
    }

    const deletedPost = await prisma.post.delete({
      where: {
        id: Number(postId),
      },
    });

    reply.send({ message: "Post deleted successfully", ok: true });
  } catch (error) {
    reply
      .status(500)
      .send({ error: "An error occurred while deleting the post", ok: false });
  }
});

//update route

fastify.put("/post/:id/update", async (request, reply) => {
  const { id } = request.params;
  // esto deberia ir en un middleware, lo se!!
  let token;
  if (
    request.headers.authorization &&
    request.headers.authorization.startsWith("Bearer")
  ) {
    token = request.headers.authorization.split(" ")[1];
  }
  if (!token) {
    return res.status(401).send({ error: "Token missing", ok: false });
  }

  const decoded = jwt.verify(token, process.env.SECRET_JWT_KEY);
  request.user = decoded;
  //

  const userId = request.user.id;

  try {
    const post = await prisma.post.findUnique({
      where: {
        id: parseInt(id),
      },
    });

    if (!post) {
      return reply.status(404).send({ error: "Post not found", ok: false });
    }

    if (post.userId !== userId) {
      return reply.status(403).send({ error: "Unauthorized", ok: false });
    }

    const { title, description } = request.body;

    const updatedPost = await prisma.post.update({
      where: {
        id: Number(id),
      },
      data: {
        title,
        description,
      },
    });

    reply.send({
      message: "Post updated successfully",
      ok: true,
      post: updatedPost,
    });
  } catch (error) {
    reply
      .status(500)
      .send({ error: "An error occurred while updating the post", ok: false });
  }
});

// Run the server!
const start = async () => {
  try {
    await fastify.listen({ port: 3001 });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};
start();
