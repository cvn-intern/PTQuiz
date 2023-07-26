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
	titleQuiz: string;
	category: string;
	level: string;
	shareQuiz: boolean;
	customizeTimeQuestion?: string;
	thumbnail: string;
	startDate?: string;
	endDate?: string;
}


