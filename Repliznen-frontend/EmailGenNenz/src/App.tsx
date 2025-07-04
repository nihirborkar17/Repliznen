import React, { useState } from 'react';
import { Mail, Send, Copy, Loader2, Sparkles, MessageSquare, Zap, Shield, Clock } from 'lucide-react';
import axios from 'axios';

function App() {
  const [emailContent, setEmailContent] = useState('');
  const [tone, setTone] = useState('');
  const [generatedReply, setGeneratedReply] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await axios.post("http://localhost:8080/api/email/generate", {
        emailContent,
        tone
      });

      setGeneratedReply(typeof response.data === 'string' ? response.data : JSON.stringify(response.data));
    } catch (error) {
      setError('Failed to generate email reply. Please try again');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(generatedReply);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Sophisticated Header */}
      <header className="relative bg-white/70 backdrop-blur-xl border-b border-white/20 shadow-sm">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-indigo-600/5"></div>
        <div className="relative max-w-6xl mx-auto px-6 py-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl blur-lg opacity-20"></div>
                <div className="relative p-3 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl">
                  <Mail className="w-8 h-8 text-white" />
                </div>
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                  Repliznen
                </h1>
                <p className="text-gray-600 font-medium">Craft replies that resonate</p>
              </div>
            </div>
            <div className="hidden md:flex items-center gap-6 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-blue-600" />
                <span>AI-Powered</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-green-600" />
                <span>Secure</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-purple-600" />
                <span>Instant</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-6 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium mb-6">
            <Sparkles className="w-4 h-4" />
            Transform your email communication
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">
            Professional Email Responses
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
              Generated Instantly
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Leverage advanced AI to create contextual, professional email replies that match your tone and style perfectly.
          </p>
        </div>

        {/* Main Form Card */}
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-indigo-600/10 rounded-3xl blur-3xl"></div>
          <div className="relative bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
            {/* Form Header */}
            <div className="bg-gradient-to-r from-gray-50 to-blue-50/50 px-8 py-6 border-b border-gray-200/50">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 rounded-xl">
                  <MessageSquare className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Email Response Generator</h3>
                  <p className="text-gray-600 text-sm">Paste your email and select a tone to get started</p>
                </div>
              </div>
            </div>

            {/* Form Content */}
            <div className="p-8 space-y-8">
              {/* Email Content Input */}
              <div className="space-y-3">
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-800">
                  <Mail className="w-4 h-4 text-blue-600" />
                  Original Email Content
                </label>
                <div className="relative">
                  <textarea
                    rows={8}
                    className="w-full px-4 py-4 bg-gray-50/50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:bg-white transition-all duration-200 resize-none text-gray-700 placeholder-gray-400"
                    placeholder="Paste the email you want to reply to here. Include as much context as possible for the best results..."
                    value={emailContent}
                    onChange={(e) => setEmailContent(e.target.value)}
                  />
                  <div className="absolute bottom-3 right-3 text-xs text-gray-400">
                    {emailContent.length} characters
                  </div>
                </div>
              </div>

              {/* Tone Selection */}
              <div className="space-y-3">
                <label className="text-sm font-semibold text-gray-800">
                  Response Tone
                </label>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                  {[
                    { value: '', label: 'Auto-detect', desc: 'Let AI choose' },
                    { value: 'Professional', label: 'Professional', desc: 'Formal & polished' },
                    { value: 'Friendly', label: 'Friendly', desc: 'Warm & approachable' },
                    { value: 'Casual', label: 'Casual', desc: 'Relaxed & informal' },
                    { value: 'Enthusiastic', label: 'Enthusiastic', desc: 'Energetic & positive' }
                  ].map((option) => (
                    <button
                      key={option.value}
                      onClick={() => setTone(option.value)}
                      className={`p-4 rounded-xl border-2 transition-all duration-200 text-left ${
                        tone === option.value
                          ? 'border-blue-500 bg-blue-50 shadow-md'
                          : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-sm'
                      }`}
                    >
                      <div className={`font-medium text-sm ${tone === option.value ? 'text-blue-700' : 'text-gray-900'}`}>
                        {option.label}
                      </div>
                      <div className={`text-xs mt-1 ${tone === option.value ? 'text-blue-600' : 'text-gray-500'}`}>
                        {option.desc}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Generate Button */}
              <button
                onClick={handleSubmit}
                disabled={!emailContent || loading}
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 px-8 rounded-2xl font-semibold text-lg hover:from-blue-700 hover:to-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center gap-3 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Generating your perfect reply...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    Generate Professional Reply
                  </>
                )}
              </button>

              {/* Error Message */}
              {error && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-xl">
                  <p className="text-red-700 text-sm font-medium">{error}</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Generated Reply */}
        {generatedReply && (
          <div className="mt-12 relative">
            <div className="absolute inset-0 bg-gradient-to-r from-green-600/10 to-blue-600/10 rounded-3xl blur-3xl"></div>
            <div className="relative bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
              {/* Reply Header */}
              <div className="bg-gradient-to-r from-green-50 to-blue-50/50 px-8 py-6 border-b border-gray-200/50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-green-100 rounded-xl">
                      <Mail className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">Your Generated Reply</h3>
                      <p className="text-gray-600 text-sm">Ready to copy and send</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span>Generated</span>
                  </div>
                </div>
              </div>

              {/* Reply Content */}
              <div className="p-8">
                <div className="relative">
                  <textarea
                    rows={12}
                    className="w-full px-4 py-4 bg-gray-50/50 border border-gray-200 rounded-2xl resize-none text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                    value={generatedReply}
                    readOnly
                  />
                  <button
                    onClick={handleCopy}
                    className="absolute top-3 right-3 p-2 bg-white/80 backdrop-blur-sm border border-gray-200 rounded-lg hover:bg-white hover:shadow-md transition-all duration-200"
                    title="Copy to clipboard"
                  >
                    <Copy className="w-4 h-4 text-gray-600" />
                  </button>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-4 mt-6">
                  <button
                    onClick={handleCopy}
                    className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all duration-200 ${
                      copied
                        ? 'bg-green-100 text-green-700 border border-green-200'
                        : 'bg-blue-600 text-white hover:bg-blue-700 shadow-md hover:shadow-lg'
                    }`}
                  >
                    <Copy className="w-4 h-4" />
                    {copied ? 'Copied to Clipboard!' : 'Copy Reply'}
                  </button>
                  
                  <button
                    onClick={() => setGeneratedReply('')}
                    className="px-6 py-3 text-gray-600 hover:text-gray-800 font-medium transition-colors duration-200 border border-gray-200 rounded-xl hover:bg-gray-50"
                  >
                    Generate New Reply
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Features Grid */}
        <div className="mt-20 grid md:grid-cols-3 gap-8">
          {[
            {
              icon: Sparkles,
              title: 'AI-Powered Intelligence',
              description: 'Advanced language models understand context and nuance to generate human-like responses.',
              color: 'blue'
            },
            {
              icon: MessageSquare,
              title: 'Multiple Tone Options',
              description: 'Choose from professional, casual, friendly, and more to match your communication style.',
              color: 'purple'
            },
            {
              icon: Zap,
              title: 'Instant Generation',
              description: 'Get professional email replies in seconds, saving you time and mental energy.',
              color: 'green'
            }
          ].map((feature, index) => (
            <div key={index} className="group">
              <div className="relative bg-white/60 backdrop-blur-sm rounded-2xl p-8 border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className={`inline-flex p-3 rounded-2xl mb-6 bg-${feature.color}-100`}>
                  <feature.icon className={`w-6 h-6 text-${feature.color}-600`} />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-20 bg-white/50 backdrop-blur-sm border-t border-white/20">
        <div className="max-w-6xl mx-auto px-6 py-8">
          <div className="text-center">
            <p className="text-gray-600">
              Powered by advanced AI • Built for professionals • Secure & private
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;