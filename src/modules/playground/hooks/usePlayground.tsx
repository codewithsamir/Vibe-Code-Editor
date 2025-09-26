"use client"
import React, { useCallback, useEffect, useState } from 'react'
import { toast } from 'sonner'
import type { TemplateFolder } from '../lib/path-to-json'
import { getPlaygroundById, SaveUpdateCode } from '../actions';

interface PlaygroundData{
    id:string;
    title?:string;
    [key:string]:any;

}

interface UsePlaygroundReturn {
    playgroundData:PlaygroundData | null;
    templateData : TemplateFolder | null;
    isLoading :boolean;
    error : string | null;
    loadPlayground:()=>Promise<void>;
    saveTemplateData:(data:TemplateFolder)=>Promise<void>
}


export const usePlayground = (id:string):UsePlaygroundReturn =>{
    const [playgroundData, setplaygroundData]= useState<PlaygroundData | null>(null);
    const [templateData, settemplateData] = useState<TemplateFolder | null>(null);
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    const loadPlayground = useCallback(async()=>{
            if(!id) return ;

            try {
                setIsLoading(true)
                setError(null)
                const data = await getPlaygroundById(id);
                
                //@ts-ignore
                setplaygroundData(data)
                const rawContent = data?.templateFiles?.[0]?.content;

                if(typeof rawContent === "string"){
                    const parsedContent = JSON.parse(rawContent)
                    console.log("apr",parsedContent)
                    settemplateData(parsedContent)
                    toast.success("Playground loaded successfully ")
                    return;
                }

                // load template from api if not in saved content

                const res = await fetch(`/api/template/${id}`)

                if(!res.ok) throw new Error(`Failed to laod template : ${res.status}`)

                    const templateres = await res.json();

                    if(templateres.templateJson && Array.isArray(templateres.templateJson)){
                        settemplateData({
                            folderName:"Root",
                            items:templateres.templateJson,
                        })
                    }else{
                        settemplateData(templateres.templateJson || {
                            folderName : "Root",
                            items : [],
                        })
                    }
                    toast.success("Template loaded successfully")

            } catch (error) {
                console.error("Error loading playground : ", error)
                setError("Failed to laod Playground data");
                toast.error("Failed to laod playground data")
            }finally{
                setIsLoading(false)
            }
    },[id]);


    const saveTemplateData = useCallback(async (data:TemplateFolder)=>{
        try {
             await SaveUpdateCode(id,data);
             settemplateData(data);
             toast.success("changes saved successfully");
        } catch (error) {
            console.error("Error saving template data: ", error)
            toast.error("Failed to save changes")
            throw error;
        }
    },[id])

    useEffect(()=>{
        loadPlayground()
    },[loadPlayground]);


    return {
        playgroundData,saveTemplateData
        , isLoading,error,loadPlayground,templateData
    }
}