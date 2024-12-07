import React, { useState } from "react";
import "./Signin.css";

const Signin = ({ setIsSignedIn, setRoute, setUser }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSignIn = () => {
        if (!email || !password) {
            setError("Please fill in both fields.");
            return;
        }

        const payload = { email, password };

        fetch("http://localhost:3000/signin", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
        })
            .then(async (response) => {
                if (!response.ok) {
                    const error = await response.json();
                    throw new Error(error.message || "Invalid credentials");
                }
                return response.json();
            })
            .then((data) => {
                setIsSignedIn(true);
                setRoute("home");
                setUser(data);
            })
            .catch((err) => {
                console.error("Sign-in error:", err.message);
                setError(err.message);
            });
    };

    return (
        <article className="br3 ba  b--black-10 mv4 w-100 w-50-m w-25-l mw6  shadow-5 center">
            <main className="pa4 black-80">
                <div className="measure">
                    <fieldset
                        id="sign_up"
                        className="ba b--transparent ph0 mh0"
                    >
                        <legend className="f1 fw6 ph0 mh0">Sign In</legend>
                        <div className="mt3">
                            <label
                                className="db fw6 lh-copy f6"
                                htmlFor="email-address"
                            >
                                Email
                            </label>
                            <input
                                className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                                type="email"
                                name="email-address"
                                id="email-address"
                                value={email}
                                onChange={(e) =>
                                    setEmail(e.target.value.toLowerCase())
                                }
                            />
                        </div>
                        <div className="mv3">
                            <label
                                className="db fw6 lh-copy f6"
                                htmlFor="password"
                            >
                                Password
                            </label>
                            <input
                                className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                                type="password"
                                name="password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                    </fieldset>
                    {error && (
                        <div className="mt3 red">
                            <small>{error}</small>
                        </div>
                    )}
                    <div className="">
                        <input
                            className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                            type="submit"
                            value="Sign in"
                            onClick={handleSignIn}
                        />
                    </div>
                    <div className="lh-copy mt3">
                        <p
                            href="#0"
                            className="f6 link dim black db"
                            onClick={() => setRoute("register")}
                        >
                            Register
                        </p>
                    </div>
                </div>
            </main>
        </article>
    );
};

export default Signin;
