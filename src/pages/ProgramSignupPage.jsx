import React, { useState, useRef } from 'react';
import { db, storage } from '../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { useNavigate } from 'react-router-dom';

const ProgramSignupPage = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [fileError, setFileError] = useState('');
  const [submitError, setSubmitError] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    program: 'Health Tech Fellowship',
    experience: '',
    intent: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSubmitError('');
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFileError('');
    const file = e.target.files[0];
    if (file) {
      // 10MB limit
      if (file.size > 10 * 1024 * 1024) {
        setFileError('File size exceeds 10MB limit.');
        setSelectedFile(null);
        return;
      }
      
      const allowedTypes = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'image/jpeg', 'image/jpg'];
      if (!allowedTypes.includes(file.type)) {
        setFileError('Invalid file type. Please upload PDF, DOCX, or JPG.');
        setSelectedFile(null);
        return;
      }

      setSelectedFile(file);
    }
  };

  const handleUploadAndSubmit = async (e) => {
    e.preventDefault();
    
    // Step 1 Validation
    if (step === 1) {
      if (!formData.fullName || !formData.email) {
        setSubmitError('Please fill in your name and email.');
        return;
      }
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        setSubmitError('Please provide a valid email address.');
        return;
      }
      setStep(2);
      setSubmitError('');
      return;
    }

    // Step 2 Validation
    if (step === 2) {
      if (!formData.experience || formData.experience < 0) {
        setSubmitError('Please provide a valid number of years.');
        return;
      }
      setStep(3);
      setSubmitError('');
      return;
    }

    // Final Submission (Step 3)
    if (!formData.intent || formData.intent.length < 20) {
      setSubmitError('Please provide a detailed statement (min 20 characters).');
      return;
    }
    if (!selectedFile) {
      setFileError('Please upload your CV or Portfolio to proceed.');
      return;
    }

    setLoading(true);
    setSubmitError('');
    let fileUrl = '';

    try {
      if (selectedFile) {
        const storageRef = ref(storage, `applications/${Date.now()}_${selectedFile.name}`);
        const uploadTask = uploadBytesResumable(storageRef, selectedFile);

        await new Promise((resolve, reject) => {
          uploadTask.on(
            'state_changed',
            (snapshot) => {
              const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              setUploadProgress(progress);
            },
            (error) => reject(error),
            async () => {
              fileUrl = await getDownloadURL(uploadTask.snapshot.ref);
              resolve();
            }
          );
        });
      }

      await addDoc(collection(db, 'applications'), {
        ...formData,
        fileUrl,
        status: 'Pending',
        createdAt: serverTimestamp()
      });
      navigate('/thank-you');
    } catch (error) {
      console.error("Error submitting application:", error);
      setSubmitError("Connectivity issue. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-surface text-on-surface min-h-screen">
      <main className="pb-20">
        <section className="px-8 max-w-7xl mx-auto py-16 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <span className="text-xs font-semibold tracking-widest text-primary uppercase mb-4 block">Programs & Fellowships</span>
            <h1 className="text-5xl md:text-6xl font-extrabold text-on-surface leading-tight tracking-tighter mb-6 font-headline">
              Shape the future <br />of human impact.
            </h1>
            <p className="text-lg text-on-surface-variant leading-relaxed max-w-lg mb-8 font-light">
              onewholefuture invites visionaries, researchers, and activists to join our intensive cohorts focused on solving systemic global challenges.
            </p>
          </div>
          <div className="relative h-[400px] rounded-[40px] overflow-hidden shadow-2xl">
            <img
              alt="onewholefuture programme participants, Accra Ghana"
              className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=85&w=800"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-transparent" />
          </div>
        </section>

        <section className="py-24 px-8 bg-white" id="apply">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold tracking-tight mb-4 font-headline">Register Your Interest</h2>
              <p className="text-on-surface-variant font-light">Step {step} of 3: {step === 1 ? 'Personal Details' : step === 2 ? 'Professional Experience' : 'Finalize & Submit'}</p>
            </div>

            <div className="flex items-center justify-between mb-12 max-w-md mx-auto relative">
              <div className="absolute top-1/2 left-0 w-full h-0.5 bg-stone-100 -translate-y-1/2 -z-10"></div>
              {[1, 2, 3].map((s) => (
                <div key={s} className="flex flex-col items-center gap-2">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all duration-300 ${
                    step >= s ? 'bg-primary text-white scale-110 shadow-lg' : 'bg-stone-100 text-stone-400'
                  }`}>
                    {step > s ? <span className="material-symbols-outlined text-sm">check</span> : s}
                  </div>
                  <span className={`text-[10px] font-bold uppercase tracking-widest ${step >= s ? 'text-primary' : 'text-stone-400'}`}>
                    {s === 1 ? 'Personal' : s === 2 ? 'Experience' : 'Intent'}
                  </span>
                </div>
              ))}
            </div>

            <form className="space-y-10" onSubmit={handleUploadAndSubmit}>
              {step === 1 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-bold text-stone-500 uppercase tracking-widest">Full Name</label>
                    <input 
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      className="bg-surface-container-low border border-stone-100 rounded-xl px-4 py-4 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all font-body" 
                      placeholder="John Doe" 
                      type="text" 
                      required
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-bold text-stone-500 uppercase tracking-widest">Email Address</label>
                    <input 
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="bg-surface-container-low border border-stone-100 rounded-xl px-4 py-4 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all font-body" 
                      placeholder="john@example.com" 
                      type="email" 
                      required
                    />
                  </div>
                  <div className="md:col-span-2 flex flex-col gap-2">
                    <label className="text-xs font-bold text-stone-500 uppercase tracking-widest">Program Selection</label>
                    <select 
                      name="program"
                      value={formData.program}
                      onChange={handleChange}
                      className="bg-surface-container-low border border-stone-100 rounded-xl px-4 py-4 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all font-body"
                    >
                      <option>Health Tech Fellowship</option>
                      <option>Gender Equality Summit</option>
                      <option>Climate Resilience Lab</option>
                      <option>Humanitarian Logistics</option>
                    </select>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-bold text-stone-500 uppercase tracking-widest">Years of Relevant Experience</label>
                    <input 
                      name="experience"
                      value={formData.experience}
                      onChange={handleChange}
                      className="bg-surface-container-low border border-stone-100 rounded-xl px-4 py-4 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all font-body" 
                      placeholder="e.g., 5" 
                      type="number" 
                      required
                    />
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="flex flex-col gap-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-bold text-stone-500 uppercase tracking-widest">Statement of Intent</label>
                    <textarea 
                      name="intent"
                      value={formData.intent}
                      onChange={handleChange}
                      className="bg-surface-container-low border border-stone-100 rounded-xl px-4 py-4 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all font-body" 
                      placeholder="Tell us about your mission..." 
                      rows="5"
                      required
                    ></textarea>
                  </div>

                  <div 
                    onClick={() => fileInputRef.current?.click()}
                    className={`border-2 border-dashed rounded-[32px] p-12 text-center transition-all cursor-pointer ${
                      selectedFile ? 'border-emerald-500 bg-emerald-50/30' : 'border-stone-200 bg-stone-50/30 hover:bg-stone-100/50'
                    }`}
                  >
                    <input 
                      type="file" 
                      ref={fileInputRef} 
                      onChange={handleFileChange} 
                      className="hidden" 
                      accept=".pdf,.docx,.jpg,.jpeg"
                    />
                    <span className={`material-symbols-outlined text-5xl mb-4 ${selectedFile ? 'text-emerald-600' : 'text-stone-400'}`}>
                      {selectedFile ? 'task' : 'cloud_upload'}
                    </span>
                    <p className="text-sm font-bold mb-1">
                      {selectedFile ? selectedFile.name : 'Upload CV / Portfolio'}
                    </p>
                    <p className="text-xs text-stone-500 font-light">
                      {selectedFile ? `${(selectedFile.size / (1024 * 1024)).toFixed(2)} MB` : 'PDF, DOCX, or JPG (Max 10MB)'}
                    </p>
                  </div>
                  {fileError && <p className="text-xs text-red-500 font-bold mt-2 text-center">{fileError}</p>}

                  {submitError && (
                    <div className="bg-rose-50 text-rose-600 p-4 rounded-2xl text-xs font-bold animate-in fade-in slide-in-from-top-2 duration-300 flex items-center gap-3 border border-rose-100">
                      <span className="material-symbols-outlined text-sm">error</span>
                      {submitError}
                    </div>
                  )}

                  {loading && (
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs font-bold text-stone-500 uppercase">
                        <span>Uploading Documents</span>
                        <span>{Math.round(uploadProgress)}%</span>
                      </div>
                      <div className="h-2 bg-stone-100 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-emerald-600 transition-all duration-300" 
                          style={{ width: `${uploadProgress}%` }}
                        ></div>
                      </div>
                    </div>
                  )}
                </div>
              )}

              <div className="flex justify-between items-center pt-10">
                {step > 1 ? (
                  <button 
                    type="button"
                    onClick={() => setStep(prev => prev - 1)}
                    className="text-stone-500 font-bold text-sm hover:text-primary transition-colors flex items-center gap-2"
                  >
                    <span className="material-symbols-outlined text-sm">arrow_back</span>
                    Back
                  </button>
                ) : (
                  <button 
                    type="button"
                    onClick={() => navigate('/')}
                    className="text-stone-400 font-bold text-sm hover:text-stone-600 transition-colors"
                  >
                    Cancel Application
                  </button>
                )}
                
                <button 
                  disabled={loading}
                  className="bg-primary text-on-primary px-12 py-4 rounded-full font-headline font-bold hover:shadow-xl hover:bg-emerald-800 transition-all active:scale-95 disabled:opacity-50" 
                  type="submit"
                >
                  {loading ? 'Processing...' : step === 3 ? 'Submit Application' : 'Next Step'}
                </button>
              </div>
            </form>
          </div>
        </section>
      </main>
    </div>
  );
};

export default ProgramSignupPage;
