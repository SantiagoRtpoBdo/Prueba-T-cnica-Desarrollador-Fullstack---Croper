import { useEffect, useMemo, useState } from "react";
import { useAppDispatch, useAppSelector } from "../utils/hooks";
import { fetchProducts, createProduct, updateProduct, deleteProduct } from "../features/products/productsSlice";
import type { Product } from "../features/products/productsSlice";
import ProductsTable from "../components/ProductsTable";
import Pagination from "../components/Pagination";
import ProductForm from "../components/ProductForm";
import Toast from "../components/Toast";
import { logout } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";

export default function ProductsPage() {
    const dispatch = useAppDispatch();
    const nav = useNavigate();
    const { items, loading, error } = useAppSelector(s=>s.products);
    const { token } = useAppSelector(s=>s.auth);

    const [page, setPage] = useState(1);
    const pageSize = 5;

    const [showForm, setShowForm] = useState(false);
    const [editing, setEditing] = useState<Product | null>(null);

    useEffect(()=>{ dispatch(fetchProducts()); }, [dispatch]);

    useEffect(()=>{
        if (!token) nav("/");
    }, [token, nav]);

    const paged = useMemo(()=>{
        const start = (page-1)*pageSize;
        return items.slice(start, start+pageSize);
    }, [items, page]);

    const onCreate = () => { setEditing(null); setShowForm(true); };
    const onEdit = (p: Product) => { setEditing(p); setShowForm(true); };
    const onDelete = async (id: string) => { await dispatch(deleteProduct(id)); };

    const onSubmit = async (payload: Omit<Product,"_id">, id?: string) => {
        if (id) await dispatch(updateProduct({ id, changes: payload as Product }));
        else await dispatch(createProduct(payload));
        setShowForm(false);
    };

    return (
        <div className="max-w-5xl mx-auto p-4 space-y-4">
        <header className="flex items-center justify-between">
            <h1 className="text-2xl font-semibold">Productos</h1>
            <div className="flex gap-2">
            <button className="px-3 py-2 rounded border" onClick={()=>dispatch(fetchProducts())}>
                Refrescar
            </button>
            <button className="px-3 py-2 rounded bg-green-600 text-white" onClick={onCreate}>
                Nuevo
            </button>
            <button className="px-3 py-2 rounded border" onClick={()=>{ dispatch(logout()); nav("/"); }}>
                Salir
            </button>
            </div>
        </header>

        {loading && <div className="text-gray-600">Cargando...</div>}

        <ProductsTable data={paged} onEdit={onEdit} onDelete={onDelete} />
        <Pagination page={page} total={items.length} pageSize={pageSize} onChange={setPage} />

        {showForm && (
            <ProductForm initial={editing} onSubmit={onSubmit} onClose={()=>setShowForm(false)} />
        )}

        <Toast message={error} />
        </div>
    );
}
