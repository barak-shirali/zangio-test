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
        const {
            dialNumber
        } = req.query;
        if (!dialNumber) {
            res.end('Please enter dial number!');
        }
        const params = {
            To: dialNumber,
            From: '484-653-6381',
            Url: 'http://zangio.herokuapp.com/api/inbound/connected'
        };
        zang.makeCall(params)
        .then((result) => {
            res.json({
                params,
                result
            });
        })
        .catch((err) => {
            res.status(404).json(err);
        });
    }

    playAudio(req, res) {
        const {
            CallSid
        } = req.query;
        if (!CallSid) {
            res.end('Please enter callSID');
        }
        const params = {
            AudioUrl: 'https://www.dropbox.com/s/aqn75vlgq4io9ob/myh9jorc.mp3?dl=true',
            Direction: 'both',
            Loop: false
        };
        zang.playAudioInLiveCall(CallSid, params)
        .then((result) => {
            res.json({
                params,
                result
            });
        })
        .catch((err) => {
            res.status(404).json(err);
        });
    }
};
