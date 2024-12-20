const handleProfileGet = (req, res, db) => {
    const { id } = req.params;
    db.select("*")
        .from("users")
        .where({ id })
        .then((user) => {
            if (user.length) {
                res.json(user);
            } else {
                res.status(400).json("User not found!");
            }
        })
        .catch((err) => res.status(400).json("Error getting user", err));
};

module.exports = { handleProfileGet };
