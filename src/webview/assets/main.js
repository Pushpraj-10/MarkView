const vscode = acquireVsCodeApi();

const editButton =
  document.getElementById(
    'edit-button',
  );

if (editButton) {
  editButton.addEventListener(
    'click',
    () => {
      vscode.postMessage({
        command: 'openSource',
      });
    },
  );
}