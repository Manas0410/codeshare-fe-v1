import { Formik, Form, Field, ErrorMessage } from "formik";
import { ChangeEvent, useEffect, useState } from "react";
import * as Yup from "yup";
import g from "./google.svg";

// email validation schema
const emailValidationSchema = Yup.object({
  data: Yup.string()
    .email("Invalid email address")
    .required("Email address is required"),
});

// mobile number validation schema
const mobileNumberValidationSchema = Yup.object({
  data: Yup.string()
    .matches(/^[0-9]{10}$/, "Mobile number must be exactly 10 digits")
    .required("Mobile number is required"),
});

const FormComp = () => {
  const [InputData, setInputData] = useState<string>("");
  const [validationSchema, setValidationSchema] = useState<any>();

  // useEffect to decide validation schema
  useEffect(() => {
    console.log(InputData);
    if (InputData === "") return;
    if (!isNaN(Number(InputData))) {
      setValidationSchema(mobileNumberValidationSchema);
    } else {
      setValidationSchema(emailValidationSchema);
    }
  }, [InputData]);

  const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputData(event.target.value);
  };

  const initialValues = {
    data: "",
  };

  const onSubmit = (
    values: any,
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
  ) => {
    console.log(values);
    setSubmitting(false);
  };

  return (
    <section className="flex flex-col items-center justify-center">
      <div className="bg-blue-800 h-max w-max p-10 flex items-center justify-center">
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          validationSchema={validationSchema}
          // validateOnChange={true}
          // validateOnBlur={false}
        >
          {({ isSubmitting, handleChange, values }) => (
            <Form className="flex flex-col bg-white w-[332px] h-[600px] p-[20px]">
              <div className="text-xl font-[500] text-gray-500 text-[16px] ">
                Login to dashboard
              </div>
              <label htmlFor="data" className="text-[14px] text-gray-400 mt-10">
                Email or Phone
              </label>
              <Field
                className="border-gray-400 border-b-[1px] outline-none mt-4 w-full"
                type="text"
                id="data"
                name="data"
                onChange={(event: ChangeEvent<HTMLInputElement>) => {
                  handleChange(event);
                  onInputChange(event);
                }}
                value={values.data}
              />
              <ErrorMessage
                name="data"
                component="div"
                className="text-[10px] text-red-600"
              />
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-blue-500 w-full text-xs p-1 text-white h-10 mt-6 rounded-sm"
              >
                Next
              </button>
              <div className="text-center text-gray-400 flex items-center gap-2 mt-4">
                <hr className="w-[40%]" /> <span>or</span>
                <hr className="w-[40%]" />
              </div>
              <button
                type="submit"
                className="bg-blue-500 w-[160px] m-auto mt-8 text-xs px-[3px]  text-white flex gap-3 h-[32px] justify-between items-center"
              >
                <img src={g} className="h-[26px] bg-white " /> Sign In with
                google
              </button>
              <div className="text-[12px] text-gray-400 flex flex-col justify-center w-full">
                <span className="text-center">
                  protected by reCAPTCHA google
                </span>
                <span className="text-center text-blue-500">
                  Privacy Policy<span className="text-gray-400"> & </span>terms
                  of services
                </span>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </section>
  );
};

export default FormComp;
