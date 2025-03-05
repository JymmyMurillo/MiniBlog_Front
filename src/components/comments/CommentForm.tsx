import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useAppDispatch } from "../../hooks/storeHooks";
import { createComment } from "../../store/slices/postSlice";
import { toast } from "react-hot-toast";

interface Props {
  postId: number;
}

const CommentForm: React.FC<Props> = ({ postId }) => {
  const dispatch = useAppDispatch();

  const validationSchema = Yup.object({
    content: Yup.string().required("El comentario no puede estar vacío"),
  });

  return (
    <div className="mt-6">
      <Formik
        initialValues={{ content: "" }}
        validationSchema={validationSchema}
        onSubmit={async (values, { resetForm }) => {
          try {
            await dispatch(createComment({ postId, content: values.content }));
            resetForm();
            toast.success("Comentario agregado");
          } catch (error) {
            toast.error("Error al publicar comentario");
            console.log(error);
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <Field
              name="content"
              as="textarea"
              rows={3}
              placeholder="Escribe un comentario..."
              className="w-full p-2 border rounded-lg"
            />
            <ErrorMessage
              name="content"
              component="div"
              className="text-red-500 text-sm mt-1"
            />

            <button
              type="submit"
              disabled={isSubmitting}
              className="mt-2 bg-primary text-white px-4 py-2 rounded hover:bg-primary-dark"
            >
              {isSubmitting ? "Publicando..." : "Publicar comentario"}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default CommentForm;
