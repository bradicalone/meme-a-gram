import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import SignUp from './SignUp'
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import Container from '@material-ui/core/Container';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Button from '@material-ui/core/Button';
import { startLogin } from '../../actions/loginActions'

const useStyles = makeStyles((theme) => ({
    margin: {
        margin: theme.spacing(1),
    }
}));


const Login = props => {
    const [values, setValues] = React.useState({
        email: '',
        password: '',
        remember: false,
        showPassword: false,
        register: false
    });

    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };

    const handleClickShowPassword = () => {
        setValues({ ...values, showPassword: !values.showPassword });
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const onFormSubmit = e => {
        const user = {
            email: values.email,
            password: values.password
        };
        props.dispatch(startLogin(user));

    };

    const classes = useStyles();

    return (
        <>
            <Container maxWidth="sm">
                <div className="form-container">
                    <div className="user-content">
                        <i className="fas fa-user"></i>
                        <h1>Login</h1>
                        <p>Sign in to your account to continue</p>
                    </div>
                    <div className="login-alert">
                        <i className="fas fa-info-circle"></i>
                        <p>Use either <b>email</b> to sign in.</p>
                    </div>
                    <form>
                        <FormControl fullWidth className={classes.margin}>
                            <InputLabel htmlFor="input-with-icon-adornment">Email</InputLabel>
                            <Input
                                id="input-with-icon-adornment"
                                value={values.email}
                                onChange={handleChange('email')}
                                startAdornment={
                                    <InputAdornment position="start">
                                        <AccountCircle />
                                    </InputAdornment>
                                }
                            />
                        </FormControl>
                        <FormControl fullWidth className={classes.margin} variant="filled">
                            <Input
                                id="standard-adornment-password"
                                type={values.showPassword ? 'text' : 'password'}
                                value={values.password}
                                onChange={handleChange('password')}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                        >
                                            {values.showPassword ? <Visibility /> : <VisibilityOff />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                            />
                        </FormControl>
                        <FormControl component="fieldset" className={classes.formControl}>
                            <FormControlLabel
                                control={<Checkbox checked={values.remember} onChange={handleChange} name="remember" />}
                                label="Remember me"
                            />
                        </FormControl>
                        <div className="auth-btns">
                            <Button className="btnPrimary" variant="contained" color="primary" onClick={(e) => { onFormSubmit(e) }}>SIGN IN</Button>
                            <Button className="btnPrimary"
                                variant="contained"
                                color="primary"
                                onClick={(e) => { setValues({ ...values, register: true }) }}
                            >
                                REGISTER
                            </Button>
                        </div>
                    </form>

                    {values.register ?
                        <SignUp />
                        : null}
                    <a className="MuiButton-text" href="/reset-password">Forgot password</a>
                    {props.user.isRegistered &&
                        <div className="registered-login">
                            <p>Registered! You can log in now.</p>
                        </div>
                    }
                    {props.user.error &&
                        <div className="error-login">
                            <p>{props.user.error}</p>
                        </div>
                    }
                </div>
            </Container>
        </>
    )
}

const mapStateToProps = state => {
    return {
        user: state.auth,
    };
};

export default connect(mapStateToProps)(Login)