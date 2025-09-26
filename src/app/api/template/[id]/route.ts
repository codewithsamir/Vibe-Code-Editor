import { db } from "@/lib/db";
import { templatePaths } from "@/lib/template";
import { readTemplateStructureFromJson, saveTemplateStructureToJson } from "@/modules/playground/lib/path-to-json";
import path from "path";
import fs from 'fs/promises'
import { NextRequest, NextResponse } from "next/server";


function validdateJsonStructure(data: unknown) : boolean{
    try {
        JSON.parse(JSON.stringify(data));
        return true;
    } catch (error) {
        console.error("Invalid JSON structure : ", error)
        return false
    }
}


export async function GET(req:NextRequest, {params}:{params:Promise<{id:string}>}){
   
    const {id} = await params;

    if(!id){
        return NextResponse.json({error:"Missing playground Id"},{status: 400})
    }

    const playground = await db.playground.findUnique({
        where:{id}
    })

    if(!playground){
        return NextResponse.json({error:'Playground not found'},{status : 404})
    }

    const  templatekey = playground.template as keyof typeof templatePaths;
    const templatePath = templatePaths[templatekey]

    if(!templatePath){
        return NextResponse.json({error:"Invalid template"},{status: 404})
    }

    try {
        const inputPath = path.join(process.cwd(), templatePath);
        const outputFile = path.join(process.cwd(), `output/${templatekey}.json`)

        await saveTemplateStructureToJson(inputPath, outputFile)
        const result = await readTemplateStructureFromJson(outputFile)

        if(!validdateJsonStructure(result.items)){
            return NextResponse.json({error:"Invalid JSON structure"},{status: 500});

        }

        await fs.unlink(outputFile)

        return NextResponse.json({success : true, templateJson : result},{status:200})

    } catch (error) {
        console.error("Error generating template JSON ", error)
                   return NextResponse.json({error:"Failed to generate template"},{status: 500});

    }

}