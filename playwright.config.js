
module.exports = {

    timeout: 30000,  
    retries: 1,  
    
    use: {
      headless: false,  
      video: 'on-first-retry', 
      screenshot: 'only-on-failure', 
      trace: 'on-first-retry', 
    },

    testDir: './tests',   
    reporter: [
      ['html', { open: 'always' }],  
      ['json', { outputFile: 'test-results.json' }] 
    ],
    workers: process.env.CI ? 2 : undefined, 
    
    contextOptions: {
      viewport: { width: 1280, height: 720 },  
      ignoreHTTPSErrors: true,  
    },
  };
  