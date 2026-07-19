import React, { useState, useEffect } from 'react';
import { collection, onSnapshot, query, where, orderBy } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { Users, User, MapPin } from 'lucide-react';

const AttendeeList = () => {
  const [attendees, setAttendees] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Only fetch attendees who said 'yes'
    const q = query(
      collection(db, 'attendees'),
      where('attendance', '==', 'yes')
    );
    
    const unsubscribe = onSnapshot(q, (snapshot) => {
      // Sort in memory to avoid needing a composite index immediately
      const attendeesData = snapshot.docs
        .map(doc => ({ id: doc.id, ...doc.data() }))
        .sort((a: any, b: any) => {
          const timeA = a.createdAt?.toMillis ? a.createdAt.toMillis() : 0;
          const timeB = b.createdAt?.toMillis ? b.createdAt.toMillis() : 0;
          return timeB - timeA;
        });
      setAttendees(attendeesData);
      setLoading(false);
    }, (error) => {
      console.error("Error fetching attendees:", error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <section className="py-16 px-6 bg-paper-500 relative">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <div className="bg-navy-900 text-paper-200 p-4 inline-block mb-4 transform -rotate-2">
            <Users className="w-8 h-8" />
          </div>
          <h2 className="text-3xl md:text-4xl font-marker text-navy-900">Peserta Konfirmasi Hadir</h2>
          <p className="text-navy-700 font-serif mt-2">Daftar teman-teman yang sudah memastikan hadir.</p>
        </div>

        {loading ? (
          <div className="text-center py-10 text-navy-600 font-serif">
            Memuat daftar peserta...
          </div>
        ) : attendees.length === 0 ? (
          <div className="text-center py-10 bg-paper-200 border-2 border-navy-900 shadow-[4px_4px_0px_#142030] p-6 max-w-lg mx-auto transform rotate-1">
            <p className="font-serif text-navy-800">Belum ada peserta yang konfirmasi hadir.</p>
            <p className="text-sm text-navy-600 mt-2">Jadilah yang pertama untuk mendaftar!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {attendees.map((attendee) => (
              <div key={attendee.id} className="bg-paper-100 border border-navy-900 p-4 shadow-[2px_2px_0px_#142030] flex gap-4 items-start hover:translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[4px_4px_0px_#142030] transition-all">
                <div className="w-12 h-12 bg-navy-100 border border-navy-900 rounded-full flex items-center justify-center flex-shrink-0 overflow-hidden">
                  <User className="w-6 h-6 text-navy-700" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-navy-900 truncate" title={attendee.name}>
                    {attendee.nickname || attendee.name}
                  </h3>
                  <div className="flex flex-col gap-1 mt-1">
                    <span className="inline-flex px-2 py-0.5 bg-rose-100 text-rose-900 border border-rose-200 text-[10px] font-bold uppercase tracking-wider w-fit">
                      {attendee.class || 'Alumni'}
                    </span>
                    {attendee.city && (
                      <span className="flex items-center gap-1 text-xs text-navy-600 font-serif truncate">
                        <MapPin className="w-3 h-3" />
                        {attendee.city}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default AttendeeList;
