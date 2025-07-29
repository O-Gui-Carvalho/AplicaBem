import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router";
import Navbar from "~/components/Navbar";
import { usePuterStore } from "~/lib/puter"

export const meta = () => ([
    {title: 'AplicaBem | Autenticação'},
    {name: 'description', content: 'Acesse sua conta!'},
])

const auth = () => {
    const {isLoading, auth} = usePuterStore();
    const location = useLocation();
    const next = location.search.split('next=')[1];
    const navigate = useNavigate();

    useEffect(() => {
        if(auth.isAuthenticated){
            navigate(next);
        }
    }, [auth.isAuthenticated, next])

  return (
    <main className="min-h-screen flex items-center justify-center">
        <div className="border rounded-lg bg-[#1f1f1f] shadow-lg w-full max-w-[1000px] py-16">
            <section className="flex flex-col gap-8">
                <div className="flex flex-col items-center gap-10 text-center">
                    <h1>Bem Vindo(a)</h1>
                    <p className="text-white font-light text-xl">Faça login para continuar sua jornada profissional!</p>
                    <div>
                        {isLoading ? (
                            <button className="auth-button animate-pulse">
                                <p>Fazendo seu login...</p>
                            </button>
                        ): (
                            <>
                                {auth.isAuthenticated ? (
                                    <button className="auth-button" onClick={auth.signOut}>
                                        <p>Log Out</p>
                                    </button>
                                ): (
                                    <button className="auth-button" onClick={auth.signIn}>
                                        <p>Log In</p>
                                    </button>
                                )}
                            </>
                        )}
                    </div>
                </div>
                
            </section>
        </div>
    </main>
  )
}

export default auth