import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import type { SavedCareerRecord, RecommendationResult } from '../types';

export const generatePdf = async (
  userName: string,
  savedCareers: SavedCareerRecord[],
  recommendations: RecommendationResult[],
  hasTakenAssessment: boolean
) => {
  const doc = new jsPDF();

  const assessmentScoreStr = hasTakenAssessment ? '100%' : '0%';

  let logoBase64 = '';
  try {
    const response = await fetch('/logo.png');
    const blob = await response.blob();
    logoBase64 = await new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.readAsDataURL(blob);
    });
  } catch (err) {
    console.error('Could not load logo for PDF', err);
  }

  // Add Title
  if (logoBase64) {
    doc.addImage(logoBase64, 'PNG', 14, 12, 12, 12);
    doc.setFontSize(22);
    doc.setTextColor(30, 41, 59); // slate-800
    doc.text('SkillHive Digital', 30, 22);
  } else {
    doc.setFontSize(22);
    doc.setTextColor(30, 41, 59); // slate-800
    doc.text('SkillHive Digital', 14, 22);
  }

  doc.setFontSize(16);
  doc.setTextColor(71, 85, 105); // slate-600
  doc.text('Personal Career Report', 14, 32);

  // Student Details
  doc.setFontSize(12);
  doc.setTextColor(15, 23, 42); // slate-900
  doc.text(`Student: ${userName}`, 14, 44);
  doc.text(`Assessment Completion: ${assessmentScoreStr}`, 14, 52);
  doc.text(`Generated On: ${new Date().toLocaleDateString()}`, 14, 60);

  // Section: Recommended Careers
  let finalY = 70;

  if (recommendations && recommendations.length > 0) {
    doc.setFontSize(14);
    doc.setTextColor(15, 23, 42);
    doc.text('Recommended Careers', 14, finalY);

    const recData = recommendations.map(rec => [
      rec.career.title,
      rec.career.category,
      `${rec.matchPercentage}%`,
      rec.career.requiredSkills.slice(0, 4).join(', ') +
        (rec.career.requiredSkills.length > 4 ? '...' : ''),
    ]);

    (autoTable as any)(doc, {
      startY: finalY + 6,
      head: [['Career Title', 'Category', 'Match %', 'Key Skills Required']],
      body: recData,
      theme: 'grid',
      headStyles: { fillColor: [16, 185, 129] }, // emerald-500
      styles: { fontSize: 10, cellPadding: 4 },
    });

    finalY = (doc as any).lastAutoTable.finalY + 14;
  }

  // Section: Saved Careers
  if (savedCareers && savedCareers.length > 0) {
    doc.setFontSize(14);
    doc.setTextColor(15, 23, 42);
    doc.text('Saved Careers', 14, finalY);

    const savedData = savedCareers.map(sc => [
      sc.career.title,
      sc.career.category,
      sc.career.requiredSkills.slice(0, 4).join(', ') +
        (sc.career.requiredSkills.length > 4 ? '...' : ''),
    ]);

    (autoTable as any)(doc, {
      startY: finalY + 6,
      head: [['Career Title', 'Category', 'Key Skills Required']],
      body: savedData,
      theme: 'grid',
      headStyles: { fillColor: [59, 130, 246] }, // blue-500
      styles: { fontSize: 10, cellPadding: 4 },
    });
  }

  doc.save('career-report.pdf');
};
