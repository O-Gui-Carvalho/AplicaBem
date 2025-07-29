import type { Route } from "./+types/home";
import Navbar from "~/components/Navbar";
import ResumeCard from "~/components/ResumeCard";
import {usePuterStore} from "~/lib/puter";
import {Link, useNavigate} from "react-router";
import {useEffect, useState} from "react";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "AplicaBem" },
    { name: "description", content: "Feedback inteligente para seu próximo emprego!" },
  ];
}

export default function Home() {
  const { auth, kv } = usePuterStore();
  const navigate = useNavigate();
  const [resumes, setResumes] = useState<Resume[]>([]);
  const [loadingResumes, setLoadingResumes] = useState(false);

  useEffect(() => {
    if(!auth.isAuthenticated) navigate('/auth?next=/');
  }, [auth.isAuthenticated])

  useEffect(() => {
    const loadResumes = async () => {
      setLoadingResumes(true);

      const resumes = (await kv.list('resume:*', true)) as KVItem[];

      const parsedResumes = resumes?.map((resume) => (
          JSON.parse(resume.value) as Resume
      ))

      setResumes(parsedResumes || []);
      setLoadingResumes(false);
    }

    loadResumes()
  }, []);

  return (
    
    <main>

    <Navbar />

    <section className="main-section">
      <div className="page-heading pt-16 pb-4">
        <h1>Acompanhe suas inscrições e avaliações de currículo</h1>
        {!loadingResumes && resumes?.length === 0 ? (
            <p className="text-white font-light text-xl">Nenhum currículo encontrado. Envie seu primeiro currículo para receber feedback.</p>
        ): (
          <p className="text-white font-light text-xl">Revise seus envios e verifique o feedback gerado com nossa IA.</p>
        )}
      </div>
      {loadingResumes && (
          <div className="flex flex-col items-center justify-center">
            <img src="/images/resume-scan-2.gif" className="w-[200px]" />
          </div>
      )}

      {!loadingResumes && resumes.length > 0 && (
        <div className="resumes-section">
          {resumes.map((resume) => (
              <ResumeCard key={resume.id} resume={resume} />
          ))}
        </div>
      )}

      {!loadingResumes && resumes?.length === 0 && (
          <div className="flex flex-col items-center justify-center gap-4">
            <Link to="/upload" className="primary-button w-fit">
              Enviar Currículo
            </Link>
          </div>
      )}
    </section>
  </main>
  )
}