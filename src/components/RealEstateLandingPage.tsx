import React, { useState } from 'react';
import { AnimatedImage } from './AnimatedImage';
import { 
  Building, 
  Home, 
  Users, 
  CheckCircle2, 
  ArrowRight, 
  ChevronRight, 
  Phone, 
  Calendar as CalendarIcon, 
  Search, 
  Video, 
  Layers, 
  Send, 
  ShieldCheck, 
  TrendingUp, 
  MessageSquare, 
  Clock, 
  ArrowUpRight, 
  FileText, 
  CheckCircle, 
  Target, 
  MapPin, 
  AlertCircle, 
  Briefcase,
  DollarSign,
  ChevronLeft,
  X,
  Sparkles,
  Bot,
  Mail,
  MessageCircle,
  Cpu,
  Zap,
  BarChart3,
  Smartphone,
  CheckSquare,
  Activity,
  Share2
} from 'lucide-react';
import { PHONE_NUMBER } from '../data/contentData';

interface RealEstateLandingPageProps {
  onBackToMain: () => void;
  onBookClick: () => void;
  onFormSubmitted: (data: any) => void;
}

export const RealEstateLandingPage: React.FC<RealEstateLandingPageProps> = ({
  onBackToMain,
  onBookClick,
  onFormSubmitted
}) => {
  // Calendar & Form State
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    companyName: '',
    propertyType: 'Residential & Commercial',
    budget: '$5,000 - $10,000/mo',
    message: ''
  });

  const [activeAiDemo, setActiveAiDemo] = useState<'chatbot' | 'leadforms' | 'email' | 'clientagent'>('chatbot');
  const [selectedDay, setSelectedDay] = useState<number>(6);
  const [selectedSlot, setSelectedSlot] = useState<string>('10:00 AM');
  const [showMoreSlots, setShowMoreSlots] = useState(false);
  const currentMonth = 'August 2026';

  const daysInMonth = Array.from({ length: 31 }, (_, i) => i + 1);
  const initialSlots = ['09:00 AM', '10:00 AM', '11:30 AM', '02:00 PM', '03:30 PM'];
  const extraSlots = ['04:30 PM', '05:30 PM', '06:00 PM'];
  const displaySlots = showMoreSlots ? [...initialSlots, ...extraSlots] : initialSlots;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onFormSubmitted({
      ...formData,
      service: `Real Estate Client Acquisition (${formData.propertyType})`,
      selectedDate: `${currentMonth.split(' ')[0]} ${selectedDay}, ${currentMonth.split(' ')[1]}`,
      selectedTimeSlot: selectedSlot
    });
  };

  return (
    <div className="min-h-screen bg-[#121212] text-white font-sans selection:bg-[#9ce2c7] selection:text-black">
      
      {/* Top sticky header bar */}
      <header className="sticky top-0 z-40 bg-[#121212]/90 backdrop-blur-md border-b border-white/10 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={onBackToMain}
              className="inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-gray-300 hover:text-[#9ce2c7] transition-colors py-2 px-3 bg-white/5 hover:bg-white/10 rounded-full border border-white/10"
              id="re-back-to-main-btn"
            >
              <ChevronLeft className="w-4 h-4 text-[#9ce2c7]" />
              <span>Main Site</span>
            </button>

            <a 
              href="#re-hero" 
              className="text-xl sm:text-2xl font-extrabold tracking-tight text-white flex items-center space-x-1"
            >
              <span>DEON HOWARD</span>
              <span className="text-[#9ce2c7] font-normal mx-1">/</span>
              <span className="font-bold text-base tracking-normal text-[#9ce2c7]">REAL ESTATE PPC</span>
            </a>
          </div>

          <div className="flex items-center space-x-4">
            <a
              href={`tel:${PHONE_NUMBER.replace(/[^0-9]/g, '')}`}
              className="hidden md:flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-gray-300 hover:text-white transition-colors px-3 py-2"
            >
              <Phone className="w-3.5 h-3.5 text-[#9ce2c7]" />
              <span>{PHONE_NUMBER}</span>
            </a>

            <button
              onClick={onBookClick}
              id="re-header-book-btn"
              className="bg-[#9ce2c7] hover:bg-[#8bd6ba] text-black font-bold text-xs uppercase tracking-widest px-5 py-2.5 rounded-full transition-all duration-200 shadow-md flex items-center space-x-2 cursor-pointer transform hover:-translate-y-0.5"
            >
              <CalendarIcon className="w-3.5 h-3.5" />
              <span>Book Strategy Call</span>
            </button>
          </div>
        </div>
      </header>

      {/* SECTION 1: HERO SECTION */}
      <section id="re-hero" className="relative py-20 lg:py-28 overflow-hidden border-b border-white/10">
        {/* Subtle background glow & grid accent */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#9ce2c7]/10 rounded-full blur-3xl -z-10"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#9ce2c7]/5 rounded-full blur-3xl -z-10"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Copy Column */}
            <div className="lg:col-span-7 space-y-8">
              <div className="inline-flex items-center space-x-2 bg-white/10 text-[#9ce2c7] border border-[#9ce2c7]/30 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest">
                <Building className="w-4 h-4 text-[#9ce2c7]" />
                <span>Specialized Real Estate Client Acquisition</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.1]">
                Stop Chasing Leads. <br />
                <span className="text-[#9ce2c7]">Attract Buyers & Sellers</span> to Your Best Properties and Close More Deals.
              </h1>

              <p className="text-lg sm:text-xl text-gray-300 font-sans leading-relaxed max-w-2xl">
                Close more deals with a proven automated client acquisition system custom-engineered for real estate agents, brokers, wholesalers, and property managers.
              </p>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-3 sm:space-y-0 sm:space-x-4 pt-2">
                <button
                  onClick={onBookClick}
                  id="re-hero-book-call-btn"
                  className="bg-[#9ce2c7] hover:bg-[#8bd6ba] text-black font-bold uppercase tracking-widest text-xs px-8 py-4 rounded-full shadow-lg transition-all duration-200 cursor-pointer flex items-center justify-center space-x-2 transform hover:-translate-y-0.5"
                >
                  <CalendarIcon className="w-4 h-4" />
                  <span>Book Free Strategy Call</span>
                </button>

                <a
                  href="#re-solutions"
                  className="bg-white/10 hover:bg-white/15 text-white font-bold uppercase tracking-widest text-xs px-8 py-4 rounded-full border border-white/20 transition-all text-center"
                >
                  Explore Solutions
                </a>
              </div>

              {/* Verified Trust Tags */}
              <div className="pt-6 border-t border-white/10 grid grid-cols-3 gap-4 text-left">
                <div>
                  <p className="text-2xl font-extrabold text-[#9ce2c7]">10x+</p>
                  <p className="text-[11px] font-bold uppercase tracking-wider text-gray-400">Deal Pipeline ROI</p>
                </div>
                <div>
                  <p className="text-2xl font-extrabold text-white">0%</p>
                  <p className="text-[11px] font-bold uppercase tracking-wider text-gray-400">3rd Party Commission Fees</p>
                </div>
                <div>
                  <p className="text-2xl font-extrabold text-[#9ce2c7]">100%</p>
                  <p className="text-[11px] font-bold uppercase tracking-wider text-gray-400">Direct Exclusive Leads</p>
                </div>
              </div>
            </div>

            {/* Right Hero Visual Card */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-3xl overflow-hidden border border-white/10 shadow-2xl bg-[#1a1a1a]">
                <AnimatedImage
                  src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1000&q=80"
                  alt="Luxury Modern Architecture Real Estate"
                  className="w-full h-[420px] object-cover opacity-85"
                  wrapperClassName="w-full h-[420px]"
                  scale={false}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-[#121212]/40 to-transparent pointer-events-none"></div>

                {/* Floating Metric Badges */}
                <div className="absolute bottom-6 left-6 right-6 p-5 bg-[#121212]/90 backdrop-blur-md rounded-2xl border border-white/10 space-y-3">
                  <div className="flex items-center justify-between text-xs font-bold text-gray-300">
                    <span className="flex items-center space-x-1.5">
                      <Sparkles className="w-4 h-4 text-[#9ce2c7]" />
                      <span>Automated Pipeline Live</span>
                    </span>
                    <span className="bg-[#9ce2c7]/20 text-[#9ce2c7] px-2.5 py-0.5 rounded-full text-[10px] uppercase font-extrabold">Active</span>
                  </div>
                  <p className="text-lg font-bold text-white">
                    Direct Qualified Inquiries Generated Daily
                  </p>
                  <div className="flex items-center space-x-4 text-xs font-semibold text-gray-300 pt-1 border-t border-white/10">
                    <span className="text-[#9ce2c7] font-bold">✓ Direct Showings Scheduled</span>
                    <span>• No Zillow Fees</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION 2: ROI HIGHLIGHTS & PAIN POINTS ADDRESS */}
      <section className="py-20 bg-[#181818] border-b border-white/10 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
            <div className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#9ce2c7]">
              Average Real Estate ROI & Industry Reality Check
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              Tired of High Third-Party Fees & Unqualified Cold Leads?
            </h2>
            <p className="text-base text-gray-300 font-sans leading-relaxed">
              Whether you are trying to fill your first properties or rapidly scaling a multi-million dollar real estate portfolio, relying on traditional channels is draining your time and profit margins.
            </p>
          </div>

          {/* 4 Major Pain Points Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            <div className="bg-[#121212] p-6 rounded-2xl border border-rose-500/20 space-y-3 hover:border-rose-500/50 transition-colors">
              <div className="p-3 bg-rose-500/10 text-rose-400 rounded-xl w-fit">
                <AlertCircle className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white">Relying Only on Referrals</h3>
              <p className="text-xs text-gray-400 leading-relaxed font-sans">
                Referrals are great when they happen, but they leave your pipeline unpredictable with zero control over monthly volume.
              </p>
            </div>

            <div className="bg-[#121212] p-6 rounded-2xl border border-rose-500/20 space-y-3 hover:border-rose-500/50 transition-colors">
              <div className="p-3 bg-rose-500/10 text-rose-400 rounded-xl w-fit">
                <FileText className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white">Endless Email Chains</h3>
              <p className="text-xs text-gray-400 leading-relaxed font-sans">
                Sending cold email strings that get ignored, marked as spam, or take weeks to yield a single hesitant response.
              </p>
            </div>

            <div className="bg-[#121212] p-6 rounded-2xl border border-rose-500/20 space-y-3 hover:border-rose-500/50 transition-colors">
              <div className="p-3 bg-rose-500/10 text-rose-400 rounded-xl w-fit">
                <MessageSquare className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white">Social Groups & WhatsApp</h3>
              <p className="text-xs text-gray-400 leading-relaxed font-sans">
                Constantly posting in noisy Facebook groups or WhatsApp chats, chasing tire-kickers and unserious leads who waste hours of your day.
              </p>
            </div>

            <div className="bg-[#121212] p-6 rounded-2xl border border-rose-500/20 space-y-3 hover:border-rose-500/50 transition-colors">
              <div className="p-3 bg-rose-500/10 text-rose-400 rounded-xl w-fit">
                <DollarSign className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white">Third-Party Platform Fees</h3>
              <p className="text-xs text-gray-400 leading-relaxed font-sans">
                Paying exorbitant cuts and referral commissions to platforms like Airbnb, Zillow, or Realtor.com on every single deal you close.
              </p>
            </div>
          </div>

          {/* Deon Howard Solution Card */}
          <div className="bg-[#9ce2c7] text-[#121212] p-8 md:p-12 rounded-3xl shadow-xl flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="space-y-4 max-w-2xl">
              <div className="inline-flex items-center space-x-2 bg-black/10 text-black px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                <CheckCircle2 className="w-4 h-4 text-black" />
                <span>The Deon Howard PPC Difference</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-black leading-tight text-[#121212]">
                Own Your Client Acquisition Engine & Keep 100% of Your Profits
              </h3>
              <p className="text-sm sm:text-base text-[#1a2e24] font-medium leading-relaxed">
                Deon Howard PPC builds an automated client acquisition system designed specifically to source your own qualified leads, attract ideal buyers and tenants to your properties, get them signed up for bookings and showings, and close more deals consistently.
              </p>
            </div>

            <button
              onClick={onBookClick}
              className="bg-black hover:bg-gray-900 text-white font-bold uppercase tracking-widest text-xs px-8 py-4 rounded-full shadow-lg transition-all cursor-pointer shrink-0 border border-white/20 transform hover:-translate-y-0.5"
            >
              Build My Client Engine
            </button>
          </div>

        </div>
      </section>

      {/* SECTION 2-B & 3: WHO IT REACHES & RESIDENTIAL VS COMMERCIAL BENEFITS */}
      <section className="py-20 md:py-28 border-b border-white/10 bg-[#121212]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Who It Reaches Pill Badges */}
          <div className="text-center space-y-4 mb-16">
            <div className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#9ce2c7]">
              Target Audience Sourcing
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
              Who Your Custom System Will Reach
            </h2>
            <p className="text-gray-300 text-sm max-w-xl mx-auto font-sans">
              Precision targeting engineered to reach ready-to-act real estate prospects across all deal structures:
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
              <div className="bg-[#1a1a1a] border border-[#9ce2c7]/40 px-6 py-3 rounded-2xl flex items-center space-x-3 text-white font-bold text-sm shadow-md">
                <Home className="w-5 h-5 text-[#9ce2c7]" />
                <span>Qualified Renters</span>
              </div>
              <div className="bg-[#1a1a1a] border border-[#9ce2c7]/40 px-6 py-3 rounded-2xl flex items-center space-x-3 text-white font-bold text-sm shadow-md">
                <Users className="w-5 h-5 text-[#9ce2c7]" />
                <span>Motivated Buyers</span>
              </div>
              <div className="bg-[#1a1a1a] border border-[#9ce2c7]/40 px-6 py-3 rounded-2xl flex items-center space-x-3 text-white font-bold text-sm shadow-md">
                <Briefcase className="w-5 h-5 text-[#9ce2c7]" />
                <span>Property Sellers</span>
              </div>
            </div>
          </div>

          {/* Residential vs Commercial Dual Pillar Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* Residential Real Estate Card */}
            <div className="bg-[#1a1a1a] border border-white/10 rounded-3xl p-8 space-y-6 hover:border-[#9ce2c7]/50 transition-all">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div className="flex items-center space-x-3">
                  <div className="p-3 bg-[#9ce2c7]/10 text-[#9ce2c7] rounded-2xl border border-[#9ce2c7]/20">
                    <Home className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">Residential Real Estate</h3>
                    <p className="text-xs text-[#9ce2c7] font-semibold">Single-Family, Multi-Family, Condos & Rentals</p>
                  </div>
                </div>
              </div>

              <p className="text-sm text-gray-300 font-sans leading-relaxed">
                Fill vacancies faster and attract high-credit buyers and long-term renters directly to your active listings. Eliminate third-party portal fees by driving prospective tenants and buyers straight into your booking calendar.
              </p>

              <ul className="space-y-3 text-xs font-medium text-gray-300">
                <li className="flex items-start space-x-2">
                  <CheckCircle className="w-4 h-4 text-[#9ce2c7] shrink-0 mt-0.5" />
                  <span>Automated property walkthrough video promotion</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle className="w-4 h-4 text-[#9ce2c7] shrink-0 mt-0.5" />
                  <span>Instant open house and private showing scheduling</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle className="w-4 h-4 text-[#9ce2c7] shrink-0 mt-0.5" />
                  <span>High-intent homebuyer lead forms with pre-qualification questions</span>
                </li>
              </ul>
            </div>

            {/* Commercial Real Estate Card */}
            <div className="bg-[#1a1a1a] border border-white/10 rounded-3xl p-8 space-y-6 hover:border-[#9ce2c7]/50 transition-all">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div className="flex items-center space-x-3">
                  <div className="p-3 bg-[#9ce2c7]/10 text-[#9ce2c7] rounded-2xl border border-[#9ce2c7]/20">
                    <Building className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">Commercial Real Estate</h3>
                    <p className="text-xs text-[#9ce2c7] font-semibold">High-End Developments, Office, Retail & Investors</p>
                  </div>
                </div>
              </div>

              <p className="text-sm text-gray-300 font-sans leading-relaxed">
                Connect with institutional investors, accredited buyers, and commercial tenants seeking high-yield opportunities or premium commercial spaces for their expanding operations.
              </p>

              <ul className="space-y-3 text-xs font-medium text-gray-300">
                <li className="flex items-start space-x-2">
                  <CheckCircle className="w-4 h-4 text-[#9ce2c7] shrink-0 mt-0.5" />
                  <span>Investor deck and prospectus download landing pages</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle className="w-4 h-4 text-[#9ce2c7] shrink-0 mt-0.5" />
                  <span>Geographic and net-worth targeted Search & Meta campaigns</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle className="w-4 h-4 text-[#9ce2c7] shrink-0 mt-0.5" />
                  <span>Direct phone call tracking and confidential consultation booking</span>
                </li>
              </ul>
            </div>

          </div>

        </div>
      </section>

      {/* SECTION 4: DIGITAL MARKETING SOLUTIONS & TOP CHANNELS */}
      <section id="re-solutions" className="py-20 md:py-28 bg-[#181818] border-b border-white/10 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <div className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#9ce2c7]">
              End-to-End Digital Ecosystem
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight">
              Top Channels & AI Automations
            </h2>
            <p className="text-base text-gray-300 font-sans">
              We engineer dedicated client acquisition channels and next-generation AI automations to find, qualify, and close your best real estate leads on autopilot.
            </p>
          </div>

          {/* CORE FOUNDATION: WEBSITES & LANDING PAGES */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Website Solution */}
            <div className="bg-[#121212] p-8 rounded-3xl border border-white/10 space-y-4 hover:border-[#9ce2c7]/50 transition-colors">
              <div className="p-3 bg-[#9ce2c7]/10 text-[#9ce2c7] rounded-2xl w-fit">
                <Layers className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold text-white">High-Converting Website</h3>
              <p className="text-sm text-gray-300 font-sans leading-relaxed">
                Create a stunning, lightning-fast digital hub to showcase your best properties with immersive photo galleries, floor plans, virtual tours, and seamless inquiry triggers.
              </p>
              <div className="pt-2 flex flex-wrap gap-2 text-[11px] font-bold text-gray-400">
                <span className="bg-white/5 px-2.5 py-1 rounded-full border border-white/10">MLS / IDX Compatible</span>
                <span className="bg-white/5 px-2.5 py-1 rounded-full border border-white/10">Mobile-First</span>
                <span className="bg-white/5 px-2.5 py-1 rounded-full border border-white/10">Instant Booking</span>
              </div>
            </div>

            {/* Landing Pages Solution */}
            <div className="bg-[#121212] p-8 rounded-3xl border border-white/10 space-y-4 hover:border-[#9ce2c7]/50 transition-colors">
              <div className="p-3 bg-[#9ce2c7]/10 text-[#9ce2c7] rounded-2xl w-fit">
                <Target className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold text-white">Targeted Listing Landing Pages</h3>
              <p className="text-sm text-gray-300 font-sans leading-relaxed">
                Immediately capture leads to send them detailed information, brochures, and scheduling links about your properties before they start browsing competitors.
              </p>
              <div className="pt-2 flex flex-wrap gap-2 text-[11px] font-bold text-gray-400">
                <span className="bg-white/5 px-2.5 py-1 rounded-full border border-white/10">Single Property Funnels</span>
                <span className="bg-white/5 px-2.5 py-1 rounded-full border border-white/10">Pre-Construction / VIP</span>
                <span className="bg-white/5 px-2.5 py-1 rounded-full border border-white/10">High CVR Layouts</span>
              </div>
            </div>
          </div>

          {/* CHANNEL 1: PAID SEARCH FOR GOOGLE */}
          <div className="bg-[#121212] rounded-3xl border border-white/10 p-8 sm:p-10 space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-6">
              <div className="flex items-center space-x-3.5">
                <div className="p-3 bg-[#9ce2c7]/10 text-[#9ce2c7] rounded-2xl border border-[#9ce2c7]/20">
                  <Search className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[#9ce2c7] font-mono">Channel 01</span>
                  <h3 className="text-2xl sm:text-3xl font-black text-white">Paid Search for Google</h3>
                </div>
              </div>
              <p className="text-xs text-gray-400 max-w-md font-sans">
                Capture motivated buyers, sellers, and renters actively searching for real estate and listings in your exact target markets.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Google Search */}
              <div className="bg-[#181818] p-6 rounded-2xl border border-white/5 space-y-3 hover:border-[#9ce2c7]/30 transition-all">
                <div className="flex items-center space-x-2 text-[#9ce2c7]">
                  <Search className="w-5 h-5" />
                  <span className="font-extrabold text-sm uppercase tracking-wider text-white">Google Search Ads</span>
                </div>
                <p className="text-xs text-gray-300 leading-relaxed font-sans">
                  Target exact, high-intent search queries like <em className="text-[#9ce2c7] font-medium">"condos for sale near me"</em>, <em className="text-[#9ce2c7] font-medium">"luxury homes in [City]"</em>, and specific zip codes to capture buyers ready to schedule showings immediately.
                </p>
                <div className="pt-2 text-[10px] font-mono text-gray-400 border-t border-white/5">
                  ✓ Negative keyword filtering & call extensions
                </div>
              </div>

              {/* PMAX */}
              <div className="bg-[#181818] p-6 rounded-2xl border border-white/5 space-y-3 hover:border-[#9ce2c7]/30 transition-all">
                <div className="flex items-center space-x-2 text-[#9ce2c7]">
                  <TrendingUp className="w-5 h-5" />
                  <span className="font-extrabold text-sm uppercase tracking-wider text-white">Google PMAX (Performance Max)</span>
                </div>
                <p className="text-xs text-gray-300 leading-relaxed font-sans">
                  Unify your reach across Google Search, Google Maps, YouTube, Gmail, and Google Display Network simultaneously, leveraging Google's AI bidding algorithms to maximize showing conversions.
                </p>
                <div className="pt-2 text-[10px] font-mono text-gray-400 border-t border-white/5">
                  ✓ Cross-channel machine-learning optimization
                </div>
              </div>

              {/* YouTube Ads */}
              <div className="bg-[#181818] p-6 rounded-2xl border border-white/5 space-y-3 hover:border-[#9ce2c7]/30 transition-all sm:col-span-2 lg:col-span-1">
                <div className="flex items-center space-x-2 text-[#9ce2c7]">
                  <Video className="w-5 h-5" />
                  <span className="font-extrabold text-sm uppercase tracking-wider text-white">YouTube Video Walkthroughs</span>
                </div>
                <p className="text-xs text-gray-300 leading-relaxed font-sans">
                  Repurpose your cinematic walkthrough video tours into localized YouTube ads that build tremendous authority with affluent home seekers and out-of-state relocators in your region.
                </p>
                <div className="pt-2 text-[10px] font-mono text-gray-400 border-t border-white/5">
                  ✓ High-engagement visual storytelling
                </div>
              </div>
            </div>
          </div>

          {/* CHANNEL 2: PAID SOCIAL FOR META */}
          <div className="bg-[#121212] rounded-3xl border border-white/10 p-8 sm:p-10 space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-6">
              <div className="flex items-center space-x-3.5">
                <div className="p-3 bg-[#9ce2c7]/10 text-[#9ce2c7] rounded-2xl border border-[#9ce2c7]/20">
                  <Share2 className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[#9ce2c7] font-mono">Channel 02</span>
                  <h3 className="text-2xl sm:text-3xl font-black text-white">Paid Social for META (Facebook & Instagram)</h3>
                </div>
              </div>
              <p className="text-xs text-gray-400 max-w-md font-sans">
                Stop thumbs and showcase luxury listings, developments, and off-market deals directly into the feeds of qualified buyers and investors.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Visual Carousels & Reels */}
              <div className="bg-[#181818] p-6 rounded-2xl border border-white/5 space-y-3 hover:border-[#9ce2c7]/30 transition-all">
                <div className="flex items-center space-x-2 text-[#9ce2c7]">
                  <Users className="w-5 h-5" />
                  <span className="font-extrabold text-sm uppercase tracking-wider text-white">Feed & Reels Video Tours</span>
                </div>
                <p className="text-xs text-gray-300 leading-relaxed font-sans">
                  Deliver scroll-stopping photo carousels and vertical video tours of your newest listings on Instagram Reels and Facebook, driving prospects directly into your lead funnel.
                </p>
                <div className="pt-2 text-[10px] font-mono text-gray-400 border-t border-white/5">
                  ✓ High CTR dynamic creative optimization
                </div>
              </div>

              {/* Geo-Fencing & Relocation Targeting */}
              <div className="bg-[#181818] p-6 rounded-2xl border border-white/5 space-y-3 hover:border-[#9ce2c7]/30 transition-all">
                <div className="flex items-center space-x-2 text-[#9ce2c7]">
                  <MapPin className="w-5 h-5" />
                  <span className="font-extrabold text-sm uppercase tracking-wider text-white">Geo-Fenced Audience Segments</span>
                </div>
                <p className="text-xs text-gray-300 leading-relaxed font-sans">
                  Target homeowners looking to upsize or downsize, out-of-market executives relocating for work, and accredited investors searching for high-cap-rate commercial assets.
                </p>
                <div className="pt-2 text-[10px] font-mono text-gray-400 border-t border-white/5">
                  ✓ Custom audience & lookalike modeling
                </div>
              </div>

              {/* Meta Lead Ads & WhatsApp Click-to-Chat */}
              <div className="bg-[#181818] p-6 rounded-2xl border border-white/5 space-y-3 hover:border-[#9ce2c7]/30 transition-all sm:col-span-2 lg:col-span-1">
                <div className="flex items-center space-x-2 text-[#9ce2c7]">
                  <MessageCircle className="w-5 h-5" />
                  <span className="font-extrabold text-sm uppercase tracking-wider text-white">Instant Lead Ads & WhatsApp</span>
                </div>
                <p className="text-xs text-gray-300 leading-relaxed font-sans">
                  Enable friction-free lead capture with pre-filled Meta instant forms and click-to-WhatsApp messaging ads, allowing buyers to connect with your team with a single tap.
                </p>
                <div className="pt-2 text-[10px] font-mono text-gray-400 border-t border-white/5">
                  ✓ Instant mobile lead-to-chat delivery
                </div>
              </div>
            </div>
          </div>

          {/* CHANNEL 3: AI AUTOMATIONS & INTELLIGENT REAL ESTATE AGENTS */}
          <div className="bg-gradient-to-b from-[#16231c] via-[#121212] to-[#121212] rounded-3xl border-2 border-[#9ce2c7]/30 p-8 sm:p-10 space-y-10 shadow-2xl relative overflow-hidden">
            {/* Background Glow */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-[#9ce2c7]/10 rounded-full blur-3xl pointer-events-none"></div>

            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 border-b border-white/10 pb-8">
              <div className="space-y-2">
                <div className="inline-flex items-center space-x-2 bg-[#9ce2c7]/20 text-[#9ce2c7] border border-[#9ce2c7]/40 px-3.5 py-1 rounded-full text-xs font-black uppercase tracking-wider">
                  <Sparkles className="w-4 h-4 text-[#9ce2c7]" />
                  <span>Next-Gen Real Estate AI Suite</span>
                </div>
                <h3 className="text-3xl sm:text-4xl font-black text-white">
                  Intelligent AI Automations & Client Agents
                </h3>
                <p className="text-sm text-gray-300 max-w-2xl font-sans">
                  Convert ad traffic into confirmed showing appointments 24/7, qualify buyer budgets automatically, nurture leads via email, and give your clients instant real-time campaign performance answers.
                </p>
              </div>

              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setActiveAiDemo('chatbot')}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 cursor-pointer ${
                    activeAiDemo === 'chatbot'
                      ? 'bg-[#9ce2c7] text-black shadow-lg scale-105'
                      : 'bg-white/5 text-gray-300 hover:bg-white/10 hover:text-white border border-white/10'
                  }`}
                >
                  <Bot className="w-3.5 h-3.5" />
                  <span>AI Chatbot</span>
                </button>

                <button
                  onClick={() => setActiveAiDemo('leadforms')}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 cursor-pointer ${
                    activeAiDemo === 'leadforms'
                      ? 'bg-[#9ce2c7] text-black shadow-lg scale-105'
                      : 'bg-white/5 text-gray-300 hover:bg-white/10 hover:text-white border border-white/10'
                  }`}
                >
                  <CheckSquare className="w-3.5 h-3.5" />
                  <span>AI Lead Forms</span>
                </button>

                <button
                  onClick={() => setActiveAiDemo('email')}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 cursor-pointer ${
                    activeAiDemo === 'email'
                      ? 'bg-[#9ce2c7] text-black shadow-lg scale-105'
                      : 'bg-white/5 text-gray-300 hover:bg-white/10 hover:text-white border border-white/10'
                  }`}
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>AI Email Follow-Up</span>
                </button>

                <button
                  onClick={() => setActiveAiDemo('clientagent')}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 cursor-pointer ${
                    activeAiDemo === 'clientagent'
                      ? 'bg-[#9ce2c7] text-black shadow-lg scale-105'
                      : 'bg-white/5 text-gray-300 hover:bg-white/10 hover:text-white border border-white/10'
                  }`}
                >
                  <BarChart3 className="w-3.5 h-3.5" />
                  <span>AI Agent for Clients</span>
                </button>
              </div>
            </div>

            {/* 4 AI FEATURE CARDS GRID */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              
              {/* Feature 1: AI Chatbot */}
              <div 
                onClick={() => setActiveAiDemo('chatbot')}
                className={`p-6 rounded-2xl transition-all cursor-pointer border flex flex-col justify-between ${
                  activeAiDemo === 'chatbot'
                    ? 'bg-[#1e2f26] border-[#9ce2c7] ring-1 ring-[#9ce2c7]'
                    : 'bg-[#181818] border-white/10 hover:border-[#9ce2c7]/40'
                }`}
              >
                <div className="space-y-3">
                  <div className="p-3 bg-[#9ce2c7]/10 text-[#9ce2c7] rounded-xl w-fit border border-[#9ce2c7]/20">
                    <Bot className="w-6 h-6" />
                  </div>
                  <div className="flex items-center justify-between">
                    <h4 className="text-lg font-bold text-white">AI Chatbot</h4>
                    <span className="text-[9px] font-mono uppercase bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded-full font-bold">24/7 Live</span>
                  </div>
                  <p className="text-xs text-gray-300 leading-relaxed font-sans">
                    Answers questions for leads instantly in <strong>WhatsApp messages</strong> or <strong>online on your website</strong>. Provides pricing, HOA rules, floor plans, and books showings automatically.
                  </p>
                </div>
                <div className="pt-4 border-t border-white/10 text-[10px] font-bold text-[#9ce2c7] flex items-center space-x-1">
                  <span>WhatsApp & Web Embedded</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </div>
              </div>

              {/* Feature 2: AI Lead Forms */}
              <div 
                onClick={() => setActiveAiDemo('leadforms')}
                className={`p-6 rounded-2xl transition-all cursor-pointer border flex flex-col justify-between ${
                  activeAiDemo === 'leadforms'
                    ? 'bg-[#1e2f26] border-[#9ce2c7] ring-1 ring-[#9ce2c7]'
                    : 'bg-[#181818] border-white/10 hover:border-[#9ce2c7]/40'
                }`}
              >
                <div className="space-y-3">
                  <div className="p-3 bg-[#9ce2c7]/10 text-[#9ce2c7] rounded-xl w-fit border border-[#9ce2c7]/20">
                    <CheckSquare className="w-6 h-6" />
                  </div>
                  <div className="flex items-center justify-between">
                    <h4 className="text-lg font-bold text-white">AI Lead Forms</h4>
                    <span className="text-[9px] font-mono uppercase bg-blue-500/20 text-blue-400 px-2 py-0.5 rounded-full font-bold">Smart Filter</span>
                  </div>
                  <p className="text-xs text-gray-300 leading-relaxed font-sans">
                    Qualifies leads based on dynamic form inputs (pre-approval status, purchase timeline, budget, credit score) so you only spend time on serious, ready-to-act buyers and renters.
                  </p>
                </div>
                <div className="pt-4 border-t border-white/10 text-[10px] font-bold text-[#9ce2c7] flex items-center space-x-1">
                  <span>Automated Pre-Qualification</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </div>
              </div>

              {/* Feature 3: AI Email Follow-Up */}
              <div 
                onClick={() => setActiveAiDemo('email')}
                className={`p-6 rounded-2xl transition-all cursor-pointer border flex flex-col justify-between ${
                  activeAiDemo === 'email'
                    ? 'bg-[#1e2f26] border-[#9ce2c7] ring-1 ring-[#9ce2c7]'
                    : 'bg-[#181818] border-white/10 hover:border-[#9ce2c7]/40'
                }`}
              >
                <div className="space-y-3">
                  <div className="p-3 bg-[#9ce2c7]/10 text-[#9ce2c7] rounded-xl w-fit border border-[#9ce2c7]/20">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div className="flex items-center justify-between">
                    <h4 className="text-lg font-bold text-white">AI Email Follow-Up</h4>
                    <span className="text-[9px] font-mono uppercase bg-purple-500/20 text-purple-400 px-2 py-0.5 rounded-full font-bold">Automated</span>
                  </div>
                  <p className="text-xs text-gray-300 leading-relaxed font-sans">
                    Nurtures every lead instantly via email with personalized property brochures, price drop notifications, open house reminders, and calendar invitations without any manual effort.
                  </p>
                </div>
                <div className="pt-4 border-t border-white/10 text-[10px] font-bold text-[#9ce2c7] flex items-center space-x-1">
                  <span>Smart Nurture Sequences</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </div>
              </div>

              {/* Feature 4: AI Agent for Clients */}
              <div 
                onClick={() => setActiveAiDemo('clientagent')}
                className={`p-6 rounded-2xl transition-all cursor-pointer border flex flex-col justify-between ${
                  activeAiDemo === 'clientagent'
                    ? 'bg-[#1e2f26] border-[#9ce2c7] ring-1 ring-[#9ce2c7]'
                    : 'bg-[#181818] border-white/10 hover:border-[#9ce2c7]/40'
                }`}
              >
                <div className="space-y-3">
                  <div className="p-3 bg-[#9ce2c7]/10 text-[#9ce2c7] rounded-2xl w-fit border border-[#9ce2c7]/20">
                    <BarChart3 className="w-6 h-6" />
                  </div>
                  <div className="flex items-center justify-between">
                    <h4 className="text-lg font-bold text-white">AI Agent for Clients</h4>
                    <span className="text-[9px] font-mono uppercase bg-amber-500/20 text-amber-400 px-2 py-0.5 rounded-full font-bold">Real-Time</span>
                  </div>
                  <p className="text-xs text-gray-300 leading-relaxed font-sans">
                    Connects directly to your <strong>Google and META ad accounts</strong>. When a client or agent asks about campaign performance, they get accurate answers and metric breakdowns in real time.
                  </p>
                </div>
                <div className="pt-4 border-t border-white/10 text-[10px] font-bold text-[#9ce2c7] flex items-center space-x-1">
                  <span>Live Account Data Sync</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </div>
              </div>

            </div>

            {/* INTERACTIVE PREVIEW SIMULATOR BOX */}
            <div className="bg-[#0f1713] rounded-2xl border border-[#9ce2c7]/30 p-6 sm:p-8 space-y-6">
              
              {/* Simulator Header */}
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 rounded-full bg-emerald-400 animate-ping"></div>
                  <div className="text-xs font-bold uppercase tracking-wider text-gray-200">
                    Interactive Live Simulation: <span className="text-[#9ce2c7] font-black">{
                      activeAiDemo === 'chatbot' ? 'AI Chatbot (WhatsApp & Web)' :
                      activeAiDemo === 'leadforms' ? 'AI Lead Form (Smart Qualification)' :
                      activeAiDemo === 'email' ? 'AI Email Follow-Up (Automated Nurture)' :
                      'AI Agent for Clients (Live Google & META Account Performance)'
                    }</span>
                  </div>
                </div>
                <span className="text-[10px] font-mono bg-white/10 text-gray-300 px-2.5 py-1 rounded-md">Live Preview</span>
              </div>

              {/* Tab 1: AI Chatbot Simulation */}
              {activeAiDemo === 'chatbot' && (
                <div className="space-y-4 max-w-2xl mx-auto font-sans">
                  <div className="bg-[#181818] p-4 rounded-2xl border border-white/10 space-y-3">
                    <div className="flex items-center justify-between border-b border-white/5 pb-2">
                      <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-xs">
                          <MessageCircle className="w-4 h-4" />
                        </div>
                        <div>
                          <p className="text-xs font-bold text-white">WhatsApp & Web AI Concierge</p>
                          <p className="text-[10px] text-emerald-400">Online • Replying in 2 seconds</p>
                        </div>
                      </div>
                      <span className="text-[10px] font-mono text-gray-400">834 Oak Ridge Ave</span>
                    </div>

                    <div className="space-y-2.5 text-xs">
                      {/* User message */}
                      <div className="bg-white/10 p-3 rounded-xl rounded-tr-none ml-12 text-gray-200">
                        "Hi! Is the 4-bedroom property on Oak Ridge still available? Does it have a private pool and what is the current asking price?"
                      </div>
                      
                      {/* AI response */}
                      <div className="bg-[#1e2f26] border border-[#9ce2c7]/30 p-3.5 rounded-xl rounded-tl-none mr-12 text-white space-y-2">
                        <div className="flex items-center space-x-1.5 text-[10px] text-[#9ce2c7] font-bold">
                          <Sparkles className="w-3 h-3" />
                          <span>AI Concierge</span>
                        </div>
                        <p>
                          Yes! 834 Oak Ridge Ave is active and listed at <strong>$875,000</strong>. It features a heated saltwater pool, renovated chef's kitchen, and 3-car garage.
                        </p>
                        <div className="p-2.5 bg-black/40 rounded-lg border border-white/10 text-[11px] space-y-1">
                          <p className="font-bold text-[#9ce2c7]">Would you like to schedule a private tour?</p>
                          <div className="flex flex-wrap gap-2 pt-1">
                            <span className="bg-[#9ce2c7] text-black px-2.5 py-1 rounded-md text-[10px] font-bold cursor-pointer hover:bg-[#8bd6ba]">Tomorrow 2:00 PM</span>
                            <span className="bg-white/10 text-white px-2.5 py-1 rounded-md text-[10px] font-bold cursor-pointer hover:bg-white/20">Saturday 11:00 AM</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Tab 2: AI Lead Forms Simulation */}
              {activeAiDemo === 'leadforms' && (
                <div className="space-y-4 max-w-2xl mx-auto font-sans">
                  <div className="bg-[#181818] p-5 rounded-2xl border border-white/10 space-y-4">
                    <div className="flex items-center justify-between border-b border-white/5 pb-2">
                      <span className="text-xs font-bold text-white flex items-center space-x-1.5">
                        <CheckSquare className="w-4 h-4 text-[#9ce2c7]" />
                        <span>Smart Qualification Scorecard</span>
                      </span>
                      <span className="text-[10px] font-mono bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded font-bold">Lead Qualified (98/100)</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                      <div className="bg-white/5 p-3 rounded-xl border border-white/5 space-y-1">
                        <p className="text-[10px] text-gray-400 font-bold uppercase">Budget Range</p>
                        <p className="font-bold text-white">$1,200,000 - $1,500,000 (Jumbo)</p>
                      </div>
                      <div className="bg-white/5 p-3 rounded-xl border border-white/5 space-y-1">
                        <p className="text-[10px] text-gray-400 font-bold uppercase">Pre-Approval Status</p>
                        <p className="font-bold text-[#9ce2c7]">✓ Verified Letter Attached (Chase Bank)</p>
                      </div>
                      <div className="bg-white/5 p-3 rounded-xl border border-white/5 space-y-1">
                        <p className="text-[10px] text-gray-400 font-bold uppercase">Move-in Timeline</p>
                        <p className="font-bold text-white">Within 30 Days (Relocating)</p>
                      </div>
                      <div className="bg-white/5 p-3 rounded-xl border border-white/5 space-y-1">
                        <p className="text-[10px] text-gray-400 font-bold uppercase">Auto-Action Triggered</p>
                        <p className="font-bold text-emerald-400">⚡ VIP Showing Booked & Agent SMS Sent</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Tab 3: AI Email Follow-Up Simulation */}
              {activeAiDemo === 'email' && (
                <div className="space-y-4 max-w-2xl mx-auto font-sans">
                  <div className="bg-[#181818] p-5 rounded-2xl border border-white/10 space-y-3">
                    <div className="flex items-center justify-between border-b border-white/5 pb-2 text-xs">
                      <div className="space-y-0.5">
                        <p className="font-bold text-white">Subject: Your VIP Property Packet & Showing Confirmation</p>
                        <p className="text-[11px] text-gray-400">To: marcus.vance@gmail.com • Sent instantly via AI Automation</p>
                      </div>
                      <span className="text-[10px] font-mono text-[#9ce2c7]">Delivered</span>
                    </div>

                    <div className="text-xs text-gray-300 space-y-2.5 bg-[#121212] p-4 rounded-xl border border-white/5">
                      <p>Hi Marcus,</p>
                      <p>
                        Thank you for requesting information on <strong>The Grandview Penthouse Suite #14B</strong>. As promised, your complete architectural blueprint, HOA prospectus, and high-resolution photo gallery are linked below:
                      </p>
                      <div className="p-3 bg-white/5 rounded-lg border border-white/10 flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <FileText className="w-4 h-4 text-[#9ce2c7]" />
                          <span className="font-bold text-white text-xs">Grandview_Penthouse_VIP_Dossier.pdf (14.2 MB)</span>
                        </div>
                        <span className="text-[10px] bg-[#9ce2c7] text-black font-bold px-2 py-1 rounded">Download</span>
                      </div>
                      <p className="text-[11px] text-gray-400">
                        Your private tour with our senior broker is confirmed for <strong>Thursday at 11:30 AM</strong>. A calendar invite has been sent to your inbox.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Tab 4: AI Agent for Clients Simulation */}
              {activeAiDemo === 'clientagent' && (
                <div className="space-y-4 max-w-2xl mx-auto font-sans">
                  <div className="bg-[#181818] p-5 rounded-2xl border border-white/10 space-y-3">
                    <div className="flex items-center justify-between border-b border-white/5 pb-2">
                      <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center font-bold text-xs">
                          <Activity className="w-4 h-4" />
                        </div>
                        <div>
                          <p className="text-xs font-bold text-white">Client Intelligence AI Agent</p>
                          <p className="text-[10px] text-[#9ce2c7]">Connected to Google Ads & META APIs</p>
                        </div>
                      </div>
                      <span className="text-[10px] font-mono text-gray-400">Live Ad Sync Active</span>
                    </div>

                    <div className="space-y-2.5 text-xs">
                      {/* Client prompt */}
                      <div className="bg-white/10 p-3 rounded-xl rounded-tr-none ml-12 text-gray-200">
                        "Hey Deon PPC AI, how did our Google Search and META campaigns perform over the last 7 days? What's our cost per qualified showing?"
                      </div>

                      {/* AI Agent answer */}
                      <div className="bg-[#16221c] border border-[#9ce2c7]/40 p-4 rounded-xl rounded-tl-none mr-8 text-white space-y-3">
                        <div className="flex items-center space-x-1.5 text-[10px] text-[#9ce2c7] font-bold">
                          <Bot className="w-3.5 h-3.5" />
                          <span>Real-Time Performance Intelligence</span>
                        </div>
                        <p>
                          Here is your verified performance summary for <strong>Aug 1 – Aug 7, 2026</strong> across active Google & META accounts:
                        </p>
                        <div className="grid grid-cols-3 gap-2 text-center">
                          <div className="bg-black/50 p-2 rounded-lg border border-white/10">
                            <p className="text-[10px] text-gray-400 uppercase font-bold">Showings Booked</p>
                            <p className="text-base font-black text-[#9ce2c7]">38</p>
                          </div>
                          <div className="bg-black/50 p-2 rounded-lg border border-white/10">
                            <p className="text-[10px] text-gray-400 uppercase font-bold">Cost Per Showing</p>
                            <p className="text-base font-black text-white">$41.20</p>
                          </div>
                          <div className="bg-black/50 p-2 rounded-lg border border-white/10">
                            <p className="text-[10px] text-gray-400 uppercase font-bold">Top Asset</p>
                            <p className="text-[11px] font-bold text-emerald-400">Reels Video 03</p>
                          </div>
                        </div>
                        <p className="text-[11px] text-gray-300">
                          💡 <strong>Key Insight:</strong> Google Search zip code 60614 is driving the lowest CPL at $18.40. META Video ad conversions are up 24% week-over-week.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

            </div>

          </div>

        </div>
      </section>

      {/* SECTION 5: HOW IT WORKS (4 STEPS) */}
      <section className="py-20 md:py-28 bg-[#121212] border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
            <div className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#9ce2c7]">
              Execution Blueprint
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white">
              How It Works
            </h2>
            <p className="text-base text-gray-300 font-sans">
              A streamlined, 4-step client acquisition blueprint built for real estate growth.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Step 1 */}
            <div className="bg-[#1a1a1a] p-8 rounded-3xl border border-white/10 space-y-4 relative flex flex-col justify-between">
              <div className="space-y-3">
                <span className="text-xs font-black uppercase tracking-widest text-[#9ce2c7] bg-[#9ce2c7]/10 px-3 py-1 rounded-full w-fit inline-block border border-[#9ce2c7]/20">
                  Step 01
                </span>
                <h3 className="text-xl font-bold text-white">VIP Client Identification</h3>
                <p className="text-xs text-gray-300 font-sans leading-relaxed">
                  We identify who your ideal customers are—short-term or long-term renters, permanent buyers, or investors. We identify the best geographic locations to source them from, whether they’re local, across the state, or another part of the world.
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="bg-[#1a1a1a] p-8 rounded-3xl border border-white/10 space-y-4 relative flex flex-col justify-between">
              <div className="space-y-3">
                <span className="text-xs font-black uppercase tracking-widest text-[#9ce2c7] bg-[#9ce2c7]/10 px-3 py-1 rounded-full w-fit inline-block border border-[#9ce2c7]/20">
                  Step 02
                </span>
                <h3 className="text-xl font-bold text-white">Client Attraction</h3>
                <p className="text-xs text-gray-300 font-sans leading-relaxed">
                  We identify the best marketing channels to source them from and drive them directly to your properties using high-impact visual media and optimized ad messaging.
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="bg-[#1a1a1a] p-8 rounded-3xl border border-white/10 space-y-4 relative flex flex-col justify-between">
              <div className="space-y-3">
                <span className="text-xs font-black uppercase tracking-widest text-[#9ce2c7] bg-[#9ce2c7]/10 px-3 py-1 rounded-full w-fit inline-block border border-[#9ce2c7]/20">
                  Step 03
                </span>
                <h3 className="text-xl font-bold text-white">Contact Automation</h3>
                <p className="text-xs text-gray-300 font-sans leading-relaxed">
                  Instantly source leads directly and have them schedule a viewing, call directly, send a direct message, or sign a contract without manual back-and-forth delay.
                </p>
              </div>
            </div>

            {/* Step 4 */}
            <div className="bg-[#1a1a1a] p-8 rounded-3xl border border-white/10 space-y-4 relative flex flex-col justify-between">
              <div className="space-y-3">
                <span className="text-xs font-black uppercase tracking-widest text-[#9ce2c7] bg-[#9ce2c7]/10 px-3 py-1 rounded-full w-fit inline-block border border-[#9ce2c7]/20">
                  Step 04
                </span>
                <h3 className="text-xl font-bold text-white">Closing & Scaling</h3>
                <p className="text-xs text-gray-300 font-sans leading-relaxed">
                  Our digital marketing automations are continuously optimized to complete this process on autopilot so you can close more deals predictably month after month.
                </p>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* SECTION 6: CASE STUDY (REDACTED REAL ESTATE CASE STUDY) */}
      <section className="py-20 md:py-28 bg-[#181818] border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
            <div className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#9ce2c7]">
              Proven Performance
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
              Redacted Real Estate Case Study
            </h2>
            <p className="text-base text-gray-300 font-sans">
              How multi-channel Paid Search and Social drove 100% occupancy and direct buyer appointments for high-value properties.
            </p>
          </div>

          <div className="bg-[#121212] rounded-3xl border border-white/10 overflow-hidden shadow-2xl grid grid-cols-1 lg:grid-cols-12 gap-0">
            
            {/* Image Column */}
            <div className="lg:col-span-5 relative min-h-[300px]">
              <AnimatedImage
                src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1000&q=80"
                alt="Real Estate Case Study Property"
                className="w-full h-full object-cover"
                wrapperClassName="w-full h-full absolute inset-0"
                scale={false}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#121212] lg:bg-gradient-to-r lg:from-transparent lg:to-[#121212] pointer-events-none"></div>
              
              <div className="absolute top-4 left-4 bg-black/80 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/20 text-[10px] font-bold uppercase tracking-widest text-[#9ce2c7]">
                [Redacted Client Portfolio]
              </div>
            </div>

            {/* Content Column */}
            <div className="lg:col-span-7 p-8 sm:p-12 space-y-6 flex flex-col justify-between">
              
              <div className="space-y-4">
                <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-widest text-[#9ce2c7]">
                  <ShieldCheck className="w-4 h-4 text-[#9ce2c7]" />
                  <span>Verified Campaign Execution</span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-bold text-white leading-tight">
                  140+ Direct Showing Appointments & 8.4x Ad Spend Return
                </h3>

                <p className="text-sm text-gray-300 font-sans leading-relaxed">
                  By launching dedicated high-speed property landing pages paired with Google Search location targeting and Meta video ads, this real estate group replaced third-party directory dependency with direct, exclusive buyer and tenant inquiries.
                </p>

                {/* Key Metrics Grid */}
                <div className="grid grid-cols-3 gap-4 pt-4 border-t border-b border-white/10 py-4">
                  <div>
                    <p className="text-2xl sm:text-3xl font-black text-[#9ce2c7]">8.4x</p>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mt-1">Pipeline ROAS</p>
                  </div>
                  <div>
                    <p className="text-2xl sm:text-3xl font-black text-white">140+</p>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mt-1">Monthly Showings</p>
                  </div>
                  <div>
                    <p className="text-2xl sm:text-3xl font-black text-[#9ce2c7]">$0</p>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mt-1">Portal Commission Waste</p>
                  </div>
                </div>

                {/* Problem, Solution, Result Breakdown */}
                <div className="space-y-3 pt-2 font-sans">
                  <div className="bg-[#1a1a1a] p-4 rounded-2xl border border-rose-500/20 space-y-1">
                    <div className="flex items-center space-x-2 text-rose-400">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      <h4 className="text-[11px] font-black uppercase tracking-widest">1. The Problem</h4>
                    </div>
                    <p className="text-xs text-gray-300 leading-relaxed font-sans">
                      The real estate group was spending heavily on listing portals and broad online ads, but receiving low-quality inquiries that required constant phone tag and manual follow-up.
                    </p>
                  </div>

                  <div className="bg-[#1a1a1a] p-4 rounded-2xl border border-blue-500/20 space-y-1">
                    <div className="flex items-center space-x-2 text-blue-400">
                      <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                      <h4 className="text-[11px] font-black uppercase tracking-widest">2. The Solution</h4>
                    </div>
                    <p className="text-xs text-gray-300 leading-relaxed font-sans">
                      We created dedicated property landing pages with virtual tours, launched targeted Google Search ads for motivated home buyers in key zip codes, and automated instant calendar scheduling.
                    </p>
                  </div>

                  <div className="bg-[#1a1a1a] p-4 rounded-2xl border border-[#9ce2c7]/30 space-y-1">
                    <div className="flex items-center space-x-2 text-[#9ce2c7]">
                      <TrendingUp className="w-3.5 h-3.5 shrink-0" />
                      <h4 className="text-[11px] font-black uppercase tracking-widest">3. The Result</h4>
                    </div>
                    <p className="text-xs text-gray-300 leading-relaxed font-sans">
                      Booked 140+ qualified showing appointments every month at an 8.4x return on marketing spend, while eliminating reliance on expensive third-party listing portals.
                    </p>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-2">
                <button
                  onClick={onBookClick}
                  className="bg-[#9ce2c7] hover:bg-[#8bd6ba] text-black font-bold uppercase tracking-widest text-xs px-8 py-4 rounded-full shadow-lg transition-all cursor-pointer inline-flex items-center space-x-2 transform hover:-translate-y-0.5"
                >
                  <span>Replicate These Results</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* SECTION 7: CTA & EMBEDDED STRATEGY CALL BOOKING FORM */}
      <section id="re-cta" className="py-20 md:py-28 bg-[#121212] text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center space-y-4 mb-12">
            <div className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#9ce2c7]">
              Start Closing More Deals
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white">
              Ready to Close More Deals? <br />
              <span className="text-[#9ce2c7]">Book a Call Today.</span>
            </h2>
            <p className="text-base text-gray-300 max-w-xl mx-auto font-sans">
              Schedule your confidential real estate strategy session to review your current portfolio and build your custom acquisition system.
            </p>
          </div>

          {/* Form container */}
          <div className="bg-white text-gray-900 rounded-3xl p-6 sm:p-10 shadow-2xl border border-gray-100">
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Name Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-2">First Name *</label>
                  <input
                    type="text"
                    name="firstName"
                    required
                    placeholder="Deon"
                    value={formData.firstName}
                    onChange={handleChange}
                    className="w-full bg-gray-50 border border-gray-200 focus:border-black focus:ring-1 focus:ring-black rounded-xl py-3 px-4 text-xs font-bold text-gray-900 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-2">Last Name *</label>
                  <input
                    type="text"
                    name="lastName"
                    required
                    placeholder="Howard"
                    value={formData.lastName}
                    onChange={handleChange}
                    className="w-full bg-gray-50 border border-gray-200 focus:border-black focus:ring-1 focus:ring-black rounded-xl py-3 px-4 text-xs font-bold text-gray-900 outline-none"
                  />
                </div>
              </div>

              {/* Contact Info Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-2">Email Address *</label>
                  <input
                    type="email"
                    name="email"
                    required
                    placeholder="name@realestate.com"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full bg-gray-50 border border-gray-200 focus:border-black focus:ring-1 focus:ring-black rounded-xl py-3 px-4 text-xs font-bold text-gray-900 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-2">Phone Number *</label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    placeholder="(555) 000-0000"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full bg-gray-50 border border-gray-200 focus:border-black focus:ring-1 focus:ring-black rounded-xl py-3 px-4 text-xs font-bold text-gray-900 outline-none"
                  />
                </div>
              </div>

              {/* Company & Property Focus Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-2">Brokerage / Group Name</label>
                  <input
                    type="text"
                    name="companyName"
                    placeholder="Axiom Real Estate Group"
                    value={formData.companyName}
                    onChange={handleChange}
                    className="w-full bg-gray-50 border border-gray-200 focus:border-black focus:ring-1 focus:ring-black rounded-xl py-3 px-4 text-xs font-bold text-gray-900 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-2">Primary Focus</label>
                  <select
                    name="propertyType"
                    value={formData.propertyType}
                    onChange={handleChange}
                    className="w-full bg-gray-50 border border-gray-200 focus:border-black focus:ring-1 focus:ring-black rounded-xl py-3 px-4 text-xs font-bold text-gray-900 outline-none cursor-pointer"
                  >
                    <option value="Residential Rentals">Residential Rentals</option>
                    <option value="Residential Sales">Residential Sales</option>
                    <option value="Commercial Developments">Commercial Developments</option>
                    <option value="Wholesaling & Flipping">Wholesaling & Flipping</option>
                    <option value="Residential & Commercial">Residential & Commercial</option>
                  </select>
                </div>
              </div>

              {/* Budget Row */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-2">Target Monthly Ad Spend</label>
                <select
                  name="budget"
                  value={formData.budget}
                  onChange={handleChange}
                  className="w-full bg-gray-50 border border-gray-200 focus:border-black focus:ring-1 focus:ring-black rounded-xl py-3 px-4 text-xs font-bold text-gray-900 outline-none cursor-pointer"
                >
                  <option value="Under $2,500/mo">Under $2,500/mo</option>
                  <option value="$2,500 - $5,000/mo">$2,500 - $5,000/mo</option>
                  <option value="$5,000 - $10,000/mo">$5,000 - $10,000/mo</option>
                  <option value="$10,000+/mo">$10,000+/mo</option>
                </select>
              </div>

              {/* Message */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-2">Tell Us About Your Listings & Goals</label>
                <textarea
                  name="message"
                  rows={3}
                  placeholder="Share details about your active properties, target locations, or key sales goals..."
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full bg-gray-50 border border-gray-200 focus:border-black focus:ring-1 focus:ring-black rounded-xl py-3 px-4 text-xs font-bold text-gray-900 outline-none font-sans resize-none"
                ></textarea>
              </div>

              {/* Calendar Selector */}
              <div className="pt-6 border-t border-gray-200">
                <h4 className="text-base font-bold text-gray-900 mb-3 flex items-center space-x-2">
                  <CalendarIcon className="w-5 h-5 text-black" />
                  <span>Select Date & Time for Strategy Call</span>
                </h4>

                <div className="bg-[#d6f5e8]/60 rounded-2xl p-5 border border-black/15 space-y-4">
                  <div className="flex items-center justify-between text-[#121212]">
                    <span className="font-bold text-sm">{currentMonth}</span>
                    <span className="text-xs font-bold uppercase tracking-wider text-gray-600">EDT Timezone</span>
                  </div>

                  <div className="grid grid-cols-7 gap-1 text-center">
                    {daysInMonth.slice(0, 14).map((day) => (
                      <button
                        key={day}
                        type="button"
                        onClick={() => setSelectedDay(day)}
                        className={`py-2 rounded-xl text-xs font-bold transition-all ${
                          selectedDay === day
                            ? 'bg-black text-white shadow-md'
                            : 'hover:bg-black/10 text-gray-800'
                        }`}
                      >
                        {day}
                      </button>
                    ))}
                  </div>

                  {/* Time slots */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 pt-2">
                    {displaySlots.map((slot) => (
                      <button
                        key={slot}
                        type="button"
                        onClick={() => setSelectedSlot(slot)}
                        className={`py-2 px-3 rounded-xl text-xs font-bold uppercase tracking-wider border transition-all ${
                          selectedSlot === slot
                            ? 'bg-black text-white border-black'
                            : 'bg-white text-gray-800 border-gray-200 hover:border-black'
                        }`}
                      >
                        {slot}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <button
                type="submit"
                id="re-cta-submit-btn"
                className="w-full bg-black hover:bg-gray-900 text-white font-bold uppercase tracking-widest text-xs py-4 px-8 rounded-full shadow-lg transition-all cursor-pointer border border-white/20 transform hover:-translate-y-0.5"
              >
                Book My Real Estate Strategy Session
              </button>

            </form>
          </div>

        </div>
      </section>

      {/* Page Footer */}
      <footer className="py-8 bg-black border-t border-white/10 text-center text-xs text-gray-400">
        <p>© 2026 Deon Howard PPC • Specialized Real Estate Client Acquisition</p>
      </footer>

    </div>
  );
};
