import { gql } from '@apollo/client';

// Query to get SpaceX launches (using public SpaceX API)
export const GET_LAUNCHES = gql`
  query GetLaunches($limit: Int) {
    launches(limit: $limit) {
      id
      mission_name
      launch_date_local
      launch_success
      rocket {
        rocket_name
        rocket_type
      }
      links {
        mission_patch_small
        wikipedia
      }
    }
  }
`;

// Query to get a specific launch
export const GET_LAUNCH = gql`
  query GetLaunch($id: ID!) {
    launch(id: $id) {
      id
      mission_name
      launch_date_local
      launch_success
      details
      rocket {
        rocket_name
        rocket_type
      }
      links {
        mission_patch
        wikipedia
        video_link
      }
    }
  }
`;

// Query to get rockets
export const GET_ROCKETS = gql`
  query GetRockets {
    rockets {
      id
      name
      type
      active
      cost_per_launch
      success_rate_pct
      first_flight
      country
      company
    }
  }
`;

// Example mutation (this would work with a real API that supports mutations)
export const CREATE_TODO = gql`
  mutation CreateTodo($input: CreateTodoInput!) {
    createTodo(input: $input) {
      id
      text
      completed
      createdAt
    }
  }
`;

export const UPDATE_TODO = gql`
  mutation UpdateTodo($id: ID!, $input: UpdateTodoInput!) {
    updateTodo(id: $id, input: $input) {
      id
      text
      completed
      updatedAt
    }
  }
`;

export const DELETE_TODO = gql`
  mutation DeleteTodo($id: ID!) {
    deleteTodo(id: $id) {
      id
    }
  }
`;
