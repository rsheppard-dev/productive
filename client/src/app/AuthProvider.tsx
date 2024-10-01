"use client";

import { Authenticator } from "@aws-amplify/ui-react";
import { Amplify } from "aws-amplify";
import "@aws-amplify/ui-react/styles.css";

type AuthProviderProps = {
  children: React.ReactNode;
};

Amplify.configure({
  Auth: {
    Cognito: {
      userPoolId: process.env.NEXT_PUBLIC_COGNITO_USER_POOL_ID as string,
      userPoolClientId: process.env
        .NEXT_PUBLIC_COGNITO_USER_POOL_CLIENT_ID as string,
    },
  },
});

const formFields = {
  signUp: {
    username: {
      order: 1,
      placeholder: "Choose a username",
      label: "Username",
      inputProps: {
        required: true,
      },
    },
    given_name: {
      order: 2,
      label: "Given Name",
      placeholder: "Enter your given name",
      inputProps: {
        required: true,
      },
    },
    family_name: {
      order: 3,
      label: "Family Name",
      placeholder: "Enter your family name",
      inputProps: {
        required: true,
      },
    },
    email: {
      order: 4,
      Placeholder: "Enter your email address",
      type: "email",
      label: "Email",
      inputProps: {
        required: true,
      },
    },
    password: {
      order: 5,
      placeholder: "Choose a password",
      label: "Password",
      type: "password",
      inputProps: {
        required: true,
      },
    },
    confirm_password: {
      order: 6,
      placeholder: "Confirm your password",
      label: "Confirm Password",
      type: "password",
      inputProps: {
        required: true,
      },
    },
  },
};

export default function AuthProvider({ children }: AuthProviderProps) {
  return (
    <div className="mt-5">
      <Authenticator formFields={formFields}>
        {({ user }) =>
          user ? (
            <div>{children}</div>
          ) : (
            <div>
              <h1>Sign in</h1>
              <p>Sign in to view protected content.</p>
            </div>
          )
        }
      </Authenticator>
    </div>
  );
}
