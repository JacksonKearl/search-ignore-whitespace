import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {

	let disposable = vscode.commands.registerTextEditorCommand('search-ignore-whitespace.searchIgnoreWhitespace', (editor) => {
		const selection = editor.selection;
		if (selection) {
			const rawText = editor.document.getText(new vscode.Range(selection.start, selection.end));
			const regexTransformed = rawText
			.trim()
			.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&')
			.replace(/\W+/g, '\\W+');

			vscode.commands.executeCommand('workbench.action.findInFiles', {query: regexTransformed, isRegex: true});
		}
	});

	context.subscriptions.push(disposable);
}

export function deactivate() {}
