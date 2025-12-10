<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Contact Us | OpsVantage Digital</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@700&family=Inter:wght@400;600&display=swap" rel="stylesheet">
    <link rel="icon" type="image/png" href="assets/Icon_3D-MultipleLinesOutline.png">
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div id="canvas-container"></div>
    <div class="container">
        <header class="site-header">
            <a href="index.html" class="text-logo logo-container">
                <span class="logo-ops">Ops</span><span class="logo-vantage">Vantage</span> <span class="logo-digital">Digital</span>
            </a>
            <nav class="main-nav">
                <a href="about.html">About Us</a>
                <a href="partners.html">Partners</a>
                <a href="deals.html">Deals & Promos</a>
                <a href="blog.html">Blog</a>
            </nav>
            <div class="header-buttons">
                <div class="launch-button">
                    <a href="#">Launching Soon</a>
                </div>
                <div class="contact-button">
                    <a href="contact.html">Contact Us</a>
                </div>
            </div>
        </header>

        <main>
             <section class="content-panel text-center">
                <h2>Open a Secure Channel</h2>
                <p class="intro-text">Select your reason for contact to initiate the Signal Relay. We look forward to connecting with you.</p>

                <div class="triage-buttons">
                    <button class="triage-btn" data-form="general">General Inquiry</button>
                    <button class="triage-btn" data-form="investor">Investor Relations</button>
                    <button class="triage-btn" data-form="partnership">Partnership Proposal</button>
                </div>

                <div id="form-container">
                    <!-- General Inquiry Form (Hidden by default) -->
                    <form id="general-form" class="contact-form hidden">
                        <h3>General Inquiry</h3>
                        <input type="text" placeholder="Your Name" required>
                        <input type="email" placeholder="Your Email" required>
                        <textarea placeholder="Your Message" rows="5" required></textarea>
                        <button type="submit" class="transmit-btn">Transmit Signal</button>
                    </form>

                    <!-- Investor Relations Form (Hidden by default) -->
                    <form id="investor-form" class="contact-form hidden">
                        <h3>Investor Relations</h3>
                        <input type="text" placeholder="Your Full Name" required>
                        <input type="text" placeholder="Organization / Firm" required>
                        <input type="email" placeholder="Your Email Address" required>
                        <textarea placeholder="Brief Introduction" rows="5" required></textarea>
                        <button type="submit" class="transmit-btn">Transmit Signal</button>
                    </form>

                    <!-- Partnership Proposal Form (Hidden by default) -->
                    <form id="partnership-form" class="contact-form hidden">
                        <h3>Partnership Proposal</h3>
                        <input type="text" placeholder="Your Name" required>
                        <input type="text" placeholder="Company / Project Name" required>
                        <input type="email" placeholder="Your Email" required>
                        <textarea placeholder="Tell us about your project" rows="5" required></textarea>
                        <button type="submit" class="transmit-btn">Transmit Signal</button>
                    </form>
                </div>

                <div id="success-message" class="hidden">
                    <h3>Signal Received.</h3>
                    <p>Thank you for reaching out. We will respond shortly.</p>
                </div>

            </section>
        </main>
        
        <footer class="site-footer">
            <div class="site-footer-main">
                <div class="footer-grid">
                    <div class="footer-column">
                        <a href="index.html" class="text-logo footer-logo">
                            <span class="logo-ops">Ops</span><span class="logo-vantage">Vantage</span> <span class="logo-digital">Digital</span>
                        </a>
                    </div>
                    <div class="footer-column">
                        <h4>Navigation</h4>
                        <nav class="footer-nav">
                            <a href="about.html">About Us</a>
                            <a href="contact.html">Contact Us</a>
                            <a href="partners.html">Partners</a>
                            <a href="deals.html">Deals & Promos</a>
                        </nav>
                    </div>
                    <div class="footer-column">
                        <h4>Connect</h4>
                        <div class="social-links">
                            <a href="https://x.com/opsvantagedigi/" target="_blank">X (Twitter)</a>
                            <a href="https://www.linkedin.com/company/opsvantage-digital/" target="_blank">LinkedIn</a>
                            <a href="https://www.instagram.com/opsvantagedigital/" target="_blank">Instagram</a>
                        </div>
                    </div>
                </div>
            </div>
            <div class="footer-bottom">
                © 2025 OpsVantage Digital. All Rights Reserved. | <a href="privacy.html">Privacy Policy</a> | <a href="terms.html">Terms of Service</a> | <a href="cookies.html">Cookie Policy</a>
            </div>
        </footer>
    </div>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>
    <script src="script.js"></script> 
</body>
</html>
