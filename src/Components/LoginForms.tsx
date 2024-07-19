import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useUser } from "../Hooks/auth/useUser";
import { useNavigate } from "react-router-dom";

interface SignUpValues {
  name: string;
  email: string;
  password: string;
}

const validationSchema = Yup.object({
  name: Yup.string().required("Required"),
  email: Yup.string().email("Invalid email address").required("Required"),
  password: Yup.string().required("Required"),
});

export const SignUp = ({ navUrl }: { navUrl: string }) => {
  const navigate = useNavigate();
  const initialValues: SignUpValues = {
    name: "",
    email: "",
    password: "",
  };

  const { signUp } = useUser();

  const onSignUp = async (
    values: SignUpValues,
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
  ) => {
    await signUp(values.email, values.password, values.name);
    navigate(navUrl);
    console.log(values, "up");
    setSubmitting(false);
  };

  return (
    <section>
      <Formik
        initialValues={initialValues}
        onSubmit={onSignUp}
        validationSchema={validationSchema}
      >
        {({ isSubmitting }) => (
          <Form className="max-w-md mx-auto p-4 bg-white shadow-md rounded">
            <div className="mb-4">
              <label htmlFor="name" className="labelstyles">
                Name
              </label>
              <Field type="text" name="name" className="fieldstyles" />
              <ErrorMessage
                name="name"
                component="div"
                className="errorMessage"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="labelstyles">
                Email
              </label>
              <Field type="email" name="email" className="fieldstyles" />
              <ErrorMessage
                name="email"
                component="div"
                className="errorMessage"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="labelstyles">
                Password
              </label>
              <Field type="password" name="password" className="fieldstyles" />
              <ErrorMessage
                name="password"
                component="div"
                className="errorMessage"
              />
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="buttonstyles"
            >
              Submit
            </button>
          </Form>
        )}
      </Formik>
    </section>
  );
};

interface SignInValues {
  email: string;
  password: string;
}

export const SignIn = ({ navUrl }: { navUrl: string }) => {
  const navigate = useNavigate();
  const initialValues: SignInValues = {
    email: "",
    password: "",
  };
  const { signIn } = useUser();

  const onSignIn = async (
    values: SignInValues,
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
  ) => {
    await signIn(values.email, values.password);
    navigate(navUrl);
    setSubmitting(false);
  };

  return (
    <section>
      <Formik initialValues={initialValues} onSubmit={onSignIn}>
        {({ isSubmitting }) => (
          <Form className="max-w-md mx-auto p-4 bg-white shadow-md rounded">
            <div className="mb-4">
              <label htmlFor="email" className="labelstyles">
                Email
              </label>
              <Field type="email" name="email" className="fieldstyles" />
              <ErrorMessage
                name="email"
                component="div"
                className="errorMessage"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="labelstyles">
                Password
              </label>
              <Field type="password" name="password" className="fieldstyles" />
              <ErrorMessage
                name="password"
                component="div"
                className="errorMessage"
              />
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="buttonstyles"
            >
              Submit
            </button>
          </Form>
        )}
      </Formik>
    </section>
  );
};
