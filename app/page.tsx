'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles, Zap, BarChart3, Share2 } from 'lucide-react';
import { motion } from 'framer-motion';
import Navbar from '@/components/navbar';

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gradient-to-br from-white via-primary-50 to-white dark:from-dark-950 dark:via-dark-900 dark:to-dark-950">
        {/* Hero Section */}
        <section className="px-4 py-20 sm:py-32 md:py-40">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center"
          >
            <div className="mb-6 inline-block">
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 text-sm font-medium">
                <Sparkles className="w-4 h-4" />
                AI-Powered Portfolio Builder
              </div>
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 leading-tight">
              Create your professional portfolio in{' '}
              <span className="gradient-text">minutes</span>
            </h1>

            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed">
              Upload your resume, add your projects, and let AI generate a beautiful,
              professional portfolio website tailored to your skills.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              <Link href="/sign-up">
                <Button size="lg" className="gap-2">
                  Get Started Free
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
              <Link href="#demo">
                <Button variant="outline" size="lg">
                  View Demo
                </Button>
              </Link>
            </div>

            {/* Hero Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="rounded-2xl border border-gray-200 dark:border-dark-700 overflow-hidden shadow-2xl"
            >
              <div className="bg-gradient-to-br from-primary-500 to-primary-600 h-96 flex items-center justify-center text-white">
                <div className="text-center">
                  <Sparkles className="w-16 h-16 mx-auto mb-4 opacity-50" />
                  <p className="text-lg font-semibold">Portfolio Preview Coming</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </section>

        {/* Features Section */}
        <section className="px-4 py-20 max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="section-title mb-4">Powerful Features</h2>
            <p className="section-subtitle">Everything you need to showcase your work</p>
          </motion.div>

          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {[
              {
                icon: Sparkles,
                title: 'AI-Powered Optimization',
                description:
                  'Let AI enhance your bio, rewrite project descriptions professionally, and suggest relevant skills.',
              },
              {
                icon: Zap,
                title: 'Resume Parsing',
                description:
                  'Upload your resume and we automatically extract your skills, education, and experience.',
              },
              {
                icon: Share2,
                title: 'Easy Sharing',
                description:
                  'Get a unique URL for your portfolio and share it anywhere - portfolios/username.',
              },
              {
                icon: BarChart3,
                title: 'SEO Optimized',
                description:
                  'Your portfolio is fully SEO optimized so you rank higher in search results.',
              },
              {
                icon: Sparkles,
                title: 'Multiple Themes',
                description:
                  'Choose from multiple professional themes and switch between them instantly.',
              },
              {
                icon: Zap,
                title: 'Mobile Responsive',
                description:
                  'Your portfolio looks perfect on all devices - desktop, tablet, and mobile.',
              },
            ].map((feature, idx) => (
              <motion.div key={idx} variants={item} className="card p-8">
                <feature.icon className="w-12 h-12 text-primary-600 mb-4" />
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600 dark:text-gray-400">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* How It Works */}
        <section className="px-4 py-20 max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="section-title mb-4">How It Works</h2>
            <p className="section-subtitle">Three simple steps to your perfect portfolio</p>
          </motion.div>

          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid md:grid-cols-3 gap-8"
          >
            {[
              {
                step: '1',
                title: 'Upload Resume',
                description: 'Upload your resume in PDF or DOCX format',
              },
              {
                step: '2',
                title: 'Add Your Projects',
                description: 'Add your best projects with descriptions and links',
              },
              {
                step: '3',
                title: 'Publish & Share',
                description: 'Get your portfolio URL and share it with the world',
              },
            ].map((step, idx) => (
              <motion.div key={idx} variants={item} className="relative">
                <div className="card p-8 text-center h-full">
                  <div className="w-16 h-16 rounded-full bg-primary-600 text-white flex items-center justify-center font-bold text-2xl mx-auto mb-4">
                    {step.step}
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400">{step.description}</p>
                </div>
                {idx < 2 && (
                  <div className="hidden md:flex absolute top-1/2 -right-4 -translate-y-1/2 text-primary-600 text-2xl">
                    →
                  </div>
                )}
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* Pricing Section */}
        <section className="px-4 py-20 max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="section-title mb-4">Simple Pricing</h2>
            <p className="section-subtitle">Start free, upgrade anytime</p>
          </motion.div>

          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid md:grid-cols-3 gap-8"
          >
            {[
              {
                name: 'Starter',
                price: 'Free',
                description: 'Perfect for getting started',
                features: ['1 Portfolio', 'Basic Themes', 'Resume Upload', 'Project Showcase'],
              },
              {
                name: 'Pro',
                price: '$9',
                period: '/month',
                description: 'For professionals',
                features: [
                  'Unlimited Portfolios',
                  'All Themes',
                  'AI Optimization',
                  'Analytics',
                  'Priority Support',
                ],
                highlighted: true,
              },
              {
                name: 'Agency',
                price: '$29',
                period: '/month',
                description: 'For agencies',
                features: [
                  'Unlimited Everything',
                  'Team Management',
                  'Custom Domain',
                  'API Access',
                  'Dedicated Support',
                ],
              },
            ].map((plan, idx) => (
              <motion.div
                key={idx}
                variants={item}
                className={`card p-8 relative ${plan.highlighted ? 'ring-2 ring-primary-600 md:scale-105' : ''}`}
              >
                {plan.highlighted && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    Most Popular
                  </div>
                )}
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <div className="mb-4">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  {plan.period && <span className="text-gray-600 dark:text-gray-400">{plan.period}</span>}
                </div>
                <p className="text-gray-600 dark:text-gray-400 mb-6">{plan.description}</p>
                <Button className="w-full mb-8" variant={plan.highlighted ? 'default' : 'outline'}>
                  Get Started
                </Button>
                <ul className="space-y-3">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex gap-3">
                      <span className="text-primary-600">✓</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* CTA Section */}
        <section className="px-4 py-20 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="card p-12 text-center bg-gradient-to-br from-primary-600 to-primary-700 text-white"
          >
            <h2 className="text-4xl font-bold mb-4">Ready to showcase your work?</h2>
            <p className="text-primary-100 text-lg mb-8">
              Join thousands of professionals who've created their perfect portfolio with FolioAI.
            </p>
            <Link href="/sign-up">
              <Button size="lg" variant="secondary">
                Get Started for Free
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </motion.div>
        </section>

        {/* Footer */}
        <footer className="border-t border-gray-200 dark:border-dark-700 px-4 py-12 mt-20">
          <div className="max-w-6xl mx-auto text-center text-gray-600 dark:text-gray-400">
            <p>&copy; 2024 FolioAI. All rights reserved.</p>
          </div>
        </footer>
      </main>
    </>
  );
}
