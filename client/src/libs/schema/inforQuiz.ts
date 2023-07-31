import { z } from 'zod';
import { t } from '$i18n/translations';

const MAX_FILE_SIZE = 1000000;

export const InforQuizFormSchema = z
	.object({
		title: z
			.string()
			.min(10, t.get('validation.TITLE_QUIZ_MUST_BE_AT_LEAST_10_CHARACTERS'))
			.max(50, t.get('validation.TITLE_QUIZ_TOO_LONG')),
		passingPoint: z
			.number(t.get('validation.PASSING_POINT_MUST_BE_A_NUMBER'))
			.min(0, t.get('validation.PASSING_POINT_MUST_BE_AT_LEAST_1'))
			.max(100, t.get('validation.PASSING_POINT_MUST_BE_AT_MOST_100')),
		point: z
			.number(t.get('validation.POINT_MUST_BE_A_NUMBER'))
			.min(0, t.get('validation.POINT_MUST_BE_AT_LEAST_1'))
			.max(100, t.get('validation.POINT_MUST_BE_AT_MOST_100')),
		image: z.any().refine((file) => file?.size <= MAX_FILE_SIZE, `Max image size is 1MB.`)
	})
	.refine((data) => data.point >= data.passingPoint, {
		message: t.get('validation.POINT_MUST_BE_GREATER_THAN_PASSING_POINT'),
		path: ['point']
	});
