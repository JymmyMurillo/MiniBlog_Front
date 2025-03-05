import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { registerUser } from "../services/authService";
import { useDispatch } from "react-redux";
import { setCredentials } from "../store/slices/authSlice";
import { Link } from "react-router-dom";

const validationSchema = Yup.object({
  name: Yup.string().required("Requerido"),
  email: Yup.string().email("Email inválido").required("Requerido"),
  password: Yup.string().min(6, "Mínimo 6 caracteres").required("Requerido"),
});

const Register = () => {
  const dispatch = useDispatch();

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-slate-200 rounded-lg shadow">
      <h1 className="text-2xl font-bold mb-6 text-center">Registro</h1>
      <Formik
        initialValues={{ name: "", email: "", password: "" }}
        validationSchema={validationSchema}
        onSubmit={async (values, { setSubmitting }) => {
          try {
            const { data } = await registerUser(values);
            dispatch(setCredentials(data.data));
          } catch (error) {
            console.error(error);
          }
          setSubmitting(false);
        }}
      >
        {({ isSubmitting }) => (
          <Form className="space-y-4">
            <div>
              <label className="block text-sm font-medium">Nombre</label>
              <Field
                name="name"
                type="text"
                className="mt-1 block w-full rounded border-gray-300"
              />
              <ErrorMessage
                name="name"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            {/* Campos similares para email y password */}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-primary-dark"
            >
              Registrarse
            </button>

            <div className="text-center mt-4">
              <Link to="/login" className="text-primary hover:underline">
                ¿Ya tienes cuenta? Inicia sesión
              </Link>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Register;
