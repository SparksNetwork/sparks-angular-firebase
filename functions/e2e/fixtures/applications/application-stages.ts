import { browser } from 'protractor/built';
import { setUsers, signOut, signIn, setData, setUsersWithPartialProfile, updateData } from '../../firebase';
import { USER_VERIFIED_PROFILE } from '../users';

export class ApplicationStages {
    public static preloadDatabase() {
        const fullyLoaded = require('../../fixtures/fully-loaded.json')
        const userProfiles = require('../../fixtures/user-profiles/partial-user-profiles.json')
        return setData('/', fullyLoaded)
            .then(() => { updateData('/profile', userProfiles) })
    }

    public static initializedUser(user: any) {

        browser.waitForAngularEnabled(false)

        return setUsers()
            .then(() => setUsersWithPartialProfile())
            .then(() => browser.get('/'))
            .then(() => signOut())
            .then(() => signIn(user.email, user.password))
            .then(() => this.preloadDatabase())
    }

    public static userWithApplication(user: any, application: any) {
        return this.initializedUser(user).then(() => setData('/application', application))
    }

    public static userWithApplicationTeams(application, applicationTeams) {
        return this.userWithApplication(USER_VERIFIED_PROFILE, application).then(() => setData('/applicationTeam', applicationTeams))
    }
}
