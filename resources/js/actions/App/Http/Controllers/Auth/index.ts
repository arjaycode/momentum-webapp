import LoginController from './LoginController'
import AdminAuthController from './AdminAuthController'
import SignupController from './SignupController'
import ForgotPasswordController from './ForgotPasswordController'
import ResetPasswordController from './ResetPasswordController'
const Auth = {
    LoginController: Object.assign(LoginController, LoginController),
AdminAuthController: Object.assign(AdminAuthController, AdminAuthController),
SignupController: Object.assign(SignupController, SignupController),
ForgotPasswordController: Object.assign(ForgotPasswordController, ForgotPasswordController),
ResetPasswordController: Object.assign(ResetPasswordController, ResetPasswordController),
}

export default Auth