import debugLib from 'debug';
import request from 'request';
import ZangIO from '../lib/zangio';

const debug = debugLib('zang.io');
const config = {
    accountSID: 'ACe1889084713c4831d53a4f72b01d292a',
    authToken: '79ff8caf7a514436bcdcb8af15f7b2fb'
};

const zang = new ZangIO(config);

export default class {
    makeCall(req, res) {

        debug('request %s', JSON.stringify(req.query, null, 2));
        res.json(req.query);
    }

    playAudio(req, res) {
        
    }
};
