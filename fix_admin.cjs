const fs = require('fs');
let content = fs.readFileSync('Admin.tsx', 'utf-8');

const search = `  // Initialize form data when data loads
  React.useEffect(() => {
    if (data && !formData) {
      setFormData(data);
    }
  }, [data, formData]);`;

const replace = `  // Initialize form data when data loads
  React.useEffect(() => {
    if (data && !dataLoading && !formData) {
      setFormData(data);
    }
  }, [data, dataLoading, formData]);`;

if (content.includes(search)) {
  content = content.replace(search, replace);
  fs.writeFileSync('Admin.tsx', content);
  console.log("Admin.tsx updated!");
} else {
  console.log("Could not find the target string in Admin.tsx");
}
