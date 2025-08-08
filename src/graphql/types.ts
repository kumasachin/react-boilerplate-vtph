// GraphQL Types for SpaceX API

export interface Rocket {
  id: string;
  rocket_name: string;
  rocket_type: string;
}

export interface Links {
  mission_patch_small?: string;
  mission_patch?: string;
  wikipedia?: string;
  video_link?: string;
}

export interface Launch {
  id: string;
  mission_name: string;
  launch_date_local: string;
  launch_success?: boolean;
  details?: string;
  rocket: Rocket;
  links: Links;
}

export interface RocketInfo {
  id: string;
  name: string;
  type: string;
  active: boolean;
  cost_per_launch?: number;
  success_rate_pct?: number;
  first_flight?: string;
  country: string;
  company: string;
}

// Query Variables Types
export interface GetLaunchesVariables {
  limit?: number;
}

export interface GetLaunchVariables {
  id: string;
}

// Query Response Types
export interface GetLaunchesData {
  launches: Launch[];
}

export interface GetLaunchData {
  launch: Launch;
}

export interface GetRocketsData {
  rockets: RocketInfo[];
}

// Todo Types (for mutations example)
export interface TodoInput {
  text: string;
  completed?: boolean;
}

export interface CreateTodoInput {
  text: string;
}

export interface UpdateTodoInput {
  text?: string;
  completed?: boolean;
}

export interface CreateTodoVariables {
  input: CreateTodoInput;
}

export interface UpdateTodoVariables {
  id: string;
  input: UpdateTodoInput;
}

export interface DeleteTodoVariables {
  id: string;
}
