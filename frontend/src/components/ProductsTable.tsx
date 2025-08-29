import type { Product } from "../features/products/productsSlice";

type Props = {
    data: Product[];
    onEdit: (p: Product) => void;
    onDelete: (id: string) => void;
};

export default function ProductsTable({ data, onEdit, onDelete }: Props) {
    return (
        <div className="overflow-x-auto">
        <table className="w-full text-left border">
            <thead className="bg-gray-50">
            <tr>
                <th className="p-2 border">Nombre</th>
                <th className="p-2 border">Descripción</th>
                <th className="p-2 border">Precio</th>
                <th className="p-2 border">Categoría</th>
                <th className="p-2 border">Acciones</th>
            </tr>
            </thead>
            <tbody>
            {data.map((p)=>(
                <tr key={p._id} className="odd:bg-white even:bg-gray-50">
                <td className="p-2 border">{p.nombre}</td>
                <td className="p-2 border">{p.descripcion}</td>
                <td className="p-2 border">${p.precio}</td>
                <td className="p-2 border">{p.categoria}</td>
                <td className="p-2 border">
                    <div className="flex gap-2">
                    <button className="px-2 py-1 border rounded" onClick={()=>onEdit(p)}>Editar</button>
                    <button className="px-2 py-1 border rounded text-red-600" onClick={()=>onDelete(p._id!)}>Eliminar</button>
                    </div>
                </td>
                </tr>
            ))}
            {data.length===0 && (
                <tr><td className="p-4 text-center text-gray-500" colSpan={5}>Sin productos</td></tr>
            )}
            </tbody>
        </table>
        </div>
    );
}
