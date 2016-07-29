import debugLib from 'debug';
import request from 'request';

const debug = debugLib('zang.io');

export default class {
    connected(req, res) {
        res.end(
            `<Response>
                <Say>This is zang.io test. It will automatically dial to the caller.</Say>
                <Dial action="http://zangio.herokuapp.com/api/inbound/dialed" method="GET">484-653-6381</Dial>
            </Response>`
        );
    }

    dialed(req, res) {
        res.end(
            `<Response>
                <Say voice="woman">Hello! I am zangio caller bot! Please make request to play-audio-live so that mp3 file is played to both of us.</Say>
            </Response>`
        );
    }
};
