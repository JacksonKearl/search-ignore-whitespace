import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
	context.subscriptions.push(vscode.commands.registerTextEditorCommand('search-ignore-whitespace.searchIgnoreWhitespace', (editor) => {
		const selection = editor.selection
		if (selection) {
			vscode.commands.executeCommand('workbench.action.findInFiles',
				{
					isRegex: true,
					query: editor.document.getText(new vscode.Range(selection.start, selection.end))
						.trim()
						.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&')
						.replace(/\W+/g, '\\W+'),
				});
		}
	}))
}