export interface User {
  id: number;
  name: string;
  email: string;
}

export interface Post {
  id: number;
  user_id: number;
  title: string;
  content: string;
  created_at: string;
  updated_at: string;
  user: User;
  comments: Comment[];
}

export interface Comment {
  id: number;
  content: string;
  user: User;
  created_at: string;
}

export interface ApiError {
  message: string;
  errors?: Record<string, string[]>;
}
