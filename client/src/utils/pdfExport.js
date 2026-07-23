import jsPDF from "jspdf";

export const exportPDF = (title, content) => {

  const doc = new jsPDF();

  doc.setFontSize(20);
  doc.text(title, 20, 20);

  doc.setFontSize(12);

  const lines = doc.splitTextToSize(content, 170);

  doc.text(lines, 20, 40);

  doc.save(`${title}.pdf`);

};