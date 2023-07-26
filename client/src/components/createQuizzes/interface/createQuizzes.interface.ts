export interface InputForm {
	label: string;
	name: string;
	type: string;
	required: boolean;
	selectOptionsList?: string[];
	valueSwitchDefault?: string;
	isDefault?: boolean;
}

export interface FieldForm {
	titleQuizzes: string;
	category: string;
	level: string;
	shareQuizzes: boolean;
	customizeTimeQuestion?: string;
	thumbnail: string;
	startDate?: string;
	endDate?: string;
}


