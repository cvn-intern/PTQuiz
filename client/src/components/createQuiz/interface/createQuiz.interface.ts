export interface InputForm {
	label: string;
	name: string;
	type: string;
	required: boolean;
	selectOptionsList?: selectOptionne[];
	valueSwitchDefault?: string;
	isDefault?: boolean;
	value?: any;
}

export interface FieldForm {
	title: string;
	difficultyLevel: number | string;
	image?: any;
	point: number | string;
	passingPoint?: number | string;
	description?: string;
	categoryId: number | string;
}

export interface selectOptionne {
	value: string | number;
	name: string;
}
