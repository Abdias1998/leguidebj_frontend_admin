
import { useCallback, useState } from "react";
import Head from "next/head";
import NextLink from "next/link";
import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  Box,
  Button,
  CircularProgress,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useAuth } from "src/hooks/use-auth";
import { Layout as AuthLayout } from "src/layouts/auth/layout";

const Page = () => {
  const router = useRouter();
  const auth = useAuth();  
  const [method, setMethod] = useState("identifier");
  const [loading, setLoading] = useState(false); // Ajout de l'état pour le chargement du formulaire

  const formik = useFormik({
    initialValues: {
      identifier: "",
      password: "",
      submit: null,
    },
    validationSchema: Yup.object({
      identifier: Yup.string()
        .email("Saisissez un mail valide")
        .max(255)
        .required("Ce champ est requis"),
      password: Yup.string().max(255).required("Ce champ est requis"),
    }),
    onSubmit: async (values, helpers) => {
      setLoading(true); // Activer le chargement lors de la soumission du formulaire
      try {
        await auth.signIn(values.identifier, values.password);
        router.push("/admin/dashboard");
      } catch (err) {
        helpers.setStatus({ success: false });
        helpers.setErrors({ submit: err.message });
      } finally {
        setLoading(false); // Désactiver le chargement après la soumission du formulaire
      }
    },
  });

  const handleMethodChange = useCallback((event, value) => {
    setMethod(value);
  }, []);

  return (
    <>
      <Head>
        <title> Connexion | LE GUIDE BJ</title>
      </Head>
      <Box
        sx={{
          backgroundColor: "background.paper",
          flex: "1 1 auto",
          alignItems: "center",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            maxWidth: 550,
            px: 3,
            py: "100px",
            width: "100%",
          }}
        >
          <div>
            <Stack spacing={1} sx={{ mb: 3 }}>
              <Typography color="text.secondary" variant="body2">
                <Typography variant="h4">Connexion au compte Admin</Typography>
              </Typography>
            </Stack>

            {method === "identifier" && (
              <form noValidate onSubmit={formik.handleSubmit}>
                <Stack spacing={3}>
                  <TextField
                    error={!!(formik.touched.identifier && formik.errors.identifier)}
                    fullWidth
                    helperText={formik.touched.identifier && formik.errors.identifier}
                    label="Email Address or Phone number"
                    name="identifier"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    type="email"
                    value={formik.values.identifier}
                  />
                  <TextField
                    error={!!(formik.touched.password && formik.errors.password)}
                    fullWidth
                    helperText={formik.touched.password && formik.errors.password}
                    label="Password"
                    name="password"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    type="password"
                    value={formik.values.password}
                  />
                </Stack>
                {formik.errors.submit && (
                  <Typography color="error" sx={{ mt: 3 }} variant="body2">
                    {formik.errors.submit}
                  </Typography>
                )}

                {/* Afficher le bouton normal ou l'icône de chargement en fonction de l'état de loading */}
                {loading ? (
                  <CircularProgress sx={{ mt: 3 }} color="primary" />
                ) : (
                  <Button
                    fullWidth
                    size="large"
                    sx={{ mt: 3 }}
                    type="submit"
                    variant="contained"
                    style={{ backgroundColor: "#E50913" }}
                  >
                    Continue
                  </Button>
                )}
              </form>
            )}
          </div>
        </Box>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <AuthLayout>{page}</AuthLayout>;

export default Page;
