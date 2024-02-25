import * as vscode from 'vscode';
import { FolderStructure, ProjectConfig, ProjectFolder, Subfolder  } from './folderStructure.interfaces';

export class FolderStructureSettings {
    private static projectSettingsLabel = 'vsCodeProjectFolderManagement';
    private static showLogSettingsLabel = 'vsCodeProjectFolderManagement.showDetailedLog';
    private static folderStructureLabel = 'folderStructure';

    /**
     * Get vscode extension configuration
     * @returns WorkspaceConfiguration
     */
    public static GetConfiguration(): vscode.WorkspaceConfiguration {
        return vscode.workspace.getConfiguration(this.projectSettingsLabel);
    }

    /**
     * Get Show Detailed Log configuration
     * @returns Boolean
     */
    public static ShowDetailedLog(): boolean {
        return Boolean(vscode.workspace.getConfiguration().get(this.showLogSettingsLabel));
    }

    /**
     * Get folder structure configuration
     * @returns FolderStructure
     */
    public static GetFolderStructureConfig(): FolderStructure {
        return this.GetConfiguration().get(this.folderStructureLabel) as FolderStructure;
    }

    /**
     * List all projects available in the configuration
     * @returns String[]
     */
    public static GetProjectList(): string[] {
        return Object.keys(this.GetFolderStructureConfig().projects || {});
    }

    /**
     * Access the configuration of the selected project
     * @param selectedProject 
     * @returns 
     */
    public static GetProjectStructure(selectedProject: string): ProjectConfig | undefined {
        const folderStructure = this.GetFolderStructureConfig();
        if (folderStructure.projects) {
            return folderStructure.projects[selectedProject];
        } else {
            return undefined;
        }
    }

    public static GetRootPath(): string {
        const rootPath = vscode.workspace.rootPath;
        return String(rootPath);
    }
}