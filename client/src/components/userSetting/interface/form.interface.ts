interface FormChangePassword {
	oldPassword: string;
	newPassword: string;
	confirmPassword: string;
}

interface FormEditProfile {
	displayName: string;
	isDone: boolean;
	isSuccess: boolean;
}

export type { FormChangePassword, FormEditProfile };
