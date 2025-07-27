import bcrypt from 'bcryptjs';

export const HashPassword = async (pass: string) => {
	const salt = bcrypt.genSaltSync(10);
	return bcrypt.hashSync(pass, salt);
};

export const MatchPasword = async (password: string, hashedPass: string) => {
	return bcrypt.compareSync(password, hashedPass);
};
