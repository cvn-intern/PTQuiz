interface FormChangePassword {
	oldPassword: string;
	newPassword: string;
	confirmPassword: string;
}

interface FormEditProfile {
	displayName: string;
}

export type { FormChangePassword, FormEditProfile };
