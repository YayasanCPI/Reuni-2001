import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Forewords from './components/Forewords';
import About from './components/About';
import EventDetails from './components/EventDetails';
import Schedule from './components/Schedule';
import Timeline from './components/Timeline';
import Budget from './components/Budget';
import Sponsorship from './components/Sponsorship';
import Gallery from './components/Gallery';
import RSVP from './components/RSVP';
import AttendeeCounter from './components/AttendeeCounter';
import NostalgiaMessages from './components/NostalgiaMessages';
import Footer from './components/Footer';
import AudioPlayer from './components/AudioPlayer';
import BackgroundDecorations from './components/BackgroundDecorations';
import FloatingWhatsApp from './components/FloatingWhatsApp';
import WelcomeOverlay from './components/WelcomeOverlay';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-paper-500 font-sans text-navy-900 selection:bg-paper-300">
      <WelcomeOverlay />
      <Navbar />
      <AudioPlayer />
      <BackgroundDecorations />
      <main>
        <Hero />
        <Forewords />
        <About />
        <EventDetails />
        <Schedule />
        <Timeline />
        <Budget />
        <Sponsorship />
        <NostalgiaMessages />
        <Gallery />
        <AttendeeCounter />
        <RSVP />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
};

export default LandingPage;
