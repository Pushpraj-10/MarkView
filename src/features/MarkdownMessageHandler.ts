import * as vscode from 'vscode';

export class MarkdownMessageHandler {
  constructor(
    private readonly document:
      vscode.CustomDocument,
  ) {}

  async handle(
    message: {
      command: string;
    },
  ): Promise<void> {
    switch (message.command) {
      case 'openSource':
        await vscode.commands.executeCommand(
          'vscode.openWith',
          this.document.uri,
          'default',
        );
        break;
    }
  }
}