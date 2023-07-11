- [1. Database Specification](#1-database-specification)
  - [1.1. Users](#11-users)
  - [1.2. Questions](#12-questions)
  - [1.3. Quizzes](#13-quizzes)
  - [1.4. Categories](#14-categories)
  - [1.5. Quiz\_questions](#15-quiz_questions)
  - [1.6. Participants](#16-participants)
  - [1.7. User\_questions](#17-user_questions)
  - [1.8. Rooms](#18-rooms)
  - [1.9. Room\_participants](#19-room_participants)
  - [1.10. References between tables](#110-references-between-tables)
- [2. API Specification](#2-api-specification)
  - [2.1. Register](#21-register)
  - [2.2. Login](#22-login)
  - [2.3. Get me](#23-get-me)
  - [2.4. Refresh token](#24-refresh-token)
  - [2.5. Logout](#25-logout)
  - [2.6. Confirm email](#26-confirm-email)
  - [2.7. Resend verification token](#27-resend-verification-token)
  - [2.8. Forgot password](#28-forgot-password)
  - [2.9. Reset password](#29-reset-password)

## 1. Database Specification
We choose MySQL as our database management system. The database is hosted on AWS RDS. The database is designed with 9 tables: `users`, `questions`, `categories`, `rooms`, `participants`, `quizzes`, `user_questions`, `quiz_questions`, `room_participants`. The database diagram is shown below:

![ER diagram](https://lh3.googleusercontent.com/fife/AKsag4NqdK6R3YZhQQ4WTYR84Kq-SO5Y7ohIKZXKDzTkbp6M-lDj6nLUxeHxz3HLCC8dSNSMUuvCRsPpW17IgEynUZ9gB8Gc61THxefhMHwy2LjZn1Af1NZVqKDhj-EhHeD7xFCfER5uSLDGiQ4XVyRfaZi4aLfb1uGPtkU9FbCQkQ1RI8Hcdb8vWVnXXtuGjEuvq25h6yyJX40UZvfJX5bTScWQhqvhbb5tcFNbDWsTeceoSE4GdaHE_mQRUX3HDRZirV6CKr-d2g9w-hLArbC5lq5bgxemGgAOBx_B2U_biovT8cdk02vMA1AzkXPJlXuTsti7-uA1PprBvC7-uTZ-YvRAXpLGAsN0__fyXbe3roeGGII81ZlUP6R8aSRYROgJyd57hTmJ8C1NXwvfmy9g_m1h8y6i_CzaEXkB4JVLarlZFgHC1xF6hrsEi1M5agQQcT-wQgndGBC_8HJl9bdxzxN7_Nqc82x41SH4aGeDieEXCAIhil4HmUFfOa2xPen8d6pFVgV3yw04o0pyJaQb95zxsMwurhFzqUWEzoAjgfCwzEUKuLtjPZbdWVU3CFLrh9P1wq-N6EtyaEWy3zE9TP3BhwbA2l-Wdo_hLQJG0FI9e52zsU-6VtGRjsk5uy0GmaoWPKh-DNmo8ZOrMro3n8VgMIhK_01cU3cAUVmqVGEMjLolTw6vR-SVzAi2TYVB7BrB061lluOmL4VDgbv6t_lzwNFqQ1EoV47oStbXkfsjRHKdD4QGUmITGO38XtZ8j44adj54QlLn0A_PVxR6L3x8JV4Sck5r1v8ixz79BifvOo7cB5KXNpLBePDpjSZt0rwtWpwVNuInmYDoFAg9Q-FTUyl7kCFkV27vO-0aCgloLeLLd9ohb3QMu2zEgy3YbwUYNMBlJoK-bIesnz-W-ahGsKWCM2Q4R-9tPtqspbSv8Rf6THdtB2nqn2ZyVCnyxYD3dk3E7INrm-Ja6GyhyITIxtP9MkZhI3Ot9GY43kHW_PoULkSETZwT0ikeXKV8o7OBAqpu9Axr7vNn4ex28Fk530bz53tApDZh1ePo2HzaPXt5gth6RrfMfS6IOEpv_S83bQCaXoZFTbEV_jprWZaJH77BTTB-K57fvBpZevqH9EBqdKLsZEIFZRgydfZNMBFw8V76nmoOgyyHB3OVtKN1OwnBvZfOloOmQvUZvWrP8FAu76tORdWYxaFS85ocJwUvmulSa9jrdgkUgWSzmHrH4gzh7I_w_QGtw4kzkqLlVybTCC4nABajlEekkLlRO1lhj5a2OhI561tYnP1DJIOcC03ta3VWFTD1Jb7isuHesqmwW29BJ9piYVhArvAKyiwZFATBm2fxBfdbRDbxhFBJhrjeK5q1wg3VT8YfpnNh-2d1Kjn8-GF6E0ROiPIQsFDWg3HxtmC0nUL5tmAvfEJG_f4TstPbz0nU5JFtiJn6W48pQ9RjJI0eBumRy0H_tTc4udZR4-Rv3X2vU6KR78OGmuFLgVctdVBwOfr2bPulpoaQR1MTTrit8xlb0YkXJtmCI-Y4jHyECKVndQVbPXa_6Edu9l7o0dcr_VtyYo4GJ_wL8JK8CRAx3o3OrLF46xXVjVrGMC-cWw=w1920-h944)

### 1.1. Users

DDL command for creating `users` table:

```
CREATE TABLE `users` (
    `id` VARCHAR(191) NOT NULL,
    `displayName` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NULL,
    `email` VARCHAR(191) NOT NULL,
    `avatar` TEXT NOT NULL,
    `isLogin` BOOLEAN NOT NULL,
    `role` VARCHAR(191) NOT NULL,
    `status` INTEGER NOT NULL DEFAULT 1,
    `authId` VARCHAR(191) NULL,
    `loginFrom` VARCHAR(191) NULL,
    `token` TEXT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```
Columns description:

| Column        | Type         | Description                                                 |
| ------------- | ------------ | ----------------------------------------------------------- |
| `id`          | VARCHAR(191) | Unique identifier for each user.                            |
| `displayName` | VARCHAR(191) | User's display name.                                        |
| `password`    | VARCHAR(191) | User's password can be possible null when user using Oauth. |
| `email`       | VARCHAR(191) | User's email.                                               |
| `avatar`      | TEXT         | User's avatar.                                              |
| `isLogin`     | BOOLEAN      | Indicates whether the user is currently logged in.          |
| `role`        | VARCHAR(191) | User's role.                                                |
| `status`      | INTEGER      | User's status (0: Inactive, 1: Active, 2: Blocked).         |
| `authId`      | VARCHAR(191) | Identifier for external authentication.                     |
| `loginFrom`   | VARCHAR(191) | Source of the external authentication.                      |
| `token`       | TEXT         | User's refresh token.                                       |
| `createdAt`   | DATETIME(3)  | Date and time of user creation.                             |
| `updatedAt`   | DATETIME(3)  | Date and time of last user update.                          |


### 1.2. Questions

DDL command for creating `questions` table:

```
CREATE TABLE `questions` (
    `id` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `categoryId` VARCHAR(191) NOT NULL,
    `title` TEXT NOT NULL,
    `options` TEXT NOT NULL,
    `answers` TEXT NOT NULL,
    `image` TEXT NULL,
    `type` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```
Columns description:
| Column       | Type         | Description                                               |
| ------------ | ------------ | --------------------------------------------------------- |
| `id`         | VARCHAR(191) | Unique identifier for each question.                      |
| `userId`     | VARCHAR(191) | Identifier of the user who created the question.          |
| `categoryId` | VARCHAR(191) | Identifier of the category to which the question belongs. |
| `title`      | TEXT         | Question's title.                                         |
| `options`    | TEXT         | Options for the question.                                 |
| `answers`    | TEXT         | Correct answers for the question.                         |
| `image`      | TEXT         | Image associated with the question.                       |
| `type`       | INTEGER      | Question type (MCQ, SCQ, Written).                        |
| `createdAt`  | DATETIME(3)  | Date and time of question creation.                       |
| `updatedAt`  | DATETIME(3)  | Date and time of last question update.                    |

### 1.3. Quizzes

DDL command for creating `quizzes` table:
```
CREATE TABLE `quizzes` (
    `id` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `title` TEXT NOT NULL,
    `numberQuestions` INTEGER NOT NULL,
    `description` TEXT NOT NULL,
    `image` TEXT NOT NULL,
    `durationMins` INTEGER NOT NULL,
    `isRandom` BOOLEAN NOT NULL,
    `isRandomOption` BOOLEAN NOT NULL,
    `attempts` INTEGER NOT NULL,
    `point` INTEGER NOT NULL,
    `passingPoint` INTEGER NOT NULL,
    `passed` BOOLEAN NOT NULL,
    `difficultyLevel` INTEGER NOT NULL DEFAULT 0,
    `startDate` DATETIME(3) NOT NULL,
    `endDate` DATETIME(3) NOT NULL,
    `isActivated` BOOLEAN NOT NULL,
    `isShared` BOOLEAN NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```
Columns description:
| Column            | Type         | Description                                            |
| ----------------- | ------------ | ------------------------------------------------------ |
| `id`              | VARCHAR(191) | Unique identifier for each quiz.                       |
| `userId`          | VARCHAR(191) | Identifier of the user who created the quiz.           |
| `title`           | TEXT         | Quiz's title.                                          |
| `numberQuestions` | INTEGER      | Number of questions in the quiz.                       |
| `description`     | TEXT         | Description of the quiz.                               |
| `image`           | TEXT         | Image associated with the quiz.                        |
| `durationMins`    | INTEGER      | Duration of the quiz in minutes.                       |
| `isRandom`        | BOOLEAN      | Indicates whether the quiz is randomized.   |
| `isRandomOption`  | BOOLEAN      | Indicates whether the questions in quiz are randomized. |
| `attempts`        | INTEGER      | Number of attempts allowed for the quiz.               |
| `point`           | INTEGER      | Point value for the quiz.                              |
| `passingPoint`    | INTEGER      | Minimum passing point for the quiz.                    |
| `passed`          | BOOLEAN      | Indicates whether the user has passed the quiz.        |
| `difficultyLevel` | INTEGER      | Difficulty level of the quiz (0: none, 1: easy, 2: medium,3: hard).        |
| `startDate`       | DATETIME(3)  | Start date and time of the quiz.                       |
| `endDate`         | DATETIME(3)  | End date and time of the quiz.                         |
| `isActivated`     | BOOLEAN      | Indicates whether the quiz is activated.               |
| `isShared`        | BOOLEAN      | Indicates whether the quiz is shared.                  |
| `createdAt`       | DATETIME(3)  | Date and time of quiz creation.                        |
| `updatedAt`       | DATETIME(3)  | Date and time of last quiz update.                     |


### 1.4. Categories

DDL command for creating `categories` table:
```
CREATE TABLE `categories` (
    `id` VARCHAR(191) NOT NULL,
    `parentId` VARCHAR(191) NULL,
    `name` VARCHAR(191) NOT NULL,
    `icon` TEXT NOT NULL,
    `status` INTEGER NOT NULL DEFAULT 1,
    `sortOrder` INTEGER NOT NULL DEFAULT 0,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```
Columns description:
| Column      | Type         | Description                                        |
| ----------- | ------------ | -------------------------------------------------- |
| `id`        | VARCHAR(191) | Unique identifier for each category.               |
| `parentId`  | VARCHAR(191) | Identifier of the parent category (if applicable). |
| `name`      | VARCHAR(191) | Name of the category.                              |
| `icon`      | TEXT         | Icon associated with the category.                 |
| `status`    | INTEGER      | Category status (0: Inactive, 1: Active).          |
| `sortOrder` | INTEGER      | Sort order for the category.                       |
| `createdAt` | DATETIME(3)  | Date and time of category creation.                |
| `updatedAt` | DATETIME(3)  | Date and time of last category update.             |


### 1.5. Quiz_questions

DDL command for creating `quiz_questions` table:
```
CREATE TABLE `quiz_questions` (
    `id` VARCHAR(191) NOT NULL,
    `quizId` VARCHAR(191) NOT NULL,
    `questionId` VARCHAR(191) NOT NULL,
    `sortOrder` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```
Columns description:
| Column       | Type         | Description                                                           |
| ------------ | ------------ | --------------------------------------------------------------------- |
| `id`         | VARCHAR(191) | Unique identifier for the relationship between quizzes and questions. |
| `quizId`     | VARCHAR(191) | Identifier of the quiz.                                               |
| `questionId` | VARCHAR(191) | Identifier of the question.                                           |
| `sortOrder`  | INTEGER      | Sort order for the question within the quiz.                          |


### 1.6. Participants

DDL command for creating `participants` table:
```
CREATE TABLE `participants` (
    `id` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `quizId` VARCHAR(191) NOT NULL,
    `questions` INTEGER NULL,
    `correct` INTEGER NULL,
    `totalAttempt` INTEGER NOT NULL DEFAULT 1,
    `point` INTEGER NOT NULL,
    `startedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `completedAt` DATETIME(3) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

Columns description:
| Column         | Type         | Description                                                    |
| -------------- | ------------ | -------------------------------------------------------------- |
| `id`           | VARCHAR(191) | Unique identifier for each participant.                        |
| `userId`       | VARCHAR(191) | Identifier of the user participating in the quiz.              |
| `quizId`       | VARCHAR(191) | Identifier of the quiz in which the participant is involved.   |
| `questions`    | INTEGER      | Number of questions attempted by the participant.              |
| `correct`      | INTEGER      | Number of correct answers by the participant.                  |
| `totalAttempt` | INTEGER      | Total number of attempts by the participant, default value: 1. |
| `point`        | INTEGER      | Total points earned by the participant.                        |
| `startedAt`    | DATETIME(3)  | Date and time when the participant started the quiz.           |
| `completedAt`  | DATETIME(3)  | Date and time when the participant completed the quiz.         |
| `createdAt`    | DATETIME(3)  | Date and time of participant creation.                         |
| `updatedAt`    | DATETIME(3)  | Date and time of last participant update.                      |

### 1.7. User_questions

DDL command for creating `user_questions` table:
```
CREATE TABLE `user_questions` (
    `id` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `participantId` VARCHAR(191) NOT NULL,
    `questionId` VARCHAR(191) NOT NULL,
    `question` VARCHAR(191) NOT NULL,
    `image` TEXT NULL,
    `options` TEXT NOT NULL,
    `correct` TEXT NOT NULL,
    `givenAnswers` TEXT NOT NULL,
    `score` INTEGER NOT NULL,
    `timestamp` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

Columns description:
| Column          | Type         | Description                                            |
| --------------- | ------------ | ------------------------------------------------------ |
| `id`            | VARCHAR(191) | Unique identifier for each user-question relationship. |
| `userId`        | VARCHAR(191) | Identifier of the user.                                |
| `participantId` | VARCHAR(191) | Identifier of the participant.                         |
| `questionId`    | VARCHAR(191) | Identifier of the question.                            |
| `question`      | VARCHAR(191) | The question itself.                                   |
| `image`         | TEXT         | Image associated with the question (if applicable).    |
| `options`       | TEXT         | Options for the question.                              |
| `correct`       | TEXT         | Correct answer(s) for the question.                    |
| `givenAnswers`  | TEXT         | Answers given by the user/participant.                 |
| `score`         | INTEGER      | Score earned for the question.                         |
| `timestamp`     | DATETIME(3)  | Date and time when the user answered the question.     |


### 1.8. Rooms

DDL command for creating `rooms` table:

```
CREATE TABLE `rooms` (
    `id` VARCHAR(191) NOT NULL,
    `PIN` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `quizId` VARCHAR(191) NOT NULL,
    `count` INTEGER NOT NULL,
    `isStarted` BOOLEAN NOT NULL,
    `isPublic` BOOLEAN NOT NULL,
    `type` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

Columns description:
| Column      | Type         | Description                                      |
| ----------- | ------------ | ------------------------------------------------ |
| `id`        | VARCHAR(191) | Unique identifier for each room.                 |
| `PIN`       | VARCHAR(191) | PIN for accessing the room.                      |
| `userId`    | VARCHAR(191) | Identifier of the user who created the room.     |
| `quizId`    | VARCHAR(191) | Identifier of the quiz associated with the room. |
| `count`     | INTEGER      | Count of participants in the room.               |
| `isStarted` | BOOLEAN      | Indicates whether the room has started.          |
| `isPublic`  | BOOLEAN      | Indicates whether the room is public.            |
| `type`      | INTEGER      | Type of the room (1v1, group).                                |
| `createdAt` | DATETIME(3)  | Date and time of room creation.                  |

### 1.9. Room_participants

DDL command for creating `room_participants` table:

```
CREATE TABLE `room_participants` (
    `id` VARCHAR(191) NOT NULL,
    `roomId` VARCHAR(191) NOT NULL,
    `participantId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```
Columns description:
| Column          | Type         | Description                                                            |
| --------------- | ------------ | ---------------------------------------------------------------------- |
| `id`            | VARCHAR(191) | Unique identifier for the relationship between rooms and participants. |
| `roomId`        | VARCHAR(191) | Identifier of the room.                                                |
| `participantId` | VARCHAR(191) | Identifier of the participant.                                         |


### 1.10. References between tables

DDL command for adding foreign key constraints between tables:
```
ALTER TABLE `questions` ADD CONSTRAINT `questions_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `questions` ADD CONSTRAINT `questions_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `categories`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `quizzes` ADD CONSTRAINT `quizzes_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `quiz_questions` ADD CONSTRAINT `quiz_questions_quizId_fkey` FOREIGN KEY (`quizId`) REFERENCES `quizzes`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `quiz_questions` ADD CONSTRAINT `quiz_questions_questionId_fkey` FOREIGN KEY (`questionId`) REFERENCES `questions`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `participants` ADD CONSTRAINT `participants_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `participants` ADD CONSTRAINT `participants_quizId_fkey` FOREIGN KEY (`quizId`) REFERENCES `quizzes`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `user_questions` ADD CONSTRAINT `user_questions_participantId_fkey` FOREIGN KEY (`participantId`) REFERENCES `participants`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `user_questions` ADD CONSTRAINT `user_questions_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `user_questions` ADD CONSTRAINT `user_questions_questionId_fkey` FOREIGN KEY (`questionId`) REFERENCES `questions`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `rooms` ADD CONSTRAINT `rooms_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `rooms` ADD CONSTRAINT `rooms_quizId_fkey` FOREIGN KEY (`quizId`) REFERENCES `quizzes`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `room_participants` ADD CONSTRAINT `room_participants_participantId_fkey` FOREIGN KEY (`participantId`) REFERENCES `participants`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `room_participants` ADD CONSTRAINT `room_participants_roomId_fkey` FOREIGN KEY (`roomId`) REFERENCES `rooms`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
```
Foreign key constraints description:

| Table name         | Column name | Referenced table | Referenced column |
| ------------------ | ----------- | ---------------- | ----------------- |
| `questions`        | `userId`    | `users`          | `id`              |
| `questions`        | `categoryId`| `categories`     | `id`              |
| `quizzes`          | `userId`    | `users`          | `id`              |
| `quiz_questions`   | `quizId`    | `quizzes`        | `id`              |
| `quiz_questions`   | `questionId`| `questions`      | `id`              |
| `participants`     | `userId`    | `users`          | `id`              |
| `participants`     | `quizId`    | `quizzes`        | `id`              |
| `user_questions`   | `participantId`| `participants`| `id`              |
| `user_questions`   | `userId`    | `users`          | `id`              |
| `user_questions`   | `questionId`| `questions`      | `id`              |
| `rooms`            | `userId`    | `users`          | `id`              |
| `rooms`            | `quizId`    | `quizzes`        | `id`              |
| `room_participants`| `participantId`| `participants`| `id`              |
| `room_participants`| `roomId`    | `rooms`          | `id`              |


## 2. API Specification
[Postman API documentation](https://documenter.getpostman.com/view/19212893/2s93zFYf5W)

### 2.1. Register

```
POST /api/auth/register
```

Description: Register a new user with email, username, and password and send verification token to email registered.

Request body:

```
{
    "displayName": "Ngo Gia Phong",
    "email": "phong.ngo123@hcmut.edu.vn",
    "password": "12345678",
    "confirmPassword": "12345678"
}
```

Request body constraints:

| Field           | Type   | Constraints                              |
| --------------- | ------ | ---------------------------------------- |
| email           | string | Must be email format                     |
| password        | string | Must be between 8 and 20 characters long |
| confirmPassword | string | Must be between 8 and 20 characters long |
| displayName     | string | Must be between 3 and 20 characters long |

Optional query parameters: None

Response body:

```
{
    "statusCode": 201,
    "message": "Registered successfully, please check  verification link in your email",
    "data": null
}
```

Response codes:
| S tatus Code | Message | Description |
| ------------- | ------------------------------------------------ | ---------------------------------------------- |
| 201 | Registered successfully, please check verification link in your email | Register successfully, sent verification link to registered email |
400 | Validation failed | Validate request body with constraints and throw errors if any |
400 | Password do not match confirm password | Password and confirm password don't match |
400 | User with this email already exists, please confirm your email | User with this email already exists and account is not activated |
400 | User with this email already exists, please login | User with this email already exists and account is activated |

### 2.2. Login

```
POST /api/auth/login
```

Description: Login with email and password

Request body:

```
{
    "email" : "phong.ngo123@hcmut.edu.vn",
    "password": "12345678"
}
```

Request body constraints:

| Field    | Type   | Constraints                              |
| -------- | ------ | ---------------------------------------- |
| email    | string | Must be email format                     |
| password | string | Must be between 8 and 20 characters long |

Optional query parameters: None

Response body :

```
{
    "statusCode": 200,
    "message": "User logged in successfully",
    "data": {
        "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im5nb2dpYXBob25nMzIxQGdtYWlsLmNvbSIsImlkIjoiY2xqcXZrMDhlMDAwMHNibDBpaHA4aTgzbCIsInJvbGUiOiJ1c2VyIiwiZGlzcGxheU5hbWUiOiJOZ28gR2lhIFBob25nIiwiYXZhdGFyIjoiaHR0cHM6Ly9jZG4uZGlzY29yZGFwcC5jb20vYXR0YWNobWVudHMvMTEyNjMyMTM3NTMzMDY5NzI3OC8xMTI2MzM3ODc3MjQwOTcxMzA0L2tpc3NwbmctbmluamEtY29tcHV0ZXItaWNvbnMtYXZhdGFyLXNhbXVyYWktYW5nbGUtNWI0NzkwZjZjMzk4OTEucG5nIiwic3RhdHVzIjoxLCJpYXQiOjE2ODg2NTE1MjYsImV4cCI6MTY4ODY1MTUzNn0.CfsH4jyZ84qr39YJoBjAYvjOqOyNxqQUPEn7weQrW80",
        "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im5nb2dpYXBob25nMzIxQGdtYWlsLmNvbSIsImlkIjoiY2xqcXZrMDhlMDAwMHNibDBpaHA4aTgzbCIsInJvbGUiOiJ1c2VyIiwiZGlzcGxheU5hbWUiOiJOZ28gR2lhIFBob25nIiwiYXZhdGFyIjoiaHR0cHM6Ly9jZG4uZGlzY29yZGFwcC5jb20vYXR0YWNobWVudHMvMTEyNjMyMTM3NTMzMDY5NzI3OC8xMTI2MzM3ODc3MjQwOTcxMzA0L2tpc3NwbmctbmluamEtY29tcHV0ZXItaWNvbnMtYXZhdGFyLXNhbXVyYWktYW5nbGUtNWI0NzkwZjZjMzk4OTEucG5nIiwic3RhdHVzIjoxLCJpYXQiOjE2ODg2NTE1MjYsImV4cCI6MTY4ODczNzkyNn0.OFZu2r3WQqaH8CTAaR9SZJxpg2yGHz7vzOSyfresoo0",
        "user": {
            "id": "cljqvk08e0000sbl0ihp8i83l",
            "email": "ngogiaphong321@gmail.com",
            "displayName": "Ngo Gia Phong",
            "avatar": "https://cdn.discordapp.com/attachments/1126321375330697278/1126337877240971304/kisspng-ninja-computer-icons-avatar-samurai-angle-5b4790f6c39891.png",
            "role": "user",
            "status": 1
        }
    }
}
```

Response codes:

| Status Code | Message                                                  | Description                                                          |
| ----------- | -------------------------------------------------------- | -------------------------------------------------------------------- |
| 200         | User logged in successfully                              | Login successfully, return access token, refresh token and user info |
| 400         | Validation failed                                        | Validate request body with constraints and throw errors if any   |
| 400         | Your account is not activated, please confirm your email | User with this email already exists and account is not activated     |
| 400         | Invalid credentials                                      | Invalid email or password                                            |

### 2.3. Get me

```
GET /api/auth/me
```

Description: Get user info

Headers : 
```
Authorization: Bearer token
```

Request body: None

Request body constraints: None

Optional query parameters: None

Response body:

```
{
    "statusCode": 200,
    "message": "User retrieved successfully",
    "data": {
        "email": "ngogiaphong321@gmail.com",
        "id": "cljqvk08e0000sbl0ihp8i83l",
        "role": "user",
        "displayName": "Ngo Gia Phong",
        "avatar": "https://cdn.discordapp.com/attachments/1126321375330697278/1126337877240971304/kisspng-ninja-computer-icons-avatar-samurai-angle-5b4790f6c39891.png",
        "status": 1,
        "iat": 1688651526,
        "exp": 1688651536
    }
}
```

Response codes:

| Status Code | Message                     | Description                |
| ----------- | --------------------------- | -------------------------- |
| 200         | User retrieved successfully | Get user info successfully |
| 401         | Unauthorized                | Access token is expired    |
| 401         | Unauthorized                | No token is sent           |

### 2.4. Refresh token

```
POST /api/auth/refresh
```

Description: Refresh access token with refresh token

Request body :

```
{
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im5nb2dpYXBob25nMTIzQGdtYWlsLmNvbSIsImlkIjoiY2xqcjdhMXU0MDAwMHNibnVmZmFrZnB6cyIsInJvbGUiOiJ1c2VyIiwiZGlzcGxheU5hbWUiOiJOZ28gR2lhIFBob25nIiwiYXZhdGFyIjoiaHR0cHM6Ly9jZG4uZGlzY29yZGFwcC5jb20vYXR0YWNobWVudHMvMTEyNjMyMTM3NTMzMDY5NzI3OC8xMTI2MzM3ODc3MjQwOTcxMzA0L2tpc3NwbmctbmluamEtY29tcHV0ZXItaWNvbnMtYXZhdGFyLXNhbXVyYWktYW5nbGUtNWI0NzkwZjZjMzk4OTEucG5nIiwic3RhdHVzIjoxLCJpYXQiOjE2ODg2NTIwMzMsImV4cCI6MTY4ODczODQzM30.GVJ6zjHboMBeicJUgvX86bbt43fmi15kkVKKsNv8bW8"
}
```

Request body constraints:

| Field        | Type   | Constraints       |
| ------------ | ------ | ----------------- |
| refreshToken | string | Must be not empty |

Optional query parameters: None

Response body :

```
{
    "statusCode": 201,
    "message": "Tokens refreshed successfully",
    "data": {
        "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im5nb2dpYXBob25nMzIxQGdtYWlsLmNvbSIsImlkIjoiY2xqcXZrMDhlMDAwMHNibDBpaHA4aTgzbCIsInJvbGUiOiJ1c2VyIiwiZGlzcGxheU5hbWUiOiJOZ28gR2lhIFBob25nIiwiYXZhdGFyIjoiaHR0cHM6Ly9jZG4uZGlzY29yZGFwcC5jb20vYXR0YWNobWVudHMvMTEyNjMyMTM3NTMzMDY5NzI3OC8xMTI2MzM3ODc3MjQwOTcxMzA0L2tpc3NwbmctbmluamEtY29tcHV0ZXItaWNvbnMtYXZhdGFyLXNhbXVyYWktYW5nbGUtNWI0NzkwZjZjMzk4OTEucG5nIiwic3RhdHVzIjoxLCJpYXQiOjE2ODg2NTE2MzEsImV4cCI6MTY4ODY1MTY0MX0.7_N_AWEAobeoLcu3uG2E2rXZR2la8_TkvmEvYAMBawc",
        "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im5nb2dpYXBob25nMzIxQGdtYWlsLmNvbSIsImlkIjoiY2xqcXZrMDhlMDAwMHNibDBpaHA4aTgzbCIsInJvbGUiOiJ1c2VyIiwiZGlzcGxheU5hbWUiOiJOZ28gR2lhIFBob25nIiwiYXZhdGFyIjoiaHR0cHM6Ly9jZG4uZGlzY29yZGFwcC5jb20vYXR0YWNobWVudHMvMTEyNjMyMTM3NTMzMDY5NzI3OC8xMTI2MzM3ODc3MjQwOTcxMzA0L2tpc3NwbmctbmluamEtY29tcHV0ZXItaWNvbnMtYXZhdGFyLXNhbXVyYWktYW5nbGUtNWI0NzkwZjZjMzk4OTEucG5nIiwic3RhdHVzIjoxLCJpYXQiOjE2ODg2NTE2MzEsImV4cCI6MTY4ODczODAzMX0.sgWLjE7sUce5_0dakY7oWs0-SXFMjFv_FPdn8GdsPCM"
    }
}
```

Response codes:

| Status Code | Message                       | Description                                                        |
| ----------- | ----------------------------- | ------------------------------------------------------------------ |
| 201         | Tokens refreshed successfully | Refresh token successfully                                         |
| 400         | Validation failed             | Validate request body with constraints and throw errors if any |
| 400         | Invalid token                 | Refresh token is invalid                                           |

### 2.5. Logout

```
POST /api/auth/logout
```

Description: User logout

Headers : 
```
Authorization: Bearer token
```
Request body: None

Request body constraints: None

Optional query parameters: None

Response body:

```
{
    "statusCode": 200,
    "message": "User logged out successfully",
    "data": {
        "accessToken": "",
        "refreshToken": ""
    }
}
```

Response codes:

| Status Code | Message                      | Description             |
| ----------- | ---------------------------- | ----------------------- |
| 200         | User logged out successfully | Logout successfully     |
| 401         | Unauthorized                 | Access token is expired |
| 401         | Unauthorized                 | No token is sent        |

### 2.6. Confirm email

```
POST /api/auth/confirm
```

Description: Confirm email with verification token

Request body :

```
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJjbGpyN2ExdTQwMDAwc2JudWZmYWtmcHpzIiwiaWF0IjoxNjg4NjUyMDE5LCJleHAiOjE2ODg2NTIwMzl9.1LtJvtcZPbHzsPffDbcGz66pf3cjGz98WCM9IvkLw08"
}
```

Request body constraints:

| Field | Type   | Constraints       |
| ----- | ------ | ----------------- |
| token | string | Must be not empty |

Optional query parameters: None

Response body :

```
{
    "statusCode": 200,
    "message": "Verify account successfully",
    "data": {
        "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im5nb2dpYXBob25nMTIzQGdtYWlsLmNvbSIsImlkIjoiY2xqcjdhMXU0MDAwMHNibnVmZmFrZnB6cyIsInJvbGUiOiJ1c2VyIiwiZGlzcGxheU5hbWUiOiJOZ28gR2lhIFBob25nIiwiYXZhdGFyIjoiaHR0cHM6Ly9jZG4uZGlzY29yZGFwcC5jb20vYXR0YWNobWVudHMvMTEyNjMyMTM3NTMzMDY5NzI3OC8xMTI2MzM3ODc3MjQwOTcxMzA0L2tpc3NwbmctbmluamEtY29tcHV0ZXItaWNvbnMtYXZhdGFyLXNhbXVyYWktYW5nbGUtNWI0NzkwZjZjMzk4OTEucG5nIiwic3RhdHVzIjoxLCJpYXQiOjE2ODg2NTIwMzMsImV4cCI6MTY4ODY1MjA0M30.fXesrkZc8wTTVG8K0jFNw9USICbib9MZZDxTYoyNYHc",
        "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im5nb2dpYXBob25nMTIzQGdtYWlsLmNvbSIsImlkIjoiY2xqcjdhMXU0MDAwMHNibnVmZmFrZnB6cyIsInJvbGUiOiJ1c2VyIiwiZGlzcGxheU5hbWUiOiJOZ28gR2lhIFBob25nIiwiYXZhdGFyIjoiaHR0cHM6Ly9jZG4uZGlzY29yZGFwcC5jb20vYXR0YWNobWVudHMvMTEyNjMyMTM3NTMzMDY5NzI3OC8xMTI2MzM3ODc3MjQwOTcxMzA0L2tpc3NwbmctbmluamEtY29tcHV0ZXItaWNvbnMtYXZhdGFyLXNhbXVyYWktYW5nbGUtNWI0NzkwZjZjMzk4OTEucG5nIiwic3RhdHVzIjoxLCJpYXQiOjE2ODg2NTIwMzMsImV4cCI6MTY4ODczODQzM30.GVJ6zjHboMBeicJUgvX86bbt43fmi15kkVKKsNv8bW8",
        "user": {
            "id": "cljr7a1u40000sbnuffakfpzs",
            "email": "ngogiaphong123@gmail.com",
            "displayName": "Ngo Gia Phong",
            "avatar": "https://cdn.discordapp.com/attachments/1126321375330697278/1126337877240971304/kisspng-ninja-computer-icons-avatar-samurai-angle-5b4790f6c39891.png",
            "role": "user",
            "status": 1
        }
    }
}
```

Response codes:

| Status Code | Message           | Description                                                        |
| ----------- | ----------------- | ------------------------------------------------------------------ |
| 200         | Verify account    | Verify account successfully                                        |
| 400         | Validation failed | Validate request body with constraints and throw errors if any |
| 400         | Invalid token     | Token is invalid                                                   |

### 2.7. Resend verification token

```
POST /api/auth/resend-confirmation
```

Description: Resend verification token to email registered

Request body :

```
{
    "email" : "ngogiaphong13@gmail.com"
}
```

Request body constraints:

| Field | Type   | Constraints       |
| ----- | ------ | ----------------- |
| email | string | Must be not empty |

Optional query parameters: None

Response body :

```
{
    "statusCode": 200,
    "message": "Verification link sent successfully",
    "data": null
}
```

Response codes:

| Status Code | Message                             | Description                                                        |
| ----------- | ----------------------------------- | ------------------------------------------------------------------ |
| 200         | Verification link sent              | Verification link sent successfully                                |
| 400         | Validation failed                   | Validate request body with constraints and throw errors if any |
| 400         | User with this email does not exist | User with this email not found                                     |
| 400         | Email already confirmed             | User with this email already exists and account is activated       |

### 2.8. Forgot password

```
POST /api/auth/forgot-password
```

Description: Send reset password link to email registered

Request body :

```
{
    "email": "ngogiaphon23@gmail.com"
}
```

Request body constraints:

| Field | Type   | Constraints       |
| ----- | ------ | ----------------- |
| email | string | Must be not empty |

Optional query parameters: None

Response body :

```
{
    "statusCode": 200,
    "message": "Reset password link sent successfully",
    "data": null
}
```

Response codes:

| Status Code | Message                                               | Description                                                        |
| ----------- | ----------------------------------------------------- | ------------------------------------------------------------------ |
| 200         | Reset password link sent                              | Reset password link sent successfully                              |
| 400         | Validation failed                                     | Validate request body with constraints and throw errors if any |
| 400         | User with this email does not exist                   | User with this email not found                                     |
| 400         | Your account is not active, please confirm your email | User with this email already exists and account is not activated   |

### 2.9. Reset password

```
POST /api/auth/reset-password
```

Description: Reset password with reset password token

Request body :

```
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJjbGpyN2ExdTQwMDAwc2JudWZmYWtmcHpzIiwiaWF0IjoxNjg4NjUyNzA4LCJleHAiOjE2ODg2NTI3Mjh9.hfUnu2aZIQxuje8vSs-QdPd6fZdZjlX0iA3qjRQgQj0",
    "password":"12345789",
    "confirmPassword":"123456789"
}
```

Request body constraints:

| Field           | Type   | Constraints                              |
| --------------- | ------ | ---------------------------------------- |
| token           | string | Must be not empty                        |
| password        | string | Must be between 8 and 20 characters long |
| confirmPassword | string | Must be between 8 and 20 characters long |

Optional query parameters: None

Response body :

```
{
    "statusCode": 200,
    "message": "Password reset successfully",
    "data": {
        "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im5nb2dpYXBob25nMTIzQGdtYWlsLmNvbSIsImlkIjoiY2xqcjdhMXU0MDAwMHNibnVmZmFrZnB6cyIsInJvbGUiOiJ1c2VyIiwiZGlzcGxheU5hbWUiOiJOZ28gR2lhIFBob25nIiwiYXZhdGFyIjoiaHR0cHM6Ly9jZG4uZGlzY29yZGFwcC5jb20vYXR0YWNobWVudHMvMTEyNjMyMTM3NTMzMDY5NzI3OC8xMTI2MzM3ODc3MjQwOTcxMzA0L2tpc3NwbmctbmluamEtY29tcHV0ZXItaWNvbnMtYXZhdGFyLXNhbXVyYWktYW5nbGUtNWI0NzkwZjZjMzk4OTEucG5nIiwic3RhdHVzIjoxLCJpYXQiOjE2ODg2NTI2OTAsImV4cCI6MTY4ODY1MjcwMH0.HzXAg2aMLQKuupwiS8hMkbBaNJtBHjqnqRywRbDkZZw",
        "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im5nb2dpYXBob25nMTIzQGdtYWlsLmNvbSIsImlkIjoiY2xqcjdhMXU0MDAwMHNibnVmZmFrZnB6cyIsInJvbGUiOiJ1c2VyIiwiZGlzcGxheU5hbWUiOiJOZ28gR2lhIFBob25nIiwiYXZhdGFyIjoiaHR0cHM6Ly9jZG4uZGlzY29yZGFwcC5jb20vYXR0YWNobWVudHMvMTEyNjMyMTM3NTMzMDY5NzI3OC8xMTI2MzM3ODc3MjQwOTcxMzA0L2tpc3NwbmctbmluamEtY29tcHV0ZXItaWNvbnMtYXZhdGFyLXNhbXVyYWktYW5nbGUtNWI0NzkwZjZjMzk4OTEucG5nIiwic3RhdHVzIjoxLCJpYXQiOjE2ODg2NTI2OTAsImV4cCI6MTY4ODczOTA5MH0.vQjJSS3DJh1s9w8Se7gALSDxe6RiLFl30KUBPerD0dM",
        "user": {
            "id": "cljr7a1u40000sbnuffakfpzs",
            "email": "ngogiaphong123@gmail.com",
            "displayName": "Ngo Gia Phong",
            "avatar": "https://cdn.discordapp.com/attachments/1126321375330697278/1126337877240971304/kisspng-ninja-computer-icons-avatar-samurai-angle-5b4790f6c39891.png",
            "role": "user",
            "status": 1
        }
    }
}
```

Response codes:

| Status Code | Message                                | Description                                                        |
| ----------- | -------------------------------------- | ------------------------------------------------------------------ |
| 200         | Password reset successfully            | Password reset successfully                                        |
| 400         | Validation failed                      | Validate request body with constraints and throw errors if any |
| 400         | Invalid token                          | Token is invalid                                                   |
| 400         | Password do not match confirm password | Password and confirm password don't match                          |
