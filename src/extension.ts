// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
//import * as vscode from 'vscode';
//import fs = require('fs');
//import path = require('path');

const vscode = require('vscode');
import { FolderStructure, ProjectConfig, ProjectFolder } from './interfaces';

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
   		const folderStructure = config.get('folderStructure');

		// Process the folder structure configuration
		if (folderStructure.projects) {
			Object.keys(folderStructure.default.projects).forEach(projectName => {
			   const projectConfig = folderStructure.projects[projectName];
			   // Process the project configuration as needed
			});
		 }

		// Prompt user to select a project
		//const selectedProject = await vscode.window.showQuickPick(Object.keys(config.projects), {
		//	placeHolder: 'Select project structure'
		//});


		// Check if a workspace is open
		if (!vscode.workspace.workspaceFolders || vscode.workspace.workspaceFolders.length === 0) {
			vscode.window.showErrorMessage('No workspace is open. Please open a folder or workspace.');
			return;
		}		

	});

	//context.subscriptions.push(disposable);
//}

// This method is called when your extension is deactivated
//export function deactivate() {}
