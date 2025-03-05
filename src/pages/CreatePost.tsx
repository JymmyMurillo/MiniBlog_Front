import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { createPost } from "../store/slices/postSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

const CreatePost = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    title: Yup.string().required("El título es requerido"),
    content: Yup.string().required("El contenido es requerido"),
  });

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded-lg shadow">
      <h1 className="text-2xl font-bold mb-6">Nuevo Post</h1>
      <Formik
        initialValues={{ title: "", content: "" }}
        validationSchema={validationSchema}
        onSubmit={async (values, { setSubmitting }) => {
          try {
            await dispatch(createPost(values)).unwrap();
            navigate("/");
            toast.success("Post creado exitosamente");
          } catch (error) {
            toast.error("Error al crear el post");
            console.error(error);
          }
          setSubmitting(false);
        }}
      >
        {({ isSubmitting }) => (
          <Form className="space-y-4">
            <div>
              <label className="block text-sm font-medium">Título</label>
              <Field
                name="title"
                className="mt-1 block w-full rounded border-gray-300"
              />
              <ErrorMessage
                name="title"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium">Contenido</label>
              <Field
                name="content"
                as="textarea"
                rows={4}
                className="mt-1 block w-full rounded border-gray-300"
              />
              <ErrorMessage
                name="content"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-primary text-white px-4 py-2 rounded hover:bg-primary-dark"
            >
              {isSubmitting ? "Publicando..." : "Publicar"}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default CreatePost;
