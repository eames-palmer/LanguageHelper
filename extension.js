// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');
//const path = require('path');

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

        const panel = vscode.window.createWebviewPanel(
            'lngHelper',
            'Language Helper',
			vscode.ViewColumn.One, 
			{
				enableScripts: true
			}
		);
	  

		panel.webview.html = `<!DOCTYPE html> 
		<html>
			<head>
				<title>LanguageHelper</title>
				<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
			<style>
				div {
					background-color: lightblue;
					padding: 10px;
					border-radius: 5px;
					margin-top: 10px;
					color: black;
					width: 10vw;
					text-align: center;
					transition: opacity .2s;
				}

				div:hover {
					opacity: 0.8;
					cursor: pointer;
				}
			</style>
			</head>
			<body>
				<h1>Welcome!</h1>
				<h2>Select a language</h2>
					
				<div id="python">Python</div>
				<div id="java">Java</div>
				<div id="javascript">JavaScript</div>
				<div id="c">C</div>

				<script>
					(function() {
						const vscode = acquireVsCodeApi();
						//vscode.postMessage({command: 'test',text: 'test'});
						$("div").on("click", function() {
							let choice = this.id;
							vscode.postMessage({
								text: choice
							});
						});
					}())
				</script>
			</body>
		</html>`;
		
		panel.webview.onDidReceiveMessage(message => {
			console.log(message.text);
			vscode.window.showInformationMessage("You chose " + message.text);
			redirect(message.text);
		});
		
		function redirect(lang) {
			switch(lang) {
				case 'python':
					
					break;
				case 'java':

					break;
				case 'javascript':
					
					break;
				case 'c':
					
					break;
				default:
					vscode.window.showErrorMessage("Something went wrong!");
					break;
			}
		}
	});
	
    context.subscriptions.push(disposable);
}

exports.activate = activate;

// This method is called when your extension is deactivated
function deactivate() {}

module.exports = {
    activate,
    deactivate
}