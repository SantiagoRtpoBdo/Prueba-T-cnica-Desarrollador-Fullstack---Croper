import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import api from "../../api/axios";

type AuthState = {
    token: string | null;
    loading: boolean;
    error: string | null;
};
const initialState: AuthState = {
    token: localStorage.getItem("token"),
    loading: false,
    error: null,
};

export const loginThunk = createAsyncThunk(
    "auth/login",
    async (payload: { username: string; password: string }, { rejectWithValue }) => {
        try {
        const { data } = await api.post("/auth/login", payload);
        return data.access_token as string;
        } catch (e: any) {
        return rejectWithValue(e?.response?.data?.message || "Error al iniciar sesión");
        }
    }
);

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logout(state) {
        state.token = null;
        localStorage.removeItem("token");
        },
        setToken(state, action: PayloadAction<string | null>) {
        state.token = action.payload;
        if (action.payload) localStorage.setItem("token", action.payload);
        else localStorage.removeItem("token");
        }
    },
    extraReducers: (b) => {
        b.addCase(loginThunk.pending, (s)=>{ s.loading=true; s.error=null; });
        b.addCase(loginThunk.fulfilled, (s,a)=>{ s.loading=false; s.token=a.payload; localStorage.setItem("token", a.payload); });
        b.addCase(loginThunk.rejected, (s,a:any)=>{ s.loading=false; s.error=a.payload || "Error"; });
    }
});

export const { logout, setToken } = authSlice.actions;
export default authSlice.reducer;

