import decode from 'jwt-decode';

class AuthService {
    getProfile() {
        return decode(this.getToken());
    }

    loggedIn() {
        // Checks if there is a saved token and it's still valid
        const token = this.getToken();
        return !!token && !this.isTokenExpired(token); // handwaiving here
    }

    isTokenExpired(token) {
        try {
            const decoded = decode(token);
            if (decoded.exp < Date.now() / 1000) {
                return true;
            } else return false;
        } catch (err) {
            return false;
        }
    }

    getToken() {
        // Retrieves the user token from localStorage
        return localStorage.getItem('id_token');
    }

    login(idToken, user) {
        // Saves user token to localStorage
        localStorage.setItem('id_token', idToken);
        localStorage.setItem('username',user.username);
        window.location.assign('/profile/' + user.username);
    }

    logout() {
        // Clear user token and profile data from localStorage
        // axios.defaults.headers.common["Authorization"] = null;
        localStorage.removeItem('id_token');
        localStorage.removeItem('username');
        // this will reload the page and reset the state of the application
        window.location.assign('/');
    }
    getUsername(){
        return localStorage.getItem('username')
    }
}

export default new AuthService();