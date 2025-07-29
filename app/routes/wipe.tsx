import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import Navbar from "~/components/Navbar";
import { usePuterStore } from "~/lib/puter";

const WipeApp = () => {
    const { auth, isLoading, error, clearError, fs, ai, kv } = usePuterStore();
    const navigate = useNavigate();
    const [files, setFiles] = useState<FSItem[]>([]);

    const loadFiles = async () => {
        const files = (await fs.readDir("./")) as FSItem[];
        setFiles(files);
    };

    useEffect(() => {
        loadFiles();
    }, []);

    useEffect(() => {
        if (!isLoading && !auth.isAuthenticated) {
            navigate("/auth?next=/wipe");
        }
    }, [isLoading]);

    const handleDelete = async () => {
        files.forEach(async (file) => {
            await fs.delete(file.path);
        });
        await kv.flush();
        loadFiles();
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error {error}</div>;
    }

    return (
        <main className="h-screen flex flex-col">
            <Navbar/>
            <div className="flex flex-grow items-center justify-center">
                <div className="text-white bg-[#1f1f1f] w-full max-w-[1000px] rounded-xl flex flex-col items-center justify-center gap-4 p-8 mx-4">
                    <span className="text-xl font-semibold">Logado como: {auth.user?.username}</span>
                    <div>Arquivos encontrados:</div>
                    <div className="flex flex-col gap-4">
                        {files.map((file) => (
                            <div key={file.id} className="flex flex-row gap-4">
                                <p>{file.name}</p>
                            </div>
                        ))}
                    </div>
                    <div>
                        <button
                            className="primary-button"
                            onClick={() => handleDelete()}
                        >
                            Excluir arquivos
                        </button>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default WipeApp;