import debugLib from 'debug';
import request from 'request';

export default class {
    /**
     * @method constructor
     * @param { Object } config - initial config
     */
    constructor(config) {
        this._log = debugLib('zang.io');
        this.setConfig(config);
    }

    /**
     * @method setConfig
     * @param { Object } config - config to update
     */
    setConfig(config) {
        this.config = Object.assign({}, this.config, config);
    }

    /**
     * @method sendRequest
     * @param {string} resource - type of resource - calls, sms, ...
     * @param {Object} params - key, value based parameter list for api
     * @param {string} method - request type GET, POST, ...
     * @param {string} returnType - type of result - json, xml ...
     * @returns {Promise} promise of api call result
     */
    sendRequest(resource, params, method = 'GET', returnType = 'json') {
        const { config, _log } = this;
        const uri = `https://api.zang.io/v2/Accounts/${config.accountSID}/${resource}.${returnType}`;
        const auth = 'Basic ' + new Buffer(`${config.accountSID}:${config.authToken}`).toString('base64');
        _log('making request to %s', uri);
        _log('%s %s', method, JSON.stringify(params, null, 2));
        return new Promise((resolve, reject) => {
            request({
                uri,
                method,
                form: params,
                headers: {
                    Authorization: auth
                }
            }, (err, httpResp, response) => {
                _log('response from server %s', response);
                if (err) {
                    _log('error %s', JSON.stringify(err));
                    reject({
                        err,
                        response
                    });
                } else {
                    resolve({
                        response
                    })
                }
            });
        });
    }

    /**
     * @method makeCall
     * @param {Object} params - key, value based parameter list for api
     * @returns {Promise} promise of api call result
     */
    makeCall(params) {
        return this.sendRequest('Calls', params, 'POST');
    }

    /**
     * @method playAudioInLiveCall
     * @param {string} callSID - call SID
     * @param {Object} params - key, value based parameter list for api
     * @returns {Promise} promise of api call result
     */
    playAudioInLiveCall(callSID, params) {
        return this.sendRequest(`Calls/${callSID}/Play`, params, 'POST');
    }
};
