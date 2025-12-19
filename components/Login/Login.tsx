'use client';

import { useState, FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/app/lib/hooks/reducerHooks";
import { loginUser, clearError } from "@/utils/store/Slices/authSlice";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { loading, error } = useAppSelector((state) => state.auth);

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    dispatch(clearError());
    
    const result = await dispatch(loginUser({ email, password }));
    
    if (loginUser.fulfilled.match(result)) {
      // Redirect will be handled by middleware via cookies
      window.location.href = "/";
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4"
      style={{ backgroundColor: "#000000" }}
    >
      <div
        className="shadow-lg rounded-xl p-8 w-full max-w-md"
        style={{ backgroundColor: "#1A1A1A" }}
      >
        <h1
          className="text-2xl font-bold text-center mb-6"
          style={{ color: "#FFFFFF" }}
        >
          Login to Axis Trade Market
        </h1>

        {error && (
          <div className="mb-4 p-3 rounded-md text-red-500 bg-red-500/10 border border-red-500/20">
            {error}
          </div>
        )}

        {/* Demo Credentials Banner */}
        {/* <div className="mb-6 p-3 rounded-md" style={{ backgroundColor: "#2A2A2A" }}>
          <p className="text-sm" style={{ color: "#FFD166" }}>
            <strong>Staging Demo:</strong>
          </p>
          <p className="text-xs mt-1" style={{ color: "#9CA3AF" }}>
            Email: admin@axistrademarket.ai<br />
            Password: Temp123!
          </p>
        </div> */}

        <form onSubmit={handleLogin} className="space-y-4">
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
              disabled={loading}
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
              placeholder="Enter your password"
              disabled={loading}
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

          <div className="text-center">
            <button
              type="submit"
              disabled={loading}
              style={{
                width: "100%",
                padding: "0.5rem 1rem",
                borderRadius: "0.5rem",
                backgroundColor: loading ? "#4B5563" : "#00D1D1",
                color: "#FFFFFF",
                fontWeight: 500,
                cursor: loading ? "not-allowed" : "pointer",
                transition: "background-color 0.2s",
              }}
              onMouseEnter={(e) => {
                if (!loading) {
                  e.currentTarget.style.backgroundColor = "#00B8B8";
                }
              }}
              onMouseLeave={(e) => {
                if (!loading) {
                  e.currentTarget.style.backgroundColor = "#00D1D1";
                }
              }}
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </div>
        </form>

        {/* Only show signup link if enabled */}
        {process.env.NEXT_PUBLIC_ENABLE_SIGNUP === 'true' ? (
          <p
            className="text-center mt-6"
            style={{ color: "#9CA3AF" }}
          >
            Don't have an account?{" "}
            <Link
              href="/auth/signup"
              style={{ color: "#FFD166", fontWeight: 600 }}
            >
              Sign Up
            </Link>
          </p>
        ) : (
          <p
            className="text-center mt-6 text-sm"
            style={{ color: "#9CA3AF" }}
          >
            Public signup is disabled. Contact administrator for access.
          </p>
        )}
      </div>
    </div>
  );
}