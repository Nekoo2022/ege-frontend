import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  DateTime: { input: any; output: any; }
  JSON: { input: any; output: any; }
};

export type AudioInput = {
  slug: Scalars['String']['input'];
  taskIndex: Scalars['Float']['input'];
  taskNumber: Scalars['Float']['input'];
};

export type ChangePasswordInput = {
  newPassword: Scalars['String']['input'];
  oldPassword: Scalars['String']['input'];
};

export type ChangePasswordRecoveryInput = {
  email: Scalars['String']['input'];
  newPassword: Scalars['String']['input'];
};

export type CreateAnswerInput = {
  questionId: Scalars['String']['input'];
  userAnswer: Scalars['String']['input'];
};

export type CreateAnswerModel = {
  __typename?: 'CreateAnswerModel';
  isCorrect: IsCorrectType;
};

export type CreateQuestionInput = {
  correctAnswer: Array<Scalars['String']['input']>;
  experience: Scalars['Float']['input'];
  explanation?: InputMaybe<Scalars['String']['input']>;
  question: Scalars['String']['input'];
  subjectName: Scalars['String']['input'];
  taskNumber: Scalars['Float']['input'];
  text: Scalars['String']['input'];
};

export type CreateSubjectInput = {
  name: Scalars['String']['input'];
  slug: Scalars['String']['input'];
};

export type CreateUserInput = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type CreateUserVariantInput = {
  selections: Array<TaskSelectionInput>;
};

export type DeactivateUserInput = {
  channel?: InputMaybe<Scalars['String']['input']>;
  tokenValue: Scalars['String']['input'];
};

export type DeviceModel = {
  __typename?: 'DeviceModel';
  browser: Scalars['String']['output'];
  os: Scalars['String']['output'];
  type: Scalars['String']['output'];
};

export type FindIncorrectQuestionsByTaskNumberInput = {
  slug: Scalars['String']['input'];
  taskNumber: Scalars['Float']['input'];
};

export type FindIncorrectQuestionsInput = {
  slug: Scalars['String']['input'];
};

export type FindIncorrectQuestionsModel = {
  __typename?: 'FindIncorrectQuestionsModel';
  answer: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['String']['output'];
  isCorrect: Scalars['Boolean']['output'];
  question: QuestionModel;
  questionId: Scalars['String']['output'];
  subjectSlug: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
  userId: Scalars['String']['output'];
};

export type FindMeModel = {
  __typename?: 'FindMeModel';
  isAuth: Scalars['Boolean']['output'];
  user?: Maybe<UserModel>;
};

export type FindQuestionsByTaskNumberInput = {
  skip: Scalars['Float']['input'];
  slug: Scalars['String']['input'];
  take: Scalars['Float']['input'];
  taskNumber: Scalars['Float']['input'];
};

export type FindTaskCountInput = {
  slug: Scalars['String']['input'];
  taskNumber: Scalars['Float']['input'];
};

export type GeneratePasswordRecoveryTokenInput = {
  email: Scalars['String']['input'];
};

export type GetAllStatisticModel = {
  __typename?: 'GetAllStatisticModel';
  correctPercent: Scalars['Int']['output'];
  totalAnswer: Scalars['Int']['output'];
  totalCorrectAnswer: Scalars['Int']['output'];
};

export type GetSignedUrlModel = {
  __typename?: 'GetSignedUrlModel';
  explanationImageUrls: Array<Scalars['String']['output']>;
  globalImageUrls: Array<Scalars['String']['output']>;
  imageUrls: Array<Scalars['String']['output']>;
};

export type GetTasksStatisticInput = {
  subjectSlug: Scalars['String']['input'];
};

export type ImageInput = {
  explanationKeys: Array<Scalars['String']['input']>;
  globalImages: Array<Scalars['String']['input']>;
  imagesKeys: Array<Scalars['String']['input']>;
};

export enum IsCorrectType {
  Full = 'FULL',
  Nocorrect = 'NOCORRECT',
  Partial = 'PARTIAL',
  Wrong = 'WRONG'
}

export type LocationModel = {
  __typename?: 'LocationModel';
  city: Scalars['String']['output'];
  country: Scalars['String']['output'];
  latidute: Scalars['Float']['output'];
  longitude: Scalars['Float']['output'];
};

export type LoginInput = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type LoginModel = {
  __typename?: 'LoginModel';
  message?: Maybe<Scalars['String']['output']>;
  requireTotp?: Maybe<Scalars['Boolean']['output']>;
  success?: Maybe<Scalars['Boolean']['output']>;
  userId?: Maybe<Scalars['String']['output']>;
};

export type LoginTotpInput = {
  token: Scalars['String']['input'];
  userId: Scalars['String']['input'];
};

export type Mutation = {
  __typename?: 'Mutation';
  ChangeEmail: Scalars['Boolean']['output'];
  ChangePassword: Scalars['Boolean']['output'];
  ChangePasswordRecovery: Scalars['String']['output'];
  CreateAnswer: CreateAnswerModel;
  CreateQuestion: Scalars['Boolean']['output'];
  CreateSubject: Scalars['Boolean']['output'];
  CreateUser: Scalars['Boolean']['output'];
  CreateUserVariant: Scalars['String']['output'];
  DeactivateUser: Scalars['Boolean']['output'];
  DisableTotp: Scalars['Boolean']['output'];
  GenerateDeactivateTokenByEmail: Scalars['Boolean']['output'];
  GenerateDeactivateTokenByTelegram: Scalars['Boolean']['output'];
  GeneratePasswordRecoveryToken: Scalars['String']['output'];
  GenerateTelegramConnectionToken: Scalars['String']['output'];
  GenerateTotpSecret: Scalars['String']['output'];
  Login: LoginModel;
  LoginTotp: Scalars['Boolean']['output'];
  Logout: Scalars['Boolean']['output'];
  RemoveSession: Scalars['Boolean']['output'];
  RemoveUserVariantById: Scalars['Boolean']['output'];
  ToggleFavoriteSubject: Scalars['Boolean']['output'];
  VerifyPasswordRecoveryToken: Scalars['String']['output'];
  VerifyTotp: Scalars['Boolean']['output'];
};


export type MutationChangeEmailArgs = {
  email: Scalars['String']['input'];
};


export type MutationChangePasswordArgs = {
  data: ChangePasswordInput;
};


export type MutationChangePasswordRecoveryArgs = {
  data: ChangePasswordRecoveryInput;
};


export type MutationCreateAnswerArgs = {
  data: CreateAnswerInput;
};


export type MutationCreateQuestionArgs = {
  data: CreateQuestionInput;
};


export type MutationCreateSubjectArgs = {
  data: CreateSubjectInput;
};


export type MutationCreateUserArgs = {
  data: CreateUserInput;
};


export type MutationCreateUserVariantArgs = {
  data: CreateUserVariantInput;
};


export type MutationDeactivateUserArgs = {
  data: DeactivateUserInput;
};


export type MutationGeneratePasswordRecoveryTokenArgs = {
  data: GeneratePasswordRecoveryTokenInput;
};


export type MutationLoginArgs = {
  data: LoginInput;
};


export type MutationLoginTotpArgs = {
  data: LoginTotpInput;
};


export type MutationRemoveSessionArgs = {
  id: Scalars['String']['input'];
};


export type MutationRemoveUserVariantByIdArgs = {
  variantId: Scalars['Int']['input'];
};


export type MutationToggleFavoriteSubjectArgs = {
  data: ToggleFavoriteSubjectInput;
};


export type MutationVerifyPasswordRecoveryTokenArgs = {
  data: VerifyPasswordRecoveryTokenInput;
};


export type MutationVerifyTotpArgs = {
  data: TotpInput;
};

export type Query = {
  __typename?: 'Query';
  FindAllSubjects: Array<SubjectModel>;
  FindAllUsers: Array<UserModel>;
  FindCurrentSession: SessionModel;
  FindFavoriteSubjects: Array<SubjectModel>;
  FindIncorrectQuestions: Array<FindIncorrectQuestionsModel>;
  FindIncorrectQuestionsByTaskNumber: Array<QuestionModel>;
  FindMe: FindMeModel;
  FindRandomQuestions: Array<QuestionModel>;
  FindSessionsByUser: Array<SessionModel>;
  FindSubjectBySlug: Array<TaskModel>;
  FindTaskCount: Scalars['Float']['output'];
  FindUserVariantAll: Array<UserVariantModel>;
  FindUserVariantById: UserVariantModel;
  GetAllStatistic: GetAllStatisticModel;
  GetAudioUrl: Scalars['String']['output'];
  GetImageUrl: GetSignedUrlModel;
  GetSubjectsStatistic: Array<SubjectsStatisticModel>;
  GetTasksStatistic: Array<TasksStatisticModel>;
};


export type QueryFindIncorrectQuestionsArgs = {
  data: FindIncorrectQuestionsInput;
};


export type QueryFindIncorrectQuestionsByTaskNumberArgs = {
  data: FindIncorrectQuestionsByTaskNumberInput;
};


export type QueryFindRandomQuestionsArgs = {
  data: FindQuestionsByTaskNumberInput;
};


export type QueryFindSubjectBySlugArgs = {
  slug: Scalars['String']['input'];
};


export type QueryFindTaskCountArgs = {
  data: FindTaskCountInput;
};


export type QueryFindUserVariantByIdArgs = {
  variantId: Scalars['Int']['input'];
};


export type QueryGetAudioUrlArgs = {
  data: AudioInput;
};


export type QueryGetImageUrlArgs = {
  data: ImageInput;
};


export type QueryGetTasksStatisticArgs = {
  data: GetTasksStatisticInput;
};

export type QuestionModel = {
  __typename?: 'QuestionModel';
  audioPath?: Maybe<Scalars['String']['output']>;
  correctAnswer?: Maybe<Array<Scalars['String']['output']>>;
  createdAt: Scalars['DateTime']['output'];
  experience?: Maybe<Scalars['Float']['output']>;
  explanation?: Maybe<Scalars['String']['output']>;
  explanationImages: Array<Scalars['String']['output']>;
  globalImages: Array<Scalars['String']['output']>;
  hasCorrectAnswer: Scalars['Boolean']['output'];
  id: Scalars['String']['output'];
  imagePath?: Maybe<Scalars['String']['output']>;
  images: Array<Scalars['String']['output']>;
  intro?: Maybe<Scalars['String']['output']>;
  partialAllowed: Scalars['Boolean']['output'];
  partialThreshold?: Maybe<Scalars['Float']['output']>;
  question?: Maybe<Scalars['String']['output']>;
  speakers?: Maybe<Scalars['JSON']['output']>;
  statements?: Maybe<Array<Scalars['String']['output']>>;
  subQuestions?: Maybe<Scalars['JSON']['output']>;
  subject: SubjectModel;
  subjectId: Scalars['String']['output'];
  tableSpec?: Maybe<Scalars['JSON']['output']>;
  task: TaskModel;
  taskId: Scalars['String']['output'];
  text?: Maybe<Scalars['String']['output']>;
  type?: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['DateTime']['output'];
};

export type SessionMetadataModel = {
  __typename?: 'SessionMetadataModel';
  device: DeviceModel;
  ip: Scalars['String']['output'];
  location: LocationModel;
};

export type SessionModel = {
  __typename?: 'SessionModel';
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['String']['output'];
  metadata: SessionMetadataModel;
};

export type SubjectModel = {
  __typename?: 'SubjectModel';
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
  questions: Array<QuestionModel>;
  questionsCount: Scalars['Float']['output'];
  slug: Scalars['String']['output'];
  tasks: Array<TaskModel>;
  tasksCount: Scalars['Float']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type SubjectsStatisticModel = {
  __typename?: 'SubjectsStatisticModel';
  answered: Scalars['Int']['output'];
  correct: Scalars['Int']['output'];
  correctPercent: Scalars['Float']['output'];
  subjectName: Scalars['String']['output'];
  subjectSlug: Scalars['String']['output'];
  totalQuestions: Scalars['Int']['output'];
};

export type TaskModel = {
  __typename?: 'TaskModel';
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['String']['output'];
  questions: Array<QuestionModel>;
  questionsCount: Scalars['Float']['output'];
  subjectId: Scalars['String']['output'];
  taskNumber: Scalars['Float']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type TaskSelectionInput = {
  count: Scalars['Float']['input'];
  slug: Scalars['String']['input'];
  taskNumber: Scalars['Float']['input'];
};

export type TasksStatisticModel = {
  __typename?: 'TasksStatisticModel';
  answered: Scalars['Int']['output'];
  correct: Scalars['Int']['output'];
  correctPercent: Scalars['Float']['output'];
  taskNumber: Scalars['Int']['output'];
  totalQuestions: Scalars['Int']['output'];
};

export type ToggleFavoriteSubjectInput = {
  slug: Scalars['String']['input'];
};

export type TotpInput = {
  token: Scalars['String']['input'];
};

export type UserModel = {
  __typename?: 'UserModel';
  avatar?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['DateTime']['output'];
  email: Scalars['String']['output'];
  experience: Scalars['Float']['output'];
  id: Scalars['String']['output'];
  isDeactivated: Scalars['Boolean']['output'];
  isTwoFactor: Scalars['Boolean']['output'];
  password: Scalars['String']['output'];
  rating: UserRating;
  telegramId?: Maybe<Scalars['String']['output']>;
  tempTotpSecret?: Maybe<Scalars['String']['output']>;
  totpSecret?: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['DateTime']['output'];
};

export enum UserRating {
  Advanced = 'ADVANCED',
  Beginner = 'BEGINNER',
  Expert = 'EXPERT',
  Intermediate = 'INTERMEDIATE'
}

export type UserVariantModel = {
  __typename?: 'UserVariantModel';
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['Float']['output'];
  questions: Array<QuestionModel>;
  updatedAt: Scalars['DateTime']['output'];
  user: UserModel;
  userId: Scalars['String']['output'];
};

export type VerifyPasswordRecoveryTokenInput = {
  email: Scalars['String']['input'];
  tokenValue: Scalars['String']['input'];
};

export type CreateUserMutationVariables = Exact<{
  data: CreateUserInput;
}>;


export type CreateUserMutation = { __typename?: 'Mutation', CreateUser: boolean };

export type GenerateTelegramConnectionTokenMutationVariables = Exact<{ [key: string]: never; }>;


export type GenerateTelegramConnectionTokenMutation = { __typename?: 'Mutation', GenerateTelegramConnectionToken: string };

export type ChangeEmailMutationVariables = Exact<{
  email: Scalars['String']['input'];
}>;


export type ChangeEmailMutation = { __typename?: 'Mutation', ChangeEmail: boolean };

export type ChangePasswordMutationVariables = Exact<{
  data: ChangePasswordInput;
}>;


export type ChangePasswordMutation = { __typename?: 'Mutation', ChangePassword: boolean };

export type DeactivateUserMutationVariables = Exact<{
  data: DeactivateUserInput;
}>;


export type DeactivateUserMutation = { __typename?: 'Mutation', DeactivateUser: boolean };

export type GenerateDeactivateTokenByEmailMutationVariables = Exact<{ [key: string]: never; }>;


export type GenerateDeactivateTokenByEmailMutation = { __typename?: 'Mutation', GenerateDeactivateTokenByEmail: boolean };

export type GenerateDeactivateTokenByTelegramMutationVariables = Exact<{ [key: string]: never; }>;


export type GenerateDeactivateTokenByTelegramMutation = { __typename?: 'Mutation', GenerateDeactivateTokenByTelegram: boolean };

export type ChangePasswordRecoveryMutationVariables = Exact<{
  data: ChangePasswordRecoveryInput;
}>;


export type ChangePasswordRecoveryMutation = { __typename?: 'Mutation', ChangePasswordRecovery: string };

export type GeneratePasswordRecoveryTokenMutationVariables = Exact<{
  data: GeneratePasswordRecoveryTokenInput;
}>;


export type GeneratePasswordRecoveryTokenMutation = { __typename?: 'Mutation', GeneratePasswordRecoveryToken: string };

export type VerifyPasswordRecoveryTokenMutationVariables = Exact<{
  data: VerifyPasswordRecoveryTokenInput;
}>;


export type VerifyPasswordRecoveryTokenMutation = { __typename?: 'Mutation', VerifyPasswordRecoveryToken: string };

export type LoginMutationVariables = Exact<{
  data: LoginInput;
}>;


export type LoginMutation = { __typename?: 'Mutation', Login: { __typename?: 'LoginModel', message?: string | null, userId?: string | null, requireTotp?: boolean | null, success?: boolean | null } };

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = { __typename?: 'Mutation', Logout: boolean };

export type RemoveSessionMutationVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type RemoveSessionMutation = { __typename?: 'Mutation', RemoveSession: boolean };

export type GenerateTotpSecretMutationVariables = Exact<{ [key: string]: never; }>;


export type GenerateTotpSecretMutation = { __typename?: 'Mutation', GenerateTotpSecret: string };

export type LoginTotpMutationVariables = Exact<{
  data: LoginTotpInput;
}>;


export type LoginTotpMutation = { __typename?: 'Mutation', LoginTotp: boolean };

export type VerifyTotpMutationVariables = Exact<{
  data: TotpInput;
}>;


export type VerifyTotpMutation = { __typename?: 'Mutation', VerifyTotp: boolean };

export type CreateAnswerMutationVariables = Exact<{
  data: CreateAnswerInput;
}>;


export type CreateAnswerMutation = { __typename?: 'Mutation', CreateAnswer: { __typename?: 'CreateAnswerModel', isCorrect: IsCorrectType } };

export type ToggleFavoriteSubjectMutationVariables = Exact<{
  data: ToggleFavoriteSubjectInput;
}>;


export type ToggleFavoriteSubjectMutation = { __typename?: 'Mutation', ToggleFavoriteSubject: boolean };

export type CreateUserVariantMutationVariables = Exact<{
  data: CreateUserVariantInput;
}>;


export type CreateUserVariantMutation = { __typename?: 'Mutation', CreateUserVariant: string };

export type RemoveUserVariantByIdMutationVariables = Exact<{
  variantId: Scalars['Int']['input'];
}>;


export type RemoveUserVariantByIdMutation = { __typename?: 'Mutation', RemoveUserVariantById: boolean };

export type FindRandomQuestionsQueryVariables = Exact<{
  data: FindQuestionsByTaskNumberInput;
}>;


export type FindRandomQuestionsQuery = { __typename?: 'Query', FindRandomQuestions: Array<{ __typename?: 'QuestionModel', id: string, type?: string | null, text?: string | null, question?: string | null, intro?: string | null, audioPath?: string | null, speakers?: any | null, statements?: Array<string> | null, tableSpec?: any | null, correctAnswer?: Array<string> | null, explanation?: string | null, images: Array<string>, explanationImages: Array<string>, globalImages: Array<string>, hasCorrectAnswer: boolean, subQuestions?: any | null, task: { __typename?: 'TaskModel', taskNumber: number } }> };

export type GetAudioUrlQueryVariables = Exact<{
  data: AudioInput;
}>;


export type GetAudioUrlQuery = { __typename?: 'Query', GetAudioUrl: string };

export type GetImageUrlQueryVariables = Exact<{
  data: ImageInput;
}>;


export type GetImageUrlQuery = { __typename?: 'Query', GetImageUrl: { __typename?: 'GetSignedUrlModel', imageUrls: Array<string>, explanationImageUrls: Array<string>, globalImageUrls: Array<string> } };

export type FindIncorrectQuestionsQueryVariables = Exact<{
  data: FindIncorrectQuestionsInput;
}>;


export type FindIncorrectQuestionsQuery = { __typename?: 'Query', FindIncorrectQuestions: Array<{ __typename?: 'FindIncorrectQuestionsModel', question: { __typename?: 'QuestionModel', text?: string | null, correctAnswer?: Array<string> | null, explanation?: string | null, id: string, question?: string | null, task: { __typename?: 'TaskModel', taskNumber: number } } }> };

export type FindIncorrectQuestionsByTaskNumberQueryVariables = Exact<{
  data: FindIncorrectQuestionsByTaskNumberInput;
}>;


export type FindIncorrectQuestionsByTaskNumberQuery = { __typename?: 'Query', FindIncorrectQuestionsByTaskNumber: Array<{ __typename?: 'QuestionModel', text?: string | null, explanation?: string | null, id: string, correctAnswer?: Array<string> | null, question?: string | null, task: { __typename?: 'TaskModel', taskNumber: number } }> };

export type FindCurrentSessionQueryVariables = Exact<{ [key: string]: never; }>;


export type FindCurrentSessionQuery = { __typename?: 'Query', FindCurrentSession: { __typename?: 'SessionModel', createdAt: any, id: string, metadata: { __typename?: 'SessionMetadataModel', ip: string, device: { __typename?: 'DeviceModel', os: string, browser: string, type: string }, location: { __typename?: 'LocationModel', latidute: number, longitude: number, city: string, country: string } } } };

export type FindMeQueryVariables = Exact<{ [key: string]: never; }>;


export type FindMeQuery = { __typename?: 'Query', FindMe: { __typename?: 'FindMeModel', isAuth: boolean, user?: { __typename?: 'UserModel', id: string, email: string, avatar?: string | null, experience: number, rating: UserRating, createdAt: any, isTwoFactor: boolean, isDeactivated: boolean, telegramId?: string | null } | null } };

export type FindSessionsByUserQueryVariables = Exact<{ [key: string]: never; }>;


export type FindSessionsByUserQuery = { __typename?: 'Query', FindSessionsByUser: Array<{ __typename?: 'SessionModel', createdAt: any, id: string, metadata: { __typename?: 'SessionMetadataModel', ip: string, device: { __typename?: 'DeviceModel', os: string, browser: string, type: string }, location: { __typename?: 'LocationModel', latidute: number, longitude: number, city: string, country: string } } }> };

export type GetAllStatisticQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllStatisticQuery = { __typename?: 'Query', GetAllStatistic: { __typename?: 'GetAllStatisticModel', totalAnswer: number, totalCorrectAnswer: number, correctPercent: number } };

export type GetSubjectsStatisticQueryVariables = Exact<{ [key: string]: never; }>;


export type GetSubjectsStatisticQuery = { __typename?: 'Query', GetSubjectsStatistic: Array<{ __typename?: 'SubjectsStatisticModel', subjectSlug: string, correct: number, subjectName: string, answered: number, correctPercent: number, totalQuestions: number }> };

export type GetTasksStatisticQueryVariables = Exact<{
  data: GetTasksStatisticInput;
}>;


export type GetTasksStatisticQuery = { __typename?: 'Query', GetTasksStatistic: Array<{ __typename?: 'TasksStatisticModel', correct: number, answered: number, correctPercent: number, totalQuestions: number, taskNumber: number }> };

export type FindSubjectBySlugQueryVariables = Exact<{
  slug: Scalars['String']['input'];
}>;


export type FindSubjectBySlugQuery = { __typename?: 'Query', FindSubjectBySlug: Array<{ __typename?: 'TaskModel', questionsCount: number, taskNumber: number }> };

export type FindAllSubjectsQueryVariables = Exact<{ [key: string]: never; }>;


export type FindAllSubjectsQuery = { __typename?: 'Query', FindAllSubjects: Array<{ __typename?: 'SubjectModel', name: string, questionsCount: number, slug: string }> };

export type FindFavoriteSubjectsQueryVariables = Exact<{ [key: string]: never; }>;


export type FindFavoriteSubjectsQuery = { __typename?: 'Query', FindFavoriteSubjects: Array<{ __typename?: 'SubjectModel', name: string, tasksCount: number, slug: string, questionsCount: number }> };

export type FindTaskCountQueryVariables = Exact<{
  data: FindTaskCountInput;
}>;


export type FindTaskCountQuery = { __typename?: 'Query', FindTaskCount: number };

export type FindUserVariantAllQueryVariables = Exact<{ [key: string]: never; }>;


export type FindUserVariantAllQuery = { __typename?: 'Query', FindUserVariantAll: Array<{ __typename?: 'UserVariantModel', id: number, questions: Array<{ __typename?: 'QuestionModel', id: string, text?: string | null, question?: string | null, experience?: number | null, correctAnswer?: Array<string> | null, explanation?: string | null, task: { __typename?: 'TaskModel', taskNumber: number } }> }> };

export type FindUserVariantByIdQueryVariables = Exact<{
  variantId: Scalars['Int']['input'];
}>;


export type FindUserVariantByIdQuery = { __typename?: 'Query', FindUserVariantById: { __typename?: 'UserVariantModel', questions: Array<{ __typename?: 'QuestionModel', id: string, text?: string | null, question?: string | null, experience?: number | null, correctAnswer?: Array<string> | null, explanation?: string | null, task: { __typename?: 'TaskModel', taskNumber: number } }> } };


export const CreateUserDocument = gql`
    mutation CreateUser($data: CreateUserInput!) {
  CreateUser(data: $data)
}
    `;
export type CreateUserMutationFn = Apollo.MutationFunction<CreateUserMutation, CreateUserMutationVariables>;

/**
 * __useCreateUserMutation__
 *
 * To run a mutation, you first call `useCreateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createUserMutation, { data, loading, error }] = useCreateUserMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateUserMutation(baseOptions?: Apollo.MutationHookOptions<CreateUserMutation, CreateUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateUserMutation, CreateUserMutationVariables>(CreateUserDocument, options);
      }
export type CreateUserMutationHookResult = ReturnType<typeof useCreateUserMutation>;
export type CreateUserMutationResult = Apollo.MutationResult<CreateUserMutation>;
export type CreateUserMutationOptions = Apollo.BaseMutationOptions<CreateUserMutation, CreateUserMutationVariables>;
export const GenerateTelegramConnectionTokenDocument = gql`
    mutation GenerateTelegramConnectionToken {
  GenerateTelegramConnectionToken
}
    `;
export type GenerateTelegramConnectionTokenMutationFn = Apollo.MutationFunction<GenerateTelegramConnectionTokenMutation, GenerateTelegramConnectionTokenMutationVariables>;

/**
 * __useGenerateTelegramConnectionTokenMutation__
 *
 * To run a mutation, you first call `useGenerateTelegramConnectionTokenMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useGenerateTelegramConnectionTokenMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [generateTelegramConnectionTokenMutation, { data, loading, error }] = useGenerateTelegramConnectionTokenMutation({
 *   variables: {
 *   },
 * });
 */
export function useGenerateTelegramConnectionTokenMutation(baseOptions?: Apollo.MutationHookOptions<GenerateTelegramConnectionTokenMutation, GenerateTelegramConnectionTokenMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<GenerateTelegramConnectionTokenMutation, GenerateTelegramConnectionTokenMutationVariables>(GenerateTelegramConnectionTokenDocument, options);
      }
export type GenerateTelegramConnectionTokenMutationHookResult = ReturnType<typeof useGenerateTelegramConnectionTokenMutation>;
export type GenerateTelegramConnectionTokenMutationResult = Apollo.MutationResult<GenerateTelegramConnectionTokenMutation>;
export type GenerateTelegramConnectionTokenMutationOptions = Apollo.BaseMutationOptions<GenerateTelegramConnectionTokenMutation, GenerateTelegramConnectionTokenMutationVariables>;
export const ChangeEmailDocument = gql`
    mutation ChangeEmail($email: String!) {
  ChangeEmail(email: $email)
}
    `;
export type ChangeEmailMutationFn = Apollo.MutationFunction<ChangeEmailMutation, ChangeEmailMutationVariables>;

/**
 * __useChangeEmailMutation__
 *
 * To run a mutation, you first call `useChangeEmailMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useChangeEmailMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [changeEmailMutation, { data, loading, error }] = useChangeEmailMutation({
 *   variables: {
 *      email: // value for 'email'
 *   },
 * });
 */
export function useChangeEmailMutation(baseOptions?: Apollo.MutationHookOptions<ChangeEmailMutation, ChangeEmailMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ChangeEmailMutation, ChangeEmailMutationVariables>(ChangeEmailDocument, options);
      }
export type ChangeEmailMutationHookResult = ReturnType<typeof useChangeEmailMutation>;
export type ChangeEmailMutationResult = Apollo.MutationResult<ChangeEmailMutation>;
export type ChangeEmailMutationOptions = Apollo.BaseMutationOptions<ChangeEmailMutation, ChangeEmailMutationVariables>;
export const ChangePasswordDocument = gql`
    mutation ChangePassword($data: ChangePasswordInput!) {
  ChangePassword(data: $data)
}
    `;
export type ChangePasswordMutationFn = Apollo.MutationFunction<ChangePasswordMutation, ChangePasswordMutationVariables>;

/**
 * __useChangePasswordMutation__
 *
 * To run a mutation, you first call `useChangePasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useChangePasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [changePasswordMutation, { data, loading, error }] = useChangePasswordMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useChangePasswordMutation(baseOptions?: Apollo.MutationHookOptions<ChangePasswordMutation, ChangePasswordMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ChangePasswordMutation, ChangePasswordMutationVariables>(ChangePasswordDocument, options);
      }
export type ChangePasswordMutationHookResult = ReturnType<typeof useChangePasswordMutation>;
export type ChangePasswordMutationResult = Apollo.MutationResult<ChangePasswordMutation>;
export type ChangePasswordMutationOptions = Apollo.BaseMutationOptions<ChangePasswordMutation, ChangePasswordMutationVariables>;
export const DeactivateUserDocument = gql`
    mutation DeactivateUser($data: DeactivateUserInput!) {
  DeactivateUser(data: $data)
}
    `;
export type DeactivateUserMutationFn = Apollo.MutationFunction<DeactivateUserMutation, DeactivateUserMutationVariables>;

/**
 * __useDeactivateUserMutation__
 *
 * To run a mutation, you first call `useDeactivateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeactivateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deactivateUserMutation, { data, loading, error }] = useDeactivateUserMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useDeactivateUserMutation(baseOptions?: Apollo.MutationHookOptions<DeactivateUserMutation, DeactivateUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeactivateUserMutation, DeactivateUserMutationVariables>(DeactivateUserDocument, options);
      }
export type DeactivateUserMutationHookResult = ReturnType<typeof useDeactivateUserMutation>;
export type DeactivateUserMutationResult = Apollo.MutationResult<DeactivateUserMutation>;
export type DeactivateUserMutationOptions = Apollo.BaseMutationOptions<DeactivateUserMutation, DeactivateUserMutationVariables>;
export const GenerateDeactivateTokenByEmailDocument = gql`
    mutation GenerateDeactivateTokenByEmail {
  GenerateDeactivateTokenByEmail
}
    `;
export type GenerateDeactivateTokenByEmailMutationFn = Apollo.MutationFunction<GenerateDeactivateTokenByEmailMutation, GenerateDeactivateTokenByEmailMutationVariables>;

/**
 * __useGenerateDeactivateTokenByEmailMutation__
 *
 * To run a mutation, you first call `useGenerateDeactivateTokenByEmailMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useGenerateDeactivateTokenByEmailMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [generateDeactivateTokenByEmailMutation, { data, loading, error }] = useGenerateDeactivateTokenByEmailMutation({
 *   variables: {
 *   },
 * });
 */
export function useGenerateDeactivateTokenByEmailMutation(baseOptions?: Apollo.MutationHookOptions<GenerateDeactivateTokenByEmailMutation, GenerateDeactivateTokenByEmailMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<GenerateDeactivateTokenByEmailMutation, GenerateDeactivateTokenByEmailMutationVariables>(GenerateDeactivateTokenByEmailDocument, options);
      }
export type GenerateDeactivateTokenByEmailMutationHookResult = ReturnType<typeof useGenerateDeactivateTokenByEmailMutation>;
export type GenerateDeactivateTokenByEmailMutationResult = Apollo.MutationResult<GenerateDeactivateTokenByEmailMutation>;
export type GenerateDeactivateTokenByEmailMutationOptions = Apollo.BaseMutationOptions<GenerateDeactivateTokenByEmailMutation, GenerateDeactivateTokenByEmailMutationVariables>;
export const GenerateDeactivateTokenByTelegramDocument = gql`
    mutation GenerateDeactivateTokenByTelegram {
  GenerateDeactivateTokenByTelegram
}
    `;
export type GenerateDeactivateTokenByTelegramMutationFn = Apollo.MutationFunction<GenerateDeactivateTokenByTelegramMutation, GenerateDeactivateTokenByTelegramMutationVariables>;

/**
 * __useGenerateDeactivateTokenByTelegramMutation__
 *
 * To run a mutation, you first call `useGenerateDeactivateTokenByTelegramMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useGenerateDeactivateTokenByTelegramMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [generateDeactivateTokenByTelegramMutation, { data, loading, error }] = useGenerateDeactivateTokenByTelegramMutation({
 *   variables: {
 *   },
 * });
 */
export function useGenerateDeactivateTokenByTelegramMutation(baseOptions?: Apollo.MutationHookOptions<GenerateDeactivateTokenByTelegramMutation, GenerateDeactivateTokenByTelegramMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<GenerateDeactivateTokenByTelegramMutation, GenerateDeactivateTokenByTelegramMutationVariables>(GenerateDeactivateTokenByTelegramDocument, options);
      }
export type GenerateDeactivateTokenByTelegramMutationHookResult = ReturnType<typeof useGenerateDeactivateTokenByTelegramMutation>;
export type GenerateDeactivateTokenByTelegramMutationResult = Apollo.MutationResult<GenerateDeactivateTokenByTelegramMutation>;
export type GenerateDeactivateTokenByTelegramMutationOptions = Apollo.BaseMutationOptions<GenerateDeactivateTokenByTelegramMutation, GenerateDeactivateTokenByTelegramMutationVariables>;
export const ChangePasswordRecoveryDocument = gql`
    mutation ChangePasswordRecovery($data: ChangePasswordRecoveryInput!) {
  ChangePasswordRecovery(data: $data)
}
    `;
export type ChangePasswordRecoveryMutationFn = Apollo.MutationFunction<ChangePasswordRecoveryMutation, ChangePasswordRecoveryMutationVariables>;

/**
 * __useChangePasswordRecoveryMutation__
 *
 * To run a mutation, you first call `useChangePasswordRecoveryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useChangePasswordRecoveryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [changePasswordRecoveryMutation, { data, loading, error }] = useChangePasswordRecoveryMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useChangePasswordRecoveryMutation(baseOptions?: Apollo.MutationHookOptions<ChangePasswordRecoveryMutation, ChangePasswordRecoveryMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ChangePasswordRecoveryMutation, ChangePasswordRecoveryMutationVariables>(ChangePasswordRecoveryDocument, options);
      }
export type ChangePasswordRecoveryMutationHookResult = ReturnType<typeof useChangePasswordRecoveryMutation>;
export type ChangePasswordRecoveryMutationResult = Apollo.MutationResult<ChangePasswordRecoveryMutation>;
export type ChangePasswordRecoveryMutationOptions = Apollo.BaseMutationOptions<ChangePasswordRecoveryMutation, ChangePasswordRecoveryMutationVariables>;
export const GeneratePasswordRecoveryTokenDocument = gql`
    mutation GeneratePasswordRecoveryToken($data: GeneratePasswordRecoveryTokenInput!) {
  GeneratePasswordRecoveryToken(data: $data)
}
    `;
export type GeneratePasswordRecoveryTokenMutationFn = Apollo.MutationFunction<GeneratePasswordRecoveryTokenMutation, GeneratePasswordRecoveryTokenMutationVariables>;

/**
 * __useGeneratePasswordRecoveryTokenMutation__
 *
 * To run a mutation, you first call `useGeneratePasswordRecoveryTokenMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useGeneratePasswordRecoveryTokenMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [generatePasswordRecoveryTokenMutation, { data, loading, error }] = useGeneratePasswordRecoveryTokenMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useGeneratePasswordRecoveryTokenMutation(baseOptions?: Apollo.MutationHookOptions<GeneratePasswordRecoveryTokenMutation, GeneratePasswordRecoveryTokenMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<GeneratePasswordRecoveryTokenMutation, GeneratePasswordRecoveryTokenMutationVariables>(GeneratePasswordRecoveryTokenDocument, options);
      }
export type GeneratePasswordRecoveryTokenMutationHookResult = ReturnType<typeof useGeneratePasswordRecoveryTokenMutation>;
export type GeneratePasswordRecoveryTokenMutationResult = Apollo.MutationResult<GeneratePasswordRecoveryTokenMutation>;
export type GeneratePasswordRecoveryTokenMutationOptions = Apollo.BaseMutationOptions<GeneratePasswordRecoveryTokenMutation, GeneratePasswordRecoveryTokenMutationVariables>;
export const VerifyPasswordRecoveryTokenDocument = gql`
    mutation VerifyPasswordRecoveryToken($data: VerifyPasswordRecoveryTokenInput!) {
  VerifyPasswordRecoveryToken(data: $data)
}
    `;
export type VerifyPasswordRecoveryTokenMutationFn = Apollo.MutationFunction<VerifyPasswordRecoveryTokenMutation, VerifyPasswordRecoveryTokenMutationVariables>;

/**
 * __useVerifyPasswordRecoveryTokenMutation__
 *
 * To run a mutation, you first call `useVerifyPasswordRecoveryTokenMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useVerifyPasswordRecoveryTokenMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [verifyPasswordRecoveryTokenMutation, { data, loading, error }] = useVerifyPasswordRecoveryTokenMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useVerifyPasswordRecoveryTokenMutation(baseOptions?: Apollo.MutationHookOptions<VerifyPasswordRecoveryTokenMutation, VerifyPasswordRecoveryTokenMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<VerifyPasswordRecoveryTokenMutation, VerifyPasswordRecoveryTokenMutationVariables>(VerifyPasswordRecoveryTokenDocument, options);
      }
export type VerifyPasswordRecoveryTokenMutationHookResult = ReturnType<typeof useVerifyPasswordRecoveryTokenMutation>;
export type VerifyPasswordRecoveryTokenMutationResult = Apollo.MutationResult<VerifyPasswordRecoveryTokenMutation>;
export type VerifyPasswordRecoveryTokenMutationOptions = Apollo.BaseMutationOptions<VerifyPasswordRecoveryTokenMutation, VerifyPasswordRecoveryTokenMutationVariables>;
export const LoginDocument = gql`
    mutation Login($data: LoginInput!) {
  Login(data: $data) {
    message
    userId
    requireTotp
    success
  }
}
    `;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const LogoutDocument = gql`
    mutation Logout {
  Logout
}
    `;
export type LogoutMutationFn = Apollo.MutationFunction<LogoutMutation, LogoutMutationVariables>;

/**
 * __useLogoutMutation__
 *
 * To run a mutation, you first call `useLogoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logoutMutation, { data, loading, error }] = useLogoutMutation({
 *   variables: {
 *   },
 * });
 */
export function useLogoutMutation(baseOptions?: Apollo.MutationHookOptions<LogoutMutation, LogoutMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument, options);
      }
export type LogoutMutationHookResult = ReturnType<typeof useLogoutMutation>;
export type LogoutMutationResult = Apollo.MutationResult<LogoutMutation>;
export type LogoutMutationOptions = Apollo.BaseMutationOptions<LogoutMutation, LogoutMutationVariables>;
export const RemoveSessionDocument = gql`
    mutation RemoveSession($id: String!) {
  RemoveSession(id: $id)
}
    `;
export type RemoveSessionMutationFn = Apollo.MutationFunction<RemoveSessionMutation, RemoveSessionMutationVariables>;

/**
 * __useRemoveSessionMutation__
 *
 * To run a mutation, you first call `useRemoveSessionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveSessionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeSessionMutation, { data, loading, error }] = useRemoveSessionMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useRemoveSessionMutation(baseOptions?: Apollo.MutationHookOptions<RemoveSessionMutation, RemoveSessionMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RemoveSessionMutation, RemoveSessionMutationVariables>(RemoveSessionDocument, options);
      }
export type RemoveSessionMutationHookResult = ReturnType<typeof useRemoveSessionMutation>;
export type RemoveSessionMutationResult = Apollo.MutationResult<RemoveSessionMutation>;
export type RemoveSessionMutationOptions = Apollo.BaseMutationOptions<RemoveSessionMutation, RemoveSessionMutationVariables>;
export const GenerateTotpSecretDocument = gql`
    mutation GenerateTotpSecret {
  GenerateTotpSecret
}
    `;
export type GenerateTotpSecretMutationFn = Apollo.MutationFunction<GenerateTotpSecretMutation, GenerateTotpSecretMutationVariables>;

/**
 * __useGenerateTotpSecretMutation__
 *
 * To run a mutation, you first call `useGenerateTotpSecretMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useGenerateTotpSecretMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [generateTotpSecretMutation, { data, loading, error }] = useGenerateTotpSecretMutation({
 *   variables: {
 *   },
 * });
 */
export function useGenerateTotpSecretMutation(baseOptions?: Apollo.MutationHookOptions<GenerateTotpSecretMutation, GenerateTotpSecretMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<GenerateTotpSecretMutation, GenerateTotpSecretMutationVariables>(GenerateTotpSecretDocument, options);
      }
export type GenerateTotpSecretMutationHookResult = ReturnType<typeof useGenerateTotpSecretMutation>;
export type GenerateTotpSecretMutationResult = Apollo.MutationResult<GenerateTotpSecretMutation>;
export type GenerateTotpSecretMutationOptions = Apollo.BaseMutationOptions<GenerateTotpSecretMutation, GenerateTotpSecretMutationVariables>;
export const LoginTotpDocument = gql`
    mutation LoginTotp($data: LoginTotpInput!) {
  LoginTotp(data: $data)
}
    `;
export type LoginTotpMutationFn = Apollo.MutationFunction<LoginTotpMutation, LoginTotpMutationVariables>;

/**
 * __useLoginTotpMutation__
 *
 * To run a mutation, you first call `useLoginTotpMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginTotpMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginTotpMutation, { data, loading, error }] = useLoginTotpMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useLoginTotpMutation(baseOptions?: Apollo.MutationHookOptions<LoginTotpMutation, LoginTotpMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginTotpMutation, LoginTotpMutationVariables>(LoginTotpDocument, options);
      }
export type LoginTotpMutationHookResult = ReturnType<typeof useLoginTotpMutation>;
export type LoginTotpMutationResult = Apollo.MutationResult<LoginTotpMutation>;
export type LoginTotpMutationOptions = Apollo.BaseMutationOptions<LoginTotpMutation, LoginTotpMutationVariables>;
export const VerifyTotpDocument = gql`
    mutation VerifyTotp($data: TotpInput!) {
  VerifyTotp(data: $data)
}
    `;
export type VerifyTotpMutationFn = Apollo.MutationFunction<VerifyTotpMutation, VerifyTotpMutationVariables>;

/**
 * __useVerifyTotpMutation__
 *
 * To run a mutation, you first call `useVerifyTotpMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useVerifyTotpMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [verifyTotpMutation, { data, loading, error }] = useVerifyTotpMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useVerifyTotpMutation(baseOptions?: Apollo.MutationHookOptions<VerifyTotpMutation, VerifyTotpMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<VerifyTotpMutation, VerifyTotpMutationVariables>(VerifyTotpDocument, options);
      }
export type VerifyTotpMutationHookResult = ReturnType<typeof useVerifyTotpMutation>;
export type VerifyTotpMutationResult = Apollo.MutationResult<VerifyTotpMutation>;
export type VerifyTotpMutationOptions = Apollo.BaseMutationOptions<VerifyTotpMutation, VerifyTotpMutationVariables>;
export const CreateAnswerDocument = gql`
    mutation CreateAnswer($data: CreateAnswerInput!) {
  CreateAnswer(data: $data) {
    isCorrect
  }
}
    `;
export type CreateAnswerMutationFn = Apollo.MutationFunction<CreateAnswerMutation, CreateAnswerMutationVariables>;

/**
 * __useCreateAnswerMutation__
 *
 * To run a mutation, you first call `useCreateAnswerMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateAnswerMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createAnswerMutation, { data, loading, error }] = useCreateAnswerMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateAnswerMutation(baseOptions?: Apollo.MutationHookOptions<CreateAnswerMutation, CreateAnswerMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateAnswerMutation, CreateAnswerMutationVariables>(CreateAnswerDocument, options);
      }
export type CreateAnswerMutationHookResult = ReturnType<typeof useCreateAnswerMutation>;
export type CreateAnswerMutationResult = Apollo.MutationResult<CreateAnswerMutation>;
export type CreateAnswerMutationOptions = Apollo.BaseMutationOptions<CreateAnswerMutation, CreateAnswerMutationVariables>;
export const ToggleFavoriteSubjectDocument = gql`
    mutation ToggleFavoriteSubject($data: ToggleFavoriteSubjectInput!) {
  ToggleFavoriteSubject(data: $data)
}
    `;
export type ToggleFavoriteSubjectMutationFn = Apollo.MutationFunction<ToggleFavoriteSubjectMutation, ToggleFavoriteSubjectMutationVariables>;

/**
 * __useToggleFavoriteSubjectMutation__
 *
 * To run a mutation, you first call `useToggleFavoriteSubjectMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useToggleFavoriteSubjectMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [toggleFavoriteSubjectMutation, { data, loading, error }] = useToggleFavoriteSubjectMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useToggleFavoriteSubjectMutation(baseOptions?: Apollo.MutationHookOptions<ToggleFavoriteSubjectMutation, ToggleFavoriteSubjectMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ToggleFavoriteSubjectMutation, ToggleFavoriteSubjectMutationVariables>(ToggleFavoriteSubjectDocument, options);
      }
export type ToggleFavoriteSubjectMutationHookResult = ReturnType<typeof useToggleFavoriteSubjectMutation>;
export type ToggleFavoriteSubjectMutationResult = Apollo.MutationResult<ToggleFavoriteSubjectMutation>;
export type ToggleFavoriteSubjectMutationOptions = Apollo.BaseMutationOptions<ToggleFavoriteSubjectMutation, ToggleFavoriteSubjectMutationVariables>;
export const CreateUserVariantDocument = gql`
    mutation CreateUserVariant($data: CreateUserVariantInput!) {
  CreateUserVariant(data: $data)
}
    `;
export type CreateUserVariantMutationFn = Apollo.MutationFunction<CreateUserVariantMutation, CreateUserVariantMutationVariables>;

/**
 * __useCreateUserVariantMutation__
 *
 * To run a mutation, you first call `useCreateUserVariantMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateUserVariantMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createUserVariantMutation, { data, loading, error }] = useCreateUserVariantMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateUserVariantMutation(baseOptions?: Apollo.MutationHookOptions<CreateUserVariantMutation, CreateUserVariantMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateUserVariantMutation, CreateUserVariantMutationVariables>(CreateUserVariantDocument, options);
      }
export type CreateUserVariantMutationHookResult = ReturnType<typeof useCreateUserVariantMutation>;
export type CreateUserVariantMutationResult = Apollo.MutationResult<CreateUserVariantMutation>;
export type CreateUserVariantMutationOptions = Apollo.BaseMutationOptions<CreateUserVariantMutation, CreateUserVariantMutationVariables>;
export const RemoveUserVariantByIdDocument = gql`
    mutation RemoveUserVariantById($variantId: Int!) {
  RemoveUserVariantById(variantId: $variantId)
}
    `;
export type RemoveUserVariantByIdMutationFn = Apollo.MutationFunction<RemoveUserVariantByIdMutation, RemoveUserVariantByIdMutationVariables>;

/**
 * __useRemoveUserVariantByIdMutation__
 *
 * To run a mutation, you first call `useRemoveUserVariantByIdMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveUserVariantByIdMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeUserVariantByIdMutation, { data, loading, error }] = useRemoveUserVariantByIdMutation({
 *   variables: {
 *      variantId: // value for 'variantId'
 *   },
 * });
 */
export function useRemoveUserVariantByIdMutation(baseOptions?: Apollo.MutationHookOptions<RemoveUserVariantByIdMutation, RemoveUserVariantByIdMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RemoveUserVariantByIdMutation, RemoveUserVariantByIdMutationVariables>(RemoveUserVariantByIdDocument, options);
      }
export type RemoveUserVariantByIdMutationHookResult = ReturnType<typeof useRemoveUserVariantByIdMutation>;
export type RemoveUserVariantByIdMutationResult = Apollo.MutationResult<RemoveUserVariantByIdMutation>;
export type RemoveUserVariantByIdMutationOptions = Apollo.BaseMutationOptions<RemoveUserVariantByIdMutation, RemoveUserVariantByIdMutationVariables>;
export const FindRandomQuestionsDocument = gql`
    query FindRandomQuestions($data: FindQuestionsByTaskNumberInput!) {
  FindRandomQuestions(data: $data) {
    id
    type
    text
    question
    intro
    audioPath
    speakers
    statements
    tableSpec
    correctAnswer
    explanation
    images
    explanationImages
    globalImages
    hasCorrectAnswer
    subQuestions
    task {
      taskNumber
    }
  }
}
    `;

/**
 * __useFindRandomQuestionsQuery__
 *
 * To run a query within a React component, call `useFindRandomQuestionsQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindRandomQuestionsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindRandomQuestionsQuery({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useFindRandomQuestionsQuery(baseOptions: Apollo.QueryHookOptions<FindRandomQuestionsQuery, FindRandomQuestionsQueryVariables> & ({ variables: FindRandomQuestionsQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FindRandomQuestionsQuery, FindRandomQuestionsQueryVariables>(FindRandomQuestionsDocument, options);
      }
export function useFindRandomQuestionsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FindRandomQuestionsQuery, FindRandomQuestionsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FindRandomQuestionsQuery, FindRandomQuestionsQueryVariables>(FindRandomQuestionsDocument, options);
        }
export function useFindRandomQuestionsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<FindRandomQuestionsQuery, FindRandomQuestionsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<FindRandomQuestionsQuery, FindRandomQuestionsQueryVariables>(FindRandomQuestionsDocument, options);
        }
export type FindRandomQuestionsQueryHookResult = ReturnType<typeof useFindRandomQuestionsQuery>;
export type FindRandomQuestionsLazyQueryHookResult = ReturnType<typeof useFindRandomQuestionsLazyQuery>;
export type FindRandomQuestionsSuspenseQueryHookResult = ReturnType<typeof useFindRandomQuestionsSuspenseQuery>;
export type FindRandomQuestionsQueryResult = Apollo.QueryResult<FindRandomQuestionsQuery, FindRandomQuestionsQueryVariables>;
export const GetAudioUrlDocument = gql`
    query GetAudioUrl($data: AudioInput!) {
  GetAudioUrl(data: $data)
}
    `;

/**
 * __useGetAudioUrlQuery__
 *
 * To run a query within a React component, call `useGetAudioUrlQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAudioUrlQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAudioUrlQuery({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useGetAudioUrlQuery(baseOptions: Apollo.QueryHookOptions<GetAudioUrlQuery, GetAudioUrlQueryVariables> & ({ variables: GetAudioUrlQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAudioUrlQuery, GetAudioUrlQueryVariables>(GetAudioUrlDocument, options);
      }
export function useGetAudioUrlLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAudioUrlQuery, GetAudioUrlQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAudioUrlQuery, GetAudioUrlQueryVariables>(GetAudioUrlDocument, options);
        }
export function useGetAudioUrlSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetAudioUrlQuery, GetAudioUrlQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetAudioUrlQuery, GetAudioUrlQueryVariables>(GetAudioUrlDocument, options);
        }
export type GetAudioUrlQueryHookResult = ReturnType<typeof useGetAudioUrlQuery>;
export type GetAudioUrlLazyQueryHookResult = ReturnType<typeof useGetAudioUrlLazyQuery>;
export type GetAudioUrlSuspenseQueryHookResult = ReturnType<typeof useGetAudioUrlSuspenseQuery>;
export type GetAudioUrlQueryResult = Apollo.QueryResult<GetAudioUrlQuery, GetAudioUrlQueryVariables>;
export const GetImageUrlDocument = gql`
    query GetImageUrl($data: ImageInput!) {
  GetImageUrl(data: $data) {
    imageUrls
    explanationImageUrls
    globalImageUrls
  }
}
    `;

/**
 * __useGetImageUrlQuery__
 *
 * To run a query within a React component, call `useGetImageUrlQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetImageUrlQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetImageUrlQuery({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useGetImageUrlQuery(baseOptions: Apollo.QueryHookOptions<GetImageUrlQuery, GetImageUrlQueryVariables> & ({ variables: GetImageUrlQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetImageUrlQuery, GetImageUrlQueryVariables>(GetImageUrlDocument, options);
      }
export function useGetImageUrlLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetImageUrlQuery, GetImageUrlQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetImageUrlQuery, GetImageUrlQueryVariables>(GetImageUrlDocument, options);
        }
export function useGetImageUrlSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetImageUrlQuery, GetImageUrlQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetImageUrlQuery, GetImageUrlQueryVariables>(GetImageUrlDocument, options);
        }
export type GetImageUrlQueryHookResult = ReturnType<typeof useGetImageUrlQuery>;
export type GetImageUrlLazyQueryHookResult = ReturnType<typeof useGetImageUrlLazyQuery>;
export type GetImageUrlSuspenseQueryHookResult = ReturnType<typeof useGetImageUrlSuspenseQuery>;
export type GetImageUrlQueryResult = Apollo.QueryResult<GetImageUrlQuery, GetImageUrlQueryVariables>;
export const FindIncorrectQuestionsDocument = gql`
    query FindIncorrectQuestions($data: FindIncorrectQuestionsInput!) {
  FindIncorrectQuestions(data: $data) {
    question {
      text
      correctAnswer
      explanation
      id
      question
      task {
        taskNumber
      }
    }
  }
}
    `;

/**
 * __useFindIncorrectQuestionsQuery__
 *
 * To run a query within a React component, call `useFindIncorrectQuestionsQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindIncorrectQuestionsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindIncorrectQuestionsQuery({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useFindIncorrectQuestionsQuery(baseOptions: Apollo.QueryHookOptions<FindIncorrectQuestionsQuery, FindIncorrectQuestionsQueryVariables> & ({ variables: FindIncorrectQuestionsQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FindIncorrectQuestionsQuery, FindIncorrectQuestionsQueryVariables>(FindIncorrectQuestionsDocument, options);
      }
export function useFindIncorrectQuestionsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FindIncorrectQuestionsQuery, FindIncorrectQuestionsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FindIncorrectQuestionsQuery, FindIncorrectQuestionsQueryVariables>(FindIncorrectQuestionsDocument, options);
        }
export function useFindIncorrectQuestionsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<FindIncorrectQuestionsQuery, FindIncorrectQuestionsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<FindIncorrectQuestionsQuery, FindIncorrectQuestionsQueryVariables>(FindIncorrectQuestionsDocument, options);
        }
export type FindIncorrectQuestionsQueryHookResult = ReturnType<typeof useFindIncorrectQuestionsQuery>;
export type FindIncorrectQuestionsLazyQueryHookResult = ReturnType<typeof useFindIncorrectQuestionsLazyQuery>;
export type FindIncorrectQuestionsSuspenseQueryHookResult = ReturnType<typeof useFindIncorrectQuestionsSuspenseQuery>;
export type FindIncorrectQuestionsQueryResult = Apollo.QueryResult<FindIncorrectQuestionsQuery, FindIncorrectQuestionsQueryVariables>;
export const FindIncorrectQuestionsByTaskNumberDocument = gql`
    query FindIncorrectQuestionsByTaskNumber($data: FindIncorrectQuestionsByTaskNumberInput!) {
  FindIncorrectQuestionsByTaskNumber(data: $data) {
    text
    explanation
    id
    correctAnswer
    question
    task {
      taskNumber
    }
  }
}
    `;

/**
 * __useFindIncorrectQuestionsByTaskNumberQuery__
 *
 * To run a query within a React component, call `useFindIncorrectQuestionsByTaskNumberQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindIncorrectQuestionsByTaskNumberQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindIncorrectQuestionsByTaskNumberQuery({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useFindIncorrectQuestionsByTaskNumberQuery(baseOptions: Apollo.QueryHookOptions<FindIncorrectQuestionsByTaskNumberQuery, FindIncorrectQuestionsByTaskNumberQueryVariables> & ({ variables: FindIncorrectQuestionsByTaskNumberQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FindIncorrectQuestionsByTaskNumberQuery, FindIncorrectQuestionsByTaskNumberQueryVariables>(FindIncorrectQuestionsByTaskNumberDocument, options);
      }
export function useFindIncorrectQuestionsByTaskNumberLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FindIncorrectQuestionsByTaskNumberQuery, FindIncorrectQuestionsByTaskNumberQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FindIncorrectQuestionsByTaskNumberQuery, FindIncorrectQuestionsByTaskNumberQueryVariables>(FindIncorrectQuestionsByTaskNumberDocument, options);
        }
export function useFindIncorrectQuestionsByTaskNumberSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<FindIncorrectQuestionsByTaskNumberQuery, FindIncorrectQuestionsByTaskNumberQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<FindIncorrectQuestionsByTaskNumberQuery, FindIncorrectQuestionsByTaskNumberQueryVariables>(FindIncorrectQuestionsByTaskNumberDocument, options);
        }
export type FindIncorrectQuestionsByTaskNumberQueryHookResult = ReturnType<typeof useFindIncorrectQuestionsByTaskNumberQuery>;
export type FindIncorrectQuestionsByTaskNumberLazyQueryHookResult = ReturnType<typeof useFindIncorrectQuestionsByTaskNumberLazyQuery>;
export type FindIncorrectQuestionsByTaskNumberSuspenseQueryHookResult = ReturnType<typeof useFindIncorrectQuestionsByTaskNumberSuspenseQuery>;
export type FindIncorrectQuestionsByTaskNumberQueryResult = Apollo.QueryResult<FindIncorrectQuestionsByTaskNumberQuery, FindIncorrectQuestionsByTaskNumberQueryVariables>;
export const FindCurrentSessionDocument = gql`
    query FindCurrentSession {
  FindCurrentSession {
    metadata {
      device {
        os
        browser
        type
      }
      location {
        latidute
        longitude
        city
        country
      }
      ip
    }
    createdAt
    id
  }
}
    `;

/**
 * __useFindCurrentSessionQuery__
 *
 * To run a query within a React component, call `useFindCurrentSessionQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindCurrentSessionQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindCurrentSessionQuery({
 *   variables: {
 *   },
 * });
 */
export function useFindCurrentSessionQuery(baseOptions?: Apollo.QueryHookOptions<FindCurrentSessionQuery, FindCurrentSessionQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FindCurrentSessionQuery, FindCurrentSessionQueryVariables>(FindCurrentSessionDocument, options);
      }
export function useFindCurrentSessionLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FindCurrentSessionQuery, FindCurrentSessionQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FindCurrentSessionQuery, FindCurrentSessionQueryVariables>(FindCurrentSessionDocument, options);
        }
export function useFindCurrentSessionSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<FindCurrentSessionQuery, FindCurrentSessionQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<FindCurrentSessionQuery, FindCurrentSessionQueryVariables>(FindCurrentSessionDocument, options);
        }
export type FindCurrentSessionQueryHookResult = ReturnType<typeof useFindCurrentSessionQuery>;
export type FindCurrentSessionLazyQueryHookResult = ReturnType<typeof useFindCurrentSessionLazyQuery>;
export type FindCurrentSessionSuspenseQueryHookResult = ReturnType<typeof useFindCurrentSessionSuspenseQuery>;
export type FindCurrentSessionQueryResult = Apollo.QueryResult<FindCurrentSessionQuery, FindCurrentSessionQueryVariables>;
export const FindMeDocument = gql`
    query FindMe {
  FindMe {
    user {
      id
      email
      avatar
      experience
      rating
      createdAt
      isTwoFactor
      isDeactivated
      telegramId
    }
    isAuth
  }
}
    `;

/**
 * __useFindMeQuery__
 *
 * To run a query within a React component, call `useFindMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useFindMeQuery(baseOptions?: Apollo.QueryHookOptions<FindMeQuery, FindMeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FindMeQuery, FindMeQueryVariables>(FindMeDocument, options);
      }
export function useFindMeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FindMeQuery, FindMeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FindMeQuery, FindMeQueryVariables>(FindMeDocument, options);
        }
export function useFindMeSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<FindMeQuery, FindMeQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<FindMeQuery, FindMeQueryVariables>(FindMeDocument, options);
        }
export type FindMeQueryHookResult = ReturnType<typeof useFindMeQuery>;
export type FindMeLazyQueryHookResult = ReturnType<typeof useFindMeLazyQuery>;
export type FindMeSuspenseQueryHookResult = ReturnType<typeof useFindMeSuspenseQuery>;
export type FindMeQueryResult = Apollo.QueryResult<FindMeQuery, FindMeQueryVariables>;
export const FindSessionsByUserDocument = gql`
    query FindSessionsByUser {
  FindSessionsByUser {
    metadata {
      device {
        os
        browser
        type
      }
      location {
        latidute
        longitude
        city
        country
      }
      ip
    }
    createdAt
    id
  }
}
    `;

/**
 * __useFindSessionsByUserQuery__
 *
 * To run a query within a React component, call `useFindSessionsByUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindSessionsByUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindSessionsByUserQuery({
 *   variables: {
 *   },
 * });
 */
export function useFindSessionsByUserQuery(baseOptions?: Apollo.QueryHookOptions<FindSessionsByUserQuery, FindSessionsByUserQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FindSessionsByUserQuery, FindSessionsByUserQueryVariables>(FindSessionsByUserDocument, options);
      }
export function useFindSessionsByUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FindSessionsByUserQuery, FindSessionsByUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FindSessionsByUserQuery, FindSessionsByUserQueryVariables>(FindSessionsByUserDocument, options);
        }
export function useFindSessionsByUserSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<FindSessionsByUserQuery, FindSessionsByUserQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<FindSessionsByUserQuery, FindSessionsByUserQueryVariables>(FindSessionsByUserDocument, options);
        }
export type FindSessionsByUserQueryHookResult = ReturnType<typeof useFindSessionsByUserQuery>;
export type FindSessionsByUserLazyQueryHookResult = ReturnType<typeof useFindSessionsByUserLazyQuery>;
export type FindSessionsByUserSuspenseQueryHookResult = ReturnType<typeof useFindSessionsByUserSuspenseQuery>;
export type FindSessionsByUserQueryResult = Apollo.QueryResult<FindSessionsByUserQuery, FindSessionsByUserQueryVariables>;
export const GetAllStatisticDocument = gql`
    query GetAllStatistic {
  GetAllStatistic {
    totalAnswer
    totalCorrectAnswer
    correctPercent
  }
}
    `;

/**
 * __useGetAllStatisticQuery__
 *
 * To run a query within a React component, call `useGetAllStatisticQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllStatisticQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllStatisticQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAllStatisticQuery(baseOptions?: Apollo.QueryHookOptions<GetAllStatisticQuery, GetAllStatisticQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllStatisticQuery, GetAllStatisticQueryVariables>(GetAllStatisticDocument, options);
      }
export function useGetAllStatisticLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllStatisticQuery, GetAllStatisticQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllStatisticQuery, GetAllStatisticQueryVariables>(GetAllStatisticDocument, options);
        }
export function useGetAllStatisticSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetAllStatisticQuery, GetAllStatisticQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetAllStatisticQuery, GetAllStatisticQueryVariables>(GetAllStatisticDocument, options);
        }
export type GetAllStatisticQueryHookResult = ReturnType<typeof useGetAllStatisticQuery>;
export type GetAllStatisticLazyQueryHookResult = ReturnType<typeof useGetAllStatisticLazyQuery>;
export type GetAllStatisticSuspenseQueryHookResult = ReturnType<typeof useGetAllStatisticSuspenseQuery>;
export type GetAllStatisticQueryResult = Apollo.QueryResult<GetAllStatisticQuery, GetAllStatisticQueryVariables>;
export const GetSubjectsStatisticDocument = gql`
    query GetSubjectsStatistic {
  GetSubjectsStatistic {
    subjectSlug
    correct
    subjectName
    answered
    correctPercent
    totalQuestions
  }
}
    `;

/**
 * __useGetSubjectsStatisticQuery__
 *
 * To run a query within a React component, call `useGetSubjectsStatisticQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetSubjectsStatisticQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetSubjectsStatisticQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetSubjectsStatisticQuery(baseOptions?: Apollo.QueryHookOptions<GetSubjectsStatisticQuery, GetSubjectsStatisticQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetSubjectsStatisticQuery, GetSubjectsStatisticQueryVariables>(GetSubjectsStatisticDocument, options);
      }
export function useGetSubjectsStatisticLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetSubjectsStatisticQuery, GetSubjectsStatisticQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetSubjectsStatisticQuery, GetSubjectsStatisticQueryVariables>(GetSubjectsStatisticDocument, options);
        }
export function useGetSubjectsStatisticSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetSubjectsStatisticQuery, GetSubjectsStatisticQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetSubjectsStatisticQuery, GetSubjectsStatisticQueryVariables>(GetSubjectsStatisticDocument, options);
        }
export type GetSubjectsStatisticQueryHookResult = ReturnType<typeof useGetSubjectsStatisticQuery>;
export type GetSubjectsStatisticLazyQueryHookResult = ReturnType<typeof useGetSubjectsStatisticLazyQuery>;
export type GetSubjectsStatisticSuspenseQueryHookResult = ReturnType<typeof useGetSubjectsStatisticSuspenseQuery>;
export type GetSubjectsStatisticQueryResult = Apollo.QueryResult<GetSubjectsStatisticQuery, GetSubjectsStatisticQueryVariables>;
export const GetTasksStatisticDocument = gql`
    query GetTasksStatistic($data: GetTasksStatisticInput!) {
  GetTasksStatistic(data: $data) {
    correct
    answered
    correctPercent
    totalQuestions
    taskNumber
  }
}
    `;

/**
 * __useGetTasksStatisticQuery__
 *
 * To run a query within a React component, call `useGetTasksStatisticQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTasksStatisticQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTasksStatisticQuery({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useGetTasksStatisticQuery(baseOptions: Apollo.QueryHookOptions<GetTasksStatisticQuery, GetTasksStatisticQueryVariables> & ({ variables: GetTasksStatisticQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetTasksStatisticQuery, GetTasksStatisticQueryVariables>(GetTasksStatisticDocument, options);
      }
export function useGetTasksStatisticLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetTasksStatisticQuery, GetTasksStatisticQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetTasksStatisticQuery, GetTasksStatisticQueryVariables>(GetTasksStatisticDocument, options);
        }
export function useGetTasksStatisticSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetTasksStatisticQuery, GetTasksStatisticQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetTasksStatisticQuery, GetTasksStatisticQueryVariables>(GetTasksStatisticDocument, options);
        }
export type GetTasksStatisticQueryHookResult = ReturnType<typeof useGetTasksStatisticQuery>;
export type GetTasksStatisticLazyQueryHookResult = ReturnType<typeof useGetTasksStatisticLazyQuery>;
export type GetTasksStatisticSuspenseQueryHookResult = ReturnType<typeof useGetTasksStatisticSuspenseQuery>;
export type GetTasksStatisticQueryResult = Apollo.QueryResult<GetTasksStatisticQuery, GetTasksStatisticQueryVariables>;
export const FindSubjectBySlugDocument = gql`
    query FindSubjectBySlug($slug: String!) {
  FindSubjectBySlug(slug: $slug) {
    questionsCount
    taskNumber
  }
}
    `;

/**
 * __useFindSubjectBySlugQuery__
 *
 * To run a query within a React component, call `useFindSubjectBySlugQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindSubjectBySlugQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindSubjectBySlugQuery({
 *   variables: {
 *      slug: // value for 'slug'
 *   },
 * });
 */
export function useFindSubjectBySlugQuery(baseOptions: Apollo.QueryHookOptions<FindSubjectBySlugQuery, FindSubjectBySlugQueryVariables> & ({ variables: FindSubjectBySlugQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FindSubjectBySlugQuery, FindSubjectBySlugQueryVariables>(FindSubjectBySlugDocument, options);
      }
export function useFindSubjectBySlugLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FindSubjectBySlugQuery, FindSubjectBySlugQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FindSubjectBySlugQuery, FindSubjectBySlugQueryVariables>(FindSubjectBySlugDocument, options);
        }
export function useFindSubjectBySlugSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<FindSubjectBySlugQuery, FindSubjectBySlugQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<FindSubjectBySlugQuery, FindSubjectBySlugQueryVariables>(FindSubjectBySlugDocument, options);
        }
export type FindSubjectBySlugQueryHookResult = ReturnType<typeof useFindSubjectBySlugQuery>;
export type FindSubjectBySlugLazyQueryHookResult = ReturnType<typeof useFindSubjectBySlugLazyQuery>;
export type FindSubjectBySlugSuspenseQueryHookResult = ReturnType<typeof useFindSubjectBySlugSuspenseQuery>;
export type FindSubjectBySlugQueryResult = Apollo.QueryResult<FindSubjectBySlugQuery, FindSubjectBySlugQueryVariables>;
export const FindAllSubjectsDocument = gql`
    query FindAllSubjects {
  FindAllSubjects {
    name
    questionsCount
    slug
  }
}
    `;

/**
 * __useFindAllSubjectsQuery__
 *
 * To run a query within a React component, call `useFindAllSubjectsQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindAllSubjectsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindAllSubjectsQuery({
 *   variables: {
 *   },
 * });
 */
export function useFindAllSubjectsQuery(baseOptions?: Apollo.QueryHookOptions<FindAllSubjectsQuery, FindAllSubjectsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FindAllSubjectsQuery, FindAllSubjectsQueryVariables>(FindAllSubjectsDocument, options);
      }
export function useFindAllSubjectsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FindAllSubjectsQuery, FindAllSubjectsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FindAllSubjectsQuery, FindAllSubjectsQueryVariables>(FindAllSubjectsDocument, options);
        }
export function useFindAllSubjectsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<FindAllSubjectsQuery, FindAllSubjectsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<FindAllSubjectsQuery, FindAllSubjectsQueryVariables>(FindAllSubjectsDocument, options);
        }
export type FindAllSubjectsQueryHookResult = ReturnType<typeof useFindAllSubjectsQuery>;
export type FindAllSubjectsLazyQueryHookResult = ReturnType<typeof useFindAllSubjectsLazyQuery>;
export type FindAllSubjectsSuspenseQueryHookResult = ReturnType<typeof useFindAllSubjectsSuspenseQuery>;
export type FindAllSubjectsQueryResult = Apollo.QueryResult<FindAllSubjectsQuery, FindAllSubjectsQueryVariables>;
export const FindFavoriteSubjectsDocument = gql`
    query FindFavoriteSubjects {
  FindFavoriteSubjects {
    name
    tasksCount
    slug
    questionsCount
  }
}
    `;

/**
 * __useFindFavoriteSubjectsQuery__
 *
 * To run a query within a React component, call `useFindFavoriteSubjectsQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindFavoriteSubjectsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindFavoriteSubjectsQuery({
 *   variables: {
 *   },
 * });
 */
export function useFindFavoriteSubjectsQuery(baseOptions?: Apollo.QueryHookOptions<FindFavoriteSubjectsQuery, FindFavoriteSubjectsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FindFavoriteSubjectsQuery, FindFavoriteSubjectsQueryVariables>(FindFavoriteSubjectsDocument, options);
      }
export function useFindFavoriteSubjectsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FindFavoriteSubjectsQuery, FindFavoriteSubjectsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FindFavoriteSubjectsQuery, FindFavoriteSubjectsQueryVariables>(FindFavoriteSubjectsDocument, options);
        }
export function useFindFavoriteSubjectsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<FindFavoriteSubjectsQuery, FindFavoriteSubjectsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<FindFavoriteSubjectsQuery, FindFavoriteSubjectsQueryVariables>(FindFavoriteSubjectsDocument, options);
        }
export type FindFavoriteSubjectsQueryHookResult = ReturnType<typeof useFindFavoriteSubjectsQuery>;
export type FindFavoriteSubjectsLazyQueryHookResult = ReturnType<typeof useFindFavoriteSubjectsLazyQuery>;
export type FindFavoriteSubjectsSuspenseQueryHookResult = ReturnType<typeof useFindFavoriteSubjectsSuspenseQuery>;
export type FindFavoriteSubjectsQueryResult = Apollo.QueryResult<FindFavoriteSubjectsQuery, FindFavoriteSubjectsQueryVariables>;
export const FindTaskCountDocument = gql`
    query FindTaskCount($data: FindTaskCountInput!) {
  FindTaskCount(data: $data)
}
    `;

/**
 * __useFindTaskCountQuery__
 *
 * To run a query within a React component, call `useFindTaskCountQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindTaskCountQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindTaskCountQuery({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useFindTaskCountQuery(baseOptions: Apollo.QueryHookOptions<FindTaskCountQuery, FindTaskCountQueryVariables> & ({ variables: FindTaskCountQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FindTaskCountQuery, FindTaskCountQueryVariables>(FindTaskCountDocument, options);
      }
export function useFindTaskCountLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FindTaskCountQuery, FindTaskCountQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FindTaskCountQuery, FindTaskCountQueryVariables>(FindTaskCountDocument, options);
        }
export function useFindTaskCountSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<FindTaskCountQuery, FindTaskCountQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<FindTaskCountQuery, FindTaskCountQueryVariables>(FindTaskCountDocument, options);
        }
export type FindTaskCountQueryHookResult = ReturnType<typeof useFindTaskCountQuery>;
export type FindTaskCountLazyQueryHookResult = ReturnType<typeof useFindTaskCountLazyQuery>;
export type FindTaskCountSuspenseQueryHookResult = ReturnType<typeof useFindTaskCountSuspenseQuery>;
export type FindTaskCountQueryResult = Apollo.QueryResult<FindTaskCountQuery, FindTaskCountQueryVariables>;
export const FindUserVariantAllDocument = gql`
    query FindUserVariantAll {
  FindUserVariantAll {
    id
    questions {
      id
      task {
        taskNumber
      }
      text
      question
      experience
      correctAnswer
      explanation
    }
  }
}
    `;

/**
 * __useFindUserVariantAllQuery__
 *
 * To run a query within a React component, call `useFindUserVariantAllQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindUserVariantAllQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindUserVariantAllQuery({
 *   variables: {
 *   },
 * });
 */
export function useFindUserVariantAllQuery(baseOptions?: Apollo.QueryHookOptions<FindUserVariantAllQuery, FindUserVariantAllQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FindUserVariantAllQuery, FindUserVariantAllQueryVariables>(FindUserVariantAllDocument, options);
      }
export function useFindUserVariantAllLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FindUserVariantAllQuery, FindUserVariantAllQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FindUserVariantAllQuery, FindUserVariantAllQueryVariables>(FindUserVariantAllDocument, options);
        }
export function useFindUserVariantAllSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<FindUserVariantAllQuery, FindUserVariantAllQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<FindUserVariantAllQuery, FindUserVariantAllQueryVariables>(FindUserVariantAllDocument, options);
        }
export type FindUserVariantAllQueryHookResult = ReturnType<typeof useFindUserVariantAllQuery>;
export type FindUserVariantAllLazyQueryHookResult = ReturnType<typeof useFindUserVariantAllLazyQuery>;
export type FindUserVariantAllSuspenseQueryHookResult = ReturnType<typeof useFindUserVariantAllSuspenseQuery>;
export type FindUserVariantAllQueryResult = Apollo.QueryResult<FindUserVariantAllQuery, FindUserVariantAllQueryVariables>;
export const FindUserVariantByIdDocument = gql`
    query FindUserVariantById($variantId: Int!) {
  FindUserVariantById(variantId: $variantId) {
    questions {
      id
      task {
        taskNumber
      }
      text
      question
      experience
      correctAnswer
      explanation
    }
  }
}
    `;

/**
 * __useFindUserVariantByIdQuery__
 *
 * To run a query within a React component, call `useFindUserVariantByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindUserVariantByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindUserVariantByIdQuery({
 *   variables: {
 *      variantId: // value for 'variantId'
 *   },
 * });
 */
export function useFindUserVariantByIdQuery(baseOptions: Apollo.QueryHookOptions<FindUserVariantByIdQuery, FindUserVariantByIdQueryVariables> & ({ variables: FindUserVariantByIdQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FindUserVariantByIdQuery, FindUserVariantByIdQueryVariables>(FindUserVariantByIdDocument, options);
      }
export function useFindUserVariantByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FindUserVariantByIdQuery, FindUserVariantByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FindUserVariantByIdQuery, FindUserVariantByIdQueryVariables>(FindUserVariantByIdDocument, options);
        }
export function useFindUserVariantByIdSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<FindUserVariantByIdQuery, FindUserVariantByIdQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<FindUserVariantByIdQuery, FindUserVariantByIdQueryVariables>(FindUserVariantByIdDocument, options);
        }
export type FindUserVariantByIdQueryHookResult = ReturnType<typeof useFindUserVariantByIdQuery>;
export type FindUserVariantByIdLazyQueryHookResult = ReturnType<typeof useFindUserVariantByIdLazyQuery>;
export type FindUserVariantByIdSuspenseQueryHookResult = ReturnType<typeof useFindUserVariantByIdSuspenseQuery>;
export type FindUserVariantByIdQueryResult = Apollo.QueryResult<FindUserVariantByIdQuery, FindUserVariantByIdQueryVariables>;