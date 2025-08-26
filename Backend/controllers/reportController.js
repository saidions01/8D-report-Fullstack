import { google } from 'googleapis';

export const saveReport = async (req, res) => {
  try {
    const data = req.body;

   const auth = new google.auth.GoogleAuth({
  credentials: JSON.parse(process.env.GOOGLE_CREDENTIALS_JSON),
  scopes: ["https://www.googleapis.com/auth/spreadsheets"],
});


    const client = await auth.getClient();
    const sheets = google.sheets({ version: "v4", auth: client });

    const spreadsheetId = process.env.SPREADSHEET_ID; // ✅ from .env
    if (!spreadsheetId) {
      throw new Error("SPREADSHEET_ID is not defined in .env");
    }
    const {
      teamMembers,
      remedyName,
      remedyResponsibility,
      remedyVerification,
      remedyVerificationEnd,
      remedyValidation,
      remedyValidationEnd,
      remedyDocumentation,
      analysisMethod,
      analysisResponsibility,
      nonDetectionCause,
      occurrenceCause,
      otherCause,
      analysisDocumentation,
      measureName,
      measureNotes,
      measureCause,
      measureResponsibility,
      measureCompletionDate,
      implementationName,
      implementationNotes,
      implementationCause,
      implementationResponsibility,
      implementationDate,
      validationDate,
      implementationDocumentation,
      preventionAction,
      preventionCause,
      preventionResponsibility,
      preventionCompleted,
      preventionCompletionDate,
      preventionDocumentation,
      reportStatus,
      temporaryMeasuresRemoved,
      reportStartDate,
      reportCompletionDate,
      feedback,
      nextSteps,
    } = req.body;
 const teamMembersString = teamMembers
      .map(m => `${m.name} (${m.role}, ${m.title}, ${m.contact})`)
      .join("; ");


       // Prepare row data in correct order
    const row = [
      teamMembersString,
      remedyName,
      remedyResponsibility,
      remedyVerification,
      remedyVerificationEnd,
      remedyValidation,
      remedyValidationEnd,
      remedyDocumentation,
      analysisMethod,
      analysisResponsibility,
      nonDetectionCause,
      occurrenceCause,
      otherCause || "",
      analysisDocumentation,
      measureName,
      measureNotes || "",
      measureCause,
      measureResponsibility,
      measureCompletionDate,
      implementationName,
      implementationNotes || "",
      implementationCause,
      implementationResponsibility,
      implementationDate,
      validationDate,
      implementationDocumentation,
      preventionAction,
      preventionCause,
      preventionResponsibility,
      preventionCompleted ? "Yes" : "No",
      preventionCompletionDate,
      preventionDocumentation,
      reportStatus,
      temporaryMeasuresRemoved ? "Yes" : "No",
      reportStartDate,
      reportCompletionDate,
      feedback,
      nextSteps || "",
    ];

    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: "F1!A:Z", 
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values: [row]
      }
    });

    res.status(200).json({ message: "Report saved successfully" });
  } catch (error) {
    console.error("Error saving report:", error);
    res.status(500).json({ error: error.message });
  }
};
