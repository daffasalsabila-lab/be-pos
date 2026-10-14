import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

import pool from "../config/db.js";
const USERS = [
  {
    nama: "Dapa",
    email: "admin@gmail.com",
    password: "12345678",
  },
];

export const login = async(req, res) => {
  // const email = req.body.email;
  const { email, password } = req.body;

  if (!email || !password) {
    // 400: bad response (browser)
    // 500: server error (server/database)
    // 200: success (success)
    res.status(400).json({
      status: false,
      message: "Email atau password required",
    });
  }

    // find()
  // const user = USERS.find((u) => u.email === email && u.password === password);

  const [user] = await pool.query("SELECT id, name, email, password FROM users WHERE email= ?", [email]);
  // email : bersifat unik dan ngga ada lebih dari 1

  if(user.length === 0){
    return res.status(401).json({
      status: false,
      message: "invalid credential",
    });
  }

  const dataUser = user[0];
  const isMatch = await bcrypt.compare(password, dataUser.password);

  if (!isMatch) {
    //401 : unauthorize : login gagal
    return res.status(401).json({
      status: false,
      message: "invalid credential",
    });
  }

  //jangan masukin pasword, ntar dibobol
  const token = jwt.sign({
    id: dataUser.id,
    name: dataUser.name,
    email: dataUser.email,
  }, 
  process.env.JWT_SECRET, 
  { expiresIn: process.env.JWT_EXPIRES_IN || "1d" },
  );

  res.status(200).json({
    status: true,
    message: "Login success",
    data: {
      user: {
        id: dataUser.id,
        name: dataUser.nama,
        email: dataUser.email,
      },
      token, 
    },
  });
};
