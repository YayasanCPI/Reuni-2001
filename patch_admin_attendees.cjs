const fs = require('fs');
let content = fs.readFileSync('Admin.tsx', 'utf-8');

const importSearch = `import { auth } from './lib/firebase';`;
const importReplace = `import { auth, db } from './lib/firebase';\nimport { collection, query, onSnapshot, orderBy } from 'firebase/firestore';`;

const stateSearch = `  const [isSaving, setIsSaving] = useState(false);`;
const stateReplace = `  const [isSaving, setIsSaving] = useState(false);\n  const [attendees, setAttendees] = useState<any[]>([]);`;

const effectSearch = `  // Initialize form data when data loads`;
const effectReplace = `  React.useEffect(() => {
    if (!user) return;
    const q = query(collection(db, 'attendees'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const attendeesData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setAttendees(attendeesData);
    });
    return () => unsubscribe();
  }, [user]);

  // Initialize form data when data loads`;

const uiSearch = `        {/* General Settings */}`;
const uiReplace = `        {/* Attendees List */}
        <section className="bg-paper-200 p-6 shadow-md border-2 border-navy-900 relative">
          <h2 className="text-2xl font-marker mb-6">Daftar Peserta Konfirmasi</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse border border-navy-900 bg-white">
              <thead>
                <tr className="bg-paper-400">
                  <th className="border border-navy-900 p-2 font-serif">Nama</th>
                  <th className="border border-navy-900 p-2 font-serif">Panggilan</th>
                  <th className="border border-navy-900 p-2 font-serif">Angkatan/Kelas</th>
                  <th className="border border-navy-900 p-2 font-serif">Domisili</th>
                  <th className="border border-navy-900 p-2 font-serif">Pekerjaan</th>
                  <th className="border border-navy-900 p-2 font-serif">Kehadiran</th>
                </tr>
              </thead>
              <tbody>
                {attendees.map(a => (
                  <tr key={a.id} className="hover:bg-paper-100">
                    <td className="border border-navy-900 p-2">{a.name}</td>
                    <td className="border border-navy-900 p-2">{a.nickname}</td>
                    <td className="border border-navy-900 p-2">{a.class}</td>
                    <td className="border border-navy-900 p-2">{a.city}</td>
                    <td className="border border-navy-900 p-2">{a.job}</td>
                    <td className="border border-navy-900 p-2">{a.attendance}</td>
                  </tr>
                ))}
                {attendees.length === 0 && (
                  <tr>
                    <td colSpan={6} className="border border-navy-900 p-4 text-center text-navy-600 font-serif">Belum ada peserta yang mengkonfirmasi kehadiran.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>

        {/* General Settings */}`;

if (content.includes(importSearch) && content.includes(stateSearch) && content.includes(effectSearch) && content.includes(uiSearch)) {
  content = content.replace(importSearch, importReplace);
  content = content.replace(stateSearch, stateReplace);
  content = content.replace(effectSearch, effectReplace);
  content = content.replace(uiSearch, uiReplace);
  fs.writeFileSync('Admin.tsx', content);
  console.log('Admin.tsx patched successfully');
} else {
  console.log('Failed to patch Admin.tsx');
  if (!content.includes(importSearch)) console.log('Import search failed');
  if (!content.includes(stateSearch)) console.log('State search failed');
  if (!content.includes(effectSearch)) console.log('Effect search failed');
  if (!content.includes(uiSearch)) console.log('UI search failed');
}
