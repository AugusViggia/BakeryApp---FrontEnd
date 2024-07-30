import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { setUser, setIdToken, setUserName } from "../redux/slice/authSlice";
import { validations } from "../validations/validations";
import { firebase_auth } from "../firebase/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { createUserWithEmailAndPassword } from "firebase/auth";

export const useUserHandlers = (
    setEmailError,
    setPasswordError,
    setUsernameError,
    setRegistrationError
) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { isEmailValid, isPasswordValid, isUsernameValid } = validations();

    const handleLogIn = async (email, password) => {
        try {
            const response = await signInWithEmailAndPassword(
                firebase_auth,
                email,
                password
            );

            console.log(response);

            dispatch(setUser(response.user.email));
            localStorage.setItem("userEmail", email);
            navigate("/");
        } catch (error) {
            console.log("Error al iniciar sesion: ", error);
        }
    };

    const handleRegister = async (
        event,
        email,
        username,
        password,
        confirmPassword
    ) => {
        event.preventDefault();
        setEmailError("");
        setPasswordError("");
        setUsernameError("");
        setRegistrationError("");

        if (!isEmailValid(email)) {
            setEmailError("Correo electrónico inválido");
            return;
        }

        if (!isUsernameValid(username)) {
            setUsernameError("El nombre de usuario debe tener al menos 4 caracteres");
            return;
        }

        if (!isPasswordValid(password)) {
            setPasswordError("La contraseña debe tener al menos 6 caracteres");
            return;
        }

        if (password !== confirmPassword) {
            setPasswordError("Las contraseñas no coinciden");
            return;
        }

        try {
            const response = await createUserWithEmailAndPassword(
                firebase_auth,
                email,
                password
            );
            console.log(response);

            dispatch(setUser(response.user.email));
            dispatch(setUserName(username));
            dispatch(setIdToken(response._tokenResponse.idToken));

            localStorage.setItem("userEmail", email);
            navigate("/login");
        } catch (error) {
            console.log("Error durante el registro Firebase:", error);
        }
    };

    return {
        handleLogIn,
        handleRegister,
    };
};
