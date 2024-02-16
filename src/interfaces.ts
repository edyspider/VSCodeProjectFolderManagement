// interfaces.ts
interface ProjectFolder {
    name: string;
    subfolders?: string[];
 }
 
 interface ProjectConfig {
    folders?: ProjectFolder[];
 }
 
 interface FolderStructure {
    projects?: Record<string, ProjectConfig>;
 }
 
 export { FolderStructure, ProjectConfig, ProjectFolder };