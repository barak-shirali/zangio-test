import { Router } from 'express';
import ActionCtlr from './action';
import InboundCtlr from './inbound';

export default function() {
	const api = Router();

	const actionController = new ActionCtlr();
	const inboundController = new InboundCtlr();

	// mount controller
	api.get('/action/make-call', actionController.makeCall);
	api.get('/action/play-audio', actionController.playAudio);
	api.get('/inbound/connected', inboundController.connected);
	api.get('/inbound/dialed', inboundController.dialed);
	api.get('/inbound/fallback', inboundController.fallback);

	// perhaps expose some API metadata at the root
	api.get('/', (req, res) => {
		res.end('Zang.io test');
	});

	return api;
}
