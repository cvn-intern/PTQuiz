# MVP Requirement
## I/ Functional Requirements
  ### User Registration and Authentication
  Allow users to register and log in to the app to access the quiz game.
  ### Forgot Password
  In case a user forgets their password, our app provides a convenient password reset feature. Users can request a password reset by entering their email address. They will receive an email containing a unique link to reset their password. By clicking on the link, users will be directed to a page where they can securely enter a new password of their choice.
  ### Quiz Categories
  Users should be able to choose from a variety of quiz categories (e.g., Science, History, Math, ...). 
  ### Clone the Quiz
  Logged-in users should have the option to clone a public quiz, which will then be saved in their quizzes.
  ### Create Quiz
  Users can create a quiz containing a list of questions. They should also be able to add tags to the quiz, which can be used for searching within categories.
  ### Create the question in a quiz
  Within each quiz, users can create multiple questions. They can define the type of question (e.g., text, audio, image) and the type of answer (e.g., multiple-choice, single choice, true/false). Users must then provide the question content and answer options.
  ### Host Game
  Users can host a game using a quiz they have created. They will select the quizzes that they want to host, and upon choosing to host, the app will generate a link and QR code for other participants to join.
  ### Join Game
  Users (participants) can join a game by using a link or scanning a QR code. They will be placed in a waiting room where they can see other participants and have the option to comment/react while waiting for the game to start.
  ### Play in single mode
  Participants can choose the quiz that they want to play (as exam or exercise, etc…), they can play it single.
  ### Question Display
  Present participants with questions, one at a time, during gameplay.
  ### Answer Submission and Scoring
  Participants should be able to select and submit an answer for each question. The app will keep track of the participant’s score as they progress through the question.
  ### Progress and Results
  Display the user's progress (e.g., questions answered, remaining) and the final score upon completion.
  ### Leaderboard
  Show a leaderboard where users can see their ranking compared to others.
  ### History of Game
  After playing, participants should be able to see the rankings of games they have participated in. The host of the game should be able to see the list of participants who played and their respective ranks.

## II/ Non-functional Requirements
  ### Performance
  The app should respond quickly to user inputs and load questions without noticeable delay.
  ### Scalability
  The system should be able to handle a large number of concurrent users without degradation in performance. (100 users in time)
  ### Security
  Users only access one device at a time. 
  ### Cross-platform Compatibility
The app should work across various devices and browsers.

## III/ Target users
The target users are individuals who enjoy online games, specifically those that test knowledge or allow for learning new information in a fun and competitive way. This may include students, educators, trivia enthusiasts,...

## IV/ Goals
  ### Functionality
  To develop a simple, interactive, and user-friendly online quiz game. Users should be able to participate in different categories of quizzes, keep track of their scores, and compete with others.
  ### Ease of Use
  The game should be easy to navigate and play, with clear instructions and intuitive controls. The interface should be clean and appealing.
  ### Responsiveness
  The game should work seamlessly across various devices - desktop and mobile. There should be no lag during gameplay to provide a smooth user experience.

## V/ Use-case diagram
![Alt text](https://lh3.googleusercontent.com/fife/APg5EOZMhGJ9eQiSXDrWmwuNJ7FVP1ZE7f29L6uuhQi6_hlJ6NeYFN4fLKKkP_5a9_IL0ZAzser-Ohv2iKdBcEld6Vc4I9O8ThOX68jg7XhCeRscPlUzmPKnWrdMpxbBz75X_NiQgRj1mLHXsv6V6wI_0NTYvMRPYaWoANYy1lzpPuNMBkHCQWcDJq2esAI4c0GiyD56-tyu_yjriMaUqiIY0HL2_ns8Z76Fchek8k4pAep-ZBplcaCe68Kdgtw1tXa_KJkdaVo1XHZ2eOrrPow7tn4JhLMhGGugGsgYx7tEIWFcPcDapVpYGagk0hZpSa-76ddLniJcW3lXB2pzt2AJLeWIXPOe8XrOnCnApbR7i_1gq56XlWTbpOFpYlBhCeaF4Ucyb1Euxc8Df3qrUmtgUh4Cs8v5BsNaMOLGdAqVa97JNU_vB8WMHVOl_3x6vicokTR_9f4dJ77LTC9cWmQSL9TMuPBm3IVAAZvVK5lKmVtLgXoIeRrp3K8O6aTv-piYXgKFEmbaxEhPzjDLhS3X12lVpddNK5m5Zs37kPQObgy9te_lyjadlo65J9E5FxPaH5PT3-_CAOjmIUWkpD3SRVHEV4f3Zth6FiVJ4hw7JV-u1n4BdEJUg9l35FZyxht8Dmqj9KUvNxJp3uTktPiRn3XUEgTZ5ilT51nlviV6MpgFDZQ08jtj2WimHdy_LWYeb9y6Q2i15_972eo1pbC313qKCbbXb2RGyNQ-CsD4GAY9dNg4-hanTh9YvftrwC5Bao8eJnnIBAMZ0oVrdLmyHg5N1u_4YPvp3IcgS3FkOTDgm-SOgdDeukcN1ma23hSrcXAluINF0PVZVE5jEjNkGZd9VyBKdo5vyYZyCMLqgZn87NnuiXgfd-vSvTcum4NeUwewrzWjDiJBWK4L4b5IQAhECdejfhyufYzLGW8X9kQPxxBAbmG1s913hFOf4erq3B8GTsIp7DSn-TvPQkBdyCtY3me0e4kDtW70VteTu6DGMbKbj92voetVpjqhDA4Nhhz-N06TSGiMy6886sU8WnRzSrS9iWtax-9P6hQsxLAiG3lnRq6x-E88yVRU98qF5QiBK1BSEM7qMyQx3YJgEjrJE-_hPxarmex-sIOkmEGnIKtev93cKAWWA9b2SSPeDUpDYVo_2GAtP4rbYH07Hv__krt7iGBbRR4YTBDlFzBOMPXxghuFe7xHHY4lLBGRsdaSUmQRFyT_cp7BOsAtpo6TT4dCC1vMr0PEs02Sq1qChy2D5pLduqQyrZCY7XPamIwkdRdGNfc0Y8sfTcTgauJR-YE2OWnt4GS9V4ZIM1Fud6SWnO3lChyhOUcrK3BiX6HCKIRaI8as9pnD5RCMuMt8B-QwMZXyYFRAb-CRfubp2bwNlZTnyhycYckcgof63eJsIu8BpHyHd8ke-6pOQfdFzjJPN9M00KAolEfLKZ3wDuWTG8sYMpvpWomEyUhU9EE2oZ9-ouoz4so00yfXsG877ixvuwa2RmgFFtiRfLpSXDaBO9c3s3cvQdO4MIl86YfpwuNqugZWjxl4yJtPx4Z4TQq_74smB-kX7u1Zifc=w1365-h912)
## VI/ Function MVP Requirement
  ### Host game
  - Purpose: Users host a game and others can join and answer questions together.
  - Targeted user: the user that is logged in
  - Description: 
    - User selects Library on Navbar
    - User selects Quizzes in Library
    - User selects Host game button in Quizzes 
    - The screen switches to host game mode waiting for players
    - Users press the Start button to start playing
  - Structure: 

    ![Alt text](https://lh3.googleusercontent.com/fife/APg5EOZ57XewlVYPrJMHjj3lGwIjhGIdsBwlP8LXwV9tMMR69UX0av6LxoelLTWkNxmaPAuT3n1PJYb4xHJC-r6FhXC0vu6KHyLUn_q6bDnQrX0I13oZy5pJPeOcHJPRGqCETDDSffc7GI3fAM3LmnLRyCp2t81hvUcJs7cGDa_UAdybVgAim5rtLBED5zqqdadzmsr0x-mzQVTczZGj61sak9EMbMHKc0qzU6BQwYBdG-sRseVg9WqQZzhusNmStoOikHn05PNIZQRFSXvJrMRlvsuOOiSM-zXGyQk4avUozrtEyYoa2uRNCO50d_xHGZjybsPtungiri1iIiTEOm9UoHEByt_ZF3PjhqWDiHNSGF-Cc5rUS2AnwzB7D-kF6qXonLnGMVFylxPWkUKG3ZUox3V0LsjO884ImohjLyd6zad1Uo4NTTkDHU3KT6z57Qt8kkMs4anGL7av5kme1-L6E9BFLE-YynVLjwSU_fdRHiX8N8wV4NfDfTGAmPz3f_FRPGKhtquKukYFvJuwqub5Xtj0A1SF7MkSd8nXwzdWhVYGE0XRI1YkBb9fWtcUFe9pISLqf6I4_Ll9E_StSuIptZ5XE1CgYvojt3TdDk90TXKbQSQ_niURX4rPZ_3lVXDBJ4jUnn1gM7DnQ3cdnrLmVeE2noecfoc0L67VsAoVGzV85hjd_X2D-qd6A38e2lX05nhgwq1rJmnNvlmCFkQbQabS2F26zDglc_WPCimJo1uQvtAAmyMwLC-OLshx65NiPsCAcHOWrGDW_gmeAW6jhfATPKJm-nUo-oCz6xc-FbAbA09SR94rEIpaNTCXlPixkq4iaY0NqeQNke8s8YZ3mvwDf88vtgC5mryTK8A7tRa5-aEI-QnZxJCfl56lVd0G9momfHK72jKJ5_6SX73MNsv69r87UPVdemErpthS8YK75VT069aTNY0otOXUupVSpzJC2If_UiVLB2F70lxIjyT_ir-Lgo_YGSkkALyen7SlEAB0NwfE5nrEhuoraAAVcmmYKzA6bMdbADAD-yVAQNLBLmNHyupsbsxOSwsjmpo5eXr5EFuTIGUgVaYpw1Sr1uX2cRROHRHBylEVM9OWFoaguIY-E4TTyFrt2raao8MCC1n7C7lbxwRAJSHM3tLHrPWsq9djtdt4xaXqjhOQ-ZfOMa0IoZg9dZAUd6y9o7IYDFkioHp_F8HW8DaDMTU3uNUPeKYYMMbNifUB8wtWVGTXPawoYh-Z7CyYd25XfcFzYW9sCq5ggpsdy9slwLHdDpJ4j2vd5WRd9Vc_1ZnvE0LJuYh-FChw3EAQPgtOFggHRU-Pw8QzNQtCLha_YyGi5gpzOs2obSLU90HvnTgIrucytIiHR93zXxrBV3KvfYaGYzZWcWCsxN4_PdJSC_6CVasxhz3fJmCvW7Si20q9prZKHcO3eZjni2tAPUUZDd4pD5NDkaY_lVvPbrSEoCKdisXUTywj5rjqgDoSjHGUrW_OKH58og1rWFJWEwRrVr9SkL31X1yH2gVkdq1Ps_y9QUtuvq4FTXyxUu87coYuKjWe_Gg8UBq0fvKgTh-IDFU=w1365-h912)
  ### View public Quizzes
  - Purpose: User can view Quizzes of other user when it is public
  - Targeted user: the user that is logged in or not logged in
  - Description: 
    - User select Discovery in Navbar
    - User select View button of Quizzes when it is public
    - System show question of Quizzes
  - Structure: 

    ![Alt text](https://lh3.googleusercontent.com/fife/APg5EObAtWrYRZJ93kQlDzFJzKA5NKV92twEbpWoWgQVwbL5ZGN8xkF7TsHHzFCDaGWhdTRv_hFso6QBZRl81nGjihwHKkzhwn52DAiZmhMXy2RUW1u2r-1PebxLGi-a6rkOq9WI-D3DsBkpNl5NvTzIINYyv4p2MgxdHob4rnA6J8uxMPYzUdWyHzicDUHmbShUzJi09gNkZDsaQjk0EzPhRFtEZw-zhzGmsAdwsaK8-H_aGr7WL3yIo9GUXWYVjonKXcKZDEMTyhA_Gx5PO_h_bOJxZXi-T8IwewaibhOozvXauXlqSxVL2HyF29kH2lhoV1GyTlMuorsHXV6bptX2qx1-x4a68rxsjF4eF6vAwLMceaIqImC78OdOgxeZbDNF3-X54FxKUCnmA97Bxv_tOcds-tF20dYzEc7ovjREMoX6o4iHYjCXqptOxnxPsEoZtNG90H0QmxMCgdxGLAsPvP8rKA9_X6Z4dJ9q25wpikt4T_QVDAf9eFXQ_7XimxL_-EIloMO-JXbcBa6jR7ZBR76c4FM7e9dOoW6SJCAzUnUvMNbCKPXrYxxAYgdWfFu4n4CiIiazqmdTHIkYYDw6rnkTttxd41xXGA7ITN3CnP0_ntR0CHlxkym8-1Cp3E_M_xDA515huARsSE9GbcWSH32U5SbvK7EFzIPi9pKbw3Y4VuRo-CD8MWAADjF70sBCmQ9sB8gan4_TbisFXdIPsi8CJ7-vnUGJUeiFPkTTr9AnQC1NUmWPjIAs5gpoRYz8KD0Ikhpg4Y2VrxOu5w8n_ckhlU3fxyOSO6jBxvuOG0nRmtlNIU_mBfr243EyAn4PPJBWUow-emmtsIsBOEjxyai0Y8CAN78pW2L88UuK9TqtFrAxXbYh7gabufk-i6KgesuIytLXhBvYzmZpWrkuCUw-_ws9OGoC1M2QLrtnRq6iPeb71jgBfo8A1I6J7PSm8B4GOWzo4SKCyHSwbmtB4ajS5nVf1q8QxVVMZtXRcFMeE8zshfPukmn7EC6QCGD4TafNMFYASz5SXAwQbiWMP0p7sGkt0EVCAcTZ7e0cLrFoi8xFzGdRDyJ8lTTCyETgja8qRa2mv_OsdAh90TmBHZ_MvzGWEzyvgNT_Q-vfmoO2kg2TeE7v9fF1hRU5SIIPOBKZzFPWb9DJ3N-WHZkLcLOVX1YXzm5p2eHO65ej3a9VRdfDuEhofPQpJyH8PJl3zPZN-g5Nm_jrH1LJGFOxl2jW6sSL32B8DUAz650q1WkcUdFXlO4h-gZR9tXIFtU1QA9hd91Ec1zhcDBMugV1YMbd6c4usEtTkJwcv6_ffIWz5qx7KfD7kJybmeopRC7YXUkonkjS4mJjdy4fpLJ-QDeXKGIFf-tDoOI01n2B1c5MBU7POW7VU5Q7QAptXo07Be4NjIcmqcgM3Qaq_VqFaYZAFJSZQtGUKKJa7sUbYq9WqhtyhGaDyWzjnNsBlc0uAp0sCevHpIsbzqEdbqNy7uUlCQx0k_i9vmckOxGkakrozkYgMSQNdl_25m3n3gFi03JC4tHGwq2aG2Gq-ulHwk1WsUGLt3gx4V62EssSV8U=w1365-h912)
  ### Join Game
  - Purpose: User can join game of other user who is host game and answer question together with other players, now that person is participant
  - Targeted user: the user that is logged
  - Description: 
    - User scan QR code,  input URL or PIN to join game
    - If user not logged in:
      - System show screen of login
      - User input name 
    - System show screen of Waiting game 
  - Structure: 

    ![Alt text](https://lh3.googleusercontent.com/fife/APg5EObHrn5XaaMYo9VrXMz-CyGOWykORSprs1wQCYELMmjEw24ZVXjeYXj_QsZfHsG9J2GGSl7oWfoIf-mSd3jAA_yie-DO7jYR_b3WYAxBm9OWJmSjZqZ_wpPzkSuJGSE_Hijwrjf-y9oS86VGYn2v-IucoqPuwrx51KjZGwqocv9VXLIc-VYeUjS_ucPNgOWAxhYPjdjp1a9Ip-ijvDtd1zw-eIKWrcgN9eU846ngAfCehVDIbslNaOKeRys35n4Ae9Fziu-rqn9C91FRsezWc8EJjUuoxljYYpy6e9LE2_QY-do85gX7pKgbd6ODMfk6UjUPTzbew57E-sUr8PoqkKE-jYzXhHsyQCKWxxDMTD6yZ_o5mkgeU91Wg6_isl4ieXBpAzzfZHFhKfGajEU9jq_6IJzAbmsUPpVhjmHY-cx26F1-26T9R88LhGgk1-dwKzgC_QnkId1THlKvMcdiMdj2HBGwaYqnTVKmVPt16r3NgtX5XvMS92jptVwv1OhlB5ylDL9H8irM2x-Eq-8ewTh5IidylvUo1O4It6k3ier9rflANQlFpt7HLXrqsMsnZbY800HpRPwBzu7fkkrLNfaiqsk4Fr_7GyLUyyCCHPQeeP8UiqRyfXn6QlV7n4ogfEWuskXXB9ngxbpo_bD5PtPds19oC1PBfL7hlb_vxYOTYa2PWwLmjwpuc0VRi4o-XCFfJowEhhPlfVCeOv_1QxJCbwn1G4d4QDWLH8Nwqbng4y-vuQWp2hgv4CocA-rR5YOKUEbSIVDsLpf3P5Ym0GM1Bbar67aY3vtuy5gyqHcaAyfh06MhFZGgeKyR-BC67gmPP36tysbLnPZ_dEkdZKOlL4AWMzvgJg2peG-e8JWkfgzGYoyMSY2SnvlY4Jt6NWqZWQ2xrdScLfk3w1BZAe7Xnh1g6u7Fk0FqBMa4nOeH6-htrTEWpzXdu_t56kYNTT-Ft_19ut__-bJutsPjDPNbCk_aV4_ZuqFt2A04uMSA5k0SswJCCwHF9X5TzOaO23klnb7wplyukd1P0xEtl363vOvv6HT57BWrFd5SLl5ovRQf-k9bTwFxqOB9IPjacr_z5HhKJamjJCDl7sdFPVntN7-JBmF2dDzmbZWti0X4AWgOQBzG09HfmlKfGejUIOOnS5Aw2MWeSehlzmho5hufkwonbHdGyD43_084Vy9-Pe-VQoN6XokWlBanTCO4WDQsg5o2DqX3jm_SXcO0JYQLLaGb1oZS1NSSotMI6tUMFwt7Y1HqUisgOAnMETXEYCfa3T0qpbyzKJAnhLOrb2MX75ERfSEgZbPDTQF1hm_sEakR2iN4E4L1Wxu5dx3fVb--iSY3aaCYANzAsG2OSxwkumMl1S9uzQA4WTf-gqRYhfvXpD0c45MgE2_TtRMR7asqkPcc1I9j5I6Po7CcE2l1UYxuTrNwrC2KSd19s7A45rwHLXLSifCxetdjsSXROa0Nr2BVzEnlXVIIT4kVngDMg5biNRxpVnk16CGxYQbk5CwuxMUXK5rY0P7v3D9oRrRjMwazGYn-9vhGNna1PzTpaPcNKmQ-g8BPvXFWxpc=w1365-h912)
  ### Create Quizzes
  - Purpose: Users host a game and others can join and answer questions together.
  - Targeted user: the user that is logged in
  - Description: 
    - User select Create Quizzes in DashBoard
    - System show screen of create Quizzes
    - User input question
    - User input image or audio 
    - User input answers for question
    - If user want to add question:
      - User press add question button
      - Go back to step 3
    - User press Save button to save Quizzes
  - Structure: 

    ![Alt text](https://lh3.googleusercontent.com/fife/APg5EOZ4cRfNodCkTsSNBkkrHB-5jiICZIsgdxT-aAPOJCsNlV_Y7shpVkArCPKk02YWPGeT8Plngc5X_3c2lzBiBO4hqf0gdQF0brWXE8-ICa8iw9hhamx61jqCxWlrtpJp7V0Ekt9xjVEpryTibGB8qYYUyrO2u8HunLzv9gEBlLUhEpaax77XQn1xxODbk35lkh0cKdl69jmOnEmoW4xuoKUkiHPs0L6SN7hE5HhDbecbs-pc-d0RlrE108WCMAEupGo3hcl_XUPaMt47euvId6YGpQ6rCasegQFsjIOGcE0V6Voh6kaP7R3V2ySwME6cp1r254JXP1spI_-3l_2-BtqRndaj1O0Qo4UjtsqRsYAhCw6ty1H3oC8-0o6bxjNw8VE6Z56-YKfisp4wE45bmcztU9oFw57YKoNOz7UJOKMGV-7bFS3wLpT-dNYBzvCCTFUPJBd6j_OimPj6Ola4DK7HpNgSHdZvWaDhJsb-15Mo4GaOeDqmqpNv3OGggWGsJ-_WkwqLJQdbHQTWlQUmAxIbQteXOoriwtwaPUZqahanXHp7-Lm-SbejpSwSJvPOOduL9dRCdwd3UZ9ATrYO1yJ6NEWiAlfNvkqNGuKaPdEYg7tOt1QD5o3XuZQz6LIlClScQiB73FcYsYfPTdbQOYwz7rf_8MI5E6Lb5Dy95Pr7_mnMaXUrrDI-qlbE96yiiwbN9qwDuIWqit5rIvnWSTseMJsEu-y-SelovqENNz0a8vtrakwMQsnbfJ1X3VlaTuaTImqGqMkJv4KqQVu3GTh5XEpY4bceCFgW1K6djBW-FNci6ASvtee5IMgmAisXS1dFpkNkROPBqesv-QHhEc_HNQ5OdBFb_lBra4mlSoZF1z9xRgGQR2XnBB9HQrqSt-hV2E-rHPKoBTF653Pogf12VCDE-u8cpGXyzQ1zyQeKqZ0JuCQ95j97dXw4clLDRLIU3aY2eundSEWRTg8Z3SnGI7WNbrWiWGeO6Pf2mYSmj24bNoJM-q74nRiBcmwBEGlDUlVGjpEQjXF7h6I0to24qEbnO0zfoHQSIoxalM0-2VHUT-a4_25-RiHwzRNNFew5s_GE-KytPV74feCxkmyaTuNVpxdliLgyiRmNu2QS80CuDLNcYFWlHD4nPrn_s5O915VZWvUWPl3hEiJagf3i3q-jukYVh6qPGTbv0ecbGWB1TkWt0b-69dPGypicr3IzhWioxs_wg0YknZsOFp86B2-L3M2iYLGPK1zbgAkemxybmOHHaVrGyKpRKkFOZqcVnX7YMCU6kuUBTxJGTG6DyznhmQe8RxqrTWhg_y9RTXECBgz_cqD3OAtLaAM8yUszHrJ59DadvERELio_DajniKWKqjIsx4XaiQaFaoGKPKt6jA-y7XzetsSZp0ZvaHJef9OzxccEODwtzMbA3okt-bV2SlvTAv0luISRVZiJWCCumLMOwmO5gRZf2NwJeAjJ50INzin3qW6sTclwNSfLc7g29pdWzzZN-BhY8d94CWqccMh3Vtg2sZm1jjCAOAA3SBtYYn9qJLz_i1FNL4QtCk219WveG_aRobvfNwE=w1365-h912)
  ### Play Game
  - Purpose: Users can single play game by answers of selected Quizzes
  - Targeted user: the user that is logged in
  - Description: 
    - User select Discovery in Navbar 
    - User select Quizzes in Discovery 
    - User select Play Game button to single play
    - System show questions in Quizzes and user answer it 
  - Structure: 

    ![Alt text](https://lh3.googleusercontent.com/fife/APg5EOb28Mugurs4xiBzXoEzIeMHCP2gJmz53sU_L3DibNbxENnneM-gzsvwwgWTICvY8hFrBsT7CIowrkfJyaaFQDFso8VDZnTlAysEznffzqR6vvpZcfjzxMlVZyl3CFSfEazKc7rgyjVGVL3Vm7m5KCNSqT_-l1tLgTvjpljl4Am4lVxDHAnZ2wVpsyCCqPkjj4MUBaQVMmZMeuP49bW2FsQTy9z37ztQ33mXBVq_hrk1qSfMAsyopcj4aKlkbrAAvWtwelVaHB2m1JACipeRo7bnOQQbOAyFLB7uIgnE865tAPqrI3l0HPm7iEcTXQgngGvnkV9z3kjQMrT0gAzEAnxZMDl933nd-Mb_VqlDw1xOumOdd4WeCNhTsj-655Z8LhHoGLK-L35AxxijfCmKyBj0NM1en5VXcEbxuuKbWrJdHpwrXB4mjGd-yyj53XGFlCbWhgnSmAIpw2qbtlSJtydIxdjqjgTA9b2IC4gToYdbcoGPtKgmLiroxOW2lGZhS9YbIoMRH-RkemdGo3paATSycSCkdWOu-ud7eW1RO8_sisITLADR_el9rCO9h9c56JS-m99D8k8Tm6Hofqiz1TyiPc9KZ07Iy4tzHOXM5oRiAQS0w5L3nQuhl65Lc2Y_2qcTPQPvOkHnhYVKGUK94T8E3U5_1NNKxI-qABf_aztbufZ3lKRtuED73NMr_dgMvLmAqlRWmJtGrLeMQWUZTg6dKXuCFtc2Hmga46ucYSlrtMv198bNFk_hseVkw92kNhj-birKrLpA-zf_2VjTVxi0BrHG6izJiPr8e4PEhdOn00UIDMdmeJKeWaBwDyaJ5dcA8BWo_jOFK9uXSuRCdB3KA76yUPMrWKO0QXIANpm7bxCiDsSD9Io-BZKX-iQN8I2EDOQ72I5vW8Zbso5zPhDsFNnWF4hywdnLjvLORGCQLMp9owT_Cw3_ORRoahQ4eFvY53rOTe5HwJV6evPqGNB4PSqwQqxS4Q3lBhdLKJuOSjWjPphwt3BENuDmvKdEZhRpuWIAIKsCZpH8o7vxiLHEQ8D2MSsc89WLliZ5PA1rp9Y0wo01uGojg5AinEO23A8CIM5SHqwQiX07YmKpSwpQntOjCTXwRPG_cGZXmwWcuQFWAuNZbZZMD_BTC0ErpkRZri1kdQccHCyZo_zQX7-6NqilXLLrUg0JMSku8e8ToQEySStjCuA6QD7wAdzV_LNcXns9OoP2j0v-m4IJxXRIxo2u3u6LFzEEAyUmrp3CzV5jpSSp_rn3oa4b967F5KbZXjzifqTv18S9LzS6-8RwBpBapQENHU6NdTbPAB4L7kCpmY-qyZfNwGAFQgQ2zAHmnKUe7B-07CYA7OmZYLNQPicn3dWM7shJHXV8A3_yHHYHrUO1ra6PCvWWpH2kJY64kRlLGUR10lB2Av9orP5dDxCh4EOyPgQrwrOMEFjpS9YhbffxjT6De5_qZrTq0WvgbmzODXfmTDZmAa7O9ciAt1LQTTMd9JzuhQ27DH2yfcUQGjNIszMNtjZVkiCc2RdSycBcIyeiQLi_5Bb-IJb9hHV2Yxc7kfoj9XA-nVQ=w1365-h912)
  ### View my Quizzes
  - Purpose: Allow users to see their quizzes or host the game with the quiz chosen.
  - Targeted user: Online quiz game players who want to see their quizzes were created or edit questions were created in the quizzes (they also can host games here). This includes students, teachers, trivia enthusiasts,...
  - Description: 
    - Users select “Quizzes” on the Navbar.
    - Users can see their list of quizzes created. In each quiz, they can edit the question or start the game with this quizz.
    - Users can organize these quizzes using various filters like categories, creation date,...
    - Users select the quiz that they want to see and edit the questions inside.
    - If there are no quiz, the user can create their new sets by click “Create a new quizzes”
  - Structure: 

    ![Alt text](https://lh3.googleusercontent.com/fife/APg5EOakTJGqWprsQ1AANFb0r1SuDA_PICICgm7Lf0tlwU_NcqXxvFq1EsKMEr2OEVFjYzC-eMgidBDy6fyiIt8ONbzx4Dzzw_bBI9UU2sVCnqYXGEt88POdkKKgiFYCI4jFRQ4PSzz8OZAMzRdhiyDJfUrAInKBVm-dg9cL33tt485PRbnnlj3SzQH6Y_t0-9z-d_x1OKWBFYE0HuA2zWHPfO5J7Y34vZQshxghgafkLMmUvXTD4qJsekZv2WRirt0dFFzwa34qqs25NlJ6SoW19ExClDjastaYFYQ3Lsd5jtEZbuJtDwwNbYqNdMsRHDH_br41Xybn_5MFyiPyy_f8dWayxhlpoTIPNMRX2FIIIKwrdeUjJ8CTtgEhQk3IY9ajEGMzUkbD_z59-BJ1cZBPowGu3WsyY2ofhGrVJzQrPf5xvQmawROZp4SqWfaxPpRsALKXgGsJUvIwmopaw-_VH21mgdNSakzuz70M8wY0uS3rhpOF0TQBSUwen_sTSzeLV1LOZhY-sd24MeYpr0GQXA9RnWKAfqjE8eCLIuPjXCsXGY9_i_kx17QccLASpTK7Oi9aphUzWJFXsIbnDPIccKr7nB3cmqPbM5tPji3XY7B_lp6VNdR_SezMNJ2RcaMZ9PvaH02CdJCIGjLK510ti6RlVx0mUqBfIbqWQmwqh8yRlt7PtYeNdQ0xMv3gZW6qLjfQhv26PU4XZh6VIGQqXSMEstoqQjunrI_UhxrG9Bfqk13RwpgZh_Qj8g3GdPWovmnbmXpGWHSslt0Hf2nbJWvue5aNJ6lL5zKJ6_5a4Jnbf8ZsQtiRuRo4pLSlUUrWw0qg_nPERlkuuFuug8kZMxmdEGyIDUfmFiII_ooHiPS5MWvgUDyjs8KJFcisY2olMLAwZ3ZSaYMbnwA15buVlvksVbl3ghy6xUw8nwvrivq0VPVWzPqI5jsvgft3532y3CPNRNDJgddfmLdPaBmyqrKBuhyYyt52BES6k2HRaio_AmXaHVhI_35rZlMuFRG1H4-C-pmwsq1pWd2d0sIpxrz_LWVff5q_MUebl_luVRHt63DvPl1rxVlUGH3zD5dMayfrA-_c6X8chaSyUYlhi43WuJVel_FU8T4uBpoITQKDr6XdN9fx2L1vt3eVm8_nWu5omfh7iFzU21RqsfAYWucaQl7cHNU7bMRBYP3l6IHb3Ki63lEvzhZNpuxnbjFNEsEBh9YcKTUViv6W4y48hzz72iMGg8EHVfxNuho4QfCdVQJYAQrm2lVCyKLfyxywHH9lTuqfkA1xM8gpWL5GETfsvAJEnEfTohDueKun2E8mdc2uO2rV7cExkn6BOB83x2A0YTArS7CAGHliusyCfIT5s28WT6-5H2FUSxWRoWcfpxCtHtK_ooyzhMPnynNLwHZxqtCOqmsFOPkFAeHRcxivYowzanC6y0IAbyJ6m0r_lh09xjcwJmhuvMr9MlJXCDDnKGMxifY03dXG24VGZ1OtA3g4MB18dAsOtBGw424UG-GYcW993K0UKvH_EwLw_A04ifb9yuSiXnWoxOllX_2wloosA8WpPo6gAAyMaOA=w1365-h912)
  ### Add to my Quizzes
  - Purpose: Allow users can clone the public quiz into their quizzes. After cloning the public quiz, they can edit the questions inside this quiz or host the game.
  - Targeted user: Online quiz game players who want to clone the public quizzes in the Discovery
  - Description: 
    - Users select “Discovery” on the Navbar.
    - Users can organize these quiz sets using various filters like categories, creation date,...
    - Users select “Add to my Quizzes” button in the public quiz that they want to see or clone into their quizzes
  - Structure:

    ![Alt text](https://lh3.googleusercontent.com/fife/APg5EOZE8jciyKLZU3mbS6J8oUdYGLUFffGClTDNE2BRkCH9ttqhLHT6vfb_S5160b7jwF-biDuqjQWgBQ9V8XfQFS-hDfsAWW6VQozT3HdmsaRlMpCgJZEeSXe1m0awDirth3di5BI0K_XzV04s-hZo5QaiZiEI4IMSXix9X_jpdLp4bkhSiuQwMeXp6tXF1OHyu3CMizqmxhfLjKONAX8LPGO8CJmKgaMt8ldcI0anwXSgjwY1gUqjMB77aG41Zg_hyrbLXY4vYh9Ny1tGezN-lFkPMJxF_-Whz8fjkmePp1Itz5yCerp-SrrOdManb_LlpXK3vqyYAk6bj0k0pc39s6qj2OvPApJhzjpbZ6TZIVkKOsyP-Ucf4RIlNNiqcvfnLlBBmsU92-9or7bZWE-BOfM5m9lp14U3BLUjLGlFbVLjQkwLjUDUPhE-zpYyDBtC7xzemQStocF8ICG07waIwI1f95402fDooYbaJIYgUUqbExHGm1ucWl_8zZFcTCS0KggAGAHzRHz-ZYxk7WPh83r-URl7V0CgIqgaxo0pXSLNGLJWcRy570uw-35J4BzOxcUKq_Rz96xH9kQfhU-fsnlaY8z7vTNmPnfO12Lpp-rNojltSwUUJFWTRvv9WSJ6qa5LwIqNKjTNBxXDh_JFMj6ZzVJQ_869k6lNPGxBw4ZOkLQNJkT25DrgBuIuh8_Ghz1A8Tbm6Vc4bExaysacc5Ki1_VJ7YCOb4yOOXK5ubcsl6LaOxxU9_TGx8jgOtVemGTLTqvQgXRzQM0x5CZlUP9G44VHeihuKWp3WkXsjvEX0jw8Ziz_Y4kMK6enY25ar1a-LTGTP0Yw5IXpe9D2f03Xy28btj_J1OaPDeH2djgsky-OGrJvGrgoze2bXMUIaaL5sHIl91b1QnA5K5ddRzkYTOv1Z3G3Tbv9nfwYkYjz5hVv9lUtUnGrcOThKRbeGz1Ldw9YMfAXJBPlpA7y8fNvE9zmidPdwiljaRpRN9XHxbxA2vz9X5CFh13AIqir_XsTteVlWsaXSIOV8qvgumj0ZMg9iJpf3Y3R3d9ID1SGKspow_4yaMAUSutHY4wER3lzLS3Sc9RXWHTb3ip4KMaPupDh7YTR5S2O0QfDz7Caah6rIa-UYSBj7VFda3CV-uT9bORkH_BxDme0rFObuQ0xANo6GuA021xvonWUHxSCsrfGo-kT5dMbLzOQAchbmZwv9obEttbIJmKAhKzU_0tHL45uExpT5eivhtNr_YYnHCRQCOxgigcyS0X-HTYNUi92wDIHCBUPqdf-3KjhKeJJxM7baOD1g-MOhSiuROzKiKNfrJdX98zvgVRSU-kA2HG7HzRIWMSz_fnMBi0-IlvtONNr5HcOBxtRZQTdVfP3susru09SafOUGJ9M0Jzhiw46BtQ9P5wPRHN_V_LT6I4IlU_w5mi6vj-ZABJFRGJzxXVp21TeJGJJxmLP4ccDAAUbvKNVLTOFtRXFV4vSwsYynTjAXFuq29Dyn4LIN7DHHZcWJCwSR4B3iE_LijBWs-FCdzqTWstdZ-ozg8HxYX9_QQlyEGccMILhDJPen4U=w1365-h912)
