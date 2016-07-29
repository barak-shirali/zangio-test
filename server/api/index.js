import { Router } from 'express';
import PhoneCtlr from './phone';

export default function() {
	const api = Router();

	const phoneController = new PhoneCtlr();

	// mount controller
	api.get('/make-call', phoneController.makeCall);

	// perhaps expose some API metadata at the root
	api.get('/', (req, res) => {
		res.end('Zang.io test');
	});

	return api;
}
