import { jsPDF } from "jspdf";

export const downloadReport = (title, content) => {
  const doc = new jsPDF();

  // Header
  doc.setFont("helvetica", "bold");
  doc.setFontSize(22);
  doc.text(title, 20, 20);

  // Date
  doc.setFont("helvetica", "normal");
  doc.setFontSize(11);
  doc.text(
    `Generated on: ${new Date().toLocaleString()}`,
    20,
    30
  );

  // Divider
  doc.line(20, 35, 190, 35);

  // Content
  doc.setFontSize(12);

  const lines = doc.splitTextToSize(content, 170);

  doc.text(lines, 20, 45);

  doc.save(
    `${title.replace(/\s+/g, "_")}.pdf`
  );
};