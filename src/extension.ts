import * as vscode from 'vscode';

import { registerFeatures } from './features';

export function activate(
  context: vscode.ExtensionContext,
) {
  registerFeatures(context);
}

export function deactivate() {}