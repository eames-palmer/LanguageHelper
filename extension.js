// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

    console.log('Congratulations, your extension "LanguageHelper" is now active!');

    let disposable = vscode.commands.registerCommand('languagehelper.start',
        () => {

            const panel = vscode.window.createWebviewPanel(
                'lngHelper',
                'Language Helper',
                vscode.ViewColumn.One, {
                    enableScripts: true
                }
            );

            panel.webview.html = `<!DOCTYPE html> 
		<html>
			<head>
				<title>LanguageHelper</title>
				<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
			<style>
				.column div {
					background-color: lightblue;
					padding: 10px;
					border-radius: 5px;
					margin-top: 10px;
					color: black;
					width: 10vw;
					text-align: center;
					transition: opacity .2s;
				}

				.column div:hover {
					opacity: 0.8;
					cursor: pointer;
				}
				
				.column {
					display: flex;
					flex-direction: column;
				}
				.row {
					display: flex;
					flex-direction: row;
				}
			</style>
			</head>
			<body>
				<h1>Welcome!</h1>
				<h2>Select a language and topic</h2>
				
	
			<div class="row">
					<select id="lang">
						<option value="python">Python</option>
						<option value="javascript">JavaScript</option>
						<option value="java">Java</option>
						<option value="c">C</option>
					</select>
					<select id="topic">
						<option value="print">Print Statements</option>
						<option value="if">If Statements</option>
						<option value="vars">Variables</option>
						<option value="loops">Loops</option>
						<option value="functions">Functions</option>
						<option value="recursion">Recursions</option>
					</select>
					<button id="go">Go</button>
				</div>
				<script>
					(function() {
						const vscode = acquireVsCodeApi();

						document.getElementById('go').addEventListener('click',
							() => {
							let topic = document.getElementById('topic').value;
							let language = document.getElementById('lang').value;
							vscode.postMessage({
								lang: language,
								topic: topic
							});
						});
					}())
				</script>
			</body>
		</html>`;

            panel.webview.onDidReceiveMessage(message => {
                console.log(message.topic);
                console.log(message.lang);
                vscode.window.showInformationMessage("You chose " +
                    message.lang + " " + message.topic);
                redirect(message);
            });

            function redirect(choices) {
                switch (choices.lang) {
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