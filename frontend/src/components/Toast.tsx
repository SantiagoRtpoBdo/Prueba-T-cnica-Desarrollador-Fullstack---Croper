export default function Toast({ message }: { message: string | null }) {
    if (!message) return null;
    return (
        <div className="fixed bottom-4 right-4 bg-red-600 text-white px-4 py-2 rounded-lg shadow">
        {message}
        </div>
    );
}
