import Auth from './Auth'
import Api from './Api'
import Admin from './Admin'
import User from './User'
import Habit from './Habit'
import Notes from './Notes'
import GoogleController from './GoogleController'
const Controllers = {
    Auth: Object.assign(Auth, Auth),
Api: Object.assign(Api, Api),
Admin: Object.assign(Admin, Admin),
User: Object.assign(User, User),
Habit: Object.assign(Habit, Habit),
Notes: Object.assign(Notes, Notes),
GoogleController: Object.assign(GoogleController, GoogleController),
}

export default Controllers