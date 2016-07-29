import debugLib from 'debug';
import request from 'request';

const debug = debugLib('zang.io');

export default class {
    connected(req, res) {
        res.end(
            `<Response>
                <Say>This is zang.io test. You are about to execute a new call.</Say>
                <Dial action="http://zangio.herokuapp.com/api/inbound/dialed" method="GET">484-653-6381</Dial>
                <Say>We have passed the Dial. The call will now be terminated</Say>
                <Hangup/>
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

    fallback(req, res) {
        debug('%s %s', req.body, req.query);
        res.json({
            body: req.body,
            query: req.query
        });
    };
};
