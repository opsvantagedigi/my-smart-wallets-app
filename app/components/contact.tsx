"use client";

import React, { useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import StarryBackground from "../../components/StarryBackground";

export default function Contact() {
    const [activeForm, setActiveForm] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);

    const handleTriage = (form: string) => {
        setActiveForm(form);
        setSuccess(false);
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setSuccess(true);
        setActiveForm(null);
        // TODO: Add actual form submission logic here
    };

    return (

        <div style={{ position: "relative", minHeight: "100vh", overflow: "hidden" }}>
            <StarryBackground />
            <div className="container" style={{ position: "relative", zIndex: 1 }}>
                <Header />

                <main>
                    <section className="content-panel text-center" aria-labelledby="contact-heading">
                        <h1 id="contact-heading" style={{ fontFamily: 'Orbitron, sans-serif' }}>Open a Secure Channel</h1>
                        <p className="intro-text">
                            Select your reason for contact to initiate the Signal Relay. We look forward to connecting with you.
                        </p>
                        <div className="triage-buttons">
                            <button className="triage-btn" onClick={() => handleTriage("general")}>General Inquiry</button>
                            <button className="triage-btn" onClick={() => handleTriage("investor")}>Investor Relations</button>
                            <button className="triage-btn" onClick={() => handleTriage("partnership")}>Partnership Proposal</button>
                        </div>

                        <div id="form-container">
                            {activeForm === "general" && (
                                <form className="contact-form" onSubmit={handleSubmit}>
                                    <h3>General Inquiry</h3>
                                    <input type="text" placeholder="Your Name" required />
                                    <input type="email" placeholder="Your Email" required />
                                    <textarea placeholder="Your Message" rows={5} required />
                                    <button type="submit" className="transmit-btn">Transmit Signal</button>
                                </form>
                            )}
                            {activeForm === "investor" && (
                                <form className="contact-form" onSubmit={handleSubmit}>
                                    <h3>Investor Relations</h3>
                                    <input type="text" placeholder="Your Full Name" required />
                                    <input type="text" placeholder="Organization / Firm" required />
                                    <input type="email" placeholder="Your Email Address" required />
                                    <textarea placeholder="Brief Introduction" rows={5} required />
                                    <button type="submit" className="transmit-btn">Transmit Signal</button>
                                </form>
                            )}
                            {activeForm === "partnership" && (
                                <form className="contact-form" onSubmit={handleSubmit}>
                                    <h3>Partnership Proposal</h3>
                                    <input type="text" placeholder="Your Name" required />
                                    <input type="text" placeholder="Company / Project Name" required />
                                    <input type="email" placeholder="Your Email" required />
                                    <textarea placeholder="Tell us about your project" rows={5} required />
                                    <button type="submit" className="transmit-btn">Transmit Signal</button>
                                </form>
                            )}
                        </div>

                        {success && (
                            <div id="success-message">
                                <h3>Signal Received.</h3>
                                <p>Thank you for reaching out. We will respond shortly.</p>
                            </div>
                        )}
                    </section>
                </main>
                <Footer />
            </div>
        </div>
    );
}
