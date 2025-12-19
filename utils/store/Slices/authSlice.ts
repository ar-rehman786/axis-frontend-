// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import { authService, LoginCredentials, RegisterData } from "@/app/services/authService";

// interface User {
//   id: string;
//   name: string;
//   email: string;
//   role: string;
// }

// interface AuthState {
//   user: User | null;
//   loading: boolean;
//   error: string | null;
//   isAuthenticated: boolean;
// }

// const initialState: AuthState = {
//   user: null,
//   loading: false,
//   error: null,
//   isAuthenticated: false,
// };

// // Helper function to set cookies
// const setAuthCookies = (token: string, role: string) => {
//   document.cookie = `auth-token=${token}; path=/; max-age=86400; SameSite=Strict`;
//   document.cookie = `user-role=${role}; path=/; max-age=86400; SameSite=Strict`;
// };

// // Helper function to clear cookies
// const clearAuthCookies = () => {
//   document.cookie = "auth-token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
//   document.cookie = "user-role=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
// };

// // Async thunks
// export const loginUser = createAsyncThunk(
//   "auth/login",
//   async (credentials: LoginCredentials, { rejectWithValue }) => {
//     try {
//       const response = await authService.login(credentials);
      
//       if (response.token && response.user) {
//         setAuthCookies(response.token, response.user.role);
//       }
      
//       return response;
//     } catch (error: any) {
//       return rejectWithValue(error.message || "Login failed");
//     }
//   }
// );

// export const registerUser = createAsyncThunk(
//   "auth/register",
//   async (userData: RegisterData, { rejectWithValue }) => {
//     try {
//       const response = await authService.register(userData);
      
//       if (response.token && response.user) {
//         setAuthCookies(response.token, response.user.role);
//       }
      
//       return response;
//     } catch (error: any) {
//       return rejectWithValue(error.message || "Registration failed");
//     }
//   }
// );

// export const logoutUser = createAsyncThunk(
//   "auth/logout",
//   async (_, { rejectWithValue }) => {
//     try {
//       await authService.logout();
//       clearAuthCookies();
//       return { success: true };
//     } catch (error: any) {
//       clearAuthCookies(); // Clear cookies even if API fails
//       return rejectWithValue(error.message || "Logout failed");
//     }
//   }
// );

// export const checkAuth = createAsyncThunk(
//   "auth/check",
//   async (_, { rejectWithValue }) => {
//     try {
//       const response = await authService.getCurrentUser();
//       return response;
//     } catch (error: any) {
//       clearAuthCookies();
//       return rejectWithValue(error.message || "Session expired");
//     }
//   }
// );

// const authSlice = createSlice({
//   name: "auth",
//   initialState,
//   reducers: {
//     clearError: (state) => {
//       state.error = null;
//     },
//     setUser: (state, action) => {
//       state.user = action.payload;
//       state.isAuthenticated = !!action.payload;
//     },
//     initializeAuth: (state) => {
//       // Check cookies on client side
//       if (typeof window !== 'undefined') {
//         const cookies = document.cookie.split(';').reduce((acc, cookie) => {
//           const [key, value] = cookie.trim().split('=');
//           acc[key] = value;
//           return acc;
//         }, {} as Record<string, string>);
        
//         if (cookies['auth-token']) {
//           state.isAuthenticated = true;
//         }
//       }
//     }
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(loginUser.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(loginUser.fulfilled, (state, action) => {
//         state.loading = false;
//         state.user = action.payload.user || null;
//         state.isAuthenticated = true;
//         state.error = null;
//       })
//       .addCase(loginUser.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload as string;
//         state.isAuthenticated = false;
//       })
//       .addCase(registerUser.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(registerUser.fulfilled, (state, action) => {
//         state.loading = false;
//         state.user = action.payload.user || null;
//         state.isAuthenticated = true;
//         state.error = null;
//       })
//       .addCase(registerUser.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload as string;
//       })
//       .addCase(logoutUser.fulfilled, (state) => {
//         state.user = null;
//         state.isAuthenticated = false;
//         state.error = null;
//       })
//       .addCase(checkAuth.pending, (state) => {
//         state.loading = true;
//       })
//       .addCase(checkAuth.fulfilled, (state, action) => {
//         state.loading = false;
//         state.user = action.payload.user || null;
//         state.isAuthenticated = true;
//       })
//       .addCase(checkAuth.rejected, (state) => {
//         state.loading = false;
//         state.isAuthenticated = false;
//         state.user = null;
//       });
//   },
// });

// export const { clearError, setUser, initializeAuth } = authSlice.actions;
// export default authSlice.reducer;



import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { authService, LoginCredentials, RegisterData } from "@/app/services/authService";

interface User {
  id: string;
  full_name?: string;
  email: string;
  role: string;
}

interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  user: null,
  loading: false,
  error: null,
  isAuthenticated: false,
};

// Helper function to set cookies
const setAuthCookies = (token: string, role: string) => {
  document.cookie = `access_token=${token}; path=/; max-age=86400; SameSite=Lax`;
  document.cookie = `auth-token=${token}; path=/; max-age=86400; SameSite=Lax`;
  document.cookie = `adminToken=${token}; path=/; max-age=86400; SameSite=Lax`;
  document.cookie = `user_role=${role}; path=/; max-age=86400; SameSite=Lax`;
  document.cookie = `user-role=${role}; path=/; max-age=86400; SameSite=Lax`;
};

// Helper function to clear cookies
const clearAuthCookies = () => {
  document.cookie = "access_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
  document.cookie = "auth-token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
  document.cookie = "adminToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
  document.cookie = "user_role=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
  document.cookie = "user-role=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
};

// Async thunks
export const loginUser = createAsyncThunk(
  "auth/login",
  async (credentials: LoginCredentials, { rejectWithValue }) => {
    try {
      const response = await authService.login(credentials);

      if (response.access_token && response.user) {
        if (typeof window !== 'undefined') {
          window.localStorage.setItem('adminToken', response.access_token);
          window.localStorage.setItem('adminUser', JSON.stringify(response.user));
        }
        setAuthCookies(response.access_token, response.user.role);
      }
      
      return response;
    } catch (error: any) {
      return rejectWithValue(error.message || "Login failed");
    }
  }
);

export const registerUser = createAsyncThunk(
  "auth/register",
  async (userData: RegisterData, { rejectWithValue }) => {
    try {
      const response = await authService.register(userData);

      if (response.access_token && response.user) {
        if (typeof window !== 'undefined') {
          window.localStorage.setItem('adminToken', response.access_token);
          window.localStorage.setItem('adminUser', JSON.stringify(response.user));
        }
        setAuthCookies(response.access_token, response.user.role);
      }
      
      return response;
    } catch (error: any) {
      return rejectWithValue(error.message || "Registration failed");
    }
  }
);

export const logoutUser = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      await authService.logout();
      clearAuthCookies();
      if (typeof window !== 'undefined') {
        window.localStorage.removeItem('adminToken');
        window.localStorage.removeItem('adminUser');
      }
      return { success: true };
    } catch (error: any) {
      clearAuthCookies(); // Clear cookies even if API fails
      if (typeof window !== 'undefined') {
        window.localStorage.removeItem('adminToken');
        window.localStorage.removeItem('adminUser');
      }
      return rejectWithValue(error.message || "Logout failed");
    }
  }
);

export const checkAuth = createAsyncThunk(
  "auth/check",
  async (_, { rejectWithValue }) => {
    try {
      const response = await authService.getCurrentUser();
      return response;
    } catch (error: any) {
      clearAuthCookies();
      return rejectWithValue(error.message || "Session expired");
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    setUser: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = !!action.payload;
    },
    initializeAuth: (state) => {
      // Check cookies on client side
      if (typeof window !== 'undefined') {
        const cookies = document.cookie.split(';').reduce((acc, cookie) => {
          const [key, value] = cookie.trim().split('=');
          acc[key] = value;
          return acc;
        }, {} as Record<string, string>);
        
        if (cookies['auth-token']) {
          state.isAuthenticated = true;
        }
      }
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user || null;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.isAuthenticated = false;
      })
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user || null;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.isAuthenticated = false;
        state.error = null;
      })
      .addCase(checkAuth.pending, (state) => {
        state.loading = true;
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user || null;
        state.isAuthenticated = true;
      })
      .addCase(checkAuth.rejected, (state) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.user = null;
      });
  },
});

export const { clearError, setUser, initializeAuth } = authSlice.actions;
export default authSlice.reducer;