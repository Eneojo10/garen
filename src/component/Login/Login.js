import React, { useContext, useState } from 'react';
import { AuthContext } from './AuthContext';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { css } from '@emotion/react';
import { PropagateLoader } from 'react-spinners';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = async () => {
    setLoading(true);
    setError('');

    const { data } = await login(email, password);

    setLoading(false);

    if (data) {
      localStorage.setItem('token', data.access_token);

      if (data.role === 'SUPER ADMIN') {
        localStorage.setItem('role', 'SUPER ADMIN');
        localStorage.setItem('user_id', data.user._id);
        navigate('/superAdmin');
      } else if (data.role === 'ADMIN') {
        localStorage.setItem('role', 'ADMIN');
        localStorage.setItem('user_id', data.user._id);
        navigate('/panel');
      } else {
        localStorage.setItem('role', 'USER');
        localStorage.setItem('user_id', data.user._id);
        navigate('/dashboard');
      }

      setEmail('');
      setPassword('');
    } else {
      setError('Wrong password or email');
    }
  };

  return (
    <div>
      <div className='signup-page'>
        <div className='signup---page'>
          <div className='sign--up'>
            <div className='login---border'>
              <div className='login-border '>
                <div
                  className='spawn-signin-page'
                  style={{ textAlign: 'center' }}
                >
                  <h4>GAREN</h4>
                  <p>Estate Management System</p>
                </div>
              </div>
            </div>
            <div className='login-details'>
              <h4>Login</h4>

              <p className={error ? 'error fadeInOut' : 'fadeInOut'}>
                Enter your email and password correctly
              </p>
            </div>
            <form>
              <div className='login-form'>
                <div>
                  <input
                    type='email'
                    name='email'
                    placeholder='Email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <br />
                <div className='login_page'>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name='password'
                    placeholder='Password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />

                  <FontAwesomeIcon
                    icon={showPassword ? faEyeSlash : faEye}
                    className='password-icon'
                    onClick={togglePasswordVisibility}
                  />
                </div>
                <br />

                <div className='login--options d-flex'>
                  <div>
                    <h5>Remember me</h5>
                  </div>
                  <div>
                    <h5>Forgot Password?</h5>
                  </div>
                </div>
                <br />
                <div className='login-button'>
                  <button
                    onClick={handleLogin}
                    className='login--btn'
                    type='button'
                    disabled={loading}
                  >
                    {loading ? (
                      <div className='loading-spinner'>
                        <PropagateLoader color='blue' size={8} loading={true} />
                      </div>
                    ) : (
                      'Login'
                    )}
                  </button>
                </div>

                {error && (
                  <p className='error' style={{ color: 'red' }}>
                    {error}
                  </p>
                )}
              </div>
            </form>
            <br />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
