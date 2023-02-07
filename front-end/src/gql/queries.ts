import gql from 'graphql-tag';

export const GetPlanQuery = gql`
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

export const CreatePhaseMutation = gql`
  mutation CreatePhase($planId: String!) {
    createPhase(planId: $planId) {
      id
    }
  }
`;

export const UpdatePhaseMutation = gql`
  mutation UpdatePhase($id: String!, $title: String) {
    updatePhase(id: $id, title: $title) {
      id
      title
    }
  }
`;

export const DeletePhaseMutation = gql`
  mutation DeletePhase($id: String!) {
    deletePhase(id: $id) {
      message
    }
  }
`;

export const CreateItemMutation = gql`
  mutation CreateItem($planId: String!, $phaseId: String!) {
    createItem(planId: $planId, phaseId: $phaseId) {
      id
    }
  }
`;

export const UpdateItemMutation = gql`
  mutation UpdateItem($id: String!, $isComplete: Boolean, $title: String) {
    updateItem(id: $id, isComplete: $isComplete, title: $title) {
      id
      title
      is_complete
      phase_id
    }
  }
`;

export const DeleteItemMutation = gql`
  mutation DeleteItem($id: String!) {
    deleteItem(id: $id) {
      message
    }
  }
`;
