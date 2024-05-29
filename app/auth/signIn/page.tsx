"use client"
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useFormState } from "react-dom";
import signInAction from "./signInAction";

export default function SignIn() {
  const router = useRouter();
  const [form, setForm] = useFormState(signInAction, {success:false});
  
  useEffect(()=>{
    if (form.success){
      router.push('/')
    }
  },[form, router]);

  return (
    <section id="Signin">
        <div className="container">
            <form action={setForm} noValidate>
                <div className="container mt-5">
                    <div className="row justify-content-center">
                        <div className="col-md-6">
                        {form.error && (
                            <div className="alert alert-danger" role="alert">
                                {form.error}
                            </div>
                        )}
                        <div className="card">
                            <div className="card-body">
                            <h1 className="card-title text-center">Welcome</h1>
                            <p className="card-title text-center">Dont have an account? <a>Contact silicon support</a></p>
                            <h5 className="card-title text-center">Sign In</h5>
                            <div className="form-group mb-3">
                            <label htmlFor="email" className="form-label">Email</label>
                            <input type="email" id="email" name="email" className="form-control" placeholder="Enter your email" required />
                            </div>
                            <div className="form-group mb-3">
                            <label htmlFor="password" className="form-label">Password</label>
                            <input type="password" id="password" name="password" className="form-control" placeholder="Enter your password" required />
                            </div>
                            <div className="form-check mb-3">
                            <input type="checkbox" className="form-check-input" id="RememberMe" name="RememberMe" />
                            <label className="form-check-label" htmlFor="RememberMe">Remember Me</label>
                            </div>
                            <button id="form-button" className="btn btn-primary w-100" type="submit">Sign In</button>
                            <div className="text-center mt-3">
                                <a href="#" id="form-forgot" className="text-decoration-none">Forgot your password?</a>
                            </div>
                            </div>
                        </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    </section>
  );
}
