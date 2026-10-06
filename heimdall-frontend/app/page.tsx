'use client'
import {useRouter} from 'next/navigation'
import {Sun,Moon} from 'lucide-react'
import {useWs,ROLES} from '@/lib/store'
const BLURB:any={employee:'Your tasks, updates and projects in one place.',manager:'Team workload, deadlines and project health.',hr:'Employee directory, leave requests and new joiners.',executive:'Company risks, revenue and contract alerts.'}
export default function Landing(){
 const {setRole,theme,toggleTheme}=useWs();const router=useRouter()
 return <div className="grid min-h-screen md:grid-cols-[1.1fr_1fr]">
  <section className="flex flex-col justify-between bg-[var(--side)] p-8 md:p-14"><img src="/logo-light.png" alt="HeimDall" className="h-24 w-fit md:h-32"/>
   <div className="py-12"><h1 className="max-w-md text-4xl font-semibold leading-tight tracking-tight text-white md:text-5xl">Unify your company. Empower your team.</h1><p className="mt-4 max-w-sm text-[#B9C4D8]">One workspace for tasks, projects, people and contracts, with an assistant that answers from your own data.</p></div><p className="text-sm text-[#7F8CA6]">Demo workspace with sample data.</p></section>
  <section className="relative flex items-center p-8 md:p-14"><button onClick={toggleTheme} aria-label="Toggle theme" className="absolute right-5 top-5 rounded-md border border-line p-2 hover:bg-surface">{theme==='dark'?<Sun size={16}/>:<Moon size={16}/>}</button>
   <div className="fade w-full max-w-sm"><h2 className="text-xl font-semibold">Choose a workspace view</h2><p className="mt-1 text-mute">Each role sees different navigation and data.</p>
    <ul className="mt-6 divide-y divide-line rounded-md border border-line bg-surface">{Object.keys(ROLES).map(k=><li key={k}><button onClick={()=>{setRole(k);router.push('/workspace')}} className="w-full px-4 py-3.5 text-left transition-colors hover:bg-accent/10"><span className="block font-medium">{ROLES[k]}</span><span className="text-mute">{BLURB[k]}</span></button></li>)}</ul></div></section></div>}
