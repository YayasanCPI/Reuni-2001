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
import Footer from './components/Footer';
import AudioPlayer from './components/AudioPlayer';
import BackgroundDecorations from './components/BackgroundDecorations';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-paper-500 font-sans text-navy-900 selection:bg-paper-300">
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
        <Gallery />
        <RSVP />
      </main>
      <Footer />
    </div>
  );
};

export default LandingPage;
