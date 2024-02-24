// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
//import * as vscode from 'vscode';
import fs = require('fs');
import path = require('path');

const vscode = require('vscode');
import { FolderStructure, ProjectConfig, ProjectFolder } from './interfaces';
import { FolderManagement } from './folderManagement';

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
//export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "VSCodeProjectFolderManagement" is now active!');
	
	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	vscode.commands.registerCommand('vscodeprojectfoldermanagement.manageFolderStructure', async () => {
		const config = vscode.workspace.getConfiguration('vsCodeProjectFolderManagement');
   		//const folderStructure = config.get('folderStructure');

		// Prompt user to select a project
		const selectedProject = await vscode.window.showQuickPick(Object.keys(config.folderStructure.projects), {
			placeHolder: 'Select project structure'
		});

		// If the user cancels the selection, do nothing
		if (!selectedProject) {
			vscode.window.showInformationMessage(`Folder structure creation cancelled!`);
			return;
		}

		// Access the configuration of the selected project
		const selectedProjectConfig = config.folderStructure.projects[selectedProject] as ProjectConfig;

		// Process the selected project configuration
		if (selectedProjectConfig.folders) {
			// Get the root path of the current workspace
			const rootPath = vscode.workspace.rootPath;
			const folderMgt = new FolderManagement();

			selectedProjectConfig.folders.forEach(folder => {
				// Process each folder in the selected project	
				const folderName = folder.name;
				console.log(folderName);

				// Create the full path to the desired folder
   				const folderPath = path.join(rootPath, folderName);

				// Check if the folder exists
				folderMgt.checkAndOrCreateNewFolder(folderPath,folderName);

				if (folder.subfolders) {
					// Process subfolders if available
					console.log(folder.subfolders);

					for (var i = 0, len = folder.subfolders.length; i < len; i++) {
						let name = folder.subfolders[i];
					}

					folder.subfolders.forEach(subFolderName => {
						console.log(subFolderName);
						
						const splitSubForm = subFolderName.split('/(\/)/');
						let countSplit = 0;
						if (splitSubForm) {
							splitSubForm.forEach(split => {
								if (countSplit === 0) {
									const subFolderPath = path.join(rootPath, folderName, split);
									// Check if the subfolder exists
									folderMgt.checkAndOrCreateNewFolder(subFolderPath,subFolderName);
								} else {
									const subFolderPath = path.join(rootPath, folderName,splitSubForm[0], split);
									// Check if the subfolder exists
									folderMgt.checkAndOrCreateNewFolder(subFolderPath,subFolderName);
								}

								countSplit =+ 1;
							});
						}

						if (!subFolderName.includes('/[\/]/')) {
							const subFolderPath = path.join(rootPath, folderName,subFolderName);

							// Check if the subfolder exists
							folderMgt.checkAndOrCreateNewFolder(subFolderPath,subFolderName);
						} 
						if (subFolderName.includes('/[\/]/')) {
							vscode.window.showInformationMessage(`..Working on subfolder: '${subFolderName}'.`);
							const subFolderArray: string[] = [];
							//subFolderArray.push(folderName);

							subFolderName.split("/[\/]/").forEach(subItem => {
								subFolderArray.push(subItem);
							});
							vscode.window.showInformationMessage(`..Working on subfolder: '${subFolderArray.toString()}'.`);

							const subFoldersNumber = subFolderArray.length;
							let subFoldersPath;
							switch(subFoldersNumber) {
								case 0:
									subFoldersPath = path.join(folderName, subFolderArray[0]);
									// Check if the subfolder exists
									if (!fs.existsSync(subFoldersPath)) {
										// If the folder doesn't exist, create it
										fs.mkdirSync(subFoldersPath);

										vscode.window.showInformationMessage(`Subfolder '${subFoldersPath}' created successfully.`);
									} else {
										vscode.window.showInformationMessage(`Subfolder '${subFoldersPath}' already exists.`);
									}
									break;
								case 1:
									subFoldersPath = path.join(folderName, subFolderArray[0], subFolderArray[1]);
									// Check if the subfolder exists
									if (!fs.existsSync(subFoldersPath)) {
										// If the folder doesn't exist, create it
										fs.mkdirSync(subFoldersPath);

										vscode.window.showInformationMessage(`Subfolder '${subFoldersPath}' created successfully.`);
									} else {
										vscode.window.showInformationMessage(`Subfolder '${subFoldersPath}' already exists.`);
									}
									break;
								case 2:
									subFoldersPath = path.join(folderName, subFolderArray[0], subFolderArray[1], subFolderArray[2]);
									// Check if the subfolder exists
									if (!fs.existsSync(subFoldersPath)) {
										// If the folder doesn't exist, create it
										fs.mkdirSync(subFoldersPath);

										vscode.window.showInformationMessage(`Subfolder '${subFoldersPath}' created successfully.`);
									} else {
										vscode.window.showInformationMessage(`Subfolder '${subFoldersPath}' already exists.`);
									}
									break;
								case 3:
									subFoldersPath = path.join(folderName, subFolderArray[0], subFolderArray[1], subFolderArray[2], subFolderArray[3]);
									// Check if the subfolder exists
									if (!fs.existsSync(subFoldersPath)) {
										// If the folder doesn't exist, create it
										fs.mkdirSync(subFoldersPath);

										vscode.window.showInformationMessage(`Subfolder '${subFoldersPath}' created successfully.`);
									} else {
										vscode.window.showInformationMessage(`Subfolder '${subFoldersPath}' already exists.`);
									}
									break;
								case 4:
									subFoldersPath = path.join(folderName, subFolderArray[0], subFolderArray[1], subFolderArray[2], subFolderArray[3], subFolderArray[4]);
									// Check if the subfolder exists
									if (!fs.existsSync(subFoldersPath)) {
										// If the folder doesn't exist, create it
										fs.mkdirSync(subFoldersPath);

										vscode.window.showInformationMessage(`Subfolder '${subFoldersPath}' created successfully.`);
									} else {
										vscode.window.showInformationMessage(`Subfolder '${subFoldersPath}' already exists.`);
									}
									break;								
							}
						}
					});
				}
			});
		}

		vscode.window.showInformationMessage(`Folder structure for '${selectedProject}' processed successfully!`);
	});

	//context.subscriptions.push(disposable);
//}

// This method is called when your extension is deactivated
//export function deactivate() {}
