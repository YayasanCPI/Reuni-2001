const fs = require('fs');
let content = fs.readFileSync('components/Sponsorship.tsx', 'utf-8');

const search = `          <a 
            href="#" 
            onClick={(e) => { e.preventDefault(); alert('Link download proposal akan segera tersedia.'); }}
            className="inline-flex items-center gap-2 bg-navy-900 text-paper-200 px-8 py-4 font-serif font-bold hover:bg-navy-800 transition-colors shadow-[4px_4px_0px_#8c7d66]"
          >
            <FileText className="w-5 h-5" />
            Download PDF Proposal Sponsorship
          </a>`;

const replace = `          <a 
            href={data?.sponsorshipProposalUrl || "#"} 
            target={data?.sponsorshipProposalUrl ? "_blank" : "_self"}
            rel="noopener noreferrer"
            onClick={(e) => { if (!data?.sponsorshipProposalUrl) { e.preventDefault(); alert('Link download proposal belum tersedia.'); } }}
            className="inline-flex items-center gap-2 bg-navy-900 text-paper-200 px-8 py-4 font-serif font-bold hover:bg-navy-800 transition-colors shadow-[4px_4px_0px_#8c7d66]"
          >
            <FileText className="w-5 h-5" />
            Download PDF Proposal Sponsorship
          </a>`;

if (content.includes(search)) {
  content = content.replace(search, replace);
  fs.writeFileSync('components/Sponsorship.tsx', content);
} else {
  console.log("Could not find search string in components/Sponsorship.tsx");
}
