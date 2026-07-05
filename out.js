import { jsx, jsxs } from "react/jsx-runtime";
import React, { useState } from "react";
import { useAuth } from "./contexts/AuthContext";
import { useContent } from "./contexts/ContentContext";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./lib/firebase";
import { LogOut, Save, Plus, Trash2 } from "lucide-react";
const Admin = () => {
  const { user, loading: authLoading, signOut } = useAuth();
  const { data, updateData, loading: dataLoading } = useContent();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [formData, setFormData] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  React.useEffect(() => {
    if (data && !formData) {
      setFormData(data);
    }
  }, [data, formData]);
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginError("");
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
      setLoginError(err.message || "Gagal login.");
    }
  };
  const handleSave = async () => {
    if (!formData) return;
    setIsSaving(true);
    try {
      await updateData(formData);
      alert("Data berhasil disimpan!");
    } catch (err) {
      alert("Gagal menyimpan data.");
      console.error(err);
    }
    setIsSaving(false);
  };
  if (authLoading || dataLoading) {
    return /* @__PURE__ */ jsx("div", { className: "min-h-screen flex items-center justify-center bg-paper-500 font-sans text-navy-900", children: "Loading..." });
  }
  if (!user) {
    return /* @__PURE__ */ jsx("div", { className: "min-h-screen flex flex-col items-center justify-center bg-paper-500 font-sans text-navy-900 px-4", children: /* @__PURE__ */ jsxs("div", { className: "bg-paper-200 p-8 rounded shadow-md border-2 border-navy-900 w-full max-w-md relative transform rotate-1", children: [
      /* @__PURE__ */ jsx("div", { className: "tape -top-4 left-1/2 -translate-x-1/2 w-24" }),
      /* @__PURE__ */ jsx("h2", { className: "text-3xl font-marker text-navy-900 mb-6 text-center transform -rotate-2", children: "Admin Login" }),
      loginError && /* @__PURE__ */ jsx("div", { className: "bg-red-100 text-red-600 p-3 mb-4 rounded text-sm font-bold border border-red-300", children: loginError }),
      /* @__PURE__ */ jsxs("form", { onSubmit: handleLogin, className: "space-y-4", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { className: "block text-sm font-bold text-navy-800 font-serif mb-1", children: "Email" }),
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "email",
              value: email,
              onChange: (e) => setEmail(e.target.value),
              className: "w-full px-4 py-2 bg-paper-100 border border-navy-900 focus:outline-none focus:ring-2 focus:ring-navy-500 font-sans",
              required: true
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { className: "block text-sm font-bold text-navy-800 font-serif mb-1", children: "Password" }),
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "password",
              value: password,
              onChange: (e) => setPassword(e.target.value),
              className: "w-full px-4 py-2 bg-paper-100 border border-navy-900 focus:outline-none focus:ring-2 focus:ring-navy-500 font-sans",
              required: true
            }
          )
        ] }),
        /* @__PURE__ */ jsx("button", { type: "submit", className: "w-full bg-navy-900 text-paper-200 py-3 font-serif font-bold shadow-[2px_2px_0px_#8c7d66] hover:bg-navy-800 mt-4", children: "Masuk" })
      ] })
    ] }) });
  }
  if (!formData) return null;
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-paper-500 font-sans text-navy-900 pb-20", children: [
    /* @__PURE__ */ jsxs("div", { className: "bg-navy-900 text-paper-200 py-4 px-6 flex justify-between items-center sticky top-0 z-50 shadow-md", children: [
      /* @__PURE__ */ jsx("h1", { className: "text-2xl font-marker", children: "Admin Panel Reuni" }),
      /* @__PURE__ */ jsxs("div", { className: "flex gap-4", children: [
        /* @__PURE__ */ jsxs(
          "button",
          {
            onClick: handleSave,
            disabled: isSaving,
            className: "flex items-center gap-2 bg-paper-200 text-navy-900 px-4 py-2 font-bold font-serif shadow-[2px_2px_0px_#8c7d66] hover:bg-paper-100 disabled:opacity-50",
            children: [
              /* @__PURE__ */ jsx(Save, { className: "w-4 h-4" }),
              " ",
              isSaving ? "Menyimpan..." : "Simpan"
            ]
          }
        ),
        /* @__PURE__ */ jsxs(
          "button",
          {
            onClick: signOut,
            className: "flex items-center gap-2 border border-paper-400 px-4 py-2 font-bold font-serif hover:bg-navy-800",
            children: [
              /* @__PURE__ */ jsx(LogOut, { className: "w-4 h-4" }),
              " Keluar"
            ]
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "max-w-4xl mx-auto px-4 mt-8 space-y-12", children: [
      /* @__PURE__ */ jsxs("section", { className: "bg-paper-200 p-6 shadow-md border-2 border-navy-900 relative", children: [
        /* @__PURE__ */ jsx("div", { className: "tape -top-3 -left-3 w-16 rotate-45" }),
        /* @__PURE__ */ jsx("h2", { className: "text-2xl font-marker mb-6", children: "Informasi Umum" }),
        /* @__PURE__ */ jsxs("div", { className: "grid md:grid-cols-2 gap-6", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "block text-sm font-bold text-navy-800 font-serif mb-1", children: "Judul Utama" }),
            /* @__PURE__ */ jsx("input", { type: "text", value: formData.heroTitle, onChange: (e) => setFormData({ ...formData, heroTitle: e.target.value }), className: "w-full px-3 py-2 bg-paper-100 border border-navy-900" })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "block text-sm font-bold text-navy-800 font-serif mb-1", children: "Sub Judul" }),
            /* @__PURE__ */ jsx("input", { type: "text", value: formData.heroSubtitle, onChange: (e) => setFormData({ ...formData, heroSubtitle: e.target.value }), className: "w-full px-3 py-2 bg-paper-100 border border-navy-900" })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "block text-sm font-bold text-navy-800 font-serif mb-1", children: "Tanggal Acara" }),
            /* @__PURE__ */ jsx("input", { type: "text", value: formData.eventDate, onChange: (e) => setFormData({ ...formData, eventDate: e.target.value }), className: "w-full px-3 py-2 bg-paper-100 border border-navy-900" })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "block text-sm font-bold text-navy-800 font-serif mb-1", children: "Waktu Countdown (Format ISO: YYYY-MM-DDTHH:mm:ss+07:00)" }),
            /* @__PURE__ */ jsx("input", { type: "text", value: formData.eventDateISO || "", onChange: (e) => setFormData({ ...formData, eventDateISO: e.target.value }), className: "w-full px-3 py-2 bg-paper-100 border border-navy-900" })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "block text-sm font-bold text-navy-800 font-serif mb-1", children: "Lokasi Singkat" }),
            /* @__PURE__ */ jsx("input", { type: "text", value: formData.eventLocation, onChange: (e) => setFormData({ ...formData, eventLocation: e.target.value }), className: "w-full px-3 py-2 bg-paper-100 border border-navy-900" })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "block text-sm font-bold text-navy-800 font-serif mb-1", children: "Google Apps Script Web App URL (Untuk RSVP)" }),
            /* @__PURE__ */ jsx("input", { type: "text", value: formData.googleSheetWebAppUrl || "", onChange: (e) => setFormData({ ...formData, googleSheetWebAppUrl: e.target.value }), className: "w-full px-3 py-2 bg-paper-100 border border-navy-900", placeholder: "https://script.google.com/macros/s/.../exec" })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "block text-sm font-bold text-navy-800 font-serif mb-1", children: "Biaya Kontribusi" }),
            /* @__PURE__ */ jsx("input", { type: "text", value: formData.contributionAmount, onChange: (e) => setFormData({ ...formData, contributionAmount: e.target.value }), className: "w-full px-3 py-2 bg-paper-100 border border-navy-900" })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "block text-sm font-bold text-navy-800 font-serif mb-1", children: "URL Musik Background (YouTube)" }),
            /* @__PURE__ */ jsx("input", { type: "text", value: formData.backgroundMusicUrl || "", onChange: (e) => setFormData({ ...formData, backgroundMusicUrl: e.target.value }), className: "w-full px-3 py-2 bg-paper-100 border border-navy-900", placeholder: "https://youtu.be/..." })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "md:col-span-2", children: [
            /* @__PURE__ */ jsx("label", { className: "block text-sm font-bold text-navy-800 font-serif mb-1", children: "Teks Tentang 1" }),
            /* @__PURE__ */ jsx("textarea", { value: formData.aboutText1, onChange: (e) => setFormData({ ...formData, aboutText1: e.target.value }), rows: 3, className: "w-full px-3 py-2 bg-paper-100 border border-navy-900" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "md:col-span-2", children: [
            /* @__PURE__ */ jsx("label", { className: "block text-sm font-bold text-navy-800 font-serif mb-1", children: "Teks Tentang 2" }),
            /* @__PURE__ */ jsx("textarea", { value: formData.aboutText2, onChange: (e) => setFormData({ ...formData, aboutText2: e.target.value }), rows: 3, className: "w-full px-3 py-2 bg-paper-100 border border-navy-900" })
          ] })
        ] })
      ] }),
      formData.forewords && /* @__PURE__ */ jsxs("section", { className: "bg-paper-200 p-6 shadow-md border-2 border-navy-900 relative", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-2xl font-marker mb-6", children: "Kata Pengantar" }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-8", children: [
          /* @__PURE__ */ jsxs("div", { className: "bg-paper-100 p-4 border border-navy-900", children: [
            /* @__PURE__ */ jsx("h3", { className: "font-serif font-bold text-lg mb-4 text-navy-800", children: "Pimpinan Alumni" }),
            /* @__PURE__ */ jsxs("div", { className: "grid md:grid-cols-2 gap-4", children: [
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("label", { className: "block text-xs font-bold font-serif mb-1", children: "Gelar / Jabatan" }),
                /* @__PURE__ */ jsx("input", { type: "text", value: formData.forewords.alumniHead.title, onChange: (e) => {
                  setFormData({ ...formData, forewords: { ...formData.forewords, alumniHead: { ...formData.forewords.alumniHead, title: e.target.value } } });
                }, className: "w-full px-3 py-2 bg-white border border-navy-900" })
              ] }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("label", { className: "block text-xs font-bold font-serif mb-1", children: "Nama" }),
                /* @__PURE__ */ jsx("input", { type: "text", value: formData.forewords.alumniHead.name, onChange: (e) => {
                  setFormData({ ...formData, forewords: { ...formData.forewords, alumniHead: { ...formData.forewords.alumniHead, name: e.target.value } } });
                }, className: "w-full px-3 py-2 bg-white border border-navy-900" })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "md:col-span-2", children: [
                /* @__PURE__ */ jsx("label", { className: "block text-xs font-bold font-serif mb-1", children: "URL Foto (Unsplash/Imgur dll)" }),
                /* @__PURE__ */ jsx("input", { type: "text", value: formData.forewords.alumniHead.photoUrl, onChange: (e) => {
                  setFormData({ ...formData, forewords: { ...formData.forewords, alumniHead: { ...formData.forewords.alumniHead, photoUrl: e.target.value } } });
                }, className: "w-full px-3 py-2 bg-white border border-navy-900" })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "md:col-span-2", children: [
                /* @__PURE__ */ jsx("label", { className: "block text-xs font-bold font-serif mb-1", children: "Pesan / Sambutan" }),
                /* @__PURE__ */ jsx("textarea", { value: formData.forewords.alumniHead.message, onChange: (e) => {
                  setFormData({ ...formData, forewords: { ...formData.forewords, alumniHead: { ...formData.forewords.alumniHead, message: e.target.value } } });
                }, rows: 4, className: "w-full px-3 py-2 bg-white border border-navy-900" })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "bg-paper-100 p-4 border border-navy-900", children: [
            /* @__PURE__ */ jsx("h3", { className: "font-serif font-bold text-lg mb-4 text-navy-800", children: "Ketua Pelaksana" }),
            /* @__PURE__ */ jsxs("div", { className: "grid md:grid-cols-2 gap-4", children: [
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("label", { className: "block text-xs font-bold font-serif mb-1", children: "Gelar / Jabatan" }),
                /* @__PURE__ */ jsx("input", { type: "text", value: formData.forewords.committeeHead.title, onChange: (e) => {
                  setFormData({ ...formData, forewords: { ...formData.forewords, committeeHead: { ...formData.forewords.committeeHead, title: e.target.value } } });
                }, className: "w-full px-3 py-2 bg-white border border-navy-900" })
              ] }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("label", { className: "block text-xs font-bold font-serif mb-1", children: "Nama" }),
                /* @__PURE__ */ jsx("input", { type: "text", value: formData.forewords.committeeHead.name, onChange: (e) => {
                  setFormData({ ...formData, forewords: { ...formData.forewords, committeeHead: { ...formData.forewords.committeeHead, name: e.target.value } } });
                }, className: "w-full px-3 py-2 bg-white border border-navy-900" })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "md:col-span-2", children: [
                /* @__PURE__ */ jsx("label", { className: "block text-xs font-bold font-serif mb-1", children: "URL Foto (Unsplash/Imgur dll)" }),
                /* @__PURE__ */ jsx("input", { type: "text", value: formData.forewords.committeeHead.photoUrl, onChange: (e) => {
                  setFormData({ ...formData, forewords: { ...formData.forewords, committeeHead: { ...formData.forewords.committeeHead, photoUrl: e.target.value } } });
                }, className: "w-full px-3 py-2 bg-white border border-navy-900" })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "md:col-span-2", children: [
                /* @__PURE__ */ jsx("label", { className: "block text-xs font-bold font-serif mb-1", children: "Pesan / Sambutan" }),
                /* @__PURE__ */ jsx("textarea", { value: formData.forewords.committeeHead.message, onChange: (e) => {
                  setFormData({ ...formData, forewords: { ...formData.forewords, committeeHead: { ...formData.forewords.committeeHead, message: e.target.value } } });
                }, rows: 4, className: "w-full px-3 py-2 bg-white border border-navy-900" })
              ] })
            ] })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("section", { className: "bg-paper-200 p-6 shadow-md border-2 border-navy-900 relative", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-2xl font-marker mb-6", children: "Narahubung / Panitia" }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
          formData.contacts.map((contact, idx) => /* @__PURE__ */ jsxs("div", { className: "flex gap-4 items-end", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex-1", children: [
              /* @__PURE__ */ jsx("label", { className: "block text-xs font-bold font-serif mb-1", children: "Nama" }),
              /* @__PURE__ */ jsx("input", { type: "text", value: contact.name, onChange: (e) => {
                const newContacts = [...formData.contacts];
                newContacts[idx].name = e.target.value;
                setFormData({ ...formData, contacts: newContacts });
              }, className: "w-full px-3 py-2 bg-paper-100 border border-navy-900" })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex-1", children: [
              /* @__PURE__ */ jsx("label", { className: "block text-xs font-bold font-serif mb-1", children: "No. Telp / WA" }),
              /* @__PURE__ */ jsx("input", { type: "text", value: contact.phone, onChange: (e) => {
                const newContacts = [...formData.contacts];
                newContacts[idx].phone = e.target.value;
                setFormData({ ...formData, contacts: newContacts });
              }, className: "w-full px-3 py-2 bg-paper-100 border border-navy-900" })
            ] }),
            /* @__PURE__ */ jsx("button", { onClick: () => {
              setFormData({ ...formData, contacts: formData.contacts.filter((_, i) => i !== idx) });
            }, className: "bg-red-500 text-white p-2 rounded mb-1 hover:bg-red-600", children: /* @__PURE__ */ jsx(Trash2, { className: "w-5 h-5" }) })
          ] }, idx)),
          /* @__PURE__ */ jsxs("button", { onClick: () => {
            setFormData({ ...formData, contacts: [...formData.contacts, { name: "", phone: "" }] });
          }, className: "flex items-center gap-2 text-navy-700 font-bold font-serif hover:text-navy-900", children: [
            /* @__PURE__ */ jsx(Plus, { className: "w-4 h-4" }),
            " Tambah Narahubung"
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("section", { className: "bg-paper-200 p-6 shadow-md border-2 border-navy-900 relative", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-2xl font-marker mb-6", children: "Rekening Pembayaran" }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
          formData.bankAccounts.map((bank, idx) => /* @__PURE__ */ jsxs("div", { className: "flex gap-4 items-end", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex-1", children: [
              /* @__PURE__ */ jsx("label", { className: "block text-xs font-bold font-serif mb-1", children: "Bank" }),
              /* @__PURE__ */ jsx("input", { type: "text", value: bank.bank, onChange: (e) => {
                const newBanks = [...formData.bankAccounts];
                newBanks[idx].bank = e.target.value;
                setFormData({ ...formData, bankAccounts: newBanks });
              }, className: "w-full px-3 py-2 bg-paper-100 border border-navy-900", placeholder: "Misal: BCA" })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex-1", children: [
              /* @__PURE__ */ jsx("label", { className: "block text-xs font-bold font-serif mb-1", children: "Nomor" }),
              /* @__PURE__ */ jsx("input", { type: "text", value: bank.number, onChange: (e) => {
                const newBanks = [...formData.bankAccounts];
                newBanks[idx].number = e.target.value;
                setFormData({ ...formData, bankAccounts: newBanks });
              }, className: "w-full px-3 py-2 bg-paper-100 border border-navy-900" })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex-1", children: [
              /* @__PURE__ */ jsx("label", { className: "block text-xs font-bold font-serif mb-1", children: "Atas Nama" }),
              /* @__PURE__ */ jsx("input", { type: "text", value: bank.name, onChange: (e) => {
                const newBanks = [...formData.bankAccounts];
                newBanks[idx].name = e.target.value;
                setFormData({ ...formData, bankAccounts: newBanks });
              }, className: "w-full px-3 py-2 bg-paper-100 border border-navy-900" })
            ] }),
            /* @__PURE__ */ jsx("button", { onClick: () => {
              setFormData({ ...formData, bankAccounts: formData.bankAccounts.filter((_, i) => i !== idx) });
            }, className: "bg-red-500 text-white p-2 rounded mb-1 hover:bg-red-600", children: /* @__PURE__ */ jsx(Trash2, { className: "w-5 h-5" }) })
          ] }, idx)),
          /* @__PURE__ */ jsxs("button", { onClick: () => {
            setFormData({ ...formData, bankAccounts: [...formData.bankAccounts, { bank: "", number: "", name: "" }] });
          }, className: "flex items-center gap-2 text-navy-700 font-bold font-serif hover:text-navy-900", children: [
            /* @__PURE__ */ jsx(Plus, { className: "w-4 h-4" }),
            " Tambah Rekening"
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("section", { className: "bg-paper-200 p-6 shadow-md border-2 border-navy-900 relative", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-2xl font-marker mb-6", children: "Detail Jadwal Acara (Pagi, Sore, Minggu)" }),
        /* @__PURE__ */ jsx("div", { className: "space-y-4", children: /* @__PURE__ */ jsxs("div", { className: "bg-paper-100 p-4 border border-navy-900 relative", children: [
          /* @__PURE__ */ jsx("p", { className: "text-xs font-serif text-navy-700 mb-2", children: "Edit format JSON di bawah untuk mengubah jadwal Pagi, Sore, dan Minggu. Harap pastikan format JSON valid." }),
          /* @__PURE__ */ jsx(
            "textarea",
            {
              value: JSON.stringify(formData.detailedSchedule, null, 2),
              onChange: (e) => {
                try {
                  const parsed = JSON.parse(e.target.value);
                  setFormData({ ...formData, detailedSchedule: parsed });
                } catch (err) {
                }
              },
              rows: 15,
              className: "w-full px-3 py-2 bg-white border border-navy-900 font-mono text-sm",
              children: " "
            }
          )
        ] }) })
      ] }),
      /* @__PURE__ */ jsxs("section", { className: "bg-paper-200 p-6 shadow-md border-2 border-navy-900 relative", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-2xl font-marker mb-6", children: "Anggaran (Budget)" }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
          formData.budgetItems?.map((item, idx) => /* @__PURE__ */ jsxs("div", { className: "bg-paper-100 p-4 border border-navy-900 relative pr-10", children: [
            /* @__PURE__ */ jsx("button", { onClick: () => {
              setFormData({ ...formData, budgetItems: formData.budgetItems?.filter((_, i) => i !== idx) });
            }, className: "absolute top-2 right-2 text-red-500 hover:text-red-700", children: /* @__PURE__ */ jsx(Trash2, { className: "w-5 h-5" }) }),
            /* @__PURE__ */ jsxs("div", { className: "grid md:grid-cols-2 gap-4", children: [
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("label", { className: "block text-xs font-bold font-serif mb-1", children: "Kategori" }),
                /* @__PURE__ */ jsx("input", { type: "text", value: item.category, onChange: (e) => {
                  const newItems = [...formData.budgetItems || []];
                  newItems[idx].category = e.target.value;
                  setFormData({ ...formData, budgetItems: newItems });
                }, className: "w-full px-3 py-2 bg-white border border-navy-900" })
              ] }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("label", { className: "block text-xs font-bold font-serif mb-1", children: "Jumlah" }),
                /* @__PURE__ */ jsx("input", { type: "text", value: item.amount, onChange: (e) => {
                  const newItems = [...formData.budgetItems || []];
                  newItems[idx].amount = e.target.value;
                  setFormData({ ...formData, budgetItems: newItems });
                }, className: "w-full px-3 py-2 bg-white border border-navy-900" })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "md:col-span-2", children: [
                /* @__PURE__ */ jsx("label", { className: "block text-xs font-bold font-serif mb-1", children: "Keterangan Tambahan" }),
                /* @__PURE__ */ jsx("input", { type: "text", value: item.details, onChange: (e) => {
                  const newItems = [...formData.budgetItems || []];
                  newItems[idx].details = e.target.value;
                  setFormData({ ...formData, budgetItems: newItems });
                }, className: "w-full px-3 py-2 bg-white border border-navy-900" })
              ] })
            ] })
          ] }, idx)),
          /* @__PURE__ */ jsxs("button", { onClick: () => {
            setFormData({ ...formData, budgetItems: [...formData.budgetItems || [], { category: "", amount: "", details: "" }] });
          }, className: "flex items-center gap-2 text-navy-700 font-bold font-serif hover:text-navy-900", children: [
            /* @__PURE__ */ jsx(Plus, { className: "w-4 h-4" }),
            " Tambah Anggaran"
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("section", { className: "bg-paper-200 p-6 shadow-md border-2 border-navy-900 relative", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-2xl font-marker mb-6", children: "Linimasa (Timeline)" }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
          formData.timelineItems?.map((item, idx) => /* @__PURE__ */ jsxs("div", { className: "bg-paper-100 p-4 border border-navy-900 relative pr-10", children: [
            /* @__PURE__ */ jsx("button", { onClick: () => {
              setFormData({ ...formData, timelineItems: formData.timelineItems?.filter((_, i) => i !== idx) });
            }, className: "absolute top-2 right-2 text-red-500 hover:text-red-700", children: /* @__PURE__ */ jsx(Trash2, { className: "w-5 h-5" }) }),
            /* @__PURE__ */ jsxs("div", { className: "grid md:grid-cols-2 gap-4", children: [
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("label", { className: "block text-xs font-bold font-serif mb-1", children: "Fase / Tahap" }),
                /* @__PURE__ */ jsx("input", { type: "text", value: item.phase, onChange: (e) => {
                  const newItems = [...formData.timelineItems || []];
                  newItems[idx].phase = e.target.value;
                  setFormData({ ...formData, timelineItems: newItems });
                }, className: "w-full px-3 py-2 bg-white border border-navy-900" })
              ] }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("label", { className: "block text-xs font-bold font-serif mb-1", children: "Waktu" }),
                /* @__PURE__ */ jsx("input", { type: "text", value: item.time, onChange: (e) => {
                  const newItems = [...formData.timelineItems || []];
                  newItems[idx].time = e.target.value;
                  setFormData({ ...formData, timelineItems: newItems });
                }, className: "w-full px-3 py-2 bg-white border border-navy-900" })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "md:col-span-2", children: [
                /* @__PURE__ */ jsx("label", { className: "block text-xs font-bold font-serif mb-1", children: "Target / Output" }),
                /* @__PURE__ */ jsx("input", { type: "text", value: item.target, onChange: (e) => {
                  const newItems = [...formData.timelineItems || []];
                  newItems[idx].target = e.target.value;
                  setFormData({ ...formData, timelineItems: newItems });
                }, className: "w-full px-3 py-2 bg-white border border-navy-900" })
              ] })
            ] })
          ] }, idx)),
          /* @__PURE__ */ jsxs("button", { onClick: () => {
            setFormData({ ...formData, timelineItems: [...formData.timelineItems || [], { phase: "", time: "", target: "" }] });
          }, className: "flex items-center gap-2 text-navy-700 font-bold font-serif hover:text-navy-900", children: [
            /* @__PURE__ */ jsx(Plus, { className: "w-4 h-4" }),
            " Tambah Timeline"
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("section", { className: "bg-paper-200 p-6 shadow-md border-2 border-navy-900 relative", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-2xl font-marker mb-6", children: "Sponsorship" }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
          formData.sponsorshipPackages?.map((item, idx) => /* @__PURE__ */ jsxs("div", { className: "bg-paper-100 p-4 border border-navy-900 relative pr-10", children: [
            /* @__PURE__ */ jsx("button", { onClick: () => {
              setFormData({ ...formData, sponsorshipPackages: formData.sponsorshipPackages?.filter((_, i) => i !== idx) });
            }, className: "absolute top-2 right-2 text-red-500 hover:text-red-700", children: /* @__PURE__ */ jsx(Trash2, { className: "w-5 h-5" }) }),
            /* @__PURE__ */ jsxs("div", { className: "grid md:grid-cols-2 gap-4", children: [
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("label", { className: "block text-xs font-bold font-serif mb-1", children: "Nama Paket" }),
                /* @__PURE__ */ jsx("input", { type: "text", value: item.title, onChange: (e) => {
                  const newItems = [...formData.sponsorshipPackages || []];
                  newItems[idx].title = e.target.value;
                  setFormData({ ...formData, sponsorshipPackages: newItems });
                }, className: "w-full px-3 py-2 bg-white border border-navy-900" })
              ] }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("label", { className: "block text-xs font-bold font-serif mb-1", children: "Harga / Nilai" }),
                /* @__PURE__ */ jsx("input", { type: "text", value: item.price, onChange: (e) => {
                  const newItems = [...formData.sponsorshipPackages || []];
                  newItems[idx].price = e.target.value;
                  setFormData({ ...formData, sponsorshipPackages: newItems });
                }, className: "w-full px-3 py-2 bg-white border border-navy-900" })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "md:col-span-2", children: [
                /* @__PURE__ */ jsx("label", { className: "block text-xs font-bold font-serif mb-1", children: "Keuntungan (Pisahkan dengan Koma)" }),
                /* @__PURE__ */ jsx("textarea", { value: item.benefits.join(", "), onChange: (e) => {
                  const newItems = [...formData.sponsorshipPackages || []];
                  newItems[idx].benefits = e.target.value.split(",").map((s) => s.trim());
                  setFormData({ ...formData, sponsorshipPackages: newItems });
                }, rows: 3, className: "w-full px-3 py-2 bg-white border border-navy-900", children: " " })
              ] })
            ] })
          ] }, idx)),
          /* @__PURE__ */ jsxs("button", { onClick: () => {
            setFormData({ ...formData, sponsorshipPackages: [...formData.sponsorshipPackages || [], { title: "", price: "", benefits: [], color: "bg-slate-400 text-navy-900", borderColor: "border-slate-400" }] });
          }, className: "flex items-center gap-2 text-navy-700 font-bold font-serif hover:text-navy-900", children: [
            /* @__PURE__ */ jsx(Plus, { className: "w-4 h-4" }),
            " Tambah Paket Sponsorship"
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("section", { className: "bg-paper-200 p-6 shadow-md border-2 border-navy-900 relative", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-2xl font-marker mb-6", children: "Galeri Foto" }),
        /* @__PURE__ */ jsx("div", { className: "grid sm:grid-cols-2 gap-4 mb-4", children: formData.gallery.map((img, idx) => /* @__PURE__ */ jsxs("div", { className: "bg-paper-100 p-4 border border-navy-900 relative flex flex-col gap-2", children: [
          /* @__PURE__ */ jsx("button", { onClick: () => {
            setFormData({ ...formData, gallery: formData.gallery.filter((_, i) => i !== idx) });
          }, className: "absolute top-2 right-2 text-red-500 hover:text-red-700 bg-white/80 rounded p-1", children: /* @__PURE__ */ jsx(Trash2, { className: "w-4 h-4" }) }),
          /* @__PURE__ */ jsx("img", { src: img.src || void 0, alt: img.caption, className: "w-full h-32 object-cover border border-paper-400 mb-2" }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "block text-xs font-bold font-serif mb-1", children: "URL Foto (Unsplash/Imgur dll)" }),
            /* @__PURE__ */ jsx("input", { type: "text", value: img.src, onChange: (e) => {
              const newGal = [...formData.gallery];
              newGal[idx].src = e.target.value;
              setFormData({ ...formData, gallery: newGal });
            }, className: "w-full px-2 py-1 bg-white border border-navy-900 text-sm" })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "block text-xs font-bold font-serif mb-1", children: "Caption / Keterangan" }),
            /* @__PURE__ */ jsx("input", { type: "text", value: img.caption, onChange: (e) => {
              const newGal = [...formData.gallery];
              newGal[idx].caption = e.target.value;
              setFormData({ ...formData, gallery: newGal });
            }, className: "w-full px-2 py-1 bg-white border border-navy-900 text-sm" })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "block text-xs font-bold font-serif mb-1", children: "Rotasi Polaroid" }),
            /* @__PURE__ */ jsxs("select", { value: img.rot, onChange: (e) => {
              const newGal = [...formData.gallery];
              newGal[idx].rot = e.target.value;
              setFormData({ ...formData, gallery: newGal });
            }, className: "w-full px-2 py-1 bg-white border border-navy-900 text-sm", children: [
              /* @__PURE__ */ jsx("option", { value: "rotate-1", children: "Kanan 1 deg" }),
              /* @__PURE__ */ jsx("option", { value: "rotate-2", children: "Kanan 2 deg" }),
              /* @__PURE__ */ jsx("option", { value: "rotate-3", children: "Kanan 3 deg" }),
              /* @__PURE__ */ jsx("option", { value: "-rotate-1", children: "Kiri 1 deg" }),
              /* @__PURE__ */ jsx("option", { value: "-rotate-2", children: "Kiri 2 deg" }),
              /* @__PURE__ */ jsx("option", { value: "-rotate-3", children: "Kiri 3 deg" })
            ] })
          ] })
        ] }, idx)) }),
        /* @__PURE__ */ jsxs("button", { onClick: () => {
          setFormData({ ...formData, gallery: [...formData.gallery, { src: "https://images.unsplash.com/photo-1523580494112-071d16940a1c?q=80&w=2070&auto=format&fit=crop", caption: "Kenangan Baru", rot: "rotate-1" }] });
        }, className: "flex items-center gap-2 text-navy-700 font-bold font-serif hover:text-navy-900", children: [
          /* @__PURE__ */ jsx(Plus, { className: "w-4 h-4" }),
          " Tambah Foto"
        ] })
      ] })
    ] })
  ] });
};
export default Admin;
