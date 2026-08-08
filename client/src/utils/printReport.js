export const printReport = (title, content) => {
  const printWindow = window.open("", "_blank");

  printWindow.document.write(`
    <html>
      <head>
        <title>${title}</title>

        <style>

          body{
            font-family: Arial;
            padding:40px;
            line-height:1.7;
          }

          h1{
            color:#2563eb;
          }

          hr{
            margin:20px 0;
          }

          pre{
            white-space:pre-wrap;
            font-size:15px;
          }

        </style>

      </head>

      <body>

        <h1>${title}</h1>

        <p>
          Generated on:
          ${new Date().toLocaleString()}
        </p>

        <hr>

        <pre>${content}</pre>

      </body>

    </html>
  `);

  printWindow.document.close();

  printWindow.focus();

  printWindow.print();
};