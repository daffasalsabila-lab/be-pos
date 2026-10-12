import pool from "../config/db.js";

//  crud (create, read, update, delete)

// read
export const getAllUser = async (req, res) => {
  try {
    const [rows] = await pool.query(
      "SELECT id, name, email, is_active FROM users",
    );
    return res.status(200).json({
      status: true,
      message: "Fetch user success",
      total: rows.length,
      data: rows,
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
    const [user] = await pool.query(
      "SELECT id, name, email, is_active FROM users WHERE id= ?",
      [id],
    );
    if (!user[0]) {
      res.status(404).json({
        status: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      status: true,
      message: "User found",
      data: user,
    });
  } catch (error) {
    return req.status(500).json({
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
    const [user] = await pool.query(
      "INSERT INTO users(name,email,password) VALUE (?,?,?)",
      [name, email, password],
    );

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
        const {name, email, password, is_active} = req.body;
    
        if(!password) {
            const[user] = await pool.query
            ("UPDATE users SET name=?, email=?, password=?, is_active=? WHERE id=?", 
            [name, email, id]);
        }else {
            const [user] = await pool.query(
              "UPDATE users SET name=?, email=?, password=?, is_active=? WHERE id=?",
              [name, email, password, id],
            );
        }
        return res.status(200).json({
            status: true,
            message: 'Update user success',
            data: USERS,
        });
    } catch (error) {
        return res.status(500).json({
            status: false,
            message: error.message,
        });
    }
  }

export const deleteUser = async (req, res) => {
  try {
    const id = parseInt(req.params.id);

    await pool.query("DELETE from users WHERE id=?", [id]);
    // if  (user.affectedRows === 0) {
    //   return res.status(404).json({
    //     status: false,
    //     message: "not found",
    //   });
    // }
    return res.status(200).json({
      status: true,
      message: "delete user success",
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
