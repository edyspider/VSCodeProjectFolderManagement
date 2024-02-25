// interfaces.ts
interface Subfolder {
   name: string;
   subfolders?: string[];
}

interface ProjectFolder {
   name: string;
   subfolders?: Subfolder[] | string[];
}

interface ProjectConfig {
   folders?: ProjectFolder[];
}

interface FolderStructure {
   projects?: Record<string, ProjectConfig>;
}
 
 export { FolderStructure, ProjectConfig, ProjectFolder, Subfolder };