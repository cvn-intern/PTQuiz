import { z } from 'zod';
import { t } from '$i18n/translations';

export const InforQuizFormSchema = z.object({
	title: z
		.string()
		.min(10, t.get('validation.TITLE_QUIZ_MUST_BE_AT_LEAST_10_CHARACTERS'))
		.max(50, t.get('validation.TITLE_QUIZ_TOO_LONG')),
	passingPoint: z
		.string()
		.min(0, t.get('validation.PASSING_POINT_MUST_BE_AT_LEAST_1'))
		.max(3, t.get('validation.PASSING_POINT_MUST_BE_AT_MOST_100')),
	point: z
		.string()
		.min(0, t.get('validation.POINT_MUST_BE_AT_LEAST_1'))
		.max(3, t.get('validation.POINT_MUST_BE_AT_MOST_100')),
	image: z
		.any()
		.optional()
		.refine(
			(file) => file.size <= 5 * 1024 * 1024,
			t.get('validation.THUMBNAIL_MUST_BE_LESS_THAN_5MB')
		)
});
