import * as vscode from 'vscode';

import { VIEWS } from '../shared/constants/views';
import { MarkdownCustomEditorProvider } from './MarkdownCustomEditorProvider';

export function registerFeatures(
  context: vscode.ExtensionContext,
): void {
  const provider =
    new MarkdownCustomEditorProvider(
      context.extensionUri,
    );

  context.subscriptions.push(
    vscode.window.registerCustomEditorProvider(
      VIEWS.MARKDOWN_EDITOR,
      provider,
    ),
  );
}