import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/axios";

export type Product = {
    _id?: string;
    nombre: string;
    descripcion?: string;
    precio: number;
    categoria?: string;
};

type ProductsState = {
    items: Product[];
    loading: boolean;
    error: string | null;
};
const initialState: ProductsState = { items: [], loading: false, error: null };

export const fetchProducts = createAsyncThunk("products/fetch", async (_, { rejectWithValue }) => {
    try { const { data } = await api.get("/products"); return data as Product[]; }
    catch (e: any) { return rejectWithValue(e?.response?.data?.message || "Error al cargar productos"); }
});

export const createProduct = createAsyncThunk("products/create", async (p: Omit<Product,"_id">, { rejectWithValue }) => {
    try { const { data } = await api.post("/products", p); return data as Product; }
    catch (e: any) { return rejectWithValue(e?.response?.data?.message || "Error al crear producto"); }
});

export const updateProduct = createAsyncThunk("products/update", async ({id, changes}:{id:string;changes:Product}, { rejectWithValue }) => {
    try { const { data } = await api.put(`/products/${id}`, changes); return data as Product; }
    catch (e: any) { return rejectWithValue(e?.response?.data?.message || "Error al actualizar producto"); }
});

export const deleteProduct = createAsyncThunk("products/delete", async (id:string, { rejectWithValue }) => {
    try { await api.delete(`/products/${id}`); return id; }
    catch (e: any) { return rejectWithValue(e?.response?.data?.message || "Error al eliminar producto"); }
});

const slice = createSlice({
    name: "products",
    initialState,
    reducers: {},
    extraReducers: (b) => {
        b.addCase(fetchProducts.pending, (s)=>{ s.loading=true; s.error=null; });
        b.addCase(fetchProducts.fulfilled, (s,a)=>{ s.loading=false; s.items=a.payload; });
        b.addCase(fetchProducts.rejected, (s,a:any)=>{ s.loading=false; s.error=a.payload; });

        b.addCase(createProduct.fulfilled, (s,a)=>{ s.items.unshift(a.payload); });
        b.addCase(updateProduct.fulfilled, (s,a)=>{ s.items = s.items.map(it => it._id===a.payload._id ? a.payload : it); });
        b.addCase(deleteProduct.fulfilled, (s,a)=>{ s.items = s.items.filter(it => it._id!==a.payload); });
    }
});

export default slice.reducer;
