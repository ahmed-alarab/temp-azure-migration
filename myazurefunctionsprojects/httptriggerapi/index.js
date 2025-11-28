const { app } = require('@azure/functions');

// --- FUNCTION 1: HTTP TRIGGER (API ENDPOINT) ---
// Used by your React front-end (011-computers) to send/receive data.
app.http('HttpTriggerApi', {
    methods: ['GET', 'POST'],
    authLevel: 'anonymous', 
    handler: async (request, context) => {
        context.log('HTTP trigger function processed a request.');

        // Extracting data from URL query or request body
        const name = request.query.get('name') || (await request.text()).name || 'World';

        // --- SQL DATABASE INTEGRATION POINT ---
        // This is where the function securely connects to Azure SQL via the connection string 
        // retrieved from KeyVault to fulfill the request (e.g., placing an order).
        // ------------------------------------

        const responseMessage = `Hello, ${name}. This HTTP Trigger ran successfully. The React front-end receives this data.`;

        return { body: responseMessage };
    }
});


// --- FUNCTION 2: TIMER TRIGGER (SCHEDULED TASK) ---
// Used for automated tasks that run on a schedule (maintenance).
app.timer('TimerTriggerMaintenance', {
    // CRON Expression: '0 */30 * * * *' = Run every 30 minutes
    schedule: '0 */30 * * * *', 
    handler: async (myTimer, context) => {
        context.log('Timer trigger function initiated a scheduled task.');

        const timeStamp = new Date().toISOString();
        
        // --- SCHEDULED MAINTENANCE POINT ---
        // This is where the function executes database maintenance like:
        // - Deleting old session data.
        // - Generating daily summary reports.
        // ------------------------------------

        context.log(`[Scheduled Maintenance] Function executed successfully at: ${timeStamp}`);
    }
});
