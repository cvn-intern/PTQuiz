export interface InputForm {
	label: string;
	name: string;
	type: string;
	required: boolean;
	selectOptionsList?: selectOptionne[];
	valueSwitchDefault?: string;
	isDefault?: boolean;
}

export interface FieldForm {
	title: string;
	difficultyLevel: string;
	image?: any;
	startDate?: string;
	endDate?: string;
	passingPoint?: string;
	description?: string;
	value?: string;
}

export interface selectOptionne {
	value: string | number;
	name: string;
}