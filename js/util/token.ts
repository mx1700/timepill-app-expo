import AsyncStorage from '@react-native-community/async-storage';

class Token {
    private token: string|null = null;
    private user: any;

    generateToken(username: string, password: string) {
        return 'Basic ' + btoa(username + ":" + password);
    }


    async set(key: string, value: string) {
        await AsyncStorage.setItem(key, value);
    }

    async get(key: string) {
        return await AsyncStorage.getItem(key);
    }


    async setUserToken(token: string) {
        await this.set('user_token', token);
        this.token = token;
    }

    async getUserToken() {
        if (!this.token) {
            this.token = await this.get('user_token');
        }

        return this.token;
    }

    async setUserInfo(user: any) {
        await this.set('user_info', JSON.stringify(user));
        this.user = user;
    }

    async getUserInfo() {
        if (!this.user) {
            const s = await this.get('user_info');
            if(!s) {
                return null;
            }
            this.user = JSON.parse(s);
        }

        return this.user;
    }

    async setLoginPassword(password: string) {
        this.set('login_password', password);
    }

    async getLoginPassword() {
        return await this.get('login_password');
    }

    async setUpdateVersion(version: string) {
        this.set('update_version', JSON.stringify(version));
    }

    async getUpdateVersion() {
        const s = await this.get('update_version');
        return s ? JSON.parse(s) : 0;
    }

    async setDraft(content: any) {
        this.set('draft', JSON.stringify(content));
    }

    async getDraft() {
        const s = await this.get('draft');
        return s ? JSON.parse(s) : null;
    }

    async setTempDraft(content: string) {
        this.set('temp_draft', JSON.stringify(content));
    }

    async getTempDraft() {
        const s = await this.get('temp_draft');
        return s ? JSON.parse(s) : null;
    }

    async setSetting(name: string, value: any) {
        let settings = await this.getSettings();
        settings[name] = value;

        this.set('setting', JSON.stringify(settings));
    }

    async getSetting(name: string) {
        const settings = await this.getSettings();
        return settings ? (settings[name]) : null;
    }

    async getSettings() {
        let str = await this.get('setting');
        let settings = str && str.length > 0 ? JSON.parse(str) : {};

        if (settings['pushMessage'] === undefined) {
            settings['pushMessage'] = true;
        }

        return settings;
    }
}

export default new Token()
