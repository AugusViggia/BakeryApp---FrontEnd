import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { setUser, setIdToken, setUserName , clearUser} from "../redux/slice/authSlice";
import { validations } from "../validations/validations";
import { firebase_auth } from "../firebase/firebase";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut
} from "firebase/auth";

export const useUserHandlers = (
    setEmailError,
    setPasswordError,
    setUsernameError,
    setRegistrationError
) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { isEmailValid, isPasswordValid, isUsernameValid } = validations();

    const handleLogIn = async (email, password, setError) => {
        try {
            const response = await signInWithEmailAndPassword(
                firebase_auth,
                email,
                password
            );

            console.log(response);

            dispatch(setUser(response.user.email));
            dispatch(setIdToken(response._tokenResponse.idToken));
            localStorage.setItem("userEmail", email);
            navigate("/");
        } catch (error) {
            console.log("Error al iniciar sesión: ", error);
            console.log(error.code);
            
            switch (error.code) {
                case "auth/wrong-password":
                    setError("Incorrect password. Please try again.");
                    break;
                case "auth/user-not-found":
                    setError(
                        "No user found with this email. Please check the email or register."
                    );
                    break;
                case "auth/invalid-email":
                    setError("Invalid email format. Please check the email.");
                    break;
                default:
                    setError("An error occurred. Maybe the password or email is incorrect.");
                    break;
            }
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
            dispatch(setUser(response.user.email));
            dispatch(setUserName(username));
            dispatch(setIdToken(response._tokenResponse.idToken));
            localStorage.setItem("userEmail", email);
            navigate("/");
        } catch (error) {
            console.log("Error al registrar: ", error);
            if (error.code === "auth/email-already-in-use") {
                setRegistrationError("This email is already in use.");
            } else {
                setRegistrationError("An error occurred. Please try again.");
            }
        }
    };

    const handleLogOut = async () => {
        try {
            await signOut(firebase_auth);
            dispatch(clearUser());
            localStorage.removeItem("userEmail");
            navigate("/login");
        } catch (error) {
            console.log("Error al cerrar sesión: ", error);
        }
    };

    return {
        handleLogIn,
        handleRegister,
        handleLogOut
    };
};
