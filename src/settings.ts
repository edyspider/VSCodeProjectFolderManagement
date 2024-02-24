export class Settings {
    private static folderStructureConfigPath = 'vsCodeProjectFolderManagement.folderStructure';


    public static GetFolderStructureConfigPath(): string {
        return this.folderStructureConfigPath;
    }
}