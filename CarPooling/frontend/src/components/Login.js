import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Container, Row, Col, Form, Button, Alert,Image } from 'react-bootstrap';
import { useAuth } from '../routes/AuthContext';
import '../App.css';

const Login = () => {
    const [user, setUser] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const auth = useAuth();

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            await auth.loginAction({ user, password });
            const link = ()=>{
                if(localStorage.role === "admin"){
                    return "/AdminDashBoard"; 
                }
                else if(localStorage.role === "driver"){
                    return "/EmployeeDashBoard";
                }
                else if(localStorage.role === "customer"){
                    return "/UserDashBoard";
                }
            }
            navigate(link); 
        } catch (err) {
            setError('Invalid username or password');
            setLoading(false);
        }
    };

    return (
        <Container fluid className="d-flex align-items-center justify-content-center vh-100">
            <Row>
                <Col className='m-5 p-5'>
                        <Image
                    src={"/images/login_page_image.jpg"}
                    alt="People around a car"
                    fluid
                />
                </Col>
                
                <Col className='mt-4 pt-3'>
                    <h1 className='display-6 h1-border'>Login</h1>
                    <br />
                    <Form onSubmit={handleLogin}>
                        <Form.Group controlId="user" className="mb-3">
                            <Form.Label>UserName</Form.Label>
                            <Form.Control
                                type="text"
                                value={user}
                                onChange={(e) => setUser(e.target.value)}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="password" className="mb-3">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </Form.Group>
                        <Form.Group>
                            <p>
                                <Link to="/forgot" className="d-flex align-items-center mb-2 mb-lg-0 text-decoration-none">
                                    Forgot Password?
                                </Link>
                            </p>
                        </Form.Group>
                        {error && <Alert variant="danger">{error}</Alert>}
                        <div className="d-grid">
                            <Button type="submit" variant="primary" disabled={loading}>
                                {loading ? 'Logging in...' : 'Login'}
                            </Button>
                        </div>
                        <Form.Group>
                            <p className="text-dark m-2">Don't have an account?</p>
                            <Link to="/GetStarted" className="d-flex align-items-center m-2 mb-lg-0 text-decoration-none">
                                Sign Up
                            </Link>
                        </Form.Group>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};

export default Login;
