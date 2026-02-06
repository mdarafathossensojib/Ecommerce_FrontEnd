import { useForm } from "react-hook-form";
import { Link } from "react-router";
import useAuthContext from "../hooks/useAuthContext";
import ErrorAlert from "../components/ErrorAlert";
import { useState } from "react";

const Register = () => {
  const { registerUser, errorMsg, resendActivationEmail } = useAuthContext();
  const [successMsg, setSuccessMsg] = useState("");
  const [resendEmail, setResendEmail] = useState(false);

  const {
    register: registerForm,
    handleSubmit: handleRegisterSubmit,
    watch,
    formState: { errors: registerErrors },
  } = useForm();

  const {
    register: resendRegister,
    handleSubmit: handleResendSubmit,
    formState: { errors: resendErrors },
  } = useForm();

  const onSubmit = async (data) => {
    delete data.confirm_password;
    try {
      const response = await registerUser(data);
      if (response.success) {
        setSuccessMsg(response.message);
      }
    } catch (error) {
      console.log("Registration failed", error);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-12 bg-base-200">
      <div className="card w-full max-w-md bg-base-100 shadow-xl">
        <div className="card-body">
          {errorMsg && <ErrorAlert error={errorMsg} />}
          {successMsg && (
            <div role="alert" className="alert alert-success">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 shrink-0 stroke-current"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>{successMsg}</span>
            </div>
          )}

          <h2 className="card-title text-2xl font-bold">Sign Up</h2>
          <p className="text-base-content/70">
            Create an account to get started
          </p>

          <form onSubmit={handleRegisterSubmit(onSubmit)} className="space-y-4 mt-4">
            <div className="form-control">
              <label className="label" htmlFor="first_name">
                <span className="label-text">First Name</span>
              </label>
              <input
                id="first_name"
                type="text"
                placeholder="John"
                className="input input-bordered w-full"
                {...registerForm("first_name", {
                  required: "First Name is Required",
                })}
              />
              {registerErrors.first_name && (
                <span className="label-text-alt text-error">
                  {registerErrors.first_name.message}
                </span>
              )}
            </div>

            <div className="form-control">
              <label className="label" htmlFor="last_name">
                <span className="label-text">Last Name</span>
              </label>
              <input
                id="last_name"
                type="text"
                placeholder="Doe"
                className="input input-bordered w-full"
                {...registerForm("last_name", {
                  required: "Last Name is Required",
                })}
              />
              {registerErrors.last_name && (
                <span className="label-text-alt text-error">
                  {registerErrors.last_name.message}
                </span>
              )}
            </div>

            <div className="form-control">
              <label className="label" htmlFor="email">
                <span className="label-text">Email</span>
              </label>
              <input
                id="email"
                type="email"
                placeholder="name@example.com"
                className="input input-bordered w-full"
                {...registerForm("email", {
                  required: "Email is Required",
                })}
              />
              {registerErrors.email && (
                <span className="label-text-alt text-error">
                  {registerErrors.email.message}
                </span>
              )}
            </div>

            <div className="form-control">
              <label className="label" htmlFor="address">
                <span className="label-text">Address</span>
              </label>
              <input
                id="address"
                type="text"
                placeholder="7/A Dhanmondi, Dhaka"
                className="input input-bordered w-full"
                {...registerForm("address")}
              />
            </div>

            <div className="form-control">
              <label className="label" htmlFor="phone_number">
                <span className="label-text">Phone Number</span>
              </label>
              <input
                id="phone_number"
                type="text"
                placeholder="0123456789"
                className="input input-bordered w-full"
                {...registerForm("phone_number")}
              />
            </div>

            <div className="form-control">
              <label className="label" htmlFor="password">
                <span className="label-text">Password</span>
              </label>
              <input
                id="password"
                type="password"
                placeholder="••••••••"
                className="input input-bordered w-full"
                {...registerForm("password", {
                  required: "Password is required",
                  minLength: {
                    value: 8,
                    message: "Password must be at least 8 characters",
                  },
                })}
              />
              {registerErrors.password && (
                <span className="label-text-alt text-error">
                  {registerErrors.password.message}
                </span>
              )}
            </div>

            <div className="form-control">
              <label className="label" htmlFor="confirmPassword">
                <span className="label-text">Confirm Password</span>
              </label>
              <input
                id="confirmPassword"
                type="password"
                placeholder="••••••••"
                className="input input-bordered w-full"
                {...registerForm("confirm_password", {
                  required: "Confirm Password is required",
                  validate: (value) =>
                    value === watch("password") || "Password do not match",
                })}
              />
              {registerErrors.confirm_password && (
                <span className="label-text-alt text-error">
                  {registerErrors.confirm_password.message}
                </span>
              )}
            </div>

            <button type="submit" className="btn btn-primary w-full">Registration</button>
          </form>

          <button
            type="button"
            className="btn btn-link p-0 justify-start text-primary font-semibold h-auto min-h-0"
            onClick={() => setResendEmail(!resendEmail)}
          >
            Resend Activation Email
          </button>
            
          {resendEmail && (
          <form onSubmit={handleResendSubmit(async (data) => await resendActivationEmail(data))}>
            <div className="form-control">
              <label className="label" htmlFor="email">
                <span className="label-text">Email</span>
              </label>
              <input
                id="email"
                type="email"
                placeholder="name@example.com"
                className="input input-bordered w-full"
                {...resendRegister("email", {
                  required: "Email is Required",
                })}
              />
              {resendErrors.email && (
                <span className="label-text-alt text-error">
                  {resendErrors.email.message}
                </span>
              )}
            </div>
            <button type="submit" className="btn btn-primary w-full mt-2">
              Resend Email
            </button>
          </form>
          )}
          
          <div className="text-center mt-4">
            <p className="text-base-content/70">
              Already have an account?{" "}
              <Link to="/login" className="link link-primary">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;