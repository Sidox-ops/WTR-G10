import React,{ useState} from 'react';
import { Container, Row, Col, Button, Form, Spinner, InputGroup} from 'react-bootstrap';
import { useThemeHook } from '../GlobalComponents/ThemeProvider';
import axios from 'axios';
import 'react-phone-input-2/lib/high-res.css';

const Register = () => {
    const [loading, setLoading] = useState(false);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    // const [email, setEmail] = useState('');
    // const [password, setPassword] = useState('');
    const [theme] = useThemeHook();
    

    const handleSubmit = (event)=>{
        const form = event.currentTarget;
        event.preventDefault();
        const password = form.password.value;
        const firstname = form.firstName.value;
        const lastname = form.lastName.value;
        const email = form.email.value;
        
        if(password && firstname && lastname && email){
            setLoading(true);
            console.log('call api here');
            // request post to api
            const data = {
                password: password,
                firstName: firstname,
                lastName: lastname,
                email: email,
            }
            try {
                axios.post('http://localhost:8080/auth/register', data)
            } catch (error) {
                console.error(error);
                console.log(password, firstname, lastname, email);
                setLoading(false);
            }
        }
    }
    return (
       <Container className="py-5 mt-5">
            <Row className="justify-content-center mt-5">
                <Col xs={11} sm={10} md={8} lg={4} className={`p-4 rounded ${theme? 'text-light bg-dark' : 'text-black bg-light'}`}>
                    <h1 className={`text-center border-bottom pb-3 ${theme? 'text-dark-primary' : 'text-light-primary'}`}>
                        Create Account
                    </h1>
                    <Form onSubmit={handleSubmit}>
                        <Row>
                            <Form.Group className="mb-3 col-lg-6">
                                <Form.Label>First name</Form.Label>
                                <Form.Control name="firstName" type="text" placeholder="First name" required />
                            </Form.Group>
                            <Form.Group className="mb-3 col-lg-6">
                                <Form.Label>Last name</Form.Label>
                                <Form.Control name="lastName" type="text" placeholder="Last name" required />
                            </Form.Group>
                        </Row>
                        <Form.Group className="mb-3">
                            <Form.Label>Email</Form.Label>
                            <Form.Control name="email" type="email" placeholder="Email" required />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Password</Form.Label>
                            <Form.Control name="password" type="password" placeholder="Password" minLength={6} required />
                        </Form.Group>
                        <Button
                            type="submit"
                            // onClick={handleSubmit}
                            className={`${theme? 'bg-dark-primary text-black' : 'bg-light-primary'} m-auto d-block`}
                            disabled={loading}
                            style={{border: 0}}
                        >
                        {loading? 
                            <>
                                <Spinner
                                    as="span"
                                    animation="grow"
                                    size="sm"
                                    role="status"
                                    aria-hidden="true"
                                />
                                &nbsp;Loading...
                            </> : 'Continue'
                        }
                        </Button>
                    </Form>
                </Col>
            </Row>
       </Container>
    );
};

export default Register;