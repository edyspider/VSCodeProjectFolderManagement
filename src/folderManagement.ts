import fs = require('fs');
const vscode = require('vscode');

export class FolderManagement {
    
     
    createProjectFolderStructure(selectedProject: string) {
        // Get project folder structure settings
        const config = vscode.workspace.getConfiguration('vsCodeProjectFolderManagement');

    }

    checkAndOrCreateNewFolder(folderPath: string, folderName: string = "") {
        if (!folderName) {
            folderName = folderPath;
        }
        // Check if the folder exists
        if (!fs.existsSync(folderPath)) {
            // If the folder doesn't exist, create it
            fs.mkdirSync(folderPath);

            //vscode.window.createOutputChannel(`Folder '${folderName}' created successfully.`);
            vscode.window.showInformationMessage(`Folder '${folderName}' created successfully.`);
        } else {
            //vscode.window.createOutputChannel(`Folder '${folderName}' created successfully.`);
            vscode.window.showInformationMessage(`Folder '${folderName}' created successfully.`);
        }
    }
}