'use client'
import {createContext,useContext,useEffect,useState,ReactNode} from 'react'
import data from './data.json'
export const TODAY='2026-10-06'
export const USERS:any={employee:'Swapnil',manager:'Sumit',hr:'Debashis',executive:'Ankan'}
export const ROLES:any={employee:'Employee',manager:'Manager',hr:'HR',executive:'Executive'}
export const days=(d:string)=>Math.round((Date.parse(d)-Date.parse(TODAY))/864e5)
export const fmt=(d:string)=>new Date(d+'T00:00:00').toLocaleDateString('en-GB',{day:'numeric',month:'short'})
export const ago=(m:number)=>m<60?m+' min ago':Math.round(m/60)+' hr ago'
export function due(d:string){const n=days(d);return n<0?[`${-n}d overdue`,'bad']:n===0?['Today','warn']:n===1?['Tomorrow','warn']:n<=3?[`In ${n} days`,'warn']:[fmt(d),'mute']}
const Ctx=createContext<any>(null)
export const useWs=()=>useContext(Ctx)
export function WorkspaceProvider({children}:{children:ReactNode}){
 const [role,setRoleS]=useState<string|null>(null),[theme,setTheme]=useState('light'),[tasks,setTasks]=useState<any[]>(data.tasks),[ready,setReady]=useState(false)
 useEffect(()=>{try{setRoleS(localStorage.getItem('hd-role'));setTheme(document.documentElement.dataset.theme||'light');const t=localStorage.getItem('hd-tasks');if(t)setTasks(JSON.parse(t))}catch{};setReady(true)},[])
 const setRole=(r:string|null)=>{setRoleS(r);try{r?localStorage.setItem('hd-role',r):localStorage.removeItem('hd-role')}catch{}}
 const toggleTheme=()=>{const n=theme==='dark'?'light':'dark',h=document.documentElement;h.classList.add('anim');h.dataset.theme=n;setTheme(n);try{localStorage.setItem('hd-theme',n)}catch{};setTimeout(()=>h.classList.remove('anim'),400)}
 const setStatus=(id:string,status:string)=>{const next=tasks.map(t=>t.id===id?{...t,status,progress:status==='done'?100:t.progress}:t);setTasks(next);try{localStorage.setItem('hd-tasks',JSON.stringify(next))}catch{}}
 return <Ctx.Provider value={{role,setRole,theme,toggleTheme,tasks,setStatus,ready,data}}>{children}</Ctx.Provider>}
