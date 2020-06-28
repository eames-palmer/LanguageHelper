// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
    console.log('"LanguageHelper" is now active!');

    let disposable = vscode.commands.registerCommand('languagehelper.start',
        () => {
            const panel = vscode.window.createWebviewPanel(
                'lngHelper',
                'Language Helper',
                vscode.ViewColumn.One, {
                    enableScripts: true
                }
            );

            //html for main page
            panel.webview.html = `<!DOCTYPE html> 
		<html>
			<head>
				<title>LanguageHelper</title>
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

            // Recieves message and redirects
            panel.webview.onDidReceiveMessage(message => {
				if (message.lang && message.topic) {
					console.log(message.topic);
					console.log(message.lang);
                	//vscode.window.showInformationMessage("You chose " +
						//message.lang + " " + message.topic);
				}
                redirect(message, panel);
            });
        });

    context.subscriptions.push(disposable);
}

/**
 * Redirects the output of the message to create the correct file.
 * 
 * @param choices: contains the language and topic the user selected.
 * @param panel: the panel to be redirected to the new page.
 */
function redirect(choices, panel) {
	if (choices.done) {
		pythonPrintGame();
		return;
	}
	if (choices.errVal) {
		vscode.window.showInformationMessage("You found an error! ");
		return;
	}
    switch (choices.lang) {
        case 'python':
			switch(choices.topic){	
				case 'print':
					panel.webview.html = `
					<!DOCTYPE html>
					<html>
					<head>
						<title>Python Print Statements</title>
						<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
						<style>
							body {
								padding: 0px;
								margin: 0px;
								cursor: pointer;
							}
							code {
								border: 1px solid darkgray;
								display: block;
								padding: 10px;
								border-radius: 5px; 
								word-wrap: break-word;
								margin-left: 2.5vw;
								margin-right: 2.5vw;
								margin-top: 1vh;
							}
						</style>
					</head>
					<body>
					<pre>
					<code>
#Print statements are the greatest tool a developer has in their toolbox. Allowing for Testing and Debbuging in quick and efficient manner.

#This is how print statements can be handled in <chosenLanguage>.

print("Hello World!")

#You can also Concatenate objects/ put them together

print("Hello World!" + " Its a nice day today!")

#These can be variables, we'll come to variables later.

segment1 = "Hello World!"
segment2 = " Its a nice day today!"

print("Hello World!" + segment2)
print(segment1 + segment2)

#You can also print formatted Strings

segment1 = "Hello World!"
print(f"{segment1} Its a nice day today!")

#These can become very powerful tools to allow you to debug and test your code. These are just some of the ways print functions can be performed, but with this knowledge you are ready to get started.

#So lets try it out now. First can you catch our mistake.

print(<span class="error">"</span><span class="error">Hello World</span><span class="error">'</span>)

print(<span class="error">"helloworld"</span><span class="error"> </span>segment1)

<button class="done">Done</button>
					</code>
					</pre>
					<script>
					(function() {
						const vscode = acquireVsCodeApi();
						
						$(".done").on("click", function() {
							vscode.postMessage({
								done: 'done'
							});
						});

						$(".error").on("click", function() {
							vscode.postMessage({
								errVal: 'correct'
							});
						});

					}())
					</script>
					</body>
					</html>
					`;
					break;
				case 'if':
					panel.webview.html = `
					<!DOCTYPE html>
					<html>
					<head>
						<title>Python Print Statements</title>
						<style>
							body {
								padding: 0px;
								margin: 0px;
								cursor: pointer;
							}
							code {
								border: 1px solid darkgray;
								display: block;
								padding: 10px;
								border-radius: 5px; 
								word-wrap: break-word;
								margin-left: 2.5vw;
								margin-right: 2.5vw;
								margin-top: 1vh;
							}
						</style>
					</head>
					<body>
					<pre>
					<code>
animal = ["cats"]
animals = ["dogs", "cats", "bunny"]

if animal in animals:
	print(animal)

a = 10
b = 9
c = 5
d = 5

if a > b:
	print("a is greater than b")
elif a < b:
	print("b is greater than a")
else: 
	print("They are equal")

if a == b and c == d:
	print("a and b are equal. c and d are also equal")

if a == b or c == d:
	print("a and b are equal or c and d are equal")
					</code>
					</pre>
					</body>
					</html>
					`;
					break;
				case 'vars':
					break;
				case 'loops':
					break;
				case 'functions':
					break;
				case 'recursion':
					break;
				default:
					break;
			}
            break;
        case 'java':
            //TODO: Add java coding lessons.
            break;
        case 'javascript':
            //TODO: Add js coding lessons.
            break;
        case 'c':
            //TODO: Add C coding lessons.
            break;
        default:
            vscode.window.showErrorMessage("Something went wrong!");
            break;
    }
}

function pythonPrintGame(){
	const panel = vscode.window.createWebviewPanel(
		'lngHelper',
		'Python Print Game',
		vscode.ViewColumn.One, {
			enableScripts: true
		}
	);

	panel.webview.html = `
	<!DOCTYPE html>
	<html>
	<head>
		<title>Python Print Game</title>
		<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
		<style>
			#question2, .button2 {
				display: none;
			}
		</style>
	</head>
	<body>
	<pre>
	<code>
	
<span id="question1">Write some code to print out your Name:</span>

<span id="question2">Good Job! Now lets Concatenate some strings, your name and your favorite Fruit:</span>

<textarea id="userAttempt" rows="4" cols="50"></textarea>
<button class="button1">Submit</button>
<button class="button2">Submit</button>


	</code>
	</pre>
	<script>
	(function() {
		const vscode = acquireVsCodeApi();
		
		var question = 1.0;
		
		// const reg1 = /print\([\"\'].*[\"\']\)/i;
		// const reg2 = /print\([\"\'][A-z]+[\"\'] \+ [\"\'][A-z]+[\"\']\)/;
		
		$(".button1").on("click", function() {
			let input = $("#userAttempt").val();
			if (input.includes("print(") && input.includes(")")) {
				$("#question1").css({display:"none"});
				$("#question2").css({display:"block"});
				$(".button1").css({display:"none"});
				$(".button2").css({display:"block"});
				$("#userAttempt").val('');
			} 	else {
					vscode.postMessage({
						success: 'fail',
						userAns: input
					});
				}
		});
		$(".button2").on("click", function(){
			let input = $("#userAttempt").val();
			if (input.includes("print(") && input.includes(")") && input.includes("+")) {
				vscode.postMessage({
				 success: 'pass'
				});
			} else {
				vscode.postMessage({
					success: 'fail',
					userAns: input
				});
			}
		});	
	}())
	</script>
	</body>
	</html>
	`;

	panel.webview.onDidReceiveMessage(message => {
		if(message.success === 'pass'){
			message.lang = 'python';
			message.topic = 'if';
			vscode.window.showInformationMessage("Good Job! You can now move on to the Next Stage.");
			redirect(message, panel);
		} else {
			//vscode.window.showInformationMessage(message.userAns);
			vscode.window.showInformationMessage("Close, Try Again.");
		}
	});
}

exports.activate = activate;

/**
 * This method is called when your extension is deactivated
 */
function deactivate() {}

module.exports = {
    activate,
    deactivate
}