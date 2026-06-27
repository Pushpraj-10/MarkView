export interface MarkdownTemplateProps {
  body: string;
  markdownCssUri: string;
  toolbarCssUri: string;
  scriptUri: string;
  nonce: string;
  cspSource: string;
  fileName?: string;
}

export function buildMarkdownTemplate({
  body,
  markdownCssUri,
  toolbarCssUri,
  scriptUri,
  nonce,
  cspSource,
  fileName = 'Preview',
}: MarkdownTemplateProps): string {
  return `
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8">

      <meta
        http-equiv="Content-Security-Policy"
        content="
          default-src 'none';
          img-src ${cspSource} https: data:;
          style-src ${cspSource} 'unsafe-inline';
          script-src 'nonce-${nonce}';
          font-src ${cspSource};
        "
      />

      <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0"
      />

      <link
        rel="stylesheet"
        href="${markdownCssUri}"
      />

      <link
        rel="stylesheet"
        href="${toolbarCssUri}"
      />

      <title>${fileName}</title>
    </head>

    <body>
      <div
        class="topbar"
        data-filename="${fileName}"
      >
        <div class="topbar-left">
          <span class="filename">
          </span>
        </div>

        <div class="topbar-actions">
          <button id="edit-button">
            Edit
          </button>
        </div>
      </div>

      <main class="content">
        <article class="markdown-body">
          ${body}
        </article>
      </main>

      <script
        nonce="${nonce}"
        src="${scriptUri}"
      ></script>
    </body>
  </html>
  `;
}