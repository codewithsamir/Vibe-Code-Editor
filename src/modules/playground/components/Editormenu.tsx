import { useEffect } from "react"
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Settings, Eye, EyeOff, XCircle } from "lucide-react"

export default function EditorMenu({
  isPreviewVisible,
  setIsPreviewVisible,
  closeAllFiles
}: {
  isPreviewVisible: boolean;
  setIsPreviewVisible: (value: boolean) => void;
  closeAllFiles: () => void;
}) {

  // 🔹 Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ctrl + H → Toggle Preview
      if (e.ctrlKey && e.key.toLowerCase() === "h") {
        e.preventDefault()
        setIsPreviewVisible(!isPreviewVisible)
      }

      // Ctrl + P → Show Preview
      if (e.ctrlKey && e.key.toLowerCase() === "p") {
        e.preventDefault()
        setIsPreviewVisible(true)
      }

      // Ctrl + Shift + W → Close All Files
      if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === "w") {
        e.preventDefault()
        closeAllFiles()
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [isPreviewVisible, setIsPreviewVisible, closeAllFiles])

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          size="sm" 
          variant="outline" 
          className="flex items-center gap-1"
        >
          <Settings className="w-4 h-4" />
          <span className="hidden sm:inline">Options</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-52">
        {/* Preview Toggle */}
        <DropdownMenuItem
          onClick={() => setIsPreviewVisible(!isPreviewVisible)}
          className="flex items-center gap-2"
        >
          {isPreviewVisible ? (
            <>
              <EyeOff className="w-4 h-4 text-muted-foreground" />
              <span>Hide Preview</span>
              <span className="ml-auto text-xs text-muted-foreground">Ctrl+H</span>
            </>
          ) : (
            <>
              <Eye className="w-4 h-4 text-muted-foreground" />
              <span>Show Preview</span>
              <span className="ml-auto text-xs text-muted-foreground">Ctrl+P</span>
            </>
          )}
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        {/* Close All */}
        <DropdownMenuItem 
          onClick={closeAllFiles} 
          className="flex items-center gap-2 text-red-600"
        >
          <XCircle className="w-4 h-4" />
          <span>Close All Files</span>
          <span className="ml-auto text-xs text-muted-foreground">Ctrl+Shift+W</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
