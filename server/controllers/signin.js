const handleSignin = (req, res, db, bcrypt) => {
    const { email, password } = req.body;
    // Validate input
    if (!email || !password) {
        return res.status(400).json("Incorrect form submission");
    }

    db.select("email", "hash")
        .from("login")
        .where("email", "=", email)
        .then((data) => {
            if (data.length) {
                const { hash } = data[0];
                bcrypt.compare(password, hash, (err, result) => {
                    if (err) {
                        console.error("Error comparing passwords:", err);
                        return res.status(500).json("Server Error");
                    }
                    if (result) {
                        return db
                            .select("*")
                            .from("users")
                            .where("email", "=", email)
                            .then((user) => res.json(user[0]))
                            .catch((err) => {
                                console.error("Error fetching user:", err);
                                res.status(500).json("Unable to retrieve user");
                            });
                    } else {
                        return res.status(400).json("Invalid credentials");
                    }
                });
            } else {
                return res.status(400).json("User not found");
            }
        })
        .catch((err) => {
            console.error("Error accessing login table:", err);
            res.status(500).json("Server error");
        });
};

module.exports = { handleSignin };
