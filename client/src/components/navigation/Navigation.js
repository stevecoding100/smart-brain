import React from "react";

const Navigation = ({ isSignedIn, setIsSignedIn, setRoute }) => {
    const handleSignout = () => {
        setIsSignedIn(false);
        setRoute("signin");
    };
    if (isSignedIn) {
        return (
            <nav
                style={{
                    display: "flex",
                    justifyContent: "flex-end",
                }}
            >
                <p
                    className="f3 link dim black underline pa3 pointer"
                    onClick={handleSignout}
                    style={{ cursor: "pointer" }}
                >
                    Sign Out
                </p>
            </nav>
        );
    } else {
        return (
            <nav
                style={{
                    display: "flex",
                    justifyContent: "flex-end",
                }}
            >
                <p
                    className="f3 link dim black underline pa3 pointer"
                    onClick={() => setRoute("signin")}
                    style={{ cursor: "pointer" }}
                >
                    Sign In
                </p>
                <p
                    className="f3 link dim black underline pa3 pointer"
                    onClick={() => setRoute("register")}
                    style={{ cursor: "pointer" }}
                >
                    Register
                </p>
            </nav>
        );
    }
};

export default Navigation;
