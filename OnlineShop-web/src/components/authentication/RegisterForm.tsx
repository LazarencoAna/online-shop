import React, { useEffect, useState } from 'react';
import { Link as LinkRouter } from 'react-router-dom';

import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
    Box,
    Button,
    Container,
    Checkbox,
    FormHelperText,
    Link as MUILink,
    TextField,
    Typography,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import { useAuth } from '../../common/auth.hook';
function RegisterForm() {
    const auth = useAuth();
    const formik = useFormik({
        initialValues: {
            email: '',
            firstName: '',
            lastName: '',
            password: '',
            policy: false,
        },
        validationSchema: Yup.object({
            email: Yup.string()
                .email('Must be a valid email')
                .max(255)
                .required('Email is required'),
            firstName: Yup.string().max(255).required('First name is required'),
            lastName: Yup.string().max(255).required('Last name is required'),
            password: Yup.string().max(255).required('Password is required'),
            policy: Yup.boolean().oneOf([true], 'This field must be checked'),
        }),
        onSubmit: () => {
            auth?.signupLocal(
                formik.values.firstName,
                formik.values.email,
                formik.values.password
            );
        },
    });

    return (
        <div className="register">
            <div className="register__container">
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
                        <LinkRouter to="/">
                            <Button
                                component="a"
                                startIcon={<ArrowBackIcon fontSize="small" />}
                            >
                                Dashboard
                            </Button>
                        </LinkRouter>
                        <form onSubmit={formik.handleSubmit}>
                            <Box sx={{ my: 3 }}>
                                <Typography color="textPrimary" variant="h4">
                                    Create a new account
                                </Typography>
                                <Typography
                                    color="textSecondary"
                                    gutterBottom
                                    variant="body2"
                                >
                                    Use your email to create a new account
                                </Typography>
                            </Box>
                            <TextField
                                error={Boolean(
                                    formik.touched.firstName &&
                                        formik.errors.firstName
                                )}
                                fullWidth
                                helperText={
                                    formik.touched.firstName &&
                                    formik.errors.firstName
                                }
                                label="First Name"
                                margin="normal"
                                name="firstName"
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                                value={formik.values.firstName}
                                variant="outlined"
                            />
                            <TextField
                                error={Boolean(
                                    formik.touched.lastName &&
                                        formik.errors.lastName
                                )}
                                fullWidth
                                helperText={
                                    formik.touched.lastName &&
                                    formik.errors.lastName
                                }
                                label="Last Name"
                                margin="normal"
                                name="lastName"
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                                value={formik.values.lastName}
                                variant="outlined"
                            />
                            <TextField
                                error={Boolean(
                                    formik.touched.email && formik.errors.email
                                )}
                                fullWidth
                                helperText={
                                    formik.touched.email && formik.errors.email
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
                            <Box
                                sx={{
                                    alignItems: 'center',
                                    display: 'flex',
                                    ml: -1,
                                }}
                            >
                                <Checkbox
                                    checked={formik.values.policy}
                                    name="policy"
                                    onChange={formik.handleChange}
                                />
                                <Typography
                                    color="textSecondary"
                                    variant="body2"
                                >
                                    I have read the
                                    <LinkRouter to="#">
                                        <MUILink
                                            color="primary"
                                            underline="always"
                                            variant="subtitle2"
                                        >
                                            Terms and Conditions
                                        </MUILink>
                                    </LinkRouter>
                                </Typography>
                            </Box>
                            {Boolean(
                                formik.touched.policy && formik.errors.policy
                            ) && (
                                <FormHelperText error>
                                    {formik.errors.policy}
                                </FormHelperText>
                            )}
                            <Box sx={{ py: 2 }}>
                                <Button
                                    color="primary"
                                    disabled={formik.isSubmitting}
                                    fullWidth
                                    size="large"
                                    type="submit"
                                    variant="contained"
                                >
                                    Sign Up Now
                                </Button>
                            </Box>
                            <Typography color="textSecondary" variant="body2">
                                Have an account?
                                <LinkRouter to="/login">
                                    <MUILink
                                        variant="subtitle2"
                                        underline="hover"
                                    >
                                        Sign In
                                    </MUILink>
                                </LinkRouter>
                            </Typography>
                        </form>
                    </Container>
                </Box>
            </div>
        </div>
    );
}

export default RegisterForm;
