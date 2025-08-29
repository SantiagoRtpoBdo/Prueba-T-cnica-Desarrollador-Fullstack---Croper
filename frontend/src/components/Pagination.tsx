type Props = { page: number; total: number; pageSize: number; onChange: (p:number)=>void };
export default function Pagination({ page, total, pageSize, onChange }: Props) {
    const pages = Math.ceil(total / pageSize);
    if (pages <= 1) return null;
    return (
        <div className="flex gap-2 justify-center mt-4">
        <button className="px-3 py-1 border rounded" disabled={page===1} onClick={()=>onChange(page-1)}>Prev</button>
        <span className="px-3 py-1">Página {page} / {pages}</span>
        <button className="px-3 py-1 border rounded" disabled={page===pages} onClick={()=>onChange(page+1)}>Next</button>
        </div>
    );
}
