const fs = require('fs');
let content = fs.readFileSync('contexts/ContentContext.tsx', 'utf-8');

const interfaceSearch = `  sponsorshipPackages?: SponsorshipPackage[];`;
const interfaceReplace = `  sponsorshipPackages?: SponsorshipPackage[];\n  sponsorshipProposalUrl?: string;`;

const defaultDataSearch = `  sponsorshipPackages: [\n    {\n      title: "Platinum",`;
const defaultDataReplace = `  sponsorshipProposalUrl: "",\n  sponsorshipPackages: [\n    {\n      title: "Platinum",`;

if (content.includes(interfaceSearch)) {
  content = content.replace(interfaceSearch, interfaceReplace);
}

if (content.includes(defaultDataSearch)) {
  content = content.replace(defaultDataSearch, defaultDataReplace);
}

fs.writeFileSync('contexts/ContentContext.tsx', content);
