import { z } from 'zod';
import { t } from '$i18n/translations';

const MAX_FILE_SIZE = 500000;
const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];

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
		.refine((file) => file?.size <= MAX_FILE_SIZE, `Max image size is 5MB.`)
		.refine(
			(file) => ACCEPTED_IMAGE_TYPES.includes(file?.type),
			'Only .jpg, .jpeg, .png and .webp formats are supported.'
		)
});
