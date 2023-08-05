import { useEffect, useState } from "react"
import { Link } from "react-router-dom";

function Register(props) {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    useEffect(() => {
        setEmail("");
        setPassword("");
    }, [])

    function handleSubmit(e) {
        e.preventDefault();

        props.onRegister({
            email: email,
            password: password
        })
    }

    function handleEmailChange(e) {
        setEmail(e.target.value)
    }

    function handlePasswordChange(e) {
        setPassword(e.target.value)
    }

    return (
        <section className="dialog dialog__login">
            <h1 className="dialog__header">Регистрация</h1>

            <form className="form" name="register" noValidate onSubmit={handleSubmit}>
                <input 
                    className="form__input"
                    type="email" 
                    name="email" 
                    placeholder="Email" 
                    value={email} 
                    onChange={handleEmailChange}
                />
                <span className="form__error email-error"></span>
                <input 
                    className="form__input"
                    type="password" 
                    name="password" 
                    placeholder="Пароль" 
                    value={password} 
                    onChange={handlePasswordChange}
                />
                <span className="form__error password-error"></span>
                <button className="form__submit" type="submit">Зарегистрироваться</button>
                <Link
                    className="form__link"
                    to="/sign-in"
                >Уже зарегистрированы? Войти</Link>
            </form>
        </section>
    )
}

export default Register