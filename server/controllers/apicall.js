const handleClarifiApiCall = (req, res) => {
    const { imageUrl } = req.body;

    const raw = JSON.stringify({
        user_app_id: {
            user_id: process.env.USER_ID,
            app_id: process.env.APP_ID,
        },
        inputs: [
            {
                data: {
                    image: {
                        url: imageUrl,
                    },
                },
            },
        ],
    });

    fetch(
        `https://api.clarifai.com/v2/models/${process.env.MODEL_ID}/outputs`,
        {
            method: "POST",
            headers: {
                Accept: "application/json",
                Authorization: `Key ${process.env.PAT}`,
            },
            body: raw,
        }
    )
        .then((response) => response.json())
        .then((data) => res.json(data))
        .catch((err) => {
            console.error("Error calling Clarifai API:", err);
            res.status(500).json({
                error: "Failed to fetch data from Clarifai API",
            });
        });
};
module.exports = { handleClarifiApiCall };
