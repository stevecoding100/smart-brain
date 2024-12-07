const handleImage = (req, res, db) => {
    const { id } = req.body;
    db("users")
        .where("id", "=", id)
        .increment("entries", 1)
        .returning("entries")
        .then((entries) => {
            if (entries.length) {
                res.json(entries);
            } else {
                res.status(400).json("Unable to get entries");
            }
        })
        .catch((err) => res.status(400).json("Unable to get entries", err));
};

module.exports = { handleImage };
