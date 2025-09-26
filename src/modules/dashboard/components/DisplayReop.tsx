"use client";

import { useEffect, useState, useRef } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Star, Code, Clock, Lock, Folder, File } from "lucide-react";
import { useSession } from "next-auth/react";

type Repo = {
  id: number;
  name: string;
  description: string;
  language: string;
  stargazers_count: number;
  updated_at: string;
  html_url: string;
  private: boolean;
  full_name: string;
};

type FileItem = {
  name: string;
  path: string;
  type: "file" | "dir";
  download_url: string | null;
  children?: FileItem[];
};

type RepoDialogProps = {
  isOpen: boolean;
  onClose: () => void;
};

const DisplayRepo = ({ isOpen, onClose }: RepoDialogProps) => {
  const { data: session } = useSession();
  const [repos, setRepos] = useState<Repo[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [language, setLanguage] = useState("all");
  const [selectedRepo, setSelectedRepo] = useState<Repo | null>(null);
  const [repoFiles, setRepoFiles] = useState<FileItem[]>([]);
  const [expandedFolders, setExpandedFolders] = useState<Record<string, boolean>>({});

  const containerRef = useRef<HTMLDivElement>(null);

  // Fetch Repos with Pagination
  const fetchRepos = async (pageNumber: number) => {
    if (!session?.accessToken || !hasMore) return;

    setLoading(true);
    const res = await fetch(
      `https://api.github.com/user/repos?per_page=10&page=${pageNumber}`,
      {
        headers: { Authorization: `Bearer ${session.accessToken}` },
      }
    );
    const data: Repo[] = await res.json();
    if (data.length < 10) setHasMore(false);
    setRepos((prev) => [...prev, ...data]);
    setLoading(false);
  };

  // Fetch Repo Contents (Recursive)
  const fetchRepoContents = async (repoFullName: string, path = ""): Promise<FileItem[]> => {
    const res = await fetch(
      `https://api.github.com/repos/${repoFullName}/contents/${path}`,
      { headers: { Authorization: `Bearer ${session?.accessToken}` } }
    );
    const data = await res.json();
    if (!Array.isArray(data)) return [];

    const items: FileItem[] = await Promise.all(
      data.map(async (item: any) => {
        if (item.type === "dir") {
          return { ...item, children: [] };
        } else {
          return { ...item };
        }
      })
    );
    return items;
  };

  const toggleFolder = async (path: string) => {
    if (!selectedRepo) return;

    const isExpanded = expandedFolders[path];
    setExpandedFolders((prev) => ({ ...prev, [path]: !isExpanded }));

    // If folder not loaded yet
    if (!isExpanded) {
      const fetchFolder = async () => {
        const newFiles = [...repoFiles];
        const folder = findFileItem(newFiles, path);
        if (folder && folder.type === "dir" && folder.children?.length === 0) {
          const children = await fetchRepoContents(selectedRepo.full_name, folder.path);
          folder.children = children;
          setRepoFiles([...newFiles]);
        }
      };
      fetchFolder();
    }
  };

  const findFileItem = (files: FileItem[], path: string): FileItem | null => {
    for (const f of files) {
      if (f.path === path) return f;
      if (f.children) {
        const found = findFileItem(f.children, path);
        if (found) return found;
      }
    }
    return null;
  };

  // Infinite scroll
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
      if (scrollTop + clientHeight >= scrollHeight - 20 && !loading && hasMore) {
        fetchRepos(page + 1);
        setPage((prev) => prev + 1);
      }
    };

    const current = containerRef.current;
    if (current) current.addEventListener("scroll", handleScroll);
    return () => current?.removeEventListener("scroll", handleScroll);
  }, [page, loading, hasMore]);

  useEffect(() => {
    if (isOpen) {
      setRepos([]);
      setPage(1);
      setHasMore(true);
      fetchRepos(1);
      setSelectedRepo(null);
      setRepoFiles([]);
      setExpandedFolders({});
    }
  }, [isOpen]);

  const filteredRepos = repos.filter((repo) => {
    const matchesSearch =
      repo.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (repo.description || "").toLowerCase().includes(searchQuery.toLowerCase());
    const matchesLang = language === "all" || repo.language === language;
    return matchesSearch && matchesLang;
  });

  const renderFiles = (files: FileItem[], level = 0) => {
    return files.map((file) => (
      <div key={file.path} className={`pl-${level * 4} mt-1 flex items-center gap-2`}>
        {file.type === "dir" ? (
          <Folder
            size={16}
            className="cursor-pointer text-blue-500"
            onClick={() => toggleFolder(file.path)}
          />
        ) : (
          <File size={16} className="text-gray-600" />
        )}
        <span>{file.name}</span>
        {file.type === "file" && file.download_url && (
          <Button
            size="xs"
            variant="outline"
            onClick={() => window.open(file.download_url!, "_blank")}
            className="ml-auto text-xs"
          >
            Open
          </Button>
        )}
        {file.type === "dir" &&
          expandedFolders[file.path] &&
          file.children &&
          renderFiles(file.children, level + 1)}
      </div>
    ));
  };

  const selectRepo = async (repo: Repo) => {
    setSelectedRepo(repo);
    const files = await fetchRepoContents(repo.full_name);
    setRepoFiles(files);
    setExpandedFolders({});
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto p-0 ">
        <div className="sticky top-0 z-20 bg-white border-b px-6 py-4 flex justify-between items-start">
          <div>
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold text-[#E93F3F]">
                Your GitHub Repositories
              </DialogTitle>
              <DialogDescription>
                Browse and select one of your repositories
              </DialogDescription>
              <div className="flex flex-col sm:flex-row gap-4 py-4">
                <div className="relative flex-1">
                  <Search
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                    size={18}
                  />
                  <Input
                    placeholder="Search repositories..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Tabs defaultValue="all" onValueChange={setLanguage}>
                  <TabsList className="grid grid-cols-3 w-[300px]">
                    <TabsTrigger value="all">All</TabsTrigger>
                    <TabsTrigger value="JavaScript">JS</TabsTrigger>
                    <TabsTrigger value="TypeScript">TS</TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
              <p className="text-sm text-gray-500">
                Displaying {filteredRepos.length} of {repos.length} repos
                {hasMore ? "" : " (End of Repos)"}
              </p>
            </DialogHeader>
          </div>
          <Button variant="ghost" className="text-gray-500 hover:text-gray-800 p-2" onClick={onClose}>
            <Lock size={20} />
          </Button>
        </div>

        <div ref={containerRef} className="overflow-y-auto max-h-[70vh] px-6 py-4 flex flex-col gap-4">
          {filteredRepos.map((repo) => (
            <div
              key={repo.id}
              onClick={() => selectRepo(repo)}
              className={`border rounded-lg p-4 cursor-pointer transition hover:scale-[1.01] ${
                selectedRepo?.id === repo.id
                  ? "border-[#E93F3F] shadow-[0_0_0_1px_#E93F3F,0_6px_15px_rgba(233,63,63,0.2)] bg-[#fff0f0]"
                  : repo.private
                  ? "border-red-400"
                  : "hover:border-[#E93F3F] hover:shadow-md"
              }`}
            >
              <div className="flex justify-between items-start gap-4">
                <div className="flex-1">
                  <div className="flex gap-2 items-center">
                    <h3 className="font-semibold text-lg">{repo.name}</h3>
                    {repo.private && <Lock size={16} className="text-red-500" />}
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    {repo.description || "No description"}
                  </p>
                  <div className="flex justify-between items-center text-xs mt-3">
                    <span className="flex items-center gap-1">
                      <Code size={12} /> {repo.language || "Unknown"}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock size={12} /> Updated {new Date(repo.updated_at).toLocaleDateString()}
                    </span>
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Star size={14} className="text-yellow-400" />
                    {repo.stargazers_count}
                  </div>
                  <Button
                    size="sm"
                    className="bg-[#E93F3F] hover:bg-[#d03636] text-white"
                    onClick={() => window.open(repo.html_url, "_blank")}
                  >
                    Open Repo
                  </Button>
                </div>
              </div>

              {/* Files */}
              {selectedRepo?.id === repo.id && repoFiles.length > 0 && (
                <div className="mt-4 border-t pt-2 text-sm text-gray-600">
                  <p className="font-semibold mb-1">Files & Folders:</p>
                  {renderFiles(repoFiles)}
                </div>
              )}
            </div>
          ))}

          {loading && <p className="text-center py-4">Loading...</p>}

          {filteredRepos.length === 0 && !loading && (
            <p className="text-center text-gray-500 py-6">No repositories found</p>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DisplayRepo;
