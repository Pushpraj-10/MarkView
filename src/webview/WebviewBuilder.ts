import * as path from 'node:path';
import * as vscode from 'vscode';

import { createNonce } from '../shared/utils/nonce.util.js';
import { getWebviewUri } from '../shared/utils/uri.util.js';
import { buildMarkdownTemplate } from './templates/markdown.template.js';

export class WebviewBuilder {
  constructor(
    private readonly extensionUri: vscode.Uri,
  ) {}

  build(
    webview: vscode.Webview,
    html: string,
    fileName = 'Preview',
  ): string {
    const nonce = createNonce();

    const markdownCssUri =
      getWebviewUri(
        webview,
        this.extensionUri,
        'src',
        'webview',
        'assets',
        'markdown.css',
      );

    const toolbarCssUri =
      getWebviewUri(
        webview,
        this.extensionUri,
        'src',
        'webview',
        'assets',
        'toolbar.css',
      );

    const scriptUri =
      getWebviewUri(
        webview,
        this.extensionUri,
        'src',
        'webview',
        'assets',
        'main.js',
      );

    return buildMarkdownTemplate({
      body: html,
      markdownCssUri:
        markdownCssUri.toString(),
      toolbarCssUri:
        toolbarCssUri.toString(),
      scriptUri:
        scriptUri.toString(),
      nonce,
      cspSource:
        webview.cspSource,
      fileName,
    });
  }

  getFileName(
    uri: vscode.Uri,
  ): string {
    return path.basename(
      uri.fsPath,
    );
  }
}