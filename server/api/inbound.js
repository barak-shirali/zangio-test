import debugLib from 'debug';
import request from 'request';

const debug = debugLib('zang.io');

export default class {
    connected(req, res) {
        debug('%s %s', JSON.stringify(req.body), JSON.stringify(req.query));
        res.end(
            `<Response>
                <Say>This is zang.io test. You are about to execute a new call.</Say>
                <Dial callbackUrl="http://zangio.herokuapp.com/api/inbound/fallback" callbackMethod="GET" action="http://zangio.herokuapp.com/api/inbound/dialed" method="GET">484-653-6381</Dial>
                <Say>We have passed the Dial. The call will now be terminated</Say>
                <Hangup/>
            </Response>`
        );
    }

    dialed(req, res) {
        debug('%s %s', JSON.stringify(req.body), JSON.stringify(req.query));
        res.end(
            `<Response>
                <Say voice="woman">Hello! I am zangio caller bot! Mp3 file will be played 3 times.</Say>
                <Play loop="3">http://zangio.herokuapp.com/audio.mp3</Play>
                <Say>File finished! Bye!</Say>
            </Response>`
        );
    }

    fallback(req, res) {
        debug('%s %s', JSON.stringify(req.body), JSON.stringify(req.query));
        res.json({
            body: req.body,
            query: req.query
        });
    };
};
