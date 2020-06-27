// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');
const path = require('path');

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

    // Use the console to output diagnostic information (console.log) and errors (console.error)
    // This line of code will only be executed once when your extension is activated
    console.log('Congratulations, your extension "LanguageHelper" is now active!');


    // The command has been defined in the package.json file
    // Now provide the implementation of the command with  registerCommand
    // The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('languagehelper.start',
		() => {

        const supportedLanguages = ['Python', 'C', 'JavaScript'];

        const panel = vscode.window.createWebviewPanel(
            'lngHelper',
            'Language Helper',
			vscode.ViewColumn.One, 
			{}
		);

		// Get path to resource on disk
		const onDiskPath = vscode.Uri.file(
			path.join(context.extensionPath, 'index.html')
		);

		// And get the special URI to use with the webview
		const welcomeSrc = panel.webview.asWebviewUri(onDiskPath);
		
		// Set panel's html to local file
		panel.webview.html = getWebviewContent(welcomeSrc);
		
		//selecting a language
		selectLanguage(supportedLanguages);

        // Display a message box to the user
        vscode.window.showInformationMessage('LanguageHelper');
    });

    context.subscriptions.push(disposable);
}

function selectLanguage(supportedLanguages) {
	//populate dropdown
	for (let i = 0; i < supportedLanguages.length; i++) {
		let dropdown = document.getElementById('languages');
		dropdown.createElement('option');
		option.text = supportedLanguages[i];
		dropdown.add(option);
	}

	//redirect to challenge
	// document.getElementById('go').addEventListener('click', () => {

	// });
}

exports.activate = activate;

// This method is called when your extension is deactivated
function deactivate() {}

module.exports = {
    activate,
    deactivate
}