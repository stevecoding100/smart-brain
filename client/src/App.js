import Navigation from "./components/navigation/Navigation";
import Logo from "./components/logo/Logo";
import ImageLinkForm from "./components/imagelinkform/ImageLinkForm";
import FaceRecognition from "./components/facerecognition/FaceRecognition";
import Rank from "./components/Rank";
import Signin from "./components/signin/Signin";
import Register from "./components/register/Register";
import ParticlesBg from "particles-bg";
import { useState } from "react";

function App() {
    const [imageUrl, setImageUrl] = useState("");
    const [box, setBox] = useState({});
    const [isSignedIn, setIsSignedIn] = useState(false);
    const [route, setRoute] = useState("signin");
    const [user, setUser] = useState({
        id: "",
        name: "",
        email: "",
        entries: 0,
        joined: "",
    });

    // useEffect(() => {
    //     fetch("http://localhost:3000")
    //         .then((res) => res.json())
    //         .then((user) => console.log(user))
    //         .catch((err) =>
    //             console.error("Error fetching from local server", err)
    //         );
    // }, []);

    const calculateFaceLocation = (data) => {
        const clarifaiFace =
            data?.outputs?.[0]?.data?.regions?.[0]?.region_info?.bounding_box;
        console.log("Bounding Box Data:", clarifaiFace);
        if (!clarifaiFace) {
            console.error("Bounding box data not found in response.");
            return null;
        }

        const image = document.getElementById("inputimage");
        const width = Number(image.width);
        const height = Number(image.height);

        return {
            leftCol: clarifaiFace.left_col * width,
            topRow: clarifaiFace.top_row * height,
            rightCol: width - clarifaiFace.right_col * width,
            bottomRow: height - clarifaiFace.bottom_row * height,
        };
    };

    const onInputChange = (event) => {
        setImageUrl(event.target.value);
    };

    const handleDetectFace = () => {
        fetch("http://localhost:3000/detect", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ imageUrl }),
        })
            .then((response) => response.json())
            .then((result) => {
                if (result) {
                    fetch("http://localhost:3000/image", {
                        method: "PUT",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                            id: user.id,
                        }),
                    })
                        .then((res) => res.json())
                        .then((data) => {
                            setUser((prevUser) => ({
                                ...prevUser,
                                entries: data[0].entries,
                            }));
                        })
                        .catch((err) =>
                            console.error(
                                "Error updating entries on the server:",
                                err
                            )
                        );
                }
                const faceBox = calculateFaceLocation(result);
                if (faceBox) {
                    setBox(faceBox);
                } else {
                    console.error("No face data found to display.");
                }
            })
            .catch((error) =>
                console.log("Error fetching from Clarifai API:", error)
            );
    };

    return (
        <div className="App">
            <ParticlesBg type="cobweb" bg={true} className="particles" />
            <Navigation
                setRoute={setRoute}
                isSignedIn={isSignedIn}
                setIsSignedIn={setIsSignedIn}
            />
            {route === "signin" ? (
                <Signin
                    setUser={setUser}
                    setRoute={setRoute}
                    setIsSignedIn={setIsSignedIn}
                />
            ) : route === "register" ? (
                <Register
                    setRoute={setRoute}
                    setIsSignedIn={setIsSignedIn}
                    setUser={setUser}
                />
            ) : (
                <>
                    <Logo />
                    <Rank name={user.name} entries={user.entries} />
                    <ImageLinkForm
                        onInputChange={onInputChange}
                        onButtonSubmit={handleDetectFace}
                    />
                    <FaceRecognition imageUrl={imageUrl} box={box} />
                </>
            )}
        </div>
    );
}

export default App;
