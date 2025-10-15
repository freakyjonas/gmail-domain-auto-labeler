function autoSortGmailBySenderDomainBatch() {
  const batchSize = 500; // Number of threads to process per run
  const userProperties = PropertiesService.getUserProperties();
  
  let startIndex = parseInt(userProperties.getProperty('startIndex')) || 0;
  
  Logger.log(`--- Starting batch processing from index ${startIndex} ---`);
  
  const inboxThreads = GmailApp.getInboxThreads(startIndex, batchSize);
  if (inboxThreads.length === 0) {
    Logger.log("✅ All threads have been processed. Processing complete.");
    userProperties.deleteProperty('startIndex'); // Reset for next full run
    return;
  }
  
  const domainThreadMap = new Map();
  const newlyCreatedLabels = [];
  const foundDomainEndings = new Set();
  
  inboxThreads.forEach(thread => {
    const messages = thread.getMessages();
    const sender = messages[0].getFrom();
    const emailMatch = sender.match(/<(.+?)>/);
    const email = emailMatch ? emailMatch[1] : sender;
    const domain = email.split('@')[1]?.toLowerCase();
    if (!domain) return;
    
    // Extract domain extension (e.g., ".com", ".de", ".org")
    const domainEndingMatch = domain.match(/\.[a-z]{2,}$/);
    if (domainEndingMatch) {
      foundDomainEndings.add(domainEndingMatch[0]);
    }
    
    if (!domainThreadMap.has(domain)) {
      domainThreadMap.set(domain, []);
    }
    domainThreadMap.get(domain).push(thread);
  });
  
  domainThreadMap.forEach((threadsForDomain, domain) => {
    const safeLabelName = `domain_${domain.replace(/[^a-zA-Z0-9]/g, '_')}`;
    let label = GmailApp.getUserLabelByName(safeLabelName);
    if (!label) {
      label = GmailApp.createLabel(safeLabelName);
      newlyCreatedLabels.push(safeLabelName);
    }
    threadsForDomain.forEach(thread => {
      thread.addLabel(label);
    });
    Logger.log(`Label "${safeLabelName}" applied to ${threadsForDomain.length} threads.`);
  });
  
  Logger.log(`Newly created labels in this batch: ${newlyCreatedLabels.length > 0 ? newlyCreatedLabels.join(', ') : 'None'}`);
  Logger.log(`Found domain endings in this batch: ${Array.from(foundDomainEndings).join(', ') || 'None'}`);
  
  startIndex += inboxThreads.length;
  userProperties.setProperty('startIndex', startIndex);
  Logger.log(`Next batch will start at index: ${startIndex}`);
}
