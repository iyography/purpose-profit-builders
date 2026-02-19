"use client";

import { motion } from "framer-motion";
import { useState, useEffect, useRef, useCallback } from "react";
import { Menu, X, Archive, Trash2, Pencil } from "lucide-react";

// The Credit Hub theme colors
const ORANGE_BG = '#fb923c'; // Orange background like yellow in BBC
const BLUE = '#1d4ed8'; // Blue accent

interface WinReview {
  id: number;
  name: string;
  content: string;
  likes: number;
  comments: number;
  timeAgo: string;
  category: string;
  level: number;
  date: string;
  hasFire?: boolean;
}

// Generate random engagement numbers
const randomLikes = () => Math.floor(Math.random() * 151) + 50; // 50-200
const randomComments = () => Math.floor(Math.random() * 131) + 20; // 20-150
const timeAgos = ['2h ago', '3h ago', '5h ago', '8h ago', '12h ago', '1d ago', '2d ago', '3d ago'];
const categories = ['Discuss', 'Win', 'Question', 'Share'];
const randomTime = () => timeAgos[Math.floor(Math.random() * timeAgos.length)];
const randomCategory = () => categories[Math.floor(Math.random() * categories.length)];
const randomLevel = () => Math.floor(Math.random() * 7) + 2; // 2-8

const initialWins: WinReview[] = [
  { id: 1, name: "Sebastian Schroeder", content: "Got 3 collections removed in my first month! Before joining The Credit Hub I had no idea where to start with my credit repair journey. The team walked me through every dispute letter, every strategy, and held me accountable. My score jumped 85 points in just 30 days. This community is the real deal!", likes: 47, comments: 23, timeAgo: "1d ago", category: "Win", level: 4, date: "Jan '26", hasFire: true },
  { id: 2, name: "Daner Bervari", content: "The Credit Hub has been, since I joined, a place of real financial transformation. For the first time, I understood how credit actually works and felt the accountability pushing me to take action on my disputes. This is the only community where I feel like people genuinely want to see me win financially.", likes: 35, comments: 18, timeAgo: "Jun 27", category: "Win", level: 4, date: "Jun '25", hasFire: true },
  { id: 3, name: "Amber Huttenlocker", content: "Score went from 520 to 720 in 6 months! The Credit Hub gave me a clear roadmap and the confidence to take control of my financial future.", likes: 24, comments: 10, timeAgo: "3d ago", category: "Win", level: 4, date: "Jan '26" },
  { id: 4, name: "Nathan Archer", content: "The Credit Hub helped me understand that credit repair isn't a mystery - it's a system. The community shares real strategies, real dispute templates, and real results. I went from being denied everywhere to getting approved for a $25K business line of credit. The diversity of knowledge here is incredible - people helping each other with everything from personal credit to business funding.", likes: 42, comments: 20, timeAgo: "Jun 27", category: "Discuss", level: 3, date: "Jun '25", hasFire: true },
  { id: 5, name: "David Martinez", content: "Approved for $50K in business funding! My credit goals are finally getting done. I've never been more consistent with my financial strategy!", likes: 19, comments: 8, timeAgo: "Jun 27", category: "Win", level: 3, date: "Jun '25" },
  { id: 6, name: "Reema Rana", content: "I'm deeply grateful for The Credit Hub community. When I found this group I was overwhelmed by debt and had no idea how to fix my credit. Being here, surrounded by people who've been through the same struggles, I don't feel alone anymore. Every day I learn something new - dispute strategies, funding hacks, credit card stacking techniques. It's made me believe in my financial future!", likes: 38, comments: 17, timeAgo: "Jul 4", category: "Win", level: 5, date: "Jul '25", hasFire: true },
  { id: 7, name: "Alex Thompson", content: "Just got my first tradeline added and my score bumped 40 points overnight! The knowledge shared on tonight's call was incredible. The dedication everyone shows here to helping each other level up financially is inspiring!", likes: 15, comments: 6, timeAgo: "22h ago", category: "Share", level: 6, date: "Jan '26" },
  { id: 8, name: "Zen Gabriel", content: "Just got APPROVED for my first business credit card - $10K limit! I learned the entire business credit building process inside The Credit Hub, and after working the steps for a few months I finally got that first approval. Having the knowledge and support to make this happen is everything!", likes: 52, comments: 31, timeAgo: "1d ago", category: "Win", level: 3, date: "Jan '26", hasFire: true },
  { id: 9, name: "Rainbow Bird", content: "The Credit Hub is a powerful community that helps me take consistent action toward financial freedom every single day.", likes: 28, comments: 12, timeAgo: "2d ago", category: "Win", level: 5, date: "Jan '26" },
  { id: 10, name: "Rainbow Bird", content: "I just got approved for $75K in total funding across 3 business credit lines! And we're just halfway through the month! This is a next-level improvement in my financial life. My credit score has gone from 580 to 740 since joining. I'm so grateful for the coaching, strategies, and encouragement from this community!", likes: 45, comments: 22, timeAgo: "Aug 23", category: "Win", level: 5, date: "Aug '25", hasFire: true },
  { id: 11, name: "Jessica Williams", content: "Finally found a community where people understand the credit repair journey. The step-by-step dispute process here actually works. Got 5 negative items removed in my first 60 days. Real support and real results.", likes: 29, comments: 13, timeAgo: "8h ago", category: "Win", level: 4, date: "Jan '26" },
  { id: 12, name: "Michael Brown", content: "The knowledge in this community is incredible - people sharing strategies for everything from Section 609 disputes to business credit stacking. No gatekeeping, just real people helping each other build wealth through better credit.", likes: 21, comments: 9, timeAgo: "12h ago", category: "Discuss", level: 5, date: "Jan '26" },
  { id: 13, name: "Sarah Chen", content: "The strategies and support in this community completely transformed my credit profile. Went from a 490 to a 695 and just got approved for my first home loan. I'm in tears!", likes: 18, comments: 7, timeAgo: "15h ago", category: "Win", level: 4, date: "Jan '26" },
  { id: 14, name: "Marcus Rodriguez", content: "This community gets it. Finally found people who understand that bad credit doesn't define you - it's just a starting point. Built my entire business funding portfolio through strategies I learned here.", likes: 25, comments: 11, timeAgo: "18h ago", category: "Win", level: 5, date: "Jan '26" },
  { id: 15, name: "Emily Davis", content: "The energy in this community is incredible. Watching everyone celebrate each other's credit score jumps and funding approvals - this is what financial empowerment looks like.", likes: 33, comments: 15, timeAgo: "20h ago", category: "Discuss", level: 7, date: "Jan '26" },
];

export default function HiddenWins() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showRed, setShowRed] = useState(false);
  const [showGreen, setShowGreen] = useState(false);
  const [showBlue, setShowBlue] = useState(true);
  const [showPurple, setShowPurple] = useState(true);
  const [sliderPosition, setSliderPosition] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const sliderRef = useRef<HTMLDivElement>(null);

  // Draggable wins state - load from localStorage if available
  const [wins, setWins] = useState<WinReview[]>(() => {
    try {
      const savedOrder = localStorage.getItem('theCreditHubWinsOrder');
      if (savedOrder) {
        const orderIds = JSON.parse(savedOrder) as number[];
        if (Array.isArray(orderIds)) {
          // Reorder initialWins based on saved order
          const orderedWins: WinReview[] = [];
          orderIds.forEach(id => {
            const win = initialWins.find(w => w.id === id);
            if (win) orderedWins.push(win);
          });
          // Add any new wins that weren't in the saved order
          initialWins.forEach(win => {
            if (!orderIds.includes(win.id)) orderedWins.push(win);
          });
          return orderedWins;
        }
      }
    } catch {
      // ignore parse errors
    }
    return initialWins;
  });
  const [draggedId, setDraggedId] = useState<number | null>(null);
  const [dragOverId, setDragOverId] = useState<number | null>(null);
  const hasLoadedOrder = useRef(false);

  // Save wins order to localStorage whenever it changes (but not on initial load)
  useEffect(() => {
    if (!hasLoadedOrder.current) {
      hasLoadedOrder.current = true;
      return;
    }
    const orderIds = wins.map(w => w.id);
    localStorage.setItem('theCreditHubWinsOrder', JSON.stringify(orderIds));
  }, [wins]);

  // Edit state
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editContent, setEditContent] = useState("");

  // Card customization
  const [textSize, setTextSize] = useState(14);
  const [cardWidth, setCardWidth] = useState(100);
  const [titleSize, setTitleSize] = useState(90);

  // Hide all cards
  const [hideAllCards, setHideAllCards] = useState(false);

  // Bucket for hidden cards - load from localStorage
  const [hiddenCardIds, setHiddenCardIds] = useState<number[]>(() => {
    try {
      const saved = localStorage.getItem('theCreditHubWinsHidden');
      if (saved) {
        const parsed = JSON.parse(saved) as number[];
        return Array.isArray(parsed) ? parsed : [];
      }
    } catch {
      // ignore parse errors
    }
    return [];
  });
  const [showBucketPanel, setShowBucketPanel] = useState(false);
  const [isDraggingOverBucket, setIsDraggingOverBucket] = useState(false);
  const hasLoadedHidden = useRef(false);

  // Save hidden cards to localStorage whenever they change (but not on initial load)
  useEffect(() => {
    if (!hasLoadedHidden.current) {
      hasLoadedHidden.current = true;
      return;
    }
    localStorage.setItem('theCreditHubWinsHidden', JSON.stringify(hiddenCardIds));
  }, [hiddenCardIds]);

  // Guide positioning (draggable like hidden-reviews)
  const [selectedGuide, setSelectedGuide] = useState<string | null>(null);
  const [guideOffsets, setGuideOffsets] = useState({
    red: 84, green: 84, blue: 84, purple: 84
  });
  const [isGuideDragging, setIsGuideDragging] = useState(false);
  const guideDragStartY = useRef(0);
  const guideDragStartOffset = useRef(0);

  const handleGuideMouseDown = (e: React.MouseEvent, guide: string) => {
    e.preventDefault();
    setSelectedGuide(guide);
    setIsGuideDragging(true);
    guideDragStartY.current = e.clientY;
    guideDragStartOffset.current = guideOffsets[guide as keyof typeof guideOffsets];
  };

  useEffect(() => {
    const handleGuideMouseMove = (e: MouseEvent) => {
      if (isGuideDragging && selectedGuide) {
        const deltaY = e.clientY - guideDragStartY.current;
        const newOffset = Math.max(0, guideDragStartOffset.current + deltaY);
        setGuideOffsets(prev => ({ ...prev, [selectedGuide]: newOffset }));
      }
    };
    const handleGuideMouseUp = () => setIsGuideDragging(false);

    if (isGuideDragging) {
      window.addEventListener('mousemove', handleGuideMouseMove);
      window.addEventListener('mouseup', handleGuideMouseUp);
    }
    return () => {
      window.removeEventListener('mousemove', handleGuideMouseMove);
      window.removeEventListener('mouseup', handleGuideMouseUp);
    };
  }, [isGuideDragging, selectedGuide]);

  // Sync slider with scroll
  useEffect(() => {
    const handleScroll = () => {
      if (!isDragging) {
        const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = maxScroll > 0 ? (window.scrollY / maxScroll) * 100 : 0;
        setSliderPosition(scrollPercent);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isDragging]);

  const handleSliderDrag = useCallback((e: React.MouseEvent | MouseEvent) => {
    if (!sliderRef.current) return;
    const rect = sliderRef.current.getBoundingClientRect();
    const y = Math.max(0, Math.min(e.clientY - rect.top, rect.height));
    const percent = (y / rect.height) * 100;
    setSliderPosition(percent);
    // Calculate max scroll based on full document height
    const docHeight = Math.max(
      document.body.scrollHeight,
      document.body.offsetHeight,
      document.documentElement.clientHeight,
      document.documentElement.scrollHeight,
      document.documentElement.offsetHeight
    );
    const maxScroll = docHeight - window.innerHeight;
    if (maxScroll > 0) {
      window.scroll(0, (percent / 100) * maxScroll);
    }
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) handleSliderDrag(e);
    };
    const handleMouseUp = () => setIsDragging(false);
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, handleSliderDrag]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Generate avatar color based on name
  const getAvatarColor = (name: string) => {
    const colors = [
      '#E91E63', '#9C27B0', '#673AB7', '#3F51B5', '#2196F3',
      '#03A9F4', '#00BCD4', '#009688', '#4CAF50', '#8BC34A',
      '#FF9800', '#FF5722', '#795548', '#607D8B', '#F44336'
    ];
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    return colors[Math.abs(hash) % colors.length];
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  const getProfilePhoto = (_name: string) => {
    // Profile photos removed - using initials instead
    return null;
  };

  // Drag and drop handlers
  const handleDragStart = (e: React.DragEvent, id: number) => {
    setDraggedId(id);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent, id: number) => {
    e.preventDefault();
    if (draggedId !== id) {
      setDragOverId(id);
    }
  };

  const handleDragLeave = () => {
    setDragOverId(null);
  };

  const handleDrop = (e: React.DragEvent, targetId: number) => {
    e.preventDefault();
    if (draggedId === null || draggedId === targetId) return;

    const newWins = [...wins];
    const draggedIndex = newWins.findIndex(w => w.id === draggedId);
    const targetIndex = newWins.findIndex(w => w.id === targetId);

    // Swap positions
    [newWins[draggedIndex], newWins[targetIndex]] = [newWins[targetIndex], newWins[draggedIndex]];

    setWins(newWins);
    setDraggedId(null);
    setDragOverId(null);
  };

  const handleDragEnd = () => {
    setDraggedId(null);
    setDragOverId(null);
    setIsDraggingOverBucket(false);
  };

  // Bucket handlers
  const handleBucketDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDraggingOverBucket(true);
  };

  const handleBucketDragLeave = () => {
    setIsDraggingOverBucket(false);
  };

  const handleBucketDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (draggedId !== null) {
      setHiddenCardIds(prev => [...prev, draggedId]);
    }
    setDraggedId(null);
    setIsDraggingOverBucket(false);
  };

  const restoreCard = (id: number) => {
    setHiddenCardIds(prev => prev.filter(cardId => cardId !== id));
  };

  const restoreAllCards = () => {
    setHiddenCardIds([]);
    setShowBucketPanel(false);
  };

  // Edit handlers
  const handleStartEdit = (review: WinReview) => {
    setEditingId(review.id);
    setEditContent(review.content);
  };

  const handleSaveEdit = () => {
    if (editingId === null) return;
    setWins(wins.map(w =>
      w.id === editingId ? { ...w, content: editContent } : w
    ));
    setEditingId(null);
    setEditContent("");
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditContent("");
  };

  return (
    <div className="relative min-h-screen overflow-hidden" style={{ backgroundColor: ORANGE_BG }}>
      {/* Background graphic elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Large decorative circles */}
        <div
          className="absolute -top-32 -right-32 w-[600px] h-[600px] rounded-full opacity-20"
          style={{ backgroundColor: BLUE }}
        />
        <div
          className="absolute -bottom-48 -left-48 w-[500px] h-[500px] rounded-full opacity-15"
          style={{ backgroundColor: BLUE }}
        />
        {/* Diagonal stripes */}
        <div className="absolute top-0 right-0 w-full h-full opacity-5">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute h-[2px] w-[200%] origin-left"
              style={{
                backgroundColor: BLUE,
                top: `${i * 120}px`,
                left: '-50%',
                transform: 'rotate(-15deg)'
              }}
            />
          ))}
        </div>
      </div>

      {/* Crop guides - all same 1400:790 aspect ratio, different scales */}

      {/* 2 rows - 1400x790 (1x scale) */}
      {showRed && (
        <div
          className={`fixed z-[9999] ${selectedGuide === 'red' ? 'cursor-move' : 'pointer-events-none'}`}
          style={{
            width: '1400px',
            height: '790px',
            border: `4px dashed ${selectedGuide === 'red' ? '#FF0000' : '#FF000080'}`,
            boxSizing: 'border-box',
            top: `${guideOffsets.red}px`,
            left: '50%',
            transform: 'translateX(-50%)'
          }}
          onMouseDown={(e) => selectedGuide === 'red' && handleGuideMouseDown(e, 'red')}
        />
      )}

      {/* 3 rows - 1750x988 (1.25x scale) */}
      {showGreen && (
        <div
          className={`fixed z-[9998] ${selectedGuide === 'green' ? 'cursor-move' : 'pointer-events-none'}`}
          style={{
            width: '1750px',
            height: '988px',
            border: `4px dashed ${selectedGuide === 'green' ? '#00FF00' : '#00FF0080'}`,
            boxSizing: 'border-box',
            top: `${guideOffsets.green}px`,
            left: '50%',
            transform: 'translateX(-50%)'
          }}
          onMouseDown={(e) => selectedGuide === 'green' && handleGuideMouseDown(e, 'green')}
        />
      )}

      {/* 4 rows - 2100x1185 (1.5x scale) */}
      {showBlue && (
        <div
          className={`fixed z-[9997] ${selectedGuide === 'blue' ? 'cursor-move' : 'pointer-events-none'}`}
          style={{
            width: '2100px',
            height: '1185px',
            border: `4px dashed ${selectedGuide === 'blue' ? '#0088FF' : '#0088FF80'}`,
            boxSizing: 'border-box',
            top: `${guideOffsets.blue}px`,
            left: '50%',
            transform: 'translateX(-50%)'
          }}
          onMouseDown={(e) => selectedGuide === 'blue' && handleGuideMouseDown(e, 'blue')}
        />
      )}

      {/* 5+ rows - 2800x1580 (2x scale) */}
      {showPurple && (
        <div
          className={`fixed z-[9996] ${selectedGuide === 'purple' ? 'cursor-move' : 'pointer-events-none'}`}
          style={{
            width: '2800px',
            height: '1580px',
            border: `4px dashed ${selectedGuide === 'purple' ? '#FF00FF' : '#FF00FF80'}`,
            boxSizing: 'border-box',
            top: `${guideOffsets.purple}px`,
            left: '50%',
            transform: 'translateX(-50%)'
          }}
          onMouseDown={(e) => selectedGuide === 'purple' && handleGuideMouseDown(e, 'purple')}
        />
      )}

      {/* Vertical Scroll Slider */}
      <div
        ref={sliderRef}
        className="cursor-pointer"
        style={{
          position: 'fixed',
          right: '16px',
          top: '80px',
          bottom: '80px',
          width: '12px',
          backgroundColor: 'rgba(0,0,0,0.2)',
          borderRadius: '9999px',
          zIndex: 10000
        }}
        onClick={handleSliderDrag}
      >
        <div
          className="cursor-grab active:cursor-grabbing"
          style={{
            position: 'absolute',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '24px',
            height: '24px',
            backgroundColor: '#3b82f6',
            borderRadius: '9999px',
            boxShadow: '0 4px 6px rgba(0,0,0,0.3)',
            border: '2px solid white',
            top: `calc(${sliderPosition}% - 12px)`
          }}
          onMouseDown={(e) => {
            e.preventDefault();
            setIsDragging(true);
          }}
        />
      </div>

      <motion.nav
        className="fixed top-0 left-0 right-0 z-50 bg-black"
        style={{ boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)' }}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <a href="/" className="flex items-center space-x-3">
              <span className="font-bold font-space-grotesk text-white" style={{ fontSize: 'clamp(1.05rem, 2vw, 1.35rem)' }}>
                The Credit Hub
              </span>
            </a>

            {/* Guide toggles */}
            <div className="hidden md:flex items-center gap-2">
              <button
                onClick={() => { if (!showRed) setShowRed(true); setSelectedGuide(selectedGuide === 'red' ? null : 'red'); }}
                onDoubleClick={() => setShowRed(!showRed)}
                className={`w-6 h-6 rounded border-2 ${showRed ? 'bg-red-500 border-red-500' : 'bg-transparent border-red-500'} ${selectedGuide === 'red' ? 'ring-2 ring-white' : ''}`}
                title="Click to select, double-click to toggle (2 rows)"
              />
              <button
                onClick={() => { if (!showGreen) setShowGreen(true); setSelectedGuide(selectedGuide === 'green' ? null : 'green'); }}
                onDoubleClick={() => setShowGreen(!showGreen)}
                className={`w-6 h-6 rounded border-2 ${showGreen ? 'bg-green-500 border-green-500' : 'bg-transparent border-green-500'} ${selectedGuide === 'green' ? 'ring-2 ring-white' : ''}`}
                title="Click to select, double-click to toggle (3 rows)"
              />
              <button
                onClick={() => { if (!showBlue) setShowBlue(true); setSelectedGuide(selectedGuide === 'blue' ? null : 'blue'); }}
                onDoubleClick={() => setShowBlue(!showBlue)}
                className={`w-6 h-6 rounded border-2 ${showBlue ? 'bg-blue-500 border-blue-500' : 'bg-transparent border-blue-500'} ${selectedGuide === 'blue' ? 'ring-2 ring-white' : ''}`}
                title="Click to select, double-click to toggle (4 rows)"
              />
              <button
                onClick={() => { if (!showPurple) setShowPurple(true); setSelectedGuide(selectedGuide === 'purple' ? null : 'purple'); }}
                onDoubleClick={() => setShowPurple(!showPurple)}
                className={`w-6 h-6 rounded border-2 ${showPurple ? 'bg-purple-500 border-purple-500' : 'bg-transparent border-purple-500'} ${selectedGuide === 'purple' ? 'ring-2 ring-white' : ''}`}
                title="Click to select, double-click to toggle (5+ rows)"
              />
              <button
                onClick={() => { setShowRed(false); setShowGreen(false); setShowBlue(false); setShowPurple(false); setSelectedGuide(null); }}
                className="ml-2 px-2 py-1 bg-gray-700 text-white text-xs rounded hover:bg-gray-600"
              >
                Hide All
              </button>

              {/* Text size control */}
              <div className="ml-4 flex items-center gap-1">
                <span className="text-white text-xs">Text:</span>
                <button
                  onClick={() => setTextSize(s => Math.max(10, s - 1))}
                  className="w-6 h-6 bg-gray-700 text-white text-xs rounded hover:bg-gray-600"
                >
                  -
                </button>
                <span className="text-white text-xs w-6 text-center">{textSize}</span>
                <button
                  onClick={() => setTextSize(s => Math.min(24, s + 1))}
                  className="w-6 h-6 bg-gray-700 text-white text-xs rounded hover:bg-gray-600"
                >
                  +
                </button>
              </div>

              {/* Card width control */}
              <div className="ml-2 flex items-center gap-1">
                <span className="text-white text-xs">Width:</span>
                <button
                  onClick={() => setCardWidth(w => Math.max(70, w - 5))}
                  className="w-6 h-6 bg-gray-700 text-white text-xs rounded hover:bg-gray-600"
                >
                  -
                </button>
                <span className="text-white text-xs w-8 text-center">{cardWidth}%</span>
                <button
                  onClick={() => setCardWidth(w => Math.min(150, w + 5))}
                  className="w-6 h-6 bg-gray-700 text-white text-xs rounded hover:bg-gray-600"
                >
                  +
                </button>
              </div>

              {/* Title size control */}
              <div className="ml-2 flex items-center gap-1">
                <span className="text-white text-xs">Title:</span>
                <button
                  onClick={() => setTitleSize(s => Math.max(40, s - 4))}
                  className="w-6 h-6 bg-gray-700 text-white text-xs rounded hover:bg-gray-600"
                >
                  -
                </button>
                <span className="text-white text-xs w-6 text-center">{titleSize}</span>
                <button
                  onClick={() => setTitleSize(s => Math.min(120, s + 4))}
                  className="w-6 h-6 bg-gray-700 text-white text-xs rounded hover:bg-gray-600"
                >
                  +
                </button>
              </div>
            </div>

            <button
              className="md:hidden p-2 text-white"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </motion.nav>

      <div className="pb-16 px-4 sm:px-6 lg:px-8" style={{ paddingTop: '208px' }}>
        <div className="max-w-[1600px] mx-auto">
          <motion.div
            className="text-center mb-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h1
              className="font-black font-space-grotesk tracking-tight"
              style={{
                color: BLUE,
                WebkitTextStroke: '2px ' + BLUE,
                paintOrder: 'stroke fill',
                fontSize: `${titleSize}px`
              }}
            >
              COMMUNITY WINS
            </h1>
          </motion.div>

          {!hideAllCards && (
            <motion.div
            className="columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-x-2"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {wins.filter(w => !hiddenCardIds.includes(w.id)).map((review) => (
              <div
                key={review.id}
                className={`relative group cursor-grab active:cursor-grabbing break-inside-avoid mb-2 ${dragOverId === review.id ? 'ring-2 ring-blue-500 ring-offset-2' : ''} ${draggedId === review.id ? 'opacity-50' : ''}`}
                draggable
                onDragStart={(e) => handleDragStart(e, review.id)}
                onDragOver={(e) => handleDragOver(e, review.id)}
                onDragLeave={handleDragLeave}
                onDrop={(e) => handleDrop(e, review.id)}
                onDragEnd={handleDragEnd}
              >
                {/* Skool Post Card - Matching post2 design */}
                <div
                  className="rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer relative"
                  style={{ backgroundColor: '#f8f9fa' }}
                  onClick={() => handleStartEdit(review)}
                >
                  {/* Action icons - appear on hover */}
                  <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                    <button
                      className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center hover:bg-blue-600"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleStartEdit(review);
                      }}
                      title="Edit this card"
                    >
                      <Pencil className="w-4 h-4 text-white" />
                    </button>
                    <button
                      className="w-8 h-8 rounded-full bg-red-500 flex items-center justify-center hover:bg-red-600"
                      onClick={(e) => {
                        e.stopPropagation();
                        setHiddenCardIds(prev => [...prev, review.id]);
                      }}
                      title="Hide this card"
                    >
                      <Trash2 className="w-4 h-4 text-white" />
                    </button>
                  </div>
                  {/* Header */}
                  <div className="p-3 pb-2">
                    <span className="font-semibold text-gray-900" style={{ fontSize: '15px' }}>
                      {review.name}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="px-3 pb-3 pt-0">
                    {editingId === review.id ? (
                      <div className="space-y-2" onClick={(e) => e.stopPropagation()}>
                        <textarea
                          value={editContent}
                          onChange={(e) => setEditContent(e.target.value)}
                          className="w-full p-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                          rows={4}
                          autoFocus
                        />
                        <div className="flex gap-2">
                          <button
                            onClick={handleSaveEdit}
                            className="px-3 py-1 bg-blue-500 text-white text-xs rounded-lg hover:bg-blue-600"
                          >
                            Save
                          </button>
                          <button
                            onClick={handleCancelEdit}
                            className="px-3 py-1 bg-gray-200 text-gray-700 text-xs rounded-lg hover:bg-gray-300"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    ) : (
                      <p className="text-gray-700 leading-relaxed" style={{ fontSize: `${textSize}px` }}>
                        {review.content}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
          )}
        </div>
      </div>

      {/* Hide All Cards Button - Bottom Left */}
      <button
        onClick={() => setHideAllCards(!hideAllCards)}
        className="fixed bottom-8 left-8 z-[10001] px-6 py-3 rounded-xl font-bold shadow-lg transition-all hover:scale-105"
        style={{
          backgroundColor: hideAllCards ? BLUE : '#000000',
          color: '#ffffff'
        }}
      >
        {hideAllCards ? 'Show All Cards' : 'Hide All Cards'}
      </button>

      {/* Hide All Lines Button - Bottom Left, above Hide Cards */}
      <button
        onClick={() => {
          const allHidden = !showRed && !showGreen && !showBlue && !showPurple;
          if (allHidden) {
            setShowRed(true);
            setShowGreen(true);
            setShowBlue(true);
            setShowPurple(true);
          } else {
            setShowRed(false);
            setShowGreen(false);
            setShowBlue(false);
            setShowPurple(false);
            setSelectedGuide(null);
          }
        }}
        className="fixed bottom-24 left-8 z-[10001] px-6 py-3 rounded-xl font-bold shadow-lg transition-all hover:scale-105"
        style={{
          backgroundColor: (!showRed && !showGreen && !showBlue && !showPurple) ? BLUE : '#000000',
          color: '#ffffff'
        }}
      >
        {(!showRed && !showGreen && !showBlue && !showPurple) ? 'Show All Lines' : 'Hide All Lines'}
      </button>

      {/* Bucket Drop Zone - Bottom Left */}
      <div
        className={`fixed bottom-40 left-8 z-[10001] w-16 h-16 rounded-xl flex items-center justify-center cursor-pointer transition-all shadow-lg ${
          isDraggingOverBucket ? 'scale-125 bg-red-500' : 'bg-gray-800 hover:bg-gray-700'
        }`}
        onDragOver={handleBucketDragOver}
        onDragLeave={handleBucketDragLeave}
        onDrop={handleBucketDrop}
        onClick={() => setShowBucketPanel(!showBucketPanel)}
        title="Drag cards here to hide them"
      >
        <Archive className="w-8 h-8 text-white" />
        {hiddenCardIds.length > 0 && (
          <div className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
            {hiddenCardIds.length}
          </div>
        )}
      </div>

      {/* Bucket Panel - Shows hidden cards */}
      {showBucketPanel && hiddenCardIds.length > 0 && (
        <div className="fixed bottom-40 left-28 z-[10002] w-80 max-h-96 bg-white rounded-xl shadow-2xl overflow-hidden">
          <div className="p-4 bg-gray-800 text-white flex justify-between items-center">
            <span className="font-bold">Hidden Cards ({hiddenCardIds.length})</span>
            <button
              onClick={restoreAllCards}
              className="text-xs bg-blue-500 px-3 py-1 rounded hover:bg-blue-600"
            >
              Restore All
            </button>
          </div>
          <div className="max-h-72 overflow-y-auto">
            {hiddenCardIds.map(id => {
              const card = wins.find(w => w.id === id);
              if (!card) return null;
              return (
                <div
                  key={id}
                  className="p-3 border-b border-gray-100 hover:bg-gray-50 cursor-pointer flex justify-between items-center"
                  onClick={() => restoreCard(id)}
                >
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-sm text-gray-900">{card.name}</p>
                    <p className="text-xs text-gray-500 truncate">{card.content.slice(0, 50)}...</p>
                  </div>
                  <span className="text-xs text-blue-500 ml-2 flex-shrink-0">Restore</span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      <motion.footer
        className="relative z-20 py-10 w-full"
        style={{ backgroundColor: ORANGE_BG }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.8 }}
      >
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-8">
            <a href="/" className="flex-shrink-0">
              <span className="font-bold text-2xl" style={{ color: BLUE }}>
                The Credit Hub
              </span>
            </a>

            <div className="flex flex-wrap justify-center md:justify-end gap-6 text-sm items-center">
              <a href="/" className="transition-colors duration-200 font-space-grotesk" style={{ color: BLUE }}>
                Home
              </a>
              <a href="https://www.skool.com/tch" target="_blank" rel="noopener noreferrer" className="transition-colors duration-200 font-space-grotesk" style={{ color: BLUE }}>
                Community
              </a>
            </div>
          </div>

          <div className="w-full flex justify-center pt-6" style={{ borderTop: `1px solid ${BLUE}30` }}>
            <p className="text-sm font-space-grotesk" style={{ color: BLUE, opacity: 0.7 }}>
              © 2026 The Credit Hub. All rights reserved.
            </p>
          </div>
        </div>
      </motion.footer>
    </div>
  );
}