import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../services/authService";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { toast } from "react-hot-toast";
import { setCredentials } from "../store/slices/authSlice";

const Login = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    email: Yup.string().email("Email inválido").required("Requerido"),
    password: Yup.string().required("Requerido"),
  });

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-slate-200 rounded-lg shadow">
      <h1 className="text-2xl font-bold mb-6 text-center">Iniciar Sesión</h1>
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={validationSchema}
        onSubmit={async (values, { setSubmitting }) => {
          try {
            const { data } = await loginUser(values);
            dispatch(setCredentials(data.data));
            navigate("/");
            toast.success("Sesión iniciada correctamente");
          } catch (error) {
            toast.error("Error al iniciar sesión");
            console.error(error);
          }
          setSubmitting(false);
        }}
      >
        {({ isSubmitting }) => (
          <Form className="space-y-4">
            <div>
              <label className="block text-sm font-medium">Email</label>
              <Field
                name="email"
                type="email"
                className="mt-1 block w-full rounded border-black-300 "
              />
              <ErrorMessage
                name="email"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium">Contraseña</label>
              <Field
                name="password"
                type="password"
                className="mt-1 block w-full rounded border-gray-300"
              />
              <ErrorMessage
                name="password"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-400"
            >
              Iniciar Sesión
            </button>

            <div className="text-center mt-4">
              <Link to="/register" className="text-primary hover:underline">
                ¿No tienes cuenta? Regístrate
              </Link>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Login;
