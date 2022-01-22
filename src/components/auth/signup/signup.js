import React, { useEffect, useState, useRef } from "react";
import { useAuth } from '../contexts/authContext';
import { useHistory, Link } from "react-router-dom";
import axios from 'axios'
import { db, storage } from '../../../firebase';

import './index.css'
import { Container, Card, Button, Form, Alert, Row, Col } from 'react-bootstrap';

export default function Signup(props) {
    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmRef = useRef();
    const nameRef = useRef();
    const surnameRef = useRef();
    const birthdayRef = useRef();
    const { signup } = useAuth();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [additionals, setAdditionals] = useState([])
    const [user, setUser] = useState([])
    const history = useHistory();

    async function telegramBot(text) {
        const token = "5056042215:AAGpg7gL298oxdvjAT9gDRW7-UeuQSTZk00"
        const chat_id = -621873701

        await axios.post(`https://api.telegram.org/bot${token}/sendMessage?chat_id=${chat_id}&text=${text}`)
    }

    async function fetchAdditionals() {
        db.collection("additionals").orderBy('id', 'asc')
            .get()
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    setAdditionals(prev => [...prev, doc.data()]);
                });
            })
            .catch((error) => {
                console.log("Error getting documents: ", error);
            });
    }

    async function checkUser(ref) {
        var docRef = db.collection("user").doc(ref)
        docRef.get().then((doc) => {
            if (doc.exists) {
                fetchUser(ref)
                localStorage.setItem('ref', JSON.stringify({ data: ref }))
            } else {
                db.collection("user")
                    .get()
                    .then((querySnapshot) => {
                        querySnapshot.forEach((doc) => {
                            if (doc.data()?.login == ref) {
                                fetchUser(doc.id)
                                localStorage.setItem('ref', JSON.stringify({ data: doc.id }))
                            } else {
                                if (JSON.parse(localStorage.getItem('ref')).data != "") {
                                    fetchUser(JSON.parse(localStorage.getItem('ref')).data)
                                }
                            }
                        });
                    })
            }
        }).catch((error) => {
            console.log("Error getting document:", error);
        });
    }

    async function fetchUser(ref) {
        var docRef = db.collection("user").doc(ref)
        docRef.get().then((doc) => {
            if (doc.exists) {
                setUser(doc.data());
            } else {
                console.log("No such document!");
            }
        }).catch((error) => {
            console.log("Error getting document:", error);
        });
    }

    async function handleSubmit(e) {
        e.preventDefault();
        if (passwordRef.current.value !== passwordConfirmRef.current.value) {
            return setError('Пароли не совпадают!');
        }

        try {
            setError('');
            setLoading(true);
            await signup (
                emailRef.current.value,
                passwordRef.current.value,
                birthdayRef.current.value,
                nameRef.current.value,
                surnameRef.current.value,
                additionals,
                localStorage.getItem('ref') === null ? `` : JSON.parse(localStorage.getItem('ref')).data
            );
            telegramBot(`Новый пользователь:%0AИмя:<strong>${nameRef.current.value}</strong> <strong>${surnameRef.current.value}</strong>%0AДата рождения: ${birthdayRef.current.value}%0AПригласитель: ${localStorage.getItem('ref') === null ? `нету` : `${user?.name} ${user?.surname}`}%0A#new`)
            history.push("/dashboard/prognostics");
        } catch {
            setError('Ошибка в создании аккаунта! Проверьте свои данные и попробуйте еще раз или обратитесь в службу поддержки!');
        }

        setLoading(false);
    }

    useEffect(() => {
        fetchAdditionals()

        if (props.location.search != "") {
            checkUser(props.location.search?.replace("?ref=", ""))
        } else {
            if (JSON.parse(localStorage.getItem('ref'))?.data != "") {
                fetchUser(JSON.parse(localStorage.getItem('ref'))?.data)
            }
        }
    }, [])

    return (
        <Container 
            className="d-flex flex-column align-items-center justify-content-center mw-100" 
            style={{ minHeight: "100vh" }}
        >
            <div className="w-100" style={{ maxWidth: "400px" }}>
                <Card>
                    <Card.Body>
                        <h2 className="text-center mb-4">Регистрация</h2>
                        {error && <Alert variant="danger">{error}</Alert>}
                        <Form onSubmit={handleSubmit}>
                            <Form.Group id="email">
                                <Form.Label>Email</Form.Label>
                                <Form.Control type="email" ref={emailRef} required/>
                            </Form.Group>
                            <Row className="mt-2 mb-2">
                                <Form.Group as={Col} id="email">
                                    <Form.Label>Имя</Form.Label>
                                    <Form.Control type="text" ref={nameRef} aria-describedby="infoHelp" required/>
                                </Form.Group>
                                <Form.Group as={Col} id="email">
                                    <Form.Label>Фамилия</Form.Label>
                                    <Form.Control type="text" ref={surnameRef} aria-describedby="infoHelp" required/>
                                </Form.Group>
                                <Form.Text id="infoHelp" muted>
                                    Укажите официальное ФИО, которое вы используете в вашей стране проживания
                                </Form.Text>
                            </Row>
                            {
                                localStorage.getItem('ref') === null ?
                                ''
                                :
                                <Form.Group id="ref" className="mb-2">
                                    <Form.Label>Ваш пригласитель</Form.Label>
                                    <Form.Control type="text" value={`${user?.name} ${user?.surname}`} disabled/>
                                </Form.Group>
                            }
                            <Form.Group id="birthday" className="mb-2">
                                <Form.Label>Дата рождения</Form.Label>
                                <Form.Control type="date" ref={birthdayRef} required/>
                            </Form.Group>
                            <Form.Group id="password" className="mb-2">
                                <Form.Label>Пароль</Form.Label>
                                <Form.Control type="password" ref={passwordRef} required/>
                            </Form.Group>
                            <Form.Group id="password-confirm">
                                <Form.Label>Подтвердите пароль</Form.Label>
                                <Form.Control type="password" ref={passwordConfirmRef} required/>
                            </Form.Group>
                            <Button disabled={loading} className="w-100 mt-3" type="submit">Создать аккаунт</Button>
                        </Form>
                    </Card.Body>
                </Card>
                <div className="w-100 text-center mt-2">
                    У вас уже есть аккаунт? <Link to="/login" class="card-link">Войти</Link>
                </div>
            </div>
        </Container>
    )
}