import { UserPlusIcon } from "@heroicons/react/24/solid";
import React from "react";
import { Form } from "react-router-dom";
import illustration from "../assets/illustration.jpg";

const Intro = () => {
  return (
    <>
      <div className="intro">
        <div>
          <h1>
            Take control of <span className="accent">Your Money</span>
          </h1>
          <p>
            Personal Budgetting is the secret to finacial freedom. start your
            journey today
          </p>
          <Form method="post">
            <input
              type="text"
              name="userName"
              required
              placeholder="What's your name ?"
              aria-label="Your Name"
              autoComplete="given-name"
            />
            <button type="submit" className="btn btn--dark">
              <span>Create Account</span>
              <UserPlusIcon width={20} />
            </button>
          </Form>
        </div>
        <img src={illustration} alt="person with money" />
      </div>
    </>
  );
};

export default Intro;
