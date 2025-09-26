import { WebContainer } from "@webcontainer/api";
import { TemplateFolder } from "@/modules/playground/lib/path-to-json";
import { useCallback, useEffect, useState } from "react";



interface useWebContainerProps {
templateData: TemplateFolder
}


interface useWebContainerReturn {
    serverUrl:string | null;
    isLoading:boolean;
    error:string | null;
    instance: WebContainer | null ;
    writeFileSync: (path:string, content:string)=>Promise<void>;
    destroy:()=>void;
}

export const useWebContainer = ({
    templateData
}:useWebContainerProps):useWebContainerReturn=>{

    const [serverUrl, setServerUrl] = useState<string | null>(null)
    const [isLoading , setIsLoading] = useState<boolean>(false)
    const  [error , setError] = useState<string | null>(null)
    const  [instance , setInstance] = useState<WebContainer | null>(null)

    useEffect(()=>{
        let mounted = true;

        async function initialzeWebContainer(){
            try {
                const webcontainerInstance = await WebContainer.boot()

                if(!mounted) return;
                    
                setInstance(webcontainerInstance)
                setIsLoading(false)
            } catch (error) {
                console.log("error to initialize of webcontainer ", error)

                if(mounted){
                    setError(error instanceof Error ? error.message : "Failed to initialize Webcontainer"
                    )
                    setIsLoading(false)
                }
            }
        }

        initialzeWebContainer()

        return ()=>{
            mounted = false;
            if(instance){
                instance.teardown();
            }
        }
    },[])


    const writeFileSync = useCallback(async (path:string, content:string):Promise<void>=>{
      if(!instance){
        throw new Error("Webcontainer instance is not aviable")
      }
      try {
        const pathParts = path.split("/")
        const folderpath = pathParts.slice(0,-1).join("/")

        if(folderpath){
            await instance.fs.mkdir(folderpath, {recursive:true})
        }

        await instance.fs.writeFile(path, content)

      } catch (error) {
      const errorMessage =   error instanceof Error ? error.message : "Failed to write file"

        console.error(`failed to write  file at ${path}:`, error)
        throw new Error(`Failed to write file at ${path}: ${errorMessage}`)
      }
    },[instance])


    const destroy = useCallback( ()=>{
        if(instance){
            instance.teardown()
            setInstance(null)
            setServerUrl(null)
        }
    },[instance])

    return {serverUrl, isLoading,error,instance, writeFileSync, destroy}
}



// import { WebContainer } from "@webcontainer/api";
// import { TemplateFolder, TemplateFile } from "@/modules/playground/lib/path-to-json";
// import { useCallback, useEffect, useState } from "react";

// interface useWebContainerProps {
//   templateData: TemplateFolder;
// }

// interface useWebContainerReturn {
//   serverUrl: string | null;
//   isLoading: boolean;
//   error: string | null;
//   instance: WebContainer | null;
//   writeFileSync: (path: string, content: string) => Promise<void>;
//   destroy: () => Promise<void>;
//   reset: () => Promise<void>;
// }

// // Global singleton to prevent multiple WebContainer boots
// let globalInstance: WebContainer | null = null;

// export const useWebContainer = ({
//   templateData,
// }: useWebContainerProps): useWebContainerReturn => {
//   const [serverUrl, setServerUrl] = useState<string | null>(null);
//   const [isLoading, setIsLoading] = useState<boolean>(true);
//   const [error, setError] = useState<string | null>(null);
//   const [instance, setInstance] = useState<WebContainer | null>(null);

//   // Boot container
//   const initializeWebContainer = useCallback(async () => {
//     setIsLoading(true);
//     setError(null);

//     try {
//       if (!globalInstance) {
//         globalInstance = await WebContainer.boot();
//       }

//       setInstance(globalInstance);

//       // Optional: setup server URL if needed
//       setServerUrl(globalInstance.url || null);

//       // Sync template files automatically
//       if (templateData) {
//         await syncTemplate(globalInstance, templateData);
//       }

//       setIsLoading(false);
//     } catch (err) {
//       console.error("Error initializing WebContainer:", err);
//       setError(err instanceof Error ? err.message : "Failed to initialize WebContainer");
//       setIsLoading(false);
//     }
//   }, [templateData]);

//   // Auto-initialize on mount
//   useEffect(() => {
//     initializeWebContainer();
//   }, [initializeWebContainer]);

//   // Write a file safely to the container
//   const writeFileSync = useCallback(
//     async (path: string, content: string): Promise<void> => {
//       if (!instance) throw new Error("WebContainer instance is not available");

//       try {
//         const pathParts = path.split("/");
//         const folderPath = pathParts.slice(0, -1).join("/");

//         if (folderPath) await instance.fs.mkdir(folderPath, { recursive: true });

//         await instance.fs.writeFile(path, content);
//       } catch (err) {
//         console.error(`Failed to write file at ${path}:`, err);
//         throw new Error(`Failed to write file at ${path}`);
//       }
//     },
//     [instance]
//   );

//   // Recursively sync template data to container filesystem
//   const syncTemplate = useCallback(
//     async (container: WebContainer, folder: TemplateFolder, parentPath = "") => {
//       for (const item of folder.items) {
//         if ("folderName" in item) {
//           // Recursively create folders
//           const folderPath = parentPath ? `${parentPath}/${item.folderName}` : item.folderName;
//           await container.fs.mkdir(folderPath, { recursive: true });
//           await syncTemplate(container, item, folderPath);
//         } else if ("filename" in item) {
//           const filePath = parentPath ? `${parentPath}/${item.filename}.${item.fileExtension}` : `${item.filename}.${item.fileExtension}`;
//           await writeFileSync(filePath, item.content);
//         }
//       }
//     },
//     [writeFileSync]
//   );

//   // Destroy container safely
//   const destroy = useCallback(async () => {
//     if (globalInstance) {
//       await globalInstance.teardown();
//       globalInstance = null;
//     }
//     setInstance(null);
//     setServerUrl(null);
//   }, []);

//   // Reset environment: destroy + re-initialize
//   const reset = useCallback(async () => {
//     await destroy();
//     await initializeWebContainer();
//   }, [destroy, initializeWebContainer]);

//   return { serverUrl, isLoading, error, instance, writeFileSync, destroy, reset };
// };
