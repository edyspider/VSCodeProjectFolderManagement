// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');
import { FolderManagement } from './folderManagement';

// Use the console to output diagnostic information (console.log) and errors (console.error)
// This line of code will only be executed once when your extension is activated
console.log('Congratulations, your extension "VSCodeProjectFolderManagement" is now active!');

// The command has been defined in the package.json file
// Now provide the implementation of the command with registerCommand
// The commandId parameter must match the command field in package.json
vscode.commands.registerCommand('vscodeprojectfoldermanagement.createProjectFolderStructure', async () => {
	const folderMgt = new FolderManagement();
	folderMgt.createProjectStructure();
});