import React, { useState } from 'react';
import { connect } from 'react-redux';
import { register } from '../../actions/loginActions'

const SignUp = props => {
    const [values, setValues] = useState({
        email: '',
        name: '',
        password: '',
        password2: ''
    });

    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };

    const onFormSubmit = e => {
        e.preventDefault();
        props.dispatch(register(values));
    };

    return (
        <>
            <form className="row g-3 signUp">
                <p>Please enter email and password to register</p>
                <div className="col-md-6">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input
                        type="email"
                        className="form-control"
                        id="email"
                        onChange={handleChange('email')}
                    />
                </div>
                <div className="col-md-6">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input
                        type="name"
                        className="form-control"
                        id="name"
                        onChange={handleChange('name')}
                    />
                </div>
                <div className="col-md-6">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input
                        type="password"
                        className="form-control"
                        id="password"
                        onChange={handleChange('password')}
                    />
                </div>
                <div className="col-md-6">
                    <label htmlFor="password" className="form-label">Confirm Password</label>
                    <input
                        type="password"
                        className="form-control"
                        id="password"
                        onChange={handleChange('password2')}
                    />
                </div>
                <div className="col-12">
                    <button className="btn btn-primary" onClick={onFormSubmit}>Register</button>
                </div>
            </form>
        </>
    )
}
const mapStateToProps = state => {
    return {
        user: state.auth,
    };
};

export default connect(mapStateToProps)(SignUp)