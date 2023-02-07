import { useQuery, useMutation, UseQueryOptions, UseMutationOptions } from '@tanstack/react-query';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };

function fetcher<TData, TVariables>(query: string, variables?: TVariables) {
  return async (): Promise<TData> => {
    const res = await fetch("http://localhost:4000/graphql", {
    method: "POST",
    ...({"headers":{"Content-Type":"application/json"}}),
      body: JSON.stringify({ query, variables }),
    });

    const json = await res.json();

    if (json.errors) {
      const { message } = json.errors[0];

      throw new Error(message);
    }

    return json.data;
  }
}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type CreateItemResponse = {
  __typename?: 'CreateItemResponse';
  id: Scalars['String'];
};

export type CreatePhaseResponse = {
  __typename?: 'CreatePhaseResponse';
  id: Scalars['String'];
};

export type DeleteItemResponse = {
  __typename?: 'DeleteItemResponse';
  message?: Maybe<Scalars['String']>;
};

export type DeletePhaseResponse = {
  __typename?: 'DeletePhaseResponse';
  message?: Maybe<Scalars['String']>;
};

export type Item = {
  __typename?: 'Item';
  id: Scalars['String'];
  is_complete?: Maybe<Scalars['Boolean']>;
  phase_id?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createItem?: Maybe<CreateItemResponse>;
  createPhase?: Maybe<CreatePhaseResponse>;
  deleteItem?: Maybe<DeleteItemResponse>;
  deletePhase?: Maybe<DeletePhaseResponse>;
  updateItem?: Maybe<UpdateItemResponse>;
  updatePhase?: Maybe<UpdatePhaseResponse>;
};


export type MutationCreateItemArgs = {
  phaseId: Scalars['String'];
  planId: Scalars['String'];
};


export type MutationCreatePhaseArgs = {
  planId: Scalars['String'];
};


export type MutationDeleteItemArgs = {
  id: Scalars['String'];
};


export type MutationDeletePhaseArgs = {
  id: Scalars['String'];
};


export type MutationUpdateItemArgs = {
  id: Scalars['String'];
  isComplete?: InputMaybe<Scalars['Boolean']>;
  title?: InputMaybe<Scalars['String']>;
};


export type MutationUpdatePhaseArgs = {
  id: Scalars['String'];
  title?: InputMaybe<Scalars['String']>;
};

export type Phase = {
  __typename?: 'Phase';
  id: Scalars['String'];
  is_complete?: Maybe<Scalars['Boolean']>;
  plan_id?: Maybe<Scalars['String']>;
  position?: Maybe<Scalars['Int']>;
  title?: Maybe<Scalars['String']>;
};

/** A */
export type Plan = {
  __typename?: 'Plan';
  id: Scalars['String'];
  max_phase_position?: Maybe<Scalars['Int']>;
  title?: Maybe<Scalars['String']>;
};

export type Query = {
  __typename?: 'Query';
  items?: Maybe<Array<Item>>;
  phases?: Maybe<Array<Phase>>;
  plan?: Maybe<Plan>;
};


export type QueryItemsArgs = {
  planId: Scalars['String'];
};


export type QueryPhasesArgs = {
  planId: Scalars['String'];
};


export type QueryPlanArgs = {
  id: Scalars['String'];
};

export type UpdateItemResponse = {
  __typename?: 'UpdateItemResponse';
  id: Scalars['String'];
  is_complete?: Maybe<Scalars['Boolean']>;
  phase_id?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
};

export type UpdatePhaseResponse = {
  __typename?: 'UpdatePhaseResponse';
  id: Scalars['String'];
  title?: Maybe<Scalars['String']>;
};

export type GetPlanQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type GetPlanQuery = { __typename?: 'Query', plan?: { __typename?: 'Plan', id: string, title?: string | null, max_phase_position?: number | null } | null, phases?: Array<{ __typename?: 'Phase', id: string, title?: string | null, is_complete?: boolean | null, position?: number | null }> | null, items?: Array<{ __typename?: 'Item', id: string, phase_id?: string | null, title?: string | null, is_complete?: boolean | null }> | null };

export type CreatePhaseMutationVariables = Exact<{
  planId: Scalars['String'];
}>;


export type CreatePhaseMutation = { __typename?: 'Mutation', createPhase?: { __typename?: 'CreatePhaseResponse', id: string } | null };

export type UpdatePhaseMutationVariables = Exact<{
  id: Scalars['String'];
  title?: InputMaybe<Scalars['String']>;
}>;


export type UpdatePhaseMutation = { __typename?: 'Mutation', updatePhase?: { __typename?: 'UpdatePhaseResponse', id: string, title?: string | null } | null };

export type DeletePhaseMutationVariables = Exact<{
  id: Scalars['String'];
}>;


export type DeletePhaseMutation = { __typename?: 'Mutation', deletePhase?: { __typename?: 'DeletePhaseResponse', message?: string | null } | null };

export type CreateItemMutationVariables = Exact<{
  planId: Scalars['String'];
  phaseId: Scalars['String'];
}>;


export type CreateItemMutation = { __typename?: 'Mutation', createItem?: { __typename?: 'CreateItemResponse', id: string } | null };

export type UpdateItemMutationVariables = Exact<{
  id: Scalars['String'];
  isComplete?: InputMaybe<Scalars['Boolean']>;
  title?: InputMaybe<Scalars['String']>;
}>;


export type UpdateItemMutation = { __typename?: 'Mutation', updateItem?: { __typename?: 'UpdateItemResponse', id: string, title?: string | null, is_complete?: boolean | null, phase_id?: string | null } | null };

export type DeleteItemMutationVariables = Exact<{
  id: Scalars['String'];
}>;


export type DeleteItemMutation = { __typename?: 'Mutation', deleteItem?: { __typename?: 'DeleteItemResponse', message?: string | null } | null };


export const GetPlanDocument = `
    query GetPlan($id: String!) {
  plan(id: $id) {
    id
    title
    max_phase_position
  }
  phases(planId: $id) {
    id
    title
    is_complete
    position
  }
  items(planId: $id) {
    id
    phase_id
    title
    is_complete
  }
}
    `;
export const useGetPlanQuery = <
      TData = GetPlanQuery,
      TError = unknown
    >(
      variables: GetPlanQueryVariables,
      options?: UseQueryOptions<GetPlanQuery, TError, TData>
    ) =>
    useQuery<GetPlanQuery, TError, TData>(
      ['GetPlan', variables],
      fetcher<GetPlanQuery, GetPlanQueryVariables>(GetPlanDocument, variables),
      options
    );
export const CreatePhaseDocument = `
    mutation CreatePhase($planId: String!) {
  createPhase(planId: $planId) {
    id
  }
}
    `;
export const useCreatePhaseMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<CreatePhaseMutation, TError, CreatePhaseMutationVariables, TContext>) =>
    useMutation<CreatePhaseMutation, TError, CreatePhaseMutationVariables, TContext>(
      ['CreatePhase'],
      (variables?: CreatePhaseMutationVariables) => fetcher<CreatePhaseMutation, CreatePhaseMutationVariables>(CreatePhaseDocument, variables)(),
      options
    );
export const UpdatePhaseDocument = `
    mutation UpdatePhase($id: String!, $title: String) {
  updatePhase(id: $id, title: $title) {
    id
    title
  }
}
    `;
export const useUpdatePhaseMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<UpdatePhaseMutation, TError, UpdatePhaseMutationVariables, TContext>) =>
    useMutation<UpdatePhaseMutation, TError, UpdatePhaseMutationVariables, TContext>(
      ['UpdatePhase'],
      (variables?: UpdatePhaseMutationVariables) => fetcher<UpdatePhaseMutation, UpdatePhaseMutationVariables>(UpdatePhaseDocument, variables)(),
      options
    );
export const DeletePhaseDocument = `
    mutation DeletePhase($id: String!) {
  deletePhase(id: $id) {
    message
  }
}
    `;
export const useDeletePhaseMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<DeletePhaseMutation, TError, DeletePhaseMutationVariables, TContext>) =>
    useMutation<DeletePhaseMutation, TError, DeletePhaseMutationVariables, TContext>(
      ['DeletePhase'],
      (variables?: DeletePhaseMutationVariables) => fetcher<DeletePhaseMutation, DeletePhaseMutationVariables>(DeletePhaseDocument, variables)(),
      options
    );
export const CreateItemDocument = `
    mutation CreateItem($planId: String!, $phaseId: String!) {
  createItem(planId: $planId, phaseId: $phaseId) {
    id
  }
}
    `;
export const useCreateItemMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<CreateItemMutation, TError, CreateItemMutationVariables, TContext>) =>
    useMutation<CreateItemMutation, TError, CreateItemMutationVariables, TContext>(
      ['CreateItem'],
      (variables?: CreateItemMutationVariables) => fetcher<CreateItemMutation, CreateItemMutationVariables>(CreateItemDocument, variables)(),
      options
    );
export const UpdateItemDocument = `
    mutation UpdateItem($id: String!, $isComplete: Boolean, $title: String) {
  updateItem(id: $id, isComplete: $isComplete, title: $title) {
    id
    title
    is_complete
    phase_id
  }
}
    `;
export const useUpdateItemMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<UpdateItemMutation, TError, UpdateItemMutationVariables, TContext>) =>
    useMutation<UpdateItemMutation, TError, UpdateItemMutationVariables, TContext>(
      ['UpdateItem'],
      (variables?: UpdateItemMutationVariables) => fetcher<UpdateItemMutation, UpdateItemMutationVariables>(UpdateItemDocument, variables)(),
      options
    );
export const DeleteItemDocument = `
    mutation DeleteItem($id: String!) {
  deleteItem(id: $id) {
    message
  }
}
    `;
export const useDeleteItemMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<DeleteItemMutation, TError, DeleteItemMutationVariables, TContext>) =>
    useMutation<DeleteItemMutation, TError, DeleteItemMutationVariables, TContext>(
      ['DeleteItem'],
      (variables?: DeleteItemMutationVariables) => fetcher<DeleteItemMutation, DeleteItemMutationVariables>(DeleteItemDocument, variables)(),
      options
    );