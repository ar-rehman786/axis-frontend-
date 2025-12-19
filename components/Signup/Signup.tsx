import React, { useState } from "react";
import Link from "next/link";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    console.log({ name, email, password });
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4"
      style={{ backgroundColor: "#000000" }} // bg-dark
    >
      <div
        className="shadow-lg rounded-xl p-8 w-full max-w-md"
        style={{ backgroundColor: "#1A1A1A" }} // bg-card
      >
        <h1
          className="text-2xl font-bold text-center mb-6"
          style={{ color: "#FFFFFF" }} // text-primary
        >
          Create Your Account
        </h1>

        <form onSubmit={handleSignup} className="space-y-4">
          {/* Full Name */}
          <div>
            <label
              className="block mb-1 font-medium"
              style={{ color: "#9CA3AF" }} // text-secondary
            >
              Full Name
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your full name"
              style={{
                width: "100%",
                borderRadius: "0.5rem",
                padding: "0.5rem 1rem",
                border: "1px solid #9CA3AF", // gray
                backgroundColor: "#2A2A2A", // bg-hover
                color: "#FFFFFF", // text-primary
              }}
            />
          </div>

          {/* Email */}
          <div>
            <label
              className="block mb-1 font-medium"
              style={{ color: "#9CA3AF" }}
            >
              Email
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              style={{
                width: "100%",
                borderRadius: "0.5rem",
                padding: "0.5rem 1rem",
                border: "1px solid #9CA3AF",
                backgroundColor: "#2A2A2A",
                color: "#FFFFFF",
              }}
            />
          </div>

          {/* Password */}
          <div>
            <label
              className="block mb-1 font-medium"
              style={{ color: "#9CA3AF" }}
            >
              Password
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Create a password"
              style={{
                width: "100%",
                borderRadius: "0.5rem",
                padding: "0.5rem 1rem",
                border: "1px solid #9CA3AF",
                backgroundColor: "#2A2A2A",
                color: "#FFFFFF",
              }}
            />
          </div>

          {/* Confirm Password */}
          <div>
            <label
              className="block mb-1 font-medium"
              style={{ color: "#9CA3AF" }}
            >
              Confirm Password
            </label>
            <input
              type="password"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm your password"
              style={{
                width: "100%",
                borderRadius: "0.5rem",
                padding: "0.5rem 1rem",
                border: "1px solid #9CA3AF",
                backgroundColor: "#2A2A2A",
                color: "#FFFFFF",
              }}
            />
          </div>

          {/* Submit Button */}
          <div className="text-center">
            <button
              type="submit"
              style={{
                width: "100%",
                padding: "0.5rem 1rem",
                borderRadius: "0.5rem",
                backgroundColor: "#00D1D1", // teal
                color: "#FFFFFF", // text-primary
                fontWeight: 500,
                cursor: "pointer",
                transition: "background-color 0.2s",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.backgroundColor = "#00B8B8") // teal-dark
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor = "#00D1D1") // teal
              }
            >
              Sign Up
            </button>
          </div>
        </form>

        <p
          className="text-center mt-6"
          style={{ color: "#9CA3AF" }} 
        >
          Already have an account?{" "}
          <Link
            href="/auth/login"
            style={{ color: "#FFD166", fontWeight: 600 }} 
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
