import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"

function Login(props) {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const location = useLocation()

    useEffect(() => {
        setEmail("")
        setPassword("")
    }, [])

    function handleSubmit(e) {
        e.preventDefault();

        props.onLogin({
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
            <h1 className="dialog__header">Вход</h1>
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
                <button className="form__submit" type="submit">Войти</button>
            </form>
        </section>
    )
}

export default Login