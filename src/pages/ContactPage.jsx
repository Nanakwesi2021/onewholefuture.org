import React, { useState } from 'react';
import { db } from '../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { id, value } = e.target;
    setError('');
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError('Please provide a valid email address.');
      return;
    }

    if (formData.message.length < 10) {
      setError('Message must be at least 10 characters long.');
      return;
    }

    setLoading(true);
    setError('');
    try {
      await addDoc(collection(db, 'inquiries'), {
        ...formData,
        createdAt: serverTimestamp()
      });
      setSubmitted(true);
      setFormData({ firstName: '', lastName: '', email: '', message: '' });
    } catch (error) {
      console.error("Error submitting inquiry:", error);
      setError("Connectivity issue. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-32 pb-24 bg-surface min-h-screen">
      <div className="max-w-[1200px] mx-auto px-8">
        <div className="grid lg:grid-cols-2 gap-24">
          <div>
            <h1 className="text-6xl font-bold text-primary font-headline mb-8 tracking-tighter">Get in touch</h1>
            <p className="text-xl text-on-surface-variant mb-12 font-body leading-relaxed">
              Have questions about our programs or want to partner with us? We'd love to hear from you.
            </p>

            <div className="space-y-8">
              <div className="flex gap-6">
                <div className="w-14 h-14 bg-emerald-100  rounded-2xl flex items-center justify-center flex-shrink-0">
                  <span className="material-symbols-outlined text-emerald-800 ">mail</span>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-primary font-headline">General Inquiries</h3>
                  <p className="text-on-surface-variant font-body">hello@onewholefuture.org</p>
                </div>
              </div>
              <div className="flex gap-6">
                <div className="w-14 h-14 bg-emerald-100  rounded-2xl flex items-center justify-center flex-shrink-0">
                  <span className="material-symbols-outlined text-emerald-800 ">news</span>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-primary font-headline">Media Relations</h3>
                  <p className="text-on-surface-variant font-body">media@onewholefuture.org</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white  p-12 rounded-[40px] shadow-2xl border border-outline-variant">
            {submitted ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12 animate-in fade-in zoom-in duration-500">
                <div className="w-20 h-20 bg-emerald-100  rounded-full flex items-center justify-center mb-6">
                  <span className="material-symbols-outlined text-emerald-600 text-4xl">check_circle</span>
                </div>
                <h2 className="text-3xl font-bold text-primary font-headline mb-4">Message Received</h2>
                <p className="text-on-surface-variant font-body max-w-xs">
                  Thank you for reaching out. A member of our team will be in touch shortly.
                </p>
                <button 
                  onClick={() => setSubmitted(false)}
                  className="mt-8 text-primary font-bold hover:opacity-70 transition-opacity"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-primary font-headline">First Name</label>
                    <input 
                      id="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      type="text" 
                      required
                      className="w-full px-6 py-4 rounded-2xl bg-stone-50  border border-outline-variant focus:border-emerald-500 outline-none font-body transition-all" 
                      placeholder="John" 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-primary font-headline">Last Name</label>
                    <input 
                      id="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      type="text" 
                      required
                      className="w-full px-6 py-4 rounded-2xl bg-stone-50  border border-outline-variant focus:border-emerald-500 outline-none font-body transition-all" 
                      placeholder="Doe" 
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-primary font-headline">Email Address</label>
                  <input 
                    id="email"
                    value={formData.email}
                    onChange={handleChange}
                    type="email" 
                    required
                    className="w-full px-6 py-4 rounded-2xl bg-stone-50  border border-outline-variant focus:border-emerald-500 outline-none font-body transition-all" 
                    placeholder="john@example.com" 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-primary font-headline">Message</label>
                  <textarea 
                    id="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows="4" 
                    required
                    className="w-full px-6 py-4 rounded-2xl bg-stone-50  border border-outline-variant focus:border-emerald-500 outline-none font-body transition-all" 
                    placeholder="How can we help?"
                  ></textarea>
                </div>

                {error && (
                  <div className="bg-rose-50  text-rose-600  p-4 rounded-2xl text-xs font-bold animate-in fade-in slide-in-from-top-2 duration-300 flex items-center gap-3 border border-rose-100 ">
                    <span className="material-symbols-outlined text-sm">error</span>
                    {error}
                  </div>
                )}

                <button 
                  disabled={loading}
                  className="w-full bg-primary  text-white py-5 rounded-2xl font-headline font-bold text-lg hover:bg-emerald-800 transition-all shadow-lg active:scale-[0.98] disabled:opacity-50"
                >
                  {loading ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
