"use strict";

exports.register = function( req, res) {

	if( 1 == 2  ) {
		res.status(200).render('user/eta', { 
			title: 'Successful registration',
			authorized: req.checkAuth,
			msg: 'Good Job !',
			msg_detailed: 'Your account have been successfully registered, you must validate your email now.'
		});
	}
	else {
		res.status(400).render('user/new', { 
			title: 'Error registration',
			authorized: req.checkAuth,
			msg: 'Ho ? Something\'s wrong !',
			msg_detailed: 'Error: '
		});	
	}
}