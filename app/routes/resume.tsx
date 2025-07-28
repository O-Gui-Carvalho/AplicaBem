import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router';
import ATS from '~/components/ATS';
import Details from '~/components/Details';
import Summary from '~/components/Summary';
import { usePuterStore } from '~/lib/puter';

export const meta = () => ([
    {title: 'Resumind | Auth'},
    {name: 'description', content: 'Detailed overview of your resume'},
])

const resume = () => {
    const [jobTitle, setJobTitle] = useState('');

    const {auth, isLoading, fs, kv} = usePuterStore();
    const {id} = useParams();
    const [imageUrl, setImageUrl] = useState('');
    const [resumeUrl, setResumeUrl] = useState('');
    const [feedback, setFeedback] = useState<Feedback | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        if(!isLoading && !auth.isAuthenticated){
            navigate(`/auth?next=/resume/${id}`);
        }
    }, [isLoading])

    useEffect(() => {
        const loadResume = async () => {
            const resume = await kv.get(`resume:${id}`);

            if(!resume) return;

            const data = JSON.parse(resume);

            setJobTitle(data.jobTitle || '');

            const resumeBlob = await fs.read(data.resumePath);
            if(!resumeBlob) return;

            const pdfBlob = new Blob([resumeBlob], {type: 'application/pdf'});
            const resumeUrl = URL.createObjectURL(pdfBlob);
            setResumeUrl(resumeUrl);

            const imageBlob = await fs.read(data.imagePath);
            if(!imageBlob) return;

            const imageUrl = URL.createObjectURL(imageBlob);
            setImageUrl(imageUrl);

            setFeedback(data.feedback);
            console.log({resumeUrl, imageUrl, feedback: data.feedback})
        }

        loadResume();
    }, [id])

  return (
    <main className="!pt-0">
        <nav className="resume-nav">
            <div className="w-full max-w-[1500px] mx-auto flex flex-row gap-6 items-center ">
                <Link to="/" className='back-button'>
                    <img src="/icons/back.svg" alt="logo" className='w-2.5 h-2.5' />
                    <span className="text-[#0D0D0D] text-sm font-semibold">
                            Voltar para o início
                    </span>
                </Link>
                <div className="hidden sm:flex items-center gap-2 text-sm text-[#BFBFBF] font-medium">
                    {jobTitle && (
                        <>
                        <span>{jobTitle}</span>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-4 h-4 text-gray-400"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                        </svg>
                        </>
                    )}
                    <span className="text-white">Resultado</span>
                </div>
            </div>
        </nav>
        <div className="flex flex-row w-full max-w-[1500px] mx-auto max-lg:flex-col-reverse">
            <section className="feedback-section h-[100vh] sticky top-0 items-start justify-center">
                {imageUrl && resumeUrl && (
                    <div className="animate-in fade-in duration-1000 gradient-border max-sm:m-0 h-[90%] max-wxl:h-fit w-fit">
                        <a href={resumeUrl} target='_blank' rel="noopener noreferrer">
                            <img src={imageUrl} title='resume' className="w-full h-full object-contain rounded-lg" />
                        </a>
                    </div>
                )}
            </section>
            <section className="feedback-section">
                <h2 className="text-4xl font-medium">
                    Resultado da análise
                </h2>
                {feedback ? (
                    <div className="flex flex-col gap-8 animate-in fade-in duration-1000">
                        <Summary feedback={feedback}/>
                        <ATS score={feedback.ATS.score || 0} suggestions={feedback.ATS.tips || []}/>
                        <Details feedback={feedback}/>
                    </div>
                ): (
                    <img src="/images/resume-scan-2.gif" className='w-full' />
                )}
            </section>
        </div>
    </main>
  )
}

export default resume