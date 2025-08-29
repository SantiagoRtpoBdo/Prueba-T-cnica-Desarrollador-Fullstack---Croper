import { useAppDispatch, useAppSelector } from "../utils/hooks";
import { loginThunk } from "../features/auth/authSlice";
import { useState } from "react";
import Toast from "../components/Toast";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
    const dispatch = useAppDispatch();
    const { loading, error } = useAppSelector(s=>s.auth);
    const [username, setUsername] = useState(""); 
    const [password, setPassword] = useState("");
    const nav = useNavigate();

    const login = async () => {
        const res = await dispatch(loginThunk({ username, password }));
        if ((res as any).meta.requestStatus === "fulfilled") nav("/products");
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-sm bg-white rounded-xl shadow p-6 space-y-3">
            <h1 className="text-xl font-semibold">Iniciar sesión</h1>
            <input className="border w-full p-2 rounded" placeholder="Username" onChange={e=>setUsername(e.target.value)} />
            <input className="border w-full p-2 rounded" placeholder="Password" type="password" onChange={e=>setPassword(e.target.value)} />
            <button disabled={loading} className="w-full bg-blue-600 text-white py-2 rounded" onClick={login}>
            {loading? "Entrando..." : "Entrar"}
            </button>
        </div>
        <Toast message={error} />
        </div>
    );
}
