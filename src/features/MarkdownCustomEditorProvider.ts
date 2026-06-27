import * as vscode from 'vscode';

import { MarkdownRenderer } from './MarkdownRenderer';
import { WebviewBuilder } from '../webview/WebviewBuilder';
import { MarkdownMessageHandler } from './MarkdownMessageHandler';

export class MarkdownCustomEditorProvider
    implements vscode.CustomReadonlyEditorProvider {
    private readonly renderer =
        new MarkdownRenderer();

    constructor(
        private readonly extensionUri: vscode.Uri,
    ) { }

    async openCustomDocument(
        uri: vscode.Uri,
    ): Promise<vscode.CustomDocument> {
        return {
            uri,
            dispose() { },
        };
    }

    async resolveCustomEditor(
        document: vscode.CustomDocument,
        webviewPanel: vscode.WebviewPanel,
    ): Promise<void> {
        webviewPanel.webview.options = {
            enableScripts: true,
        };

        const builder =
            new WebviewBuilder(
                this.extensionUri,
            );

        const update = async () => {
            const bytes =
                await vscode.workspace.fs.readFile(
                    document.uri,
                );

            const markdown =
                Buffer.from(bytes).toString(
                    'utf8',
                );

            const html =
                this.renderer.render(
                    markdown,
                );

            webviewPanel.webview.html =
                builder.build(
                    webviewPanel.webview,
                    html,
                    builder.getFileName(
                        document.uri,
                    ),
                );
        };

        await update();

        const messageHandler =
            new MarkdownMessageHandler(
                document,
            );

        webviewPanel.webview.onDidReceiveMessage(
            async (message) => {
                await messageHandler.handle(
                    message,
                );
            },
        );

        const changeSubscription =
            vscode.workspace.onDidChangeTextDocument(
                async (event) => {
                    if (
                        event.document.uri.toString() !==
                        document.uri.toString()
                    ) {
                        return;
                    }

                    await update();
                },
            );

        webviewPanel.onDidDispose(() => {
            changeSubscription.dispose();
        });


    }
}