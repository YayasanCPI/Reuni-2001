const fs = require('fs');
let content = fs.readFileSync('contexts/ContentContext.tsx', 'utf-8');

const interfaceSearch = `  sponsorshipProposalUrl?: string;`;
const interfaceReplace = `  sponsorshipProposalUrl?: string;\n  baseAttendeeCount?: number;`;

const defaultDataSearch = `  sponsorshipProposalUrl: "",`;
const defaultDataReplace = `  sponsorshipProposalUrl: "",\n  baseAttendeeCount: 45,`;

if (content.includes(interfaceSearch) && content.includes(defaultDataSearch)) {
  content = content.replace(interfaceSearch, interfaceReplace);
  content = content.replace(defaultDataSearch, defaultDataReplace);
  fs.writeFileSync('contexts/ContentContext.tsx', content);
  console.log("Patched ContentContext.tsx for counter");
} else {
  console.log("Could not patch ContentContext.tsx");
}
