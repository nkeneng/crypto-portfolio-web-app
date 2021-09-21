import React, {useState} from 'react';
import {Link, useHistory} from 'react-router-dom';
import {Form, InputGroup, Button, Col} from 'react-bootstrap';

import facebook from '../../../assets/img/others/facebook.png';
import google from '../../../assets/img/others/google.png';
import {connect} from "react-redux";
import {userLoginAttempt, userProfileFetch} from "../../../reducers/actions";
import {createAccount} from "../../Utility/auth/createAccount";

const mapStateToProps = state => ({
    ...state.auth
});

const mapDispatchToProps = {
    userProfileFetch
};

function Content(props) {
    const [validated, setValidated] = useState(false);
    const [emailValue, setEmailValue] = useState('');
    const [passwordValue, setPasswordValue] = useState('');
    const [firstname, setfirstname] = useState('');
    const [lastname, setlastname] = useState('');
    const [error, setError] = useState('');
    const history = useHistory()


    const handleSubmit = async (event) => {
        setError('')
        const form = event.currentTarget;
        if (form.checkValidity() === true) {
            event.preventDefault();
            event.stopPropagation();
            // firebase call
            try {
                const newUserInfo = {
                    firstname,
                    lastname,
                    email: emailValue,
                    password: passwordValue,
                };
                const userId = await createAccount(newUserInfo);
                console.log('sent', userId);
                props.userProfileFetch(userId)
                history.push('/');
            } catch (e) {
                setError(e.message);
            }
            return;
        }
        event.preventDefault();
        event.stopPropagation();
        setValidated(true);
    }


    return (
        <div className="ms-content-wrapper ms-auth">
            <div className="ms-auth-container">
                <div className="ms-auth-col">
                    <div className="ms-auth-bg"/>
                </div>
                <div className="ms-auth-col">
                    <div className="ms-auth-form">
                        <Form noValidate validated={validated} onSubmit={handleSubmit}>
                            <h1>Create Account</h1>
                            {error && <div className="alert alert-danger">{error}</div>}
                            <p>Please enter personal information to continue</p>
                            <Form.Row>
                                <Form.Group as={Col} md="6" className="mb-0" controlId="validationCustom01">
                                    <Form.Label>First name</Form.Label>
                                    <InputGroup>
                                        <Form.Control
                                            value={firstname}
                                            onChange={e => setfirstname(e.target.value)}
                                            required
                                            type="text"
                                            placeholder="First name"
                                        />
                                        <Form.Control.Feedback type="valid"> Looks Good.</Form.Control.Feedback>
                                    </InputGroup>
                                </Form.Group>
                                <Form.Group as={Col} md="6" className="mb-0" controlId="validationCustom02">
                                    <Form.Label>Last name</Form.Label>
                                    <InputGroup>
                                        <Form.Control
                                            value={lastname}
                                            onChange={e => setlastname(e.target.value)}
                                            required
                                            type="text"
                                            placeholder="Last name"
                                        />
                                        <Form.Control.Feedback type="valid"> Looks Good.</Form.Control.Feedback>
                                    </InputGroup>
                                </Form.Group>
                            </Form.Row>
                            <Form.Group controlId="validationCustom03">
                                <Form.Label>Email Address</Form.Label>
                                <InputGroup>
                                    <Form.Control
                                        value={emailValue}
                                        onChange={e => setEmailValue(e.target.value)}
                                        required
                                        type="email"
                                        placeholder="Email Address"
                                    />
                                    <Form.Control.Feedback type="invalid"> Please provide a valid email.</Form.Control.Feedback>
                                </InputGroup>
                            </Form.Group>
                            <Form.Group controlId="validationCustom04">
                                <Form.Label>Password</Form.Label>
                                <InputGroup>
                                    <Form.Control
                                        value={passwordValue}
                                        onChange={e => setPasswordValue(e.target.value)}
                                        required
                                        type="password"
                                        placeholder="Password"
                                    />
                                    <Form.Control.Feedback type="invalid"> Please provide a password.</Form.Control.Feedback>
                                </InputGroup>
                            </Form.Group>
                            {/*<Form.Group controlId="validationCustom03">*/}
                            {/*    <Form.Label className="ms-checkbox-wrap">*/}
                            {/*        <input className="form-check-input" type="checkbox" defaultValue/>*/}
                            {/*        <i className="ms-checkbox-check"/>*/}
                            {/*    </Form.Label>*/}
                            {/*    <span> Agree to terms and conditions</span>*/}
                            {/*</Form.Group>*/}
                            <Button type="submit" className="mt-4 d-block w-100">Create Account</Button>
                            {/*<span className="d-block text-center my-4">Or</span>*/}
                            {/*<button type="button" className="btn mt-4 d-block w-100 btn-social-login"> <img src={facebook} alt="" /> <span>Signup with Facebook</span> </button>*/}
                            {/*<button type="button" className="btn mt-4 d-block w-100 btn-social-login"> <img src={google} alt="" /> <span>Signup with Google</span> </button>*/}
                            {/*<p className="mb-0 mt-3 text-center">Already have an account? <Link className="btn-link" to="/prebuilt-pages/default-login">Login</Link> </p>*/}
                        </Form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(Content);
