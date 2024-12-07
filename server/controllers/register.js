const handleRegister = (req, res, db, bcrypt) => {
    const { email, name, password } = req.body;

    if (!email || !name || !password) {
        return res.status(400).json("Incorrect form submission");
    }

    const saltRounds = 10;

    bcrypt.hash(password, saltRounds, function (err, hash) {
        if (err) {
            console.error("Error hashing password:", err);
            return res.status(500).json("Server error");
        }
        db.transaction((trx) => {
            trx.insert({
                hash: hash,
                email: email,
            })
                .into("login")
                .returning("email")
                .then((loginEmail) => {
                    // Extract email and use it to create a user
                    return trx("users")
                        .returning("*")
                        .insert({
                            email: loginEmail[0].email,
                            name: name,
                            joined: new Date(),
                        })
                        .then((user) => {
                            console.log(
                                "User registered successfully:",
                                user[0]
                            );
                            res.json(user[0]);
                        });
                })
                .then(trx.commit)
                .catch((error) => {
                    console.error("Transaction error, rolling back:", error);
                    trx.rollback();
                    res.status(400).json("Unable to register user");
                });
        }).catch((error) => {
            console.error("Transaction failed:", error);
            res.status(500).json("Server error");
        });
    });
};

module.exports = { handleRegister };
