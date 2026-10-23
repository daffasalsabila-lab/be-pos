import pool from "../config/db.js";
import prisma from "../config/prisma.js";
import bcrypt from "bcrypt";

const USERS = [
  {
    id: 1,
    name: "Dapa",
    email: "Dapa@gmail.com",
    password: "12345678",
  },
  {
    id: 2,
    name: "Ratna",
    email: "ratna@gmail.com",
    password: "12345678",
  },
  {
    id: 3,
    name: "Laras",
    email: "laras@gmail.com",
    password: "12345678",
  },
];
//  crud (create, read, update, delete)

// read
export const getAllUser = async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      select:{
        id: true,
        name: true, 
        email: true,
        create_at: true,
        updated_at: true,
      },
      orderBy: { id: "desc" },
    });
    // const [rows] = await pool.query(
    //   "SELECT id, name, email, is_active FROM users",
    // );
    return res.status(200).json({
      status: true,
      message: "Fetch user success",
      total: users.length,
      data: users,
    });
  } catch (error) {
    return req.status(500).json({
      status: false,
      message: error.message,
      error: error.message,
    });
  }
};

export const getUserById = async (req, res) => {
  try {
    const id = parseInt(req.params.id); // 1
    // find
    const user = await prisma.user.findUnique({
      where: { id: id },
    });
    // const [user] = await pool.query(
    //   "SELECT id, name, email, is_active FROM users WHERE id= ?",
    //   [id],
    // );

    // if (!user[0]) {
    //   res.status(404).json({
    //     status: false,
    //     message: "User not found",
    //   });
    // }

    res.status(200).json({
      status: true,
      message: "User found",
      data: user,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: error.message,
      error: error.message,
    });
  }
};

export const createUser = async (req, res) => {
  const { name, email, password } = req.body;
  // const name = req.body.name;
  // const password = req.body.password;

  try {
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password,
      },
      select: {
        id: true,
        name: true, 
        email: true,
      },
    });
    
    // const [user] = await pool.query(
    //   "INSERT INTO users(name,email,password) VALUE (?,?,?)",
    //   [name, email, password],
    // );

    // const newUser = {
    //     id: USERS.length > 0 ? USERS[USERS.length - 1].id + 1 : 1,
    //     name,
    //     email,
    //     password,
    // }
    // USERS.push(newUser);
    return res.status(201).json({
      status: true,
      message: "Create user success",
      data: { id: user.insertId, name, email },
    });
  } catch (error) {
    return req.status(500).json({
      status: false,
      message: "Create user failed",
      error: error.message,
    });
  }
};

export const updateUser = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const { name, email, password, is_active } = req.body;
    let update = "";

    const dataUpdate = {}
    if(email) dataUpdate.email = email
    if(name) dataUpdate.name = name
    if(password){
      dataUpdate.password = await bcrypt.hash(password, 10);
    }

    const user = await prisma.user.update({
      where: { id: id },
      data: dataUpdate,
      select: {
        id: true,
        name: true,
        email: true,
        create_at: true,
        updated_at: true,
      },
    });

    // if (!password) {
    //   update = await pool.query(
    //     "UPDATE users SET name=?, email=?, is_active=? WHERE id=?",
    //     [name, email, is_active, id],
    //   );

    //   console.log("tnp pass");
    // } else {
    //   update = await pool.query(
    //     "UPDATE users SET name=?, email=?, password=?, is_active=? WHERE id=?",
    //     [name, email, bcrypt.hashSync(password, 10), is_active, id],
    //   );

    //   console.log("dgn pass");
    // }
    return res.status(200).json({
      status: true,
      message: "Update user success",
      data: user,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const id = parseInt(req.params.id);

    // await pool.query("DELETE from users WHERE id=?", [id]);
    // if  (user.affectedRows === 0) {
    //   return res.status(404).json({
    //     status: false,
    //     message: "not found",
    //   });
    // }

    await prisma.user.delete({
      where: { id: id },
    });

    return res.status(200).json({
      status: true,
      message: "Delete user success",
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: error.message,
    });
  }

  // const deletedUser = USERS.splice(userIndex, 1)[0];
  // return res.status(200).json({
  //     status: true,
  //     message: "Delete user success",
  // });
};
