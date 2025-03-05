import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import api from '../../services/api'
import { RootState } from '../store'
import { Post, ApiError } from '../../types'

interface PostState {
  posts: Post[]
  currentPost: Post | null
  status: 'idle' | 'loading' | 'succeeded' | 'failed'
  error: string | null
}

const initialState: PostState = {
  posts: [],
  currentPost: null,
  status: 'idle',
  error: null
}

// Tipos para las acciones asíncronas
type CreatePostData = { title: string; content: string }
type UpdatePostData = { id: number; postData: CreatePostData }

export const fetchPosts = createAsyncThunk<
  Post[],
  void,
  { rejectValue: ApiError }
>('posts/fetchPosts', async (_, { rejectWithValue }) => {
  try {
    const response = await api.get('/posts')
    return response.data.data
  } catch (error) {
    const err = error as { response?: { data: ApiError } }
    return rejectWithValue(err.response?.data || { message: 'Error al obtener posts' })
  }
})

export const createPost = createAsyncThunk<
  Post,
  CreatePostData,
  { rejectValue: ApiError }
>('posts/createPost', async (postData, { rejectWithValue }) => {
  try {
    const response = await api.post('/posts', postData)
    return response.data.data
  } catch (error) {
    const err = error as { response?: { data: ApiError } }
    return rejectWithValue(err.response?.data || { message: 'Error al crear post' })
  }
})

export const updatePost = createAsyncThunk<
  Post,
  UpdatePostData,
  { rejectValue: ApiError }
>('posts/updatePost', async ({ id, postData }, { rejectWithValue }) => {
  try {
    const response = await api.put(`/posts/${id}`, postData)
    return response.data.data
  } catch (error) {
    const err = error as { response?: { data: ApiError } }
    return rejectWithValue(err.response?.data || { message: 'Error al actualizar post' })
  }
})

export const deletePost = createAsyncThunk<
  number,
  number,
  { rejectValue: ApiError }
>('posts/deletePost', async (id, { rejectWithValue }) => {
  try {
    await api.delete(`/posts/${id}`)
    return id
  } catch (error) {
    const err = error as { response?: { data: ApiError } }
    return rejectWithValue(err.response?.data || { message: 'Error al eliminar post' })
  }
})

export const createComment = createAsyncThunk(
  "posts/createComment",
  async (
    { postId, content }: { postId: number; content: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await api.post(`/posts/${postId}/comments`, { content });
      return response.data.data;
    } catch (error) {
      const err = error as { response?: { data: ApiError } };
      return rejectWithValue(
        err.response?.data || { message: "Error al crear comentario" }
      );
    }
  }
);

const postSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    filterPosts: (state, action: PayloadAction<string>) => {
      const searchTerm = action.payload.toLowerCase()
      state.posts = state.posts.filter(post =>
        post.title.toLowerCase().includes(searchTerm)
      )
    },
    setCurrentPost: (state, action: PayloadAction<Post | null>) => {
      state.currentPost = action.payload
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(fetchPosts.fulfilled, (state, action: PayloadAction<Post[]>) => {
        state.status = 'succeeded'
        state.posts = action.payload
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.payload?.message || 'Error desconocido'
      })
      .addCase(createPost.fulfilled, (state, action: PayloadAction<Post>) => {
        state.posts.unshift(action.payload)
      })
      .addCase(updatePost.fulfilled, (state, action: PayloadAction<Post>) => {
        const index = state.posts.findIndex(post => post.id === action.payload.id)
        if (index !== -1) state.posts[index] = action.payload
        if (state.currentPost?.id === action.payload.id) {
          state.currentPost = action.payload
        }
      })
      .addCase(deletePost.fulfilled, (state, action: PayloadAction<number>) => {
        state.posts = state.posts.filter(post => post.id !== action.payload)
      })
  }
})

// Selectores tipados
export const selectAllPosts = (state: RootState) => state.posts.posts
export const selectPostById = (postId: number) => (state: RootState) =>
  state.posts.posts.find(post => post.id === postId)
export const selectPostsStatus = (state: RootState) => state.posts.status
export const selectPostsError = (state: RootState) => state.posts.error

export const { filterPosts, setCurrentPost } = postSlice.actions
export default postSlice.reducer