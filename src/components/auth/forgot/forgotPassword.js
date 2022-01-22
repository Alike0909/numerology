import React, { useState, useRef } from "react";
import { useAuth } from '../contexts/authContext';
import { useHistory, Link } from "react-router-dom";
import { Container, Card, Button, Form, Alert } from 'react-bootstrap';

export default function ForgotPassword() {
    const emailRef = useRef();
    const { resetPassword } = useAuth();
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const history = useHistory();

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            setMessage("");
            setError("");
            setLoading(true);
            await resetPassword(emailRef.current.value);
            setMessage("Сброс старого пароля прошел успешно! Проверьте почту для дальнейших действий")
        } catch {
            setError('Ошибка при восстановлении пароля! Проверьте свои данные и попробуйте еще раз или обратитесь в службу поддержки!');
        }

        setLoading(false);
    }

    return (
        <Container 
            className="d-flex flex-column align-items-center justify-content-center mw-100" 
            style={{ minHeight: "100vh" }}
        >
            <div className="w-100" style={{ maxWidth: "400px" }}>
                <Card>
                    <Card.Body>
                        <h2 className="text-center mb-4">Восстановление старого пароля</h2>
                        {error && <Alert variant="danger">{error}</Alert>}
                        {message && <Alert variant="success">{message}</Alert>}
                        <Form onSubmit={handleSubmit}>
                            <Form.Group id="email">
                                <Form.Label>Email</Form.Label>
                                <Form.Control type="email" ref={emailRef} required/>
                            </Form.Group>
                            <Button disabled={loading} className="w-100 mt-3" type="submit">Восстановить</Button>
                        </Form>
                        <div className="w-100 text-center mt-2">
                            <Link to="/login">Войти в систему</Link>
                        </div>
                    </Card.Body>
                </Card>
            </div>
        </Container>
    )
}