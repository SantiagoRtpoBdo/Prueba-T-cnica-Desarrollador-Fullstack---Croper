import { useState, useEffect } from "react";
import type { Product } from "../features/products/productsSlice";

type Props = {
    initial?: Product | null;
    onSubmit: (p: Omit<Product,"_id">, id?: string) => void;
    onClose: () => void;
};

export default function ProductForm({ initial, onSubmit, onClose }: Props) {
    const [nombre, setNombre] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [precio, setPrecio] = useState<number>(1);
    const [categoria, setCategoria] = useState("");

    useEffect(()=> {
        if (initial) {
        setNombre(initial.nombre || "");
        setDescripcion(initial.descripcion || "");
        setPrecio(initial.precio || 1);
        setCategoria(initial.categoria || "");
        }
    }, [initial]);

    return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4">
        <div className="bg-white w-full max-w-md rounded-xl p-6 space-y-3">
            <h2 className="text-lg font-semibold">{initial? "Editar" : "Crear"} producto</h2>
            <input className="w-full border p-2 rounded" placeholder="Nombre" value={nombre} onChange={e=>setNombre(e.target.value)} />
            <input className="w-full border p-2 rounded" placeholder="Descripción" value={descripcion} onChange={e=>setDescripcion(e.target.value)} />
            <input className="w-full border p-2 rounded" type="number" min={1} placeholder="Precio" value={precio} onChange={e=>setPrecio(Number(e.target.value))} />
            <input className="w-full border p-2 rounded" placeholder="Categoría" value={categoria} onChange={e=>setCategoria(e.target.value)} />
            <div className="flex justify-end gap-2">
            <button className="px-3 py-2 border rounded" onClick={onClose}>Cancelar</button>
            <button
                className="px-3 py-2 rounded bg-blue-600 text-white"
                onClick={()=> onSubmit({ nombre, descripcion, precio, categoria }, initial? initial._id : undefined)}
            >
                Guardar
            </button>
            </div>
        </div>
        </div>
    );
}
