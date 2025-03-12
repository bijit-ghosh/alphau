
import React from "react";
import { Shield, Lock, ShieldCheck, Server } from "lucide-react";
import { motion } from "framer-motion";
import { GlassCard } from "./ui/GlassCard";

export function EnterpriseSecuritySection() {
  const securityFeatures = [
    {
      title: "SOC2 I",
      icon: <Shield className="h-8 w-8 text-white" />,
      description: "Compliance with Service Organization Control 2 Type I certification"
    },
    {
      title: "SOC2 II",
      icon: <Shield className="h-8 w-8 text-white" />,
      description: "Advanced compliance with Service Organization Control 2 Type II certification"
    },
    {
      title: "Encrypted in transit and at rest",
      icon: <Lock className="h-8 w-8 text-white" />,
      description: "All data is encrypted using industry-standard protocols both during transmission and storage"
    },
    {
      title: "No training on user data",
      icon: <Server className="h-8 w-8 text-white" />,
      description: "Your proprietary data is never used to train our models or shared with third parties"
    }
  ];

  return (
    <div className="py-20 px-4 md:px-8 bg-alpha-darknavy relative overflow-hidden">
      {/* Background decoration elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-alpha-blue/10 rounded-full filter blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-alpha-purple/10 rounded-full filter blur-3xl translate-x-1/2 translate-y-1/2"></div>
      
      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div 
          className="text-left mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center gap-3 mb-2">
            <ShieldCheck className="h-6 w-6 text-alpha-purple" />
            <h2 className="text-2xl md:text-3xl font-bold text-white">
              Enterprise <span className="bg-clip-text text-transparent bg-gradient-to-r from-alpha-purple to-alpha-blue">Security</span>
            </h2>
          </div>
          <p className="text-gray-300">
            Trusted by the largest and most regulated global institutions
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {securityFeatures.map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 * i }}
            >
              <GlassCard className="h-40 flex flex-col items-center justify-center text-center p-6">
                <div className="mb-3">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-sm text-gray-300">{feature.description}</p>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
