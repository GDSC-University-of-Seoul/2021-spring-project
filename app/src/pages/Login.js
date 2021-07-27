import { Button, TextField } from "@material-ui/core";
import React, { useState } from "react";

function Login() {
  return (
    <section className="login">
      <div className="logo"></div>
      <form className="login-form">
        <TextField
          id="outlined-helperText"
          label="ID"
          variant="outlined"
          required
        />
        <TextField
          id="outlined-password-input"
          label="Password"
          type="password"
          autoComplete="current-password"
          variant="outlined"
          required
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          disableElevation
        >
          로그인
        </Button>
      </form>
    </section>
  );
}
export default Login;
