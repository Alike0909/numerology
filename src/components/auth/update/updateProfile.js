import React, { useState, useRef } from "react";
import { useAuth } from '../contexts/authContext';
import { useHistory, Link } from "react-router-dom";

import { Container, Card, Button, Form, Alert } from 'react-bootstrap';

export default function UpdateProfile() {
    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmRef = useRef();
    const { updateEmail, updatePassword, currentUser } = useAuth();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const history = useHistory();

    function handleSubmit(e) {
        e.preventDefault();
        if (passwordRef.current.value !== passwordConfirmRef.current.value) {
            return setError('Пароли не совпадают!');
        }

        const promises = []
        setLoading(true);
        setError('');

        if (emailRef.current.value !== currentUser.email) {
            promises.push(updateEmail(emailRef.current.value))
        }
        if (passwordRef.current.value && passwordRef.current.value !== currentUser.password) {
            promises.push(updatePassword(passwordRef.current.value))
        }

        Promise.all(promises).then(() => {
            history.push("/dashboard");
        }).catch(() => {
            setError('Ошибка в обновлении данных! Проверьте свои данные и попробуйте еще раз или обратитесь в службу поддержки!');
        }).finally(() => {
            setLoading(false);
        })

    }

    return (
        <Container 
            className="d-flex flex-column align-items-center justify-content-center mw-100" 
            style={{ minHeight: "100vh" }}
        >
            <div className="w-100" style={{ maxWidth: "400px" }}>
                <Card>
                    <Card.Body>
                        <h2 className="text-center mb-4">Изменить данные</h2>
                        {error && <Alert variant="danger">{error}</Alert>}
                        <Form onSubmit={handleSubmit}>
                            <Form.Group id="email">
                                <Form.Label>Email</Form.Label>
                                <Form.Control type="email" ref={emailRef} required defaultValue={currentUser.email}/>
                            </Form.Group>
                            <Form.Group id="password">
                                <Form.Label>Пароль</Form.Label>
                                <Form.Control type="password" ref={passwordRef} placeholder="Оставьте пустым, если не хотите менять"/>
                            </Form.Group>
                            <Form.Group id="password-confirm">
                                <Form.Label>Подтвердите пароль</Form.Label>
                                <Form.Control type="password" ref={passwordConfirmRef} placeholder="Оставьте пустым, если не хотите менять"/>
                            </Form.Group>
                            <Button disabled={loading} className="w-100 mt-3" type="submit">Изменить</Button>
                        </Form>
                    </Card.Body>
                </Card>
                <div className="w-100 text-center mt-2">
                    <Link to="/dashboard">Отменить</Link>
                </div>
            </div>
        </Container>
    )
}