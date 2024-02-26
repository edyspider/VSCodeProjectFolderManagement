import fs = require('fs');
import path = require('path');
import { FolderStructureSettings } from './folderStructure.settings';
import { ProjectConfig, ProjectFolder, Subfolder  } from './folderStructure.interfaces';

const vscode = require('vscode');

export class FolderManagement {

    declare useDetailLog: boolean;
    
    /**
     * Create folder structure for a pre-define (selected) project.
     * @returns 
     */
    async createProjectStructure() {
        const folderStructure = FolderStructureSettings.GetFolderStructureConfig();
        this.useDetailLog = FolderStructureSettings.ShowDetailedLog();

        // Check if exists folder structure and projects configured, otherwise do nothing 
        if (!folderStructure || !folderStructure.projects) {
            vscode.window.showErrorMessage('No project structures found in configuration.');
            return;
        }

        // List all projects available in the configuration
        const projectNames = FolderStructureSettings.GetProjectList();

        // Prompt user to select a project
		const selectedProject = await vscode.window.showQuickPick(projectNames, {
			placeHolder: 'Select project structure'
		});
        
        // If the user cancels the selection, do nothing
		if (!selectedProject) {
			vscode.window.showWarningMessage(`Folder structure creation cancelled!`);
			return;
		}

        // Access the configuration of the selected project
        const selectedProjectConfig = folderStructure.projects[selectedProject] as ProjectConfig;

        // Define the project root folder path
        const rootPath = FolderStructureSettings.GetRootPath();

        // Process the selected project configuration
		if (selectedProjectConfig.folders) {
            selectedProjectConfig.folders.forEach((folder: ProjectFolder) => {
               // Process each folder
               this.processFolder(folder, rootPath);
            });

            vscode.window.showInformationMessage(`Folder structure for '${selectedProject}' processed successfully!`);
         } else {
            vscode.window.showInformationMessage(`No folders found in the selected project: '${selectedProject}'!`);
        }
    }

    /**
     * Process a folder structure.
     * @param folder 
     * @param rootPath 
     */
    processFolder(folder: ProjectFolder, rootPath: string) {
        // Get folder name
        const folderName = folder.name;
        
        // Create the full path to the desired folder
        const folderPath = path.join(rootPath, folderName);

        // Check if the folder exists, if not create it
		this.checkAndOrCreateNewFolder(folderPath,folderName);

        // Check for subfolders and create if configured
        this.processSubfolder(folder,folderPath);
    }

    /**
     *  Process a subfolder structure.
     * @param folder 
     * @param rootPath 
     */
    processSubfolder(folder: ProjectFolder | Subfolder, rootPath: string) {
        if (folder.subfolders) { // string and subfolder
            let folderPath: string;

            if (typeof folder.subfolders === 'string') {
                // Create the full path to the desired folder
                folderPath = path.join(rootPath, folder.subfolders);

                // Check if the folder exists, if not create it
                this.checkAndOrCreateNewFolder(folderPath,folder.subfolders);
            } else {
                // Process subfolders if available
                folder.subfolders.forEach((subfolder: Subfolder | string) => {
                    if (typeof subfolder === 'string') {
                        // Create the full path to the desired folder
                        folderPath = path.join(rootPath, subfolder);

                        // Check if the folder exists, if not create it
                        this.checkAndOrCreateNewFolder(folderPath,subfolder);
                    } else {    
                        // Get subfolder name
                        const subfolderName = subfolder.name;
    
                        // Create the full path to the desired folder
                        folderPath = path.join(rootPath, subfolderName);
    
                        // Check if the folder exists, if not create it
                        this.checkAndOrCreateNewFolder(folderPath,subfolderName);

                        // Check for subfolders inside subfolder and create if configured
                        if (subfolder.subfolders) {
                            this.processSubfolder(subfolder,folderPath);
                        }
                    }
                });
            }
        }
    }

    /**
     * Verify if folder already exists, if not then create it.
     * @param folderPath 
     * @param folderName 
     */
    checkAndOrCreateNewFolder(folderPath: string, folderName: string = "") {
        if (!folderName) {
            folderName = folderPath;
        }

        // Check if the folder exists
        if (!fs.existsSync(folderPath)) {
            // If the folder doesn't exist, create it
            fs.mkdirSync(folderPath);

            if (this.useDetailLog) {
                console.log(`Creating folder '${folderName}' in path: '${folderPath}'`);
            }
        } else {
            if (this.useDetailLog) {
                console.log(`Folder '${folderName}' already exists in path: '${folderPath}'`);
            }
        }
    }
}