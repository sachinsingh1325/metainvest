import { useState, useEffect, useRef } from 'react';
import { 
  FiArrowRight, 
  FiCheckCircle, 
  FiDownload, 
  FiGlobe,
//   FiLeaf,
//   FiRecycle,
  FiTrendingUp,
  FiUsers,
  FiZap,
  FiMap,
  FiShield,
  FiClock,
  FiBarChart2,
  FiTarget,
  FiChevronRight,
  FiEye
} from 'react-icons/fi';
import { motion, useInView } from 'framer-motion';
import CountUp from 'react-countup';

const WasteJourneyPage = () => {
  const [activeStep, setActiveStep] = useState(0);
  const timelineRef = useRef(null);
  const isInView = useInView(timelineRef, { once: true, amount: 0.3 });

  // Timeline steps data
  const timelineSteps = [
    {
      id: 1,
      title: "User Action",
      description: "You purchase carbon credits or recycle waste",
      icon: <FiUsers className="w-6 h-6" />,
      color: "from-emerald-400 to-green-500",
      bgColor: "bg-emerald-50",
      borderColor: "border-emerald-200"
    },
    {
      id: 2,
      title: "Collection",
      description: "Waste/offset request collected & logged",
    //   icon: <FiRecycle className="w-6 h-6" />,
      color: "from-teal-400 to-cyan-500",
      bgColor: "bg-teal-50",
      borderColor: "border-teal-200"
    },
    {
      id: 3,
      title: "Processing",
      description: "Sorted, measured, and quality verified",
      icon: <FiBarChart2 className="w-6 h-6" />,
      color: "from-blue-400 to-indigo-500",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200"
    },
    {
      id: 4,
      title: "Conversion",
      description: "Converted into carbon offset units",
      icon: <FiZap className="w-6 h-6" />,
      color: "from-purple-400 to-fuchsia-500",
      bgColor: "bg-purple-50",
      borderColor: "border-purple-200"
    },
    {
      id: 5,
      title: "Verification",
      description: "Verified by certified registries",
      icon: <FiShield className="w-6 h-6" />,
      color: "from-amber-400 to-yellow-500",
      bgColor: "bg-amber-50",
      borderColor: "border-amber-200"
    },
    {
      id: 6,
      title: "Impact",
      description: "Funds forest restoration & clean energy",
    //   icon: <FiLeaf className="w-6 h-6" />,
      color: "from-green-400 to-emerald-500",
      bgColor: "bg-green-50",
      borderColor: "border-green-200"
    }
  ];

  // Impact metrics data
  const impactMetrics = [
    {
      id: 1,
      title: "Total Waste Processed",
      value: 12500,
      unit: "kg",
    //   icon: <FiRecycle className="w-6 h-6" />,
      color: "from-emerald-400 to-green-500",
      description: "Equivalent to 2.5 elephants"
    },
    {
      id: 2,
      title: "Carbon Reduced",
      value: 850,
      unit: "tCO₂",
    //   icon: <FiLeaf className="w-6 h-6" />,
      color: "from-teal-400 to-cyan-500",
      description: "Like planting 7,000 trees"
    },
    {
      id: 3,
      title: "Energy Saved",
      value: 420,
      unit: "MWh",
      icon: <FiZap className="w-6 h-6" />,
      color: "from-amber-400 to-yellow-500",
      description: "Powers 350 homes for a month"
    },
    {
      id: 4,
      title: "Trees Equivalent",
      value: 1250,
      unit: "trees",
      icon: <FiTrendingUp className="w-6 h-6" />,
      color: "from-green-400 to-emerald-500",
      description: "Creates a mini forest"
    }
  ];

  // Project locations data
  const projectLocations = [
    { id: 1, name: "Kerala Reforestation", type: "Forestry", credits: 450, lat: 10.85, lng: 76.27 },
    { id: 2, name: "Rajasthan Solar Farm", type: "Renewable", credits: 320, lat: 27.02, lng: 74.22 },
    { id: 3, name: "Goa Beach Cleanup", type: "Conservation", credits: 180, lat: 15.30, lng: 73.91 },
    { id: 4, name: "Himalayan Watershed", type: "Water", credits: 210, lat: 30.73, lng: 79.07 },
    { id: 5, name: "Karnataka Wind Energy", type: "Renewable", credits: 290, lat: 15.32, lng: 75.72 }
  ];

  // Certificates data
  const certificates = [
    {
      id: 1,
      title: "Carbon Neutral Certificate",
      date: "2024-07-15",
      credits: "850 tCO₂",
      registryHash: "0x8a3b9c...d4e5f6",
      downloadUrl: "#"
    },
    {
      id: 2,
      title: "Impact Verification",
      date: "2024-06-30",
      credits: "Gold Tier",
      registryHash: "0x7b2c8d...e9f0a1",
      downloadUrl: "#"
    },
    {
      id: 3,
      title: "Project Funding Proof",
      date: "2024-05-22",
      credits: "1250 trees",
      registryHash: "0x6a1b7c...d8e9f0",
      downloadUrl: "#"
    }
  ];

  // Educational facts
  const educationalFacts = [
    {
      id: 1,
      title: "Every Credit Counts",
      description: "Each carbon credit removes 1 ton of CO₂ from the atmosphere, equivalent to a 2,500-mile car trip.",
      icon: "♻️"
    },
    {
      id: 2,
      title: "Verified Impact",
      description: "All projects are third-party verified to ensure real, measurable environmental benefits.",
      icon: "✅"
    },
    {
      id: 3,
      title: "Sustainable Future",
      description: "Your participation helps fund renewable energy and conservation projects for future generations.",
      icon: "🌱"
    }
  ];

  useEffect(() => {
    if (isInView) {
      const interval = setInterval(() => {
        setActiveStep(prev => (prev + 1) % timelineSteps.length);
      }, 2000);
      return () => clearInterval(interval);
    }
  }, [isInView, timelineSteps.length]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-emerald-50 p-4 sm:p-6 md:p-8 ml-12">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-10 sm:mb-12 md:mb-16"
      >
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-emerald-400 to-green-500 rounded-full mb-4">
          {/* <FiLeaf className="w-4 h-4 text-white" /> */}
          <span className="text-white text-sm font-semibold">Waste Journey</span>
        </div>
        
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 leading-tight">
          Your Waste Journey:
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-green-600">
            From Waste → Impact → Planet Healing
          </span>
        </h1>
        
        <p className="text-gray-600 text-base sm:text-lg md:text-xl max-w-3xl mx-auto mb-8">
          See how your sustainable actions create real environmental impact through 
          our transparent waste-to-value ecosystem.
        </p>

        <div className="flex flex-wrap justify-center gap-4">
          <button className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-green-600 text-white rounded-xl hover:shadow-xl transition-all duration-300 transform hover:scale-105 font-semibold flex items-center gap-2">
            Explore Your Impact <FiChevronRight className="w-5 h-5" />
          </button>
          <button className="px-6 py-3 bg-white text-emerald-600 rounded-xl hover:shadow-lg transition-all duration-300 border border-emerald-200 font-semibold flex items-center gap-2">
            <FiGlobe className="w-5 h-5" />
            View Global Projects
          </button>
        </div>
      </motion.div>

      {/* Interactive Timeline Section */}
      <motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: 0.8, delay: 0.2 }}
  className="mb-12 sm:mb-16 md:mb-20"
>
  <div className="flex items-center justify-center gap-2 mb-8">
    <FiClock className="w-5 h-5 text-emerald-600" />
    <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Waste-to-Impact Timeline</h2>
  </div>

  <div ref={timelineRef} className="relative">
    {/* Desktop Timeline - Horizontal */}
    <div className="hidden md:block">
      <div className="relative h-48">
        {/* Timeline Line */}
        <div className="absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-emerald-400 via-teal-400 to-green-500 rounded-full transform -translate-y-1/2"></div>
        
        {/* Timeline Steps */}
        <div className="relative flex justify-between">
          {timelineSteps.map((step, index) => (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative"
            >
              {/* Timeline Node */}
              <div className="relative z-10">
                <motion.button
                  onClick={() => setActiveStep(index)}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className={`w-16 h-16 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 ${
                    activeStep === index 
                      ? `bg-gradient-to-r ${step.color} transform scale-110`
                      : 'bg-white'
                  }`}
                >
                  <div className={`${activeStep === index ? 'text-white' : 'text-emerald-600'}`}>
                    {step.icon}
                  </div>
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      
      {/* Single Active Card Container (Desktop) */}
      <div className="mt-16 h-64">
        {timelineSteps.map((step, index) => (
          <motion.div
            key={step.id}
            initial={{ opacity: 0, y: 20 }}
            animate={activeStep === index ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
            className={`${activeStep === index ? 'block' : 'hidden'}`}
          >
            <div className={`p-6 rounded-2xl shadow-xl ${step.bgColor} border ${step.borderColor} max-w-2xl mx-auto`}>
              <div className="flex items-center gap-3 mb-4">
                <div className={`p-3 rounded-xl bg-gradient-to-r ${step.color} shadow-md`}>
                  <div className="text-white">
                    {step.icon}
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">{step.title}</h3>
                  <p className="text-sm text-emerald-600 font-semibold">Step {step.id} of 6</p>
                </div>
              </div>
              <p className="text-gray-600 text-lg mb-6">{step.description}</p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${step.color}`}></div>
                  <span className="text-sm text-gray-500">Active Process</span>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => setActiveStep((prev) => (prev > 0 ? prev - 1 : timelineSteps.length - 1))}
                    className="px-4 py-2 bg-white text-emerald-600 rounded-lg hover:bg-emerald-50 transition-colors duration-300 border border-emerald-200 font-semibold"
                  >
                    Previous
                  </button>
                  <button
                    onClick={() => setActiveStep((prev) => (prev < timelineSteps.length - 1 ? prev + 1 : 0))}
                    className="px-4 py-2 bg-gradient-to-r from-emerald-500 to-green-600 text-white rounded-lg hover:shadow-lg transition-all duration-300 font-semibold"
                  >
                    Next Step
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>

    {/* Mobile Timeline - Vertical */}
    <div className="md:hidden">
      <div className="relative">
        {/* Vertical Timeline Line */}
        <div className="absolute left-8 top-0 bottom-0 w-1 bg-gradient-to-b from-emerald-400 to-green-500 rounded-full"></div>
        
        {/* Timeline Steps - Only nodes visible */}
        <div className="space-y-12 pl-16">
          {timelineSteps.map((step, index) => (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative"
            >
              {/* Timeline Node */}
              <div className="absolute -left-12 top-0">
                <motion.button
                  onClick={() => setActiveStep(index)}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className={`w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 ${
                    activeStep === index 
                      ? `bg-gradient-to-r ${step.color} transform scale-110`
                      : 'bg-white'
                  }`}
                >
                  <div className={`${activeStep === index ? 'text-white' : 'text-emerald-600'}`}>
                    {step.icon}
                  </div>
                </motion.button>
              </div>
              
              {/* Mobile card - only visible when active */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={activeStep === index ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className={`${activeStep === index ? 'block' : 'hidden'}`}
              >
                <div className={`p-5 rounded-xl shadow-lg ${step.bgColor} border ${step.borderColor}`}>
                  <div className="flex items-center gap-3 mb-3">
                    <div className={`p-2 rounded-lg bg-gradient-to-r ${step.color}`}>
                      <div className="text-white">
                        {step.icon}
                      </div>
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900">{step.title}</h3>
                      <p className="text-xs text-emerald-600 font-semibold">Step {step.id} of 6</p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mb-4">{step.description}</p>
                  <div className="flex justify-between gap-2">
                    <button
                      onClick={() => setActiveStep((prev) => (prev > 0 ? prev - 1 : timelineSteps.length - 1))}
                      className="flex-1 py-2 bg-white text-emerald-600 rounded-lg hover:bg-emerald-50 transition-colors duration-300 border border-emerald-200 text-sm font-semibold"
                    >
                      Previous
                    </button>
                    <button
                      onClick={() => setActiveStep((prev) => (prev < timelineSteps.length - 1 ? prev + 1 : 0))}
                      className="flex-1 py-2 bg-gradient-to-r from-emerald-500 to-green-600 text-white rounded-lg hover:shadow-lg transition-all duration-300 text-sm font-semibold"
                    >
                      Next
                    </button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
      
      {/* Mobile - Step Navigation Info */}
      <div className="mt-8 text-center">
        <p className="text-sm text-gray-600">
          Step {activeStep + 1} of {timelineSteps.length}
        </p>
        <div className="flex justify-center gap-1 mt-2">
          {timelineSteps.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveStep(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                activeStep === index
                  ? 'bg-gradient-to-r from-emerald-500 to-green-600 w-6'
                  : 'bg-gray-300'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  </div>
</motion.div>

      {/* Impact Cards Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="mb-12 sm:mb-16"
      >
        <div className="flex items-center justify-center gap-2 mb-8">
          <FiTarget className="w-5 h-5 text-emerald-600" />
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Your Impact Metrics</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {impactMetrics.map((metric, index) => (
            <motion.div
              key={metric.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              whileHover={{ y: -5 }}
              className={`bg-white rounded-2xl p-5 sm:p-6 shadow-lg border border-emerald-100/50 hover:shadow-xl transition-all duration-300`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`p-2 bg-gradient-to-r ${metric.color} rounded-lg shadow-md`}>
                  <div className="text-white">
                    {metric.icon}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl sm:text-3xl font-bold text-gray-900">
                    <CountUp end={metric.value} duration={2.5} separator="," />
                    <span className="text-sm text-gray-600 ml-1">{metric.unit}</span>
                  </div>
                </div>
              </div>
              <h3 className="font-bold text-gray-900 text-lg mb-2">{metric.title}</h3>
              <p className="text-sm text-gray-600">{metric.description}</p>
              <div className="mt-4 h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${60 + index * 10}%` }}
                  transition={{ duration: 1.5, delay: index * 0.2 }}
                  className={`h-full bg-gradient-to-r ${metric.color} rounded-full`}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Project Map Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="mb-12 sm:mb-16"
      >
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-2">
            <FiMap className="w-5 h-5 text-emerald-600" />
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Project Impact Map</h2>
          </div>
          <button className="px-4 py-2 text-emerald-600 hover:text-emerald-700 text-sm font-semibold flex items-center gap-1">
            View Details <FiArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-4 sm:p-6 border border-emerald-100/50">
          {/* Simplified Map Visualization */}
          <div className="relative h-64 sm:h-80 md:h-96 bg-gradient-to-br from-emerald-50 to-green-50 rounded-xl border border-emerald-200 overflow-hidden">
            {/* Map Background */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative w-full h-full">
                {/* Map outline */}
                <div className="absolute inset-4 border-2 border-emerald-200 rounded-2xl"></div>
                
                {/* Project Points */}
                {projectLocations.map((project, index) => (
                  <motion.div
                    key={project.id}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className={`absolute w-8 h-8 rounded-full flex items-center justify-center shadow-lg cursor-pointer hover:scale-110 transition-transform duration-300 ${
                      project.type === 'Forestry' ? 'bg-gradient-to-r from-emerald-400 to-green-500' :
                      project.type === 'Renewable' ? 'bg-gradient-to-r from-amber-400 to-yellow-500' :
                      'bg-gradient-to-r from-blue-400 to-cyan-500'
                    }`}
                    style={{
                      left: `${project.lng % 100}%`,
                      top: `${project.lat % 100}%`,
                    }}
                    whileHover={{ scale: 1.2 }}
                  >
                    <div className="text-white text-xs font-bold">{index + 1}</div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Project List */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mt-6">
            {projectLocations.map((project) => (
              <motion.div
                key={project.id}
                whileHover={{ scale: 1.02 }}
                className="bg-gradient-to-br from-gray-50 to-emerald-50 rounded-xl p-4 border border-emerald-200 hover:border-emerald-300 transition-all duration-300"
              >
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold text-gray-900 text-sm">{project.name}</h4>
                  <span className={`px-2 py-1 text-xs font-bold rounded-full ${
                    project.type === 'Forestry' ? 'bg-emerald-100 text-emerald-700' :
                    project.type === 'Renewable' ? 'bg-amber-100 text-amber-700' :
                    'bg-blue-100 text-blue-700'
                  }`}>
                    {project.type}
                  </span>
                </div>
                <p className="text-xs text-gray-600 mb-2">Credits: {project.credits} tCO₂</p>
                <div className="flex items-center text-xs text-emerald-600">
                  <FiCheckCircle className="w-3 h-3 mr-1" />
                  Active Project
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Proof of Impact Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.7 }}
        className="mb-12 sm:mb-16"
      >
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-2">
            <FiShield className="w-5 h-5 text-emerald-600" />
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Proof of Impact</h2>
          </div>
          <button className="px-4 py-2 text-emerald-600 hover:text-emerald-700 text-sm font-semibold">
            View All Certificates
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {certificates.map((cert) => (
            <motion.div
              key={cert.id}
              whileHover={{ y: -5 }}
              className="bg-white rounded-2xl shadow-lg p-5 sm:p-6 border border-emerald-100/50 hover:shadow-xl transition-all duration-300"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="p-3 bg-gradient-to-r from-emerald-400 to-green-500 rounded-xl">
                  <FiDownload className="w-6 h-6 text-white" />
                </div>
                <span className="px-3 py-1 bg-emerald-100 text-emerald-700 text-sm font-bold rounded-full">
                  {cert.credits}
                </span>
              </div>
              
              <h3 className="font-bold text-gray-900 text-lg mb-2">{cert.title}</h3>
              <p className="text-sm text-gray-600 mb-4">Issued: {cert.date}</p>
              
              <div className="space-y-3">
                <div className="p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Registry Hash:</span>
                    <button className="flex items-center gap-1 text-emerald-600 hover:text-emerald-700 font-mono">
                      <FiEye className="w-3 h-3" />
                      {cert.registryHash.substring(0, 10)}...
                    </button>
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <button className="flex-1 py-2.5 bg-gradient-to-r from-emerald-500 to-green-600 text-white rounded-lg hover:shadow-lg transition-all duration-300 font-semibold flex items-center justify-center gap-2">
                    <FiDownload className="w-4 h-4" />
                    Download
                  </button>
                  <button className="px-4 py-2.5 bg-white text-emerald-600 rounded-lg hover:bg-emerald-50 transition-all duration-300 border border-emerald-200 font-semibold">
                    Verify
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Educational Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.8 }}
        className="mb-12 sm:mb-16"
      >
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-emerald-400 to-green-500 rounded-full mb-4">
            {/* <FiLeaf className="w-4 h-4 text-white" /> */}
            <span className="text-white text-sm font-semibold">Why It Matters</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
            Your Journey Creates Real Change
          </h2>
          <p className="text-gray-600 text-base sm:text-lg max-w-3xl mx-auto">
            Every action you take contributes to a cleaner, greener planet. Here's how your 
            participation with Meta Wealth Prime makes a difference.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {educationalFacts.map((fact, index) => (
            <motion.div
              key={fact.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.9 + index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              className="bg-gradient-to-br from-white to-emerald-50 rounded-2xl p-5 sm:p-6 shadow-lg border border-emerald-100/50"
            >
              <div className="text-3xl mb-4">{fact.icon}</div>
              <h3 className="font-bold text-gray-900 text-lg mb-3">{fact.title}</h3>
              <p className="text-gray-600">{fact.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Footer CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1 }}
        className="text-center"
      >
        <div className="bg-gradient-to-r from-emerald-500/10 to-green-600/10 rounded-2xl p-8 sm:p-10 border border-emerald-200">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
            Ready to Amplify Your Impact?
          </h2>
          <p className="text-gray-600 text-base sm:text-lg mb-6 max-w-2xl mx-auto">
            Join thousands of eco-conscious investors making a real difference. 
            Track, grow, and celebrate your environmental impact.
          </p>
          <button className="px-8 py-4 bg-gradient-to-r from-emerald-500 to-green-600 text-white rounded-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 font-bold text-lg flex items-center gap-2 mx-auto">
            Explore Your Impact Dashboard
            <FiChevronRight className="w-6 h-6" />
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default WasteJourneyPage;