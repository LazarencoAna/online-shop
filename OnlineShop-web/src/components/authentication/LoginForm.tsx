import React, { useEffect } from 'react';
import { Link as LinkRouter, useLocation, useNavigate } from 'react-router-dom';

import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
    Box,
    Button,
    Container,
    Grid,
    Link as MUILink,
    TextField,
    Typography,
} from '@mui/material';
import { Google as GoogleIcon } from '../../asset/inline/icons/google';

import {
    useAuth,
    useCustomSignInWithEmailAndPassword,
} from '../../common/auth.hook';
import { CustomState } from '../../common/route.types';

function LoginForm() {
    const auth = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: Yup.object({
            email: Yup.string()
                .email('Must be a valid email')
                .max(255)
                .required('Email is required'),
            password: Yup.string().max(255).required('Password is required'),
        }),
        onSubmit: () => {
            signInWithEmailAndPassword(
                formik.values.email,
                formik.values.password
            );
            // router.push('/');
        },
    });
    const [signInWithEmailAndPassword, user, loading, error] =
        useCustomSignInWithEmailAndPassword();

    useEffect(() => {
        if (auth?.user && auth?.userProfile) {
            const state = location?.state as CustomState;
            if (state?.from?.pathname) {
                navigate(state?.from?.pathname);
            } else navigate('/admin');
        }
    }, [auth?.user, auth?.userProfile]);

    return (
        <div className="login__container">
            <Box
                component="main"
                sx={{
                    alignItems: 'center',
                    display: 'flex',
                    flexGrow: 1,
                    minHeight: '100%',
                }}
            >
                <Container maxWidth="sm">
                    <form onSubmit={formik.handleSubmit}>
                        <Box sx={{ my: 3 }}>
                            <Typography color="textPrimary" variant="h4">
                                Sign in
                            </Typography>
                            <Typography
                                color="textSecondary"
                                gutterBottom
                                variant="body2"
                            >
                                Sign in on the internal platform
                            </Typography>
                        </Box>
                        <Grid container spacing={3}>
                            <Grid item xs={12} md={12}>
                                <Button
                                    fullWidth
                                    color="error"
                                    startIcon={<GoogleIcon />}
                                    onClick={() => auth?.loginWithGoogle()}
                                    size="large"
                                    variant="contained"
                                >
                                    Login with Google
                                </Button>
                            </Grid>
                        </Grid>
                        <Box
                            sx={{
                                pb: 1,
                                pt: 3,
                            }}
                        >
                            <Typography
                                align="center"
                                color="textSecondary"
                                variant="body1"
                            >
                                or login with email address
                            </Typography>
                        </Box>
                        <TextField
                            error={
                                Boolean(
                                    formik.touched.email && formik.errors.email
                                ) || Boolean(error?.message)
                            }
                            fullWidth
                            helperText={
                                (formik.touched.email && formik.errors.email) ||
                                error?.message
                            }
                            label="Email Address"
                            margin="normal"
                            name="email"
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            type="email"
                            value={formik.values.email}
                            variant="outlined"
                        />
                        <TextField
                            error={Boolean(
                                formik.touched.password &&
                                    formik.errors.password
                            )}
                            fullWidth
                            helperText={
                                formik.touched.password &&
                                formik.errors.password
                            }
                            label="Password"
                            margin="normal"
                            name="password"
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            type="password"
                            value={formik.values.password}
                            variant="outlined"
                        />
                        <Box sx={{ py: 2 }}>
                            <Button
                                color="primary"
                                disabled={loading}
                                fullWidth
                                size="large"
                                type="submit"
                                variant="contained"
                            >
                                Sign In Now
                            </Button>
                        </Box>
                        <Typography color="textSecondary" variant="body2">
                            Don&apos;t have an account?
                            {/* <LinkRouter to="/register"> */}
                            <MUILink
                                // to="/register"
                                variant="subtitle2"
                                underline="hover"
                                sx={{
                                    cursor: 'pointer',
                                }}
                            >
                                Sign Up
                            </MUILink>
                            {/* </LinkRouter> */}
                        </Typography>
                    </form>
                </Container>
            </Box>
        </div>
    );
}

export default LoginForm;
