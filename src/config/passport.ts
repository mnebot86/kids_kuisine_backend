import User from '@models/user';
import passport from 'passport';
import { ExtractJwt, Strategy as JwtStrategy } from 'passport-jwt';

import config from './config';

const options = {
	jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
	secretOrKey: config.jwtSecret,
};

passport.use(
	new JwtStrategy(options, async (payload, done) => {
		try {
			const user = await User.findById(payload.id);
			if (user) return done(null, user);

			return done(null, false);
		} catch (error) {
			return done(error, false);
		}
	}),
);

export default passport;
