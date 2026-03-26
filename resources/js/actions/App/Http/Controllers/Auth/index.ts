import LoginController from './LoginController'
import SignupController from './SignupController'
import ForgotPasswordController from './ForgotPasswordController'
import ResetPasswordController from './ResetPasswordController'
const Auth = {
    LoginController: Object.assign(LoginController, LoginController),
SignupController: Object.assign(SignupController, SignupController),
ForgotPasswordController: Object.assign(ForgotPasswordController, ForgotPasswordController),
ResetPasswordController: Object.assign(ResetPasswordController, ResetPasswordController),
}

export default Auth