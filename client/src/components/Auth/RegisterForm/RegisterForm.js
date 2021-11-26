import React from 'react';
import { Form, Button } from "semantic-ui-react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast, Toast } from "react-toastify";
import { useMutation } from "@apollo/client";
import { REGISTER } from '../../../gql/user';
import "./RegisterForm.scss";

export default function RegisterForm(props) {
    const { setShowLogin } = props;
    const [register] = useMutation(REGISTER);

    const formik = useFormik({
        initialValues: initialValues(),
        validationSchema: Yup.object({
            name: Yup.string().required("El nombre es obligatorio"),
            username: Yup.string()
                .matches(/^[a-zA-Z0-9-]*$/, 
                "El nombre de usuario no puede tener espacios."
                ).required("El nombre de usuario es obligatorio"),
            email: Yup.string()
                .email("El email no es valido").required("El email es obligatorio",),
            password: Yup.string()
                .required("El password es obligatoria")
                .oneOf([Yup.ref("repeatPassword")], "Los passwords no coinciden"),
            repeatPassword: Yup.string()
                .required("El password es obligatoria")
                .oneOf([Yup.ref("password")], "Los passwords no coinciden")
        }),
        onSubmit: async (formData) => {
            try{
                const newUser = formData;
                delete newUser.repeatPassword;
                const result = await register({
                    variables: {
                        input: newUser,
                    }
                });
                toast.success("Usuario registrado correctamente");
                setShowLogin(true);                
            }catch(error) {
                toast.error(error.message);
                console.log(error.message);    
            }
        }
    });

    return (
        <>
            <h2 className="register-form-title">
                Registrate para ver fotos y vídeos de tus amigos
            </h2>
            <Form className="register-form" onSubmit={formik.handleSubmit}>
                <Form.Input
                    type="text"
                    placeholder="Nombre y Apellidos"
                    name="name"
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    error={formik.errors.name && true}
                />
                <Form.Input
                    type="text"
                    placeholder="Nombre de usuario"
                    name="username"
                    value={formik.values.username}
                    onChange={formik.handleChange}
                    error={formik.errors.username && true}
                />
                <Form.Input
                    type="text"
                    placeholder="Correo electronico"
                    name="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    error={formik.errors.email && true}
                />
                <Form.Input
                    type="password"
                    placeholder="Contraseña"
                    name="password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    error={formik.errors.password && true}
                />
                <Form.Input
                    type="password"
                    placeholder="Repetir Contraseña"
                    name="repeatPassword"
                    value={formik.values.repeatPassword}
                    onChange={formik.handleChange}
                    error={formik.errors.repeatPassword && true}
                />
                <Button type="submit" className="btn-submit">
                    Registrarse
                </Button>
            </Form>
        </>
    );
}

function initialValues() {
    return {
        name: "",
        username: "",
        email: "",
        password: "",
        repeatPassword: ""
    }
}
